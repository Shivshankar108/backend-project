import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from the user
    // validate - not empty
    // check if user already exists
    // check for image avatar(cumpolsory) and cover image
    // upload photos on the cloudinary, avatar is compulsory
    // create user object - create entry in db
    // remove password and refresh token field from response before showing it to the user
    // check for user creation
    // return res

    const { username, password, email, fullname } = req.body
    console.log("email", email);


    // this is to check single field at a time
    if (fullname === "") {
        throw new ApiError(400, "Full name is required")
    }

    // this is used to check all the fields at once
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar field is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar field is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong, User not created")
    }

    return response.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )



})

export { registerUser }