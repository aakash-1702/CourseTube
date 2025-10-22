  import { Users } from "../models/users.models.js";
  import { signUpValidation } from "../validations/signUp.validations.js";
  import { asyncHandler } from "../utils/asyncHandler.js";
  import { ApiError } from "../utils/apiError.js";
  import { ApiResponse } from "../utils/apiResponse.js";
  import { uploadAtCloudinary } from "../utils/cloudinary.utils.js";
  /*
  id string primary key
  userName
    watchHistory ObjectId of videos
    email loggedIn with unique as well
    fullName signUp information
    avatar string link to photo or something similar
    coverImage string link
    password string 
    refreshToken authentication and cookies handling
  */

  const createUser = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    const { userName, fullName, email, password, confirmPassword } = req.body;
    console.log("body has been parsed");
    const isValidInput = signUpValidation.safeParse({
      userName,
      fullName,
      email,
      password,
      confirmPassword,
    });
    if (!isValidInput.success) {
      
    }
    console.log("Input has been validated successfully");

    const existingUser = await Users.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) throw new ApiError(400, "User already exists");

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.coverImage?.[0]?.path;
    console.log(avatarLocalPath,coverLocalPath);
    if (!avatarLocalPath) throw new ApiError(400, "Avatar is missing");

    // uploading it on cloudinary
    console.log("uploading it on cloudinary");
    let avatar;
    try {
      avatar = await uploadAtCloudinary(avatarLocalPath);  
      console.log("Uploaded avatar cloudinary",avatar.url);    
    } catch (error) {
      console.log("Failed to upload at cloudinary",error);
      throw new ApiError(500,"Failed to upload avatar at cloudinary")      
    }
    
    let coverImage;
    try {
      coverImage = await uploadAtCloudinary(coverLocalPath);  
      console.log("Uploaded coverImage at cloudinary",coverImage.url);    
    } catch (error) {
      console.log("Failed to upload at cloudinary",error);
      throw new ApiError(500,"Failed to upload coverImage cloudinary");     
    }

    const newUser = await  new Users({
      userName,
      fullName,
      email,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      password,
    });

    if (!newUser)
      throw new ApiError(400, "Something went wrong while creating newUser");

    const createdUser = await newUser.save();

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered Successfully"));
  });

  export { createUser };
