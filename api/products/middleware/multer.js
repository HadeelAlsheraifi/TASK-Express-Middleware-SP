const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date()}${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
