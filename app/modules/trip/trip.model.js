import mongoose, { Schema, model } from "mongoose";

export const tripSchema = new Schema(
  {
    trip: {
      type: String,
    },
    tripFor: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    route: {
      type: String,
    },
    busName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Trip = model("Trip", tripSchema);
export default Trip;
