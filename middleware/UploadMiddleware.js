import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder penyimpanan sementara file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nama file disimpan sesuai dengan nama aslinya
  },
});

const upload = multer({ storage: storage });

export default upload;
