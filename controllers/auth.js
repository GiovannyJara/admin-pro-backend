
const { response } =require('express');
const Usuario = require('../models/usuario');
const  bcrypt  = require('bcryptjs');
const generateJWT = require('./../helpers/jwt');

const login = async (req, res =response) =>{

    /* extract email, password */
    const {email,password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }

        console.log('usuarioDB.password = ',usuarioDB.password);
        /*verify password*/
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if ( !validPassword)  {
            return res.status(404).json({
                ok:false,
                msg:'Invalid Password'
            })
        }

        /* Generate TOKEN !  JWT*/

        const token = await generateJWT.generateJWT(usuarioDB.id);
        
        res.json({
            ok:true,
            msg:`I deliver your token ${token}`
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Talk with admin!'
        })
        
    }

}

module.exports = {
    login
}