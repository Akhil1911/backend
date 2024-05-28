import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const userRegister = async (req, res) => {
  const { username, email, fullName, password } = req.body;
  // return res.status(201).json({
  //   username,
  //   email,
  //   password,
  //   fullName,
  //   files: req?.files,
  // });

  if (
    [username, email, fullName, password].some(
      (val) => val.trim() === "" || val === undefined
    )
  ) {
    throw new ApiError(400, "All Fields Are Required", [], "");
    // return res
    //   .status(400)
    //   .json({ success: false, message: "All Fields Are Required" });
  }

  return res.status(201).json({
    username,
    email,
    password,
    fullName,
    files: req?.files,
  });
};

export { userRegister };
