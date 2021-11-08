require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config'); 

// crear el servidor de express
const app = express();

// configurar CORS
app.use(cors())

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();
// user: mean_user
// n2nJrJ72Gwy8bap


console.log(process.env);
// Rutas
app.use('/api/medicos', require('./routes/medico'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require ('./routes/hospital.js'));
app.use('/api/login', require ('./routes/auth'));
app.use('/api/seek', require ('./routes/busquedas'));
app.use('/api/upload', require ('./routes/uploads'));

app.listen(process.env.PORT, ()=>{
    console.log("Serviido corriendo en el puerto "+ process.env.PORT);
} )

console.log("hola mundo");