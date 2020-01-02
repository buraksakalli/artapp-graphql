import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function () {
  return this.toString();
};

const PaintingSchema = new Schema({
  name: {
    type: String
  },
  date: {
    type: Date
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist"
  },
  description: {
    type: String
  },
  movement: {
    type: Schema.Types.ObjectId,
    ref: "Movement"
  },
  dimensions: {
    height: String,
    width: String,
    unit: String
  },
  location: {
    country: String,
    city: String,
    museum: String
  },
  genre: {
    type: String
  },
  createdAt: {
    type: Date
  },
  reference: [String],
  picture: {
    type: String
  }
});

export default mongoose.model("Painting", PaintingSchema);
