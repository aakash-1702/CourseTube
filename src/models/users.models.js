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
import bcrypt from "bcrypt";

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
      required : true, 
    },
    coverImage: {
      type: String, // cloudinger link
    },
    refreshToken: {
      type: String,
      default : ""// will be empty while registering the user 
    },
  },
  {
    timestamps: true, // adds the field of createdAt and updatedAt , good for posing restrictions
  }
);

// prehooks for hashing the password
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();
  // here this would have access to every attribute of the userSchema
  this.password = await bcrypt.hash(this.password,12);
  next();
});

// methods on top of userSchema
userSchema.methods.isCorrectPassword = async function(password){
  return await bcrypt.compare(password,this.password);  
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id : this._id
  },process.env.ACCESS_TOKEN_SECRET,{
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  });
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id : this._id
  },process.env.REFRESH_TOKEN_SECURITY,{
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
  });
}



const Users = mongoose.model("Users", userSchema, "users");
// here Users is the model , userSchema is the schema and users is nothing but the collection


export {Users};