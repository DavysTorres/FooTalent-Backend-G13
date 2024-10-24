const multer = require('multer');
const path = require('path');
const fs = require('fs');
//Agregó funcionalidad con cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// Configura el almacenamiento con Cloudinary
const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/imagenes', // Carpeta donde se almacenarán las imágenes en Cloudinary
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Nombre del archivo en Cloudinary
    resource_type: 'image',
  },
});

// Configura Multer con Cloudinary
exports.upload = multer({ storage: storageCloudinary });











//logica para la subida de arhivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads/imagenes');  // Ruta donde se guardarán las imágenes
    cb(null, uploadPath);  // Esto mantiene la ruta absoluta para almacenar, pero no para la base de datos
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;  // Solo el nombre del archivo
    cb(null, fileName);  // Guardamos solo el nombre del archivo
  }
});

const storageDocumento = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads/documentos');
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

exports.cargarImagen = multer({
  storage: storage,
  fileFilter
});

exports.cargarDocumentos=multer({
  storage: storageDocumento,
})


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


exports.borrarAntiguaFoto = async (oldAvatar) => {
  const oldAvatarPath = path.resolve(__dirname, oldAvatar);
  fs.unlink(oldAvatarPath, (err) => {
    if (err) {
      console.error('Error al borrar la imagen antigua:', err);
    } else {
      console.log('Imagen antigua borrada');
    }
  });
}

exports.borrarDocumentosAntiguos = async (oldDocuments) => {
  oldDocuments.forEach((document) => {
      const documentPath = path.resolve(__dirname, document);
      fs.unlink(documentPath, (err) => {
          if (err) {
              console.error(`Error al borrar el documento ${document}:`, err);
          } else {
              console.log(`Documento ${document} borrado`);
          }
      });
  });
};