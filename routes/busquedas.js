/*
ruta: api/seek/:giovanny
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/* controller */
const { getAll, getDocumentsCollection } = require('./../controllers/busquedas');

const router = Router ();

router.get( '/:find', validarJWT, getAll )
router.get( '/collection/:table/:find', validarJWT, getDocumentsCollection )




module.exports = router;