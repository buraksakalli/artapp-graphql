import Artist from "../../../server/models/Artist";
import Painting from "../../../server/models/Painting";
import Movement from "../../../server/models/Movement";

export default {
  Query: {
    artist: async (parent, { _id, name }, context, info) => {
      if (_id) {
        return await Artist.findOne({ _id }).exec();
      } else if (name) {
        return await Artist.findOne({ name: name }).exec();
      }
    },
    artists: async (parent, { movementId }, context, info) => {
      let res;
      if (movementId) {
        res = await Artist.find({ movement: movementId })
          .populate()
          .exec()
      } else {
        res = await Artist.find({})
          .populate()
          .exec();
      }

      return res.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        born: u.born,
        died: u.died,
        movement: u.movement,
        nationality: u.nationality,
        reference: u.reference,
        createdAt: u.createdAt,
        picture: u.picture,
        description: u.description
      }));
    }
  },
  Mutation: {
    createArtist: async (parent, { artist }, context, info) => {
      const newArtist = await new Artist({
        name: artist.name,
        born: artist.born,
        died: artist.died,
        movement: artist.movement,
        nationality: artist.nationality,
        reference: artist.reference,
        createdAt: artist.createdAt,
        picture: artist.picture,
        description: artist.description
      });

      return new Promise((resolve, reject) => {
        newArtist.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateArtist: async (parent, { _id, artist }, context, info) => {
      return new Promise((resolve, reject) => {
        Artist.findByIdAndUpdate(_id, { $set: { ...artist } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteArtist: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Artist.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Artist: {
    movement: async ({ movement }, args, context, info) => {
      return await Movement.findById(movement);
    },
    paintings: async ({ _id }, args, context, info) => {
      return await Painting.find({ artist: _id });
    }
  }
};
