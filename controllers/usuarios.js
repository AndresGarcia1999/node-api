
const {response} = require('express')

const usuariosGet = (req, res = response  ) => {

    const query = req.query;
    res.json({
        ok: true,
        msg : 'peticion get - controller',
        query
    });
  }

const usuariosPost = (req, res = response  ) => {

  
    const body = req.body;
    res.json({
        ok: true,
        msg : 'peticion post - controller',
        body,
    });
  }

const usuariosPut = (req, res = response  ) => {

    const id = req.params.id
    res.json({
        ok: true,
        msg : 'peticion put - controller',
        id
    });
  }

const usuariosDelete = (req, res = response  ) => {
    res.json({
        ok: true,
        msg : 'peticion delete - controller'
    });
  }


  module.exports = {

        usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete
  }