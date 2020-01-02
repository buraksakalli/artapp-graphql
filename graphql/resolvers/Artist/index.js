import Artist from "../../../server/models/Artist";
import Painting from "../../../server/models/Painting";
import Movement from "../../../server/models/Movement";

export default {
  Query: {
    artist: async (parent, { _id }, context, info) => {
      return await Artist.findOne({ _id }).exec();
    },
    artists: async (parent, args, context, info) => {
      const artists = await Artist.find({})
        .populate()
        .exec();

      return artists.map(u => ({
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
      console.log(movement);
      return await Movement.find({ _id: movement });
    }
  }
};
