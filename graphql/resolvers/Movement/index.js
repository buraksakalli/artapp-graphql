import Artist from "../../../server/models/Artist";
import Movement from "../../../server/models/Movement";
import Painting from "../../../server/models/Painting";

export default {
  Query: {
    movement: async (parent, { _id }, context, info) => {
      return await Movement.find({ _id });
    },
    movements: async (parent, args, context, info) => {
      const res = await Movement.find({})
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        description: u.description,
        createdAt: u.createdAt,
        artists: u.artists,
        paintings: u.paintings
      }));
    }
  },
  Mutation: {
    createMovement: async (parent, { movement }, context, info) => {
      const newMovement = await new Movement({
        name: movement.name,
        description: movement.description,
      });

      return new Promise((resolve, reject) => {
        newMovement.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateMovement: async (parent, { _id, movement }, context, info) => {
      return new Promise((resolve, reject) => {
        Movement.findByIdAndUpdate(
          _id,
          { $set: { ...movement } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteMovement: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Movement.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Movement: {
    artists: async ({ _id }, args, context, info) => {

      return await Artist.find({ movement: _id });
    },
    paintings: async ({ _id }, args, context, info) => {
      return await Painting.find({ movement: _id });
    }
  }
};
