const { request } = require('express')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next ) => {

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({
            msg : 'no se envio token'
        }) 
        
    }

    try {
        
        const {uid} =jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(uid);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg : 'el usuario no existe'
            }) 
        }

        //verificar que el usuario esté activo
        if(!usuario.estado) {
            return res.status(401).json({
                msg : 'el usuario no está activo'
            }) 
        }
        
        req.usuario = usuario;

        next();
    } catch (error) {
        //console.log(error);
        res.status(401).json({
            msg : 'token no valido',
            error
        })
    }

    //console.log(token);

    
}

module.exports = { validarJWT}