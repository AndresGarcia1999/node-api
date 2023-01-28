const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('correo','el correo no es valido').isEmail(),
    check('password','la contraseña es oblgatoria').notEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','el id token de google es neceario').notEmpty(),
    validarCampos
], googleSignIn);
module.exports = router;