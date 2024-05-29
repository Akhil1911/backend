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
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "Already Registered, Please Login",
      });
    }

    const avatarPath = req.files?.avatar && req.files?.avatar[0]?.path;
    const coverImagePath =
      (req.files?.coverImage && req.files?.coverImage[0]?.path) || "";
    if (!avatarPath) {
      return res.status(400).json({
        success: false,
        message: "Avatar is Required",
      });
    }

    const avatar = await uploadOnCloudinary(avatarPath);
    const coverImage = await uploadOnCloudinary(coverImagePath);
    return res.json({ avatar, coverImage });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { userRegister };
