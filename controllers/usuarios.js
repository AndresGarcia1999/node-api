
const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response  ) => {

    const {limite = 5, desde = 0} = req.query;
    const condiciones = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(condiciones),
        Usuario.find(condiciones)
          .skip(Number(desde))
          .limit(Number(limite))
    ]);
      res.json({
          total,
          usuarios
      });
  }

const usuariosPost = async(req, res = response  ) => {

    

  
    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario({nombre,correo,password,role});
    
    //encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();
    res.json({
        //ok: true,
        //msg : 'peticion post - controller',
        usuario
    });
  }

const usuariosPut = async(req, res = response  ) => {

    const id = req.params.id;
    const {_id,password, google,correo, ...aActualizar} = req.body;

    if ( password){
          //encriptar pass
        const salt = bcryptjs.genSaltSync();
        aActualizar.password = bcryptjs.hashSync(password,salt);
      }

    const usuario = await Usuario.findByIdAndUpdate(id,aActualizar,{new: true});
    res.json({
        ok: true,
        //msg : 'peticion put - controller',
        usuario
    });
  }

const usuariosDelete = async(req, res = response  ) => {

    const {id} = req.params;

    //fisico
    //const usuario = await Usuario.findByIdAndDelete(id)
    
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false},{new: true});
    
    res.json(
      usuario
    );
  }


  module.exports = {

        usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete
  }