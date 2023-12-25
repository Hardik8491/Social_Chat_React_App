import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // require: true,
    },
    password: {
      type: String,
      // require: true,
    },
    confirmpassword: {
      type: String,
      // require: true,
    },
    firstname: {
      type: String,
      // require: true,
    },
    lastname: {
      type: String,
      // require: true,
    },
    // email: {
    //   type: String,
    // default:"hardik55@gmail.com"
    // require: true,
    // },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    above: String,
    about: String,
    livesIn: String,
    WorkAt: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("Users", UserSchema);

 
export default UserModel;
