const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async(req, res = response) => {

    const {id_token} = req.body;

    try {

        const {nombre, img, correo} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':Pp',
                img,
                google : true
            };

            usuario = new Usuario (data);
            await usuario.save();
        }

        if (!usuario.estado) {

            return res.status(401).json({
                msg: 'usuario inactivo'
            })
            
        }

        const token = await generarJWT(usuario.id);

        
        res.json({
            usuario,
            token
        })
    
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'el token no se pudo verificar',
            error
        })
    }
}

    module.exports = {
    login,
    googleSignIn
}