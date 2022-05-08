
const { response } =require('express');
const Usuario = require('../models/usuario');
const  bcrypt  = require('bcryptjs');
const generateJWT = require('./../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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



const googleSignIn = async (req, res =response) =>{

    const googleToken = req.body.token;

    try {
       const {name,email,picture} = await googleVerify(googleToken);
        
       //valiidar si usario existe
       const usuarioDB = await Usuario.findOne( { email } );

       let usuario;

       if ( !usuarioDB ) {
           usuario = new Usuario( {
                nombre:name,
                email,
                password:'000',
                img:picture,
                google:true
           } )
       } else {
         usuario = usuarioDB;
         usuario.google = true;
       }

       // guardr en DB
       await usuario.save();
        /* Generate TOKEN !  JWT*/

        const token = await generateJWT.generateJWT(usuario.id);
        
       res.json({
            ok:true,
            token
        });
    } catch (error) {
        res.status(401).json( {
            ok:false,
            msg: 'Token no es correcto',
        } );
    }
}



module.exports = {
    login,
    googleSignIn
}