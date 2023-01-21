
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido =  async(role = '') =>{
    const existeRole = await Role.findOne({role});

    if (!existeRole){
        throw new Error(`El role ${role} no es válido.`)
    }
}

const correoExiste = async(correo ='') =>{

    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail){
      throw new Error('Ese correo ya está registrado')
      
    }
}

const existeUsuarioPorId = async(id ='') =>{

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
      throw new Error('Este usuario no existe')
      
    }
}


module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId
}