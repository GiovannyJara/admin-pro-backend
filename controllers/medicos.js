const { response } = require("express");
const medico = require("../models/medico");


const getMedicos = async ( req, res = response ) => {

    const medicos = await medico.find({})
                    .populate('usuario','nombre')
                    .populate('hospital','nombre')

    try {
        res.json({
            ok:true,
            medicos,
            uidUsuario: req.uidUsuario,
            idHospital: req.idHospital
        })
    } catch (error) {
        res.json({
            ok:false,
            msg:error
        })
    }


}

const crearMedico = async ( req, res = response ) => {

    console.log("ddddddddddddd", medico);

    const uid = req.uid;
    const newMedico = new medico ( {
        usuario: uid,
        ...req.body
    } )

    try {
        
       const medicoBD = await new medico ( newMedico ).save();
       

        res.json({
            ok:true,
            medicoBD,
            msg:"crearMedicos"
        })
    } catch (error) {
        res.json({
            ok:false,
            msg:error
        })
    }

}

const actualizarMedico = async ( req, res = response ) => {
    const uid = req.uid;
    const id = req.params.id;

    try {

        const medicoBuscar = await medico.findById( id );
    
        if (!medicoBuscar) {
            return res.status(404).json( {
                ok:false,
                msg:"Medico no encotrado con el id"
            } )
        }
    
        const cambiarMedico = {
            ...req.body,
            usuario:uid
        }
    
        const medicoActualizado = await medico.findByIdAndUpdate( id , cambiarMedico, { new:true } );  
    
        res.json({
            ok:true,
            msg:"Medico actualizado",
            medicoActualizado
        })
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json( { 
            ok:false,
            msg: 'Hable con el administrador'
         } )
    }


}

const borrarMedico = async ( req, res = response ) => {

    const id = req.params.id;

    try {
     const medicoBuscar = await medico.findById( id );

     if( !medicoBuscar ){
         return res.status(404).json( {
             ok:true,
             msg:"Médico no encontrado por el id"
         } )
     }

     await medico.findByIdAndDelete(id);
        
        res.json( {
            ok:true,
            msg:"Medico Borrado",
        } )

    } catch (error) {

        console.log(error);
        res.status(500).json( { 
            ok:false,
            msg: 'Hable con el administrador'
         } )

    }

    res.json({
        ok:true,
        msg:"borrarMedicos"
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}