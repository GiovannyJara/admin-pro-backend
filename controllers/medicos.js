const { response } = require("express")
const medico = require("../models/medico")

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

const actualizarMedico = ( req, res = response ) => {
    res.json({
        ok:true,
        msg:"actualizarMedicos"
    })
}

const borrarMedico = ( req, res = response ) => {
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