const userRegister = async (req, res) => {
  try {
    res.status(200).send("OK");
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { userRegister };
