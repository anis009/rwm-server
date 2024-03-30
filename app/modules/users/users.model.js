import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define a separate counter schema
const counterSchema = new Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

export const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    userId: { type: Number, unique: true },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRoleId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// Pre-save hook to generate unique numeric userId
userSchema.pre("save", async function () {
  const doc = this;
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    doc.userId = counter.sequence_value;
  } catch (err) {
    throw err;
  }
});
// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.set("toJSON", {
  virtuals: true,
});

const User = model("User", userSchema);

export default User;
