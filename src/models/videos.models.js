/*
  id : string primary key
  videoFile : string
  thumbnail : string
  owner : ObjectId ,string
  title : string
  description : string
  isPublished : boolean
*/


import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
  {
    videoFile : {
        type : String // cloudinary link
    },
    thumbnail : {
        type : String // cloudinary link
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        default : "This video does not has a description"
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    owner : {
        // will reference to the user who has created and uploaded the video
        type : Schema.Types.ObjectId , 
        ref : "Users"
    }    
  },
  {
    timestamps: true, // adds the field of createdAt and updatedAt , good for posing restrictions
  }
);

const Videos = mongoose.model("Videos", videoSchema, "videos");

videoSchema.plugin(mongooseAggregatePaginate);
// here Users is the model , userSchema is the schema and users is nothing but the collection


export {Videos};