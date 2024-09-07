const mongoose = require('mongoose');
require('dotenv').config({path: 'config.env'});

const conectarDB = async() => { 
    try{
        await mongoose.connect(process.env.DB_MONGO);
        console.log('Base de datos conectada ')
    }
    catch(error){
        console.log('No se pudo conectar',error);
    }
}

module.exports = conectarDB;