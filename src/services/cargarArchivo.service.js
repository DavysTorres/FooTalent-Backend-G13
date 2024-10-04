const multer = require('multer');
const path = require('path');

//logica para la subida de arhivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
//Se asegura que solo se pueda subir imageness
const fileFilter = (req, file, cb) => {
  const isPhoto = file.mimetype.startsWith('image/');
  if (isPhoto) {
    cb(null, true);
  } else {
    cb(new Error('El tipo de archivo no es válido'), false);
  }
};

exports.cargarImagen=multer({
    storage:storage
  });

  
exports.resizeImage = async (req, res, next) => {
    if (!req.file) {
      next();
      return;
    }
  
    try {
      const photo = await jimp.read(req.file.path);
      await photo.resize(1024, jimp.AUTO);
      await photo.writeAsync(`uploads/big/${req.file.filename}`);
      next();
    } catch (error) {
      next(error);
    }
  };
  