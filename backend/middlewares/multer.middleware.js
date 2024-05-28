import multer from "multer";
const storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "./uploads");
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
