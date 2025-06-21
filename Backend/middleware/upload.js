// const multer = require('multer');
// const path = require('path');

// // Storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // folder to store images
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // absolute path now
  },
  filename: function (req, file, cb) {
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, safeName);
  }
});

const upload = multer({ storage });

module.exports = upload;
