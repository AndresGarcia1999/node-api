const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require('../models/usuario');

const login = async(req,res = response) => {

    const {correo,password} = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg : "el usuario no existe"
            })
        }

        //verficar si el usuario está activo

        if (!usuario.estado) {
            return res.status(400).json({
                msg : "el usuario no está activo"
            })
        }
        //verificar contraseña
        const validPassword = bcryptjs.compareSync (password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg : "password incorrecto"
            })
        }
        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : "Ups algo salió mal"
        })
    }

   

}

module.exports = {
    login
}