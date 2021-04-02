require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config'); 

// crear el servidor de express
const app = express();

// configurar CORS
app.use(cors())

// Base de datos
dbConnection();
// user: mean_user
// pass: WTyKQpu6V1tXjvfN 


console.log(process.env);
// Rutas
app.get('/', (req,res)=> {
    res.json({
        ok:true,
        msg:'Hola Mundo'
    })
} )

app.listen(process.env.PORT, ()=>{
    console.log("Serviido corriendo en el puerto "+ process.env.PORT);
} )

console.log("hola mundo");