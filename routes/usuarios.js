
const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido,correoExiste,existeUsuarioPorId } = require('../helpers/db-validators');

const {validarCampos,validarJWT,esAdmin,tieneRol} = require('../middlewares')


const router = Router();

router.get('/',usuariosGet)

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
]
,usuariosPut)

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password debe tener más de 6 letras').isLength({min : 6}),
    check('correo','el correo no es válido').isEmail(),
    check('correo').custom(correoExiste),
    // check('role','el role no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPost)
  
router.delete('/:id',[
    validarJWT,
    //esAdmin,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
]
,usuariosDelete)


module.exports = router;