const { response } = require('express');

const Hospital = require('./../models/hospital');

const getHospitales = async ( req , res = response ) => {

    /*para conocer el nombre del usuario usar populate */
    const hospitales = await Hospital.find({})
                       .populate('usuario','nombre img');

    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital = async ( req , res = response ) => {
    /*siempre se va poder obtener el uid despues de pasar por validarJWT */
    const uid = req.uid;/*id del usuario que esta grabando el hospital */
    
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    } );

    try {

        const hospitalDB =  await hospital.save();
        
        res.json({
            ok:true,
            hospital:hospitalDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

    res.json({
        ok:true,
        msg:'crearHospitales'
    })
}

const actualizarHospital = ( req , res = response ) => {
    res.json({
        ok:true,
        msg:'actualizarHospitales'
    })
}

const borrarHospital = ( req , res = response ) => {
    res.json({
        ok:true,
        msg:'crearHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}