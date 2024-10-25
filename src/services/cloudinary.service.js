const cloudinary = require('cloudinary').v2;

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Función para subir el archivo a Cloudinary
 * @param {Buffer} fileBuffer - El buffer del archivo subido
 * @param {String} userId - El ID del usuario
 * @returns {Object} - Los datos del archivo subido
 */
async function subirArchivoACloudinary(fileBuffer, userId) {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        folder: 'upload_profile',
        resource_type: 'image',
        public_id: `${userId}`, // Identificador único basado en el usuario
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });

      // Escribe el buffer en el stream de Cloudinary
      uploadStream.end(fileBuffer);
    });

    return {
      public_id: result.public_id,
      url: result.secure_url
    };
  } catch (error) {
    throw new Error('Error al subir el archivo a Cloudinary');
  }
}

module.exports = { subirArchivoACloudinary };
