const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs'); //libreria de node para leer carptetas y archivos

const borrarImagen = async ( pathViejo ) => {

    if( fs.existsSync( pathViejo ) ){
        //borrar la imagen anterior
        fs.unlinkSync( pathViejo );
    }
}

const actualizarImagen = async ( tipo, id, path, nombreArchivo ) => {
    // console.log("hiiiiiii");
    let pathViejo;
    switch (tipo) {
        case 'medico':
            const medico = await Medico.findById( id );
            if( !medico ){
                console.log("No es un médico por id");
                return false;
            }
            pathViejo = `./uploads/medico/${ medico.img }`;
            borrarImagen( pathViejo);
            medico.img = nombreArchivo;
            medico.save();
            return true;
        case 'hospital':
            const hospital = await Hospital.findById( id );
            if( !hospital ){
                console.log("No es un médico por id");
                return false;
            }
            pathViejo = `./uploads/hospital/${ hospital.img }`;
            borrarImagen( pathViejo);
            hospital.img = nombreArchivo;
            hospital.save();
            return true;
        case 'usuario':
            const usuario = await Usuario.findById( id );
            if( !usuario ){
                console.log("No es un médico por id");
                return false;
            }
            pathViejo = `./uploads/usuario/${ usuario.img }`;
            borrarImagen( pathViejo);
            usuario.img = nombreArchivo;
            usuario.save();
            return true;
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}