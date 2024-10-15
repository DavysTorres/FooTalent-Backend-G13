const express = require('express');
const conectarDB = require('./src/config/configDB');
const cors = require('cors');
const app = express();

conectarDB();

//Middlewares
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.json());



//Routes
app.use('/api', require('./src/routes/routes'));

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Servidor Corriendo en el puerto ${PORT}`);
})

