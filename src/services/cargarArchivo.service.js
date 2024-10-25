const multer = require('multer');
const path = require('path');
const fs = require('fs');
//Agregó funcionalidad con cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configura Cloudinary con las variables de entorno
/*cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
*/

/*
// Configura el almacenamiento en Cloudinary con `multer-storage-cloudinary`
const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads/imagenes',    // Carpeta donde se almacenarán las imágenes
      public_id: `${Date.now()}-${file.originalname}`,  // Genera un nombre único para cada archivo
      resource_type: 'image',        // Especifica el tipo de archivo (imagen)
    };
  },
});
*/
// Configura Multer con Cloudinary
/*const upload = multer({
  storage: storageCloudinary,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limita el tamaño del archivo a 5MB
  fileFilter: (req, file, cb) => {
    // Verifica que el archivo sea una imagen
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: Solo se permiten imágenes (jpeg, jpg, png)'));
  },
});
*/
// Middleware para manejar la carga de imágenes y errores
/*exports.uploadFile = (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Errores específicos de Multer (como tamaño de archivo excesivo)
      return res.status(400).json({ mensaje: 'Error al subir el archivo', error: err.message });
    } else if (err) {
      // Otros errores (como tipo de archivo no permitido)
      return res.status(400).json({ mensaje: 'Error de validación', error: err.message });
    }
    next(); // Si no hay errores, pasa al siguiente middleware
  });
};
*/



// Configura almacenamiento en memoria con multer
const storageCloudinary = multer.memoryStorage();
 exports.upload = multer({ storageCloudinary });

// Exporta la configuración de multer











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