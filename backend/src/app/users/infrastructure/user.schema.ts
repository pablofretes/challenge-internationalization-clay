import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    uuid: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema)

export default UserModel