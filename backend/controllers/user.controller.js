import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const userRegister = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    //checking all fields are filled or not
    if (
      [username, email, password, fullName].some(
        (val) => val?.trim() === "" || val === undefined
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const userExist = await User.findOne({ $or: [{ username }, { email }] });
    if (userExist) {
      console.log(userExist.username, username);
      console.log(userExist.email, email);
      return res.status(409).json({
        success: false,
        message:
          userExist.email === email
            ? "Already Registered, Please Login"
            : "Username already taken",
      });
    }

    const emailRegex = /^([a-zA-Z0-9]{6,})@[a-zA-Z]{3,}\.[a-z]{2,10}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Format",
      });
    }

    const avatarPath = req.files?.avatar && req.files?.avatar[0]?.path;
    const coverImagePath =
      req.files?.coverImage && req.files?.coverImage[0]?.path;
    if (!avatarPath) {
      return res.status(400).json({
        success: false,
        message: "Avatar is Required",
      });
    }

    const avatar = await uploadOnCloudinary(avatarPath);
    const coverImage = await uploadOnCloudinary(coverImagePath);

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Avatar is Required",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      username: username.toLowerCase(),
      avatar: avatar?.url,
      coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id);

    if (!createdUser) {
      return res
        .status(500)
        .json({ success: false, message: "User registration failed" });
    }

    return res.status(201).json({
      user: createdUser,
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status((error.code < 500 && error.code) || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { userRegister };
