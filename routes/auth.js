const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('correo','el correo no es valido').isEmail(),
    check('password','la contraseña es oblgatoria').notEmpty(),
    validarCampos
], login);

module.exports = router;