import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
      required: false, // Optional
    },
    location: {
      type: String,
      required: false, // Optional
    },
    occupation: {
      type: String,
      required: false, // Optional
    },
    viewedProfile: {
      type: Number,
      required: false, // Optional
    },
    impressions: {
      type: Number,
      required: false, // Optional
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
