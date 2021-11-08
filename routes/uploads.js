/*
ruta: api/upload/usuario/123:
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');
/* controller */
const { fileUpload, retornarImagen } = require('./../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );  //middleware - nos da la opcion de usar .files dentro de fileUpload

router.put( '/:tipo/:id', validarJWT, fileUpload );
router.get( '/:tipo/:foto', validarJWT, retornarImagen );


module.exports = router;