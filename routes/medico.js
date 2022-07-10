/*
Hospitales
ruta: /api/medicos
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('./../controllers/medicos')

const router = Router();

router.get('/',getMedicos );

/* El id del USUARIO Ya viene desde JWT */
router.post(
  '/',
  [
      validarJWT,
      check('nombre', 'Debe indicar el nombre del medico').not().isEmpty(),
      check('hospital', 'El hospital id debe de ser válido').isMongoId(),
      validarCampos
  ],
  crearMedico  //middleware personalizado , siempre se debe llamar al final de los checks
  );

router.put( '/:id',
    [
      validarJWT,
      check('nombre', 'Debe indicar el  nombre del medico').not().isEmpty()
    ],
    actualizarMedico 
   );

router.delete(
   '/:id',
   borrarMedico
   );

module.exports = router;
