    /*
      Ruta: /api/usuarios
    */

const { Router } = require('express');
const { getUsuarios, crearUsuarios, actuaizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { check } =  require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/',
  validarJWT,
  getUsuarios );

router.post(
  '/',
  [
    check('nombre',    'El nombre es requerido').not().isEmpty(),
    check('password',  'El password es requerido').not().isEmpty(),
    check('email',     'El email es requerido').isEmail(),
    validarCampos
  ],
  crearUsuarios  //middleware personalizado , siempre se debe llamar al final de los checks
  );

  router.put(
    '/:id',
    [
      validarJWT,
      check('nombre', 'El nombre es requerido').not().isEmpty(),
      check('email',  'El email es requerido').isEmail(),
      check('role',   'El role es requerido').not().isEmpty(),
      validarCampos
    ],
    actuaizarUsuario 
    );

  router.delete(
    '/:id',
    validarJWT,
    eliminarUsuario 
    );

module.exports = router;