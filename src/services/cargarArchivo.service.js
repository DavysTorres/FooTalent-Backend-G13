const multer = require('multer');
const path = require('path');
const fs = require('fs');


//logica para la subida de arhivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
//Se asegura que solo se pueda subir imagenes
const fileFilter = (req, file, cb) => {
  const isPhoto = file.mimetype.startsWith('image/') || file.originalname.endsWith('.jfif');
  if (isPhoto) {
    cb(null, true);
  } else {
    cb(new Error('El tipo de archivo no es válido'), false);
  }
};

exports.cargarImagen=multer({
    storage:storage,
    fileFilter
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


  exports.borrarAntiguaFoto= async(oldAvatar) =>{
    const oldAvatarPath = path.resolve(__dirname, oldAvatar);
      fs.unlink(oldAvatarPath, (err) => {
        if (err) {
          console.error('Error al borrar la imagen antigua:', err);
        } else {
          console.log('Imagen antigua borrada');
        }
      });
  }