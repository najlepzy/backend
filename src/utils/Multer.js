import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/"));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/psd" ||
    file.mimetype === "image/bmp" ||
    file.mimetype === "image/svg" ||
    file.mimetype === "image/eps" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/tiff" ||
    file.mimetype === "image/gif  "
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploader = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: fileFilter,
});
