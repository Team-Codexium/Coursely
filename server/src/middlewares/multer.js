import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  //Directory setup
  destination: (req, file, cb) => {
    console.log("uploading");
    cb(null, path.join(__dirname, 'coursely'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: { fileSize: 1000000 }, // 1MB
});

export default upload;