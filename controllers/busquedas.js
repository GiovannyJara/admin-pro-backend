/*Express */
const { response } = require("express")
/*Models*/
const Hospital = require('./../models/hospital');
const Medico = require('./../models/medico');
const Usuario = require('./../models/usuario');

const getAll = async ( req, res=response ) => { 

    const search = req.params.find;
    // console.log(search);
    const regex = new RegExp( search, 'i' )
    try {

        const [ seekHospital, seekUsuario, seekMedico ] = await Promise.all( [
            Hospital.find( { nombre:regex } ),
            Usuario.find( { nombre:regex } ),
            Medico.find( { nombre:regex } )
        ] )
        
        // const seekHospital = await Hospital.find( { nombre:regex } );
        // const seekUsuario = await Usuario.find( { nombre:regex } );
        // const seekMedico = await Medico.find( { nombre:regex } );

        res.json( { 
            ok:true,
            msj:'getSeek',
            search,
            seekHospital, seekUsuario, seekMedico
         } )
        
    } catch (error) {
        res.status(500).json( { 
            ok:false,
            msj:error
        } )
    }

}

const getDocumentsCollection = async ( req, res=response ) => { 

    const search = req.params.find;
    const tabla = req.params.table;
    const regex = new RegExp( search, 'i' )
    let data = [];

    switch (tabla) {
        case 'medico':
            data = await Medico.find( { nombre:regex } )
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'hospital':
            data = await Hospital.find( { nombre:regex } )
                                .populate('usuario', 'nombre img');
            break;
        case 'usuario':
            data = await Usuario.find( { nombre:regex } );
            break;
    
        default:
            return res.status(400).json( { 
                ok:'false',
                msg: 'La tabla tiene que ser medico/hospital/usuario'
            } );

    }

    res.json( {
        ok:false,
        resultados: data
    } )

}

module.exports = { 
    getAll,
    getDocumentsCollection
 }
