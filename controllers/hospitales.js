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

const actualizarHospital = async ( req , res = response ) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );

        if( !hospital ) {
            return res.status(404).json( { 
                ok: true,
                msg: 'Hospital no encontrado por el id',
             } )
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado =await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );


        res.json({
            ok:true,
            msg:'actualizarHospitales',
            hospital: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json( { 
            ok:false,
            msg: 'Hable con el administrador'
         } )
    }

}

const borrarHospital = async ( req , res = response ) => {

    const id = req.params.id;

    try {
      const hospital =  await Hospital.findById( id);

        if( !hospital ) {
            return res.status(404).json( { 
                ok: true,
                msg: 'Hospital no encontrado por el id',
             } )
        }

      await Hospital.findByIdAndDelete( id );

        res.json( {
            ok: true,
            msg: "Hospital eliminado"
        } )

    } catch (error) {
        console.log(error);
        res.status(500).json( { 
            ok:false,
            msg: 'Hable con el administrador'
         } )
    }


}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}