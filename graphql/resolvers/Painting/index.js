import Artist from "../../../server/models/Artist";
import Movement from "../../../server/models/Movement";
import Painting from "../../../server/models/Painting";

export default {
  Query: {
    painting: async (parent, { _id, artistId, movementId }, context, info) => {
      if (_id)
        return await Painting.findOne({ _id }).exec();
      if (artistId)
        return await Painting.findOne({ artist: artistId }).exec();
      if (movementId)
        return await Painting.findOne({ movement: movementId }).exec();
    },
    paintings: async (parent, { artistId, movementId }, context, info) => {
      let res;
      if (artistId) {
        res = await Painting.find({ artist: artistId })
          .populate()
          .exec();
      }
      else if (movementId) {
        res = await Painting.find({ movement: movementId })
          .populate()
          .exec()
      }
      else {
        res = await Painting.find({})
          .populate()
          .exec();
      }

      return res.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        date: u.date,
        artist: u.artist,
        description: u.description,
        movement: u.movement,
        dimensions: u.dimensions,
        location: u.location,
        genre: u.genre,
        createdAt: u.createdAt,
        reference: u.reference,
        picture: u.picture,
      }));
    }
  },
  Mutation: {
    createPainting: async (parent, { painting }, context, info) => {
      const newPainting = await new Painting({
        name: painting.name,
        date: painting.date,
        artist: painting.artist,
        description: painting.description,
        movement: painting.movement,
        dimensions: painting.dimensions,
        location: painting.location,
        genre: painting.genre,
        createdAt: painting.createdAt,
        reference: painting.reference,
        picture: painting.picture
      });

      return await new Promise((resolve, reject) => {
        newPainting.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updatePainting: async (parent, { _id, painting }, context, info) => {
      return new Promise((resolve, reject) => {
        Painting.findByIdAndUpdate(_id, { $set: { ...painting } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deletePainting: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Painting.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Painting: {
    artist: async ({ artist }, args, context, info) => {
      return await Artist.findById(artist);
    },
    movement: async ({ movement }, args, context, info) => {
      return await Movement.findById(movement);
    }
  }
};
