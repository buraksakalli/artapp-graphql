import Artist from "../../../server/models/Artist";
import Movement from "../../../server/models/Movement";
import Painting from "../../../server/models/Painting";

import { transformPost } from "../merge";

export default {
  Query: {
    painting: async (parent, { _id }, context, info) => {
      return await Painting.findOne({ _id }).exec();
    },
    paintings: async (parent, args, context, info) => {
      const res = await Painting.find({})
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        date: u.date,
        artist: u.artist,
        description: u.description,
        movements: u.movements,
        dimensions: u.dimensions,
        location: u.location,
        genre: u.genre,
        createdAt: u.createdAt,
        reference: u.reference,
        picture: u.picture
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
        movements: painting.movements,
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
  Subscription: {
    painting: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  },
  Painting: {
    artist: async ({ artist }, args, context, info) => {
      return await Artist.findById(artist);
    },
    movements: async ({ movements }, args, context, info) => {
      return await Movement.findById({ movements });
    }
  }
};
