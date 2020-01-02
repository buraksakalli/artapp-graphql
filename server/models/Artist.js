import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function () {
  return this.toString();
};

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  born: {
    date: Date,
    location: String
  },
  died: {
    date: Date,
    location: String
  },
  nationality: {
    type: String
  },
  movement: {
    type: Schema.Types.ObjectId,
    ref: "Movement"
  },
  reference: {
    type: [String]
  },
  createdAt: {
    type: Date
  },
  picture: {
    type: String
  },
  description: {
    type: String
  }
});

export default mongoose.model("Artist", ArtistSchema);
