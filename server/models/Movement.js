import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

ObjectID.prototype.valueOf = function() {
  return this.toString();
};

const MovementSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

export default mongoose.model("Movement", MovementSchema);
