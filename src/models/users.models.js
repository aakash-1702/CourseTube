/*

id string primary key
  watchHistory ObjectId of videos
  email loggedIn with unique as well
  fullName signUp information
  avatar string link to photo or something similar
  coverImage string link
  password string 
  refreshToken authentication and cookies handling
*/

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    watchHistory: [
      {
        video: {
          type: Schema.Types.ObjectId,
          ref: "Video",
        },
      },
    ],
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, // cloundinger link
    },
    coverImage: {
      type: String, // cloudinger link
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // adds the field of createdAt and updatedAt , good for posing restrictions
  }
);

const Users = mongoose.model("Users", userSchema, "users");
// here Users is the model , userSchema is the schema and users is nothing but the collection


export {Users};