/*node*/
const path = require('path'); //
const fs = require('fs');
/*Express */
const { response } = require("express")
/*Models*/
const Hospital = require('./../models/hospital');
const Medico = require('./../models/medico');
const Usuario = require('./../models/usuario');
const { actualizarImagen } = require('./../helpers/uploadImage');

/*Library */
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const fileUpload = ( req, res = response ) => {

    const tipo  = req.params.tipo;
    const id  = req.params.id;

    const tiposValidos = [ 'hospital','medico','usuario' ];
    console.log("tiposValidos =",tiposValidos);
    console.log("tipo =",tipo);

    if ( !tiposValidos.includes(tipo) ) {
        return res.status(400).json( { 
            ok: false,
            msg: 'No es médico, usuario u Hospital'
         } )
    }
    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json( { 
            ok:false,
            msg:'No hay ningún archivo'
         } )
      }
    //Procesar la imagen
    const file = req.files.imagen;
    console.log("file ", file);

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];
    console.log("extensionArchivo ", extensionArchivo);

    //Validar extensión
     const extensionValida = [ 'png','jpg','jpeg','gif'];
     if ( !extensionValida.includes( extensionArchivo ) ) {
         return res.status(400).json( { 
             ok:false,
             msg:'La extensión no es válida'
          } )
     }
     //Generar el nombbre del archivo
     const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

     //path para guardar la imagen

     const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function(err) {
    if (err){
        return res.status(500).send(err);
    }

    //Actualizar base de datos
    actualizarImagen( tipo, id, path, nombreArchivo );

      res.json( { 
        ok: true,
        msg:'fileUploaded',
        nameFile:nombreArchivo 
     } );

  });




}


const retornarImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` );
    
    //imagen por defecto

    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const noPathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( noPathImg )
    }



}

module.exports = { 
    fileUpload,
    retornarImagen
 }
