const { response, json } = require('express');
const Usuario = require('../models/usuario');
const  bcrypt  = require('bcryptjs');
const generateJWT = require ('./../helpers/jwt');
const usuario = require('../models/usuario');

const eliminarUsuario = async(req, res=response) => {

    try {

        const uid = req.params.id;
        console.log("voy a eliminar este id = ",uid);

        const existeId = await Usuario.findById(uid);
        console.log("existeId = ",existeId);


        if ( !existeId ) {
            console.log("enter");
            return res.status(404).json({
                ok:false,
                msg:'No se ha encontrado un usuariop por ese id'
            });
          }
        
        await Usuario.findOneAndDelete( uid );

          res.json({
            ok:true,
            mdg:`${uid} ha sido eliminado`
        })

        
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }



}

const getUsuarios = async (req,res)=> {

    const usuarios = await Usuario.find({});

    res.json({
        ok:true,
        usuarios,
        uid:req.uid /* this value comes from middleware */
    })

};

const crearUsuarios = async(req,res = response)=> {

    console.log("req.body ",req.body);

    const { email, password} = req.body;


    try {

        const exitsEmail = await Usuario.findOne({ email });
        console.log("exitsEmail ",exitsEmail);

        if(exitsEmail){
            return res.status(400).json({
                ok:false,
                msg: ' El correo ya está en uso '
            });
        }

        const usuario = new Usuario(req.body);

        //Enriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        
        //Guardara usuario en base de datos
        await usuario.save();
        console.log("us",usuario);
        /* generate jwt */
        
        const myNewJWT = await generateJWT.generateJWT(usuario.id);


        res.json({
            ok:true,
            msg:'post Usuarios',
            usuario,
            token:myNewJWT
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }

};


const actuaizarUsuario = async ( req, res = response ) => {
    
    // TODO Validar token y comprobar si es el usuario correcto

    const uid = req.params.id

    console.log("my id for put", uid);


    try {

        const usuarioDB = await Usuario.findById( uid );
        console.log("usuarioDB", usuarioDB);

        if ( !usuarioDB ) {
            console.log("enter");
            return res.status(404).json({
                ok:false,
                msg:'No se ha encontrado un usuariop por ese id'
            });
          }

            /* optimized */
                // actualizaciones
                const {password,google,email, ...campos} = req.body;
                if ( usuarioDB.email !== email ) {
                    const existeEmail = await Usuario.findOne ({ email  });
                    if (existeEmail) {
                        return res.status(400).json({
                            ok:false,
                            msg:'Ya existe un usuario con ese email'
                        })
                    }
                }
                campos.email=email;
               // set parameter {new:true} makes that the response return the user already updated.
                const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new:true } );
            /* End optimized */

            /* Don't optimized */
            //// actualizaciones
            //     const campos = req.body;
            //     if ( usuarioDB.email === req.body.email ) {
            //         delete campos.email;
            //     } else {
            //         const existeEmail = await Usuario.findOne ({ email: req.body.email  });
            //         if (existeEmail) {
            //             return res.status(400).json({
            //                 ok:false,
            //                 msg:'Ya existe un usuario con ese email'
            //             })
            //         }
            //     }
            //     // fields that shouldn't updated
            //     delete campos.password;
            //     delete campos.google;
            //    // set parameter {new:true} makes that the response return the user already updated.
            //     const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new:true } );
            /* End Don't optimized */


        /* generate JWT */

        const token = await generateJWT.generateJWT(usuarioDB.id);
    
        res.json({
            ok:true,
            usuario:usuarioActualizado,
            token:token
        })

    } catch (error) {
        console.log("...error = ",error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }

}


module.exports={
    getUsuarios,
    crearUsuarios,
    actuaizarUsuario,
    eliminarUsuario
}