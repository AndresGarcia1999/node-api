const { request,response } = require("express")


const esAdmin = (req = request, res = response, next ) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg : 'no se ha verfificado token'
        })
    }

    const {role, nombre} = req.usuario;

    if (role !== 'ADMIN_ROLE') {

        return res.status(401).json({
            msg : `${nombre} no es admin`
        });
        
    }

    next();
}

const tieneRol = (...roles) => {

    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg : 'no se ha verfificado token'
            })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg : `${req.usuario.nombre} no esta en los roles`
            })
        }
        next ()
    }
}

module.exports = {
    esAdmin,
    tieneRol
}