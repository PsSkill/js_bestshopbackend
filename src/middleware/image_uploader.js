const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    if (!req.body.name) {
      return cb(new Error('Original name not provided'));
    }
    
    const original_name = req.body.name;
    const unique_identifier = Date.now(); 
    const file_name = `${unique_identifier}-${original_name}${path.extname(file.originalname)}`;
    cb(null, file_name);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

const image_uploader_middleware = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      // Check if no file was uploaded
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        // If no file uploaded, set image_path to empty string
        req.body.image_path = '';
        return next();
      }
      return res.status(400).json({ message: err.message });
    }

    // Check if file was uploaded
    if (!req.file) {
      req.body.image_path = '';
      return next();
    }
    // If file uploaded successfully, construct the image path
    const image_path = path.join('uploads/images', req.file.filename);
    // Attach imagePath to the request object for further use
    req.body.image_path = image_path; 
    next();
  });
};

module.exports = image_uploader_middleware;
