const express = require('express');
const conectarDB = require('./src/config/configDB');
const cors = require('cors');
const app = express();
const helmet = require('helmet');

conectarDB();

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://vercel.live", "https://foo-talent-frontend-g13.vercel.app/"],
        objectSrc: ["'none'"],
      },
    },
  }));


const origenesPermitidos = ['http://localhost:4200', 'https://foo-talent-frontend-g13.vercel.app/'];

//Middlewares
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (origenesPermitidos.indexOf(origin) === -1) {
            const msg = 'La política CORS para este sitio no permite el acceso desde el Origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());

//Routes
app.use('/api', require('./src/routes/routes'));

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Servidor Corriendo en el puerto ${PORT}`);
})

