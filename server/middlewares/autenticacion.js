const jwt = require('jsonwebtoken');
// =======================
//  VERIFICAR TOKEN
// =======================
let verificaToken = (req, res, next) => {
    let token = req.get('token'); // Authorization o nombre de la variable que se envíe en el header
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    })

};

// =======================
//  VERIFICAR ADMIN_ROLE
// =======================

let verificaAdmin_role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    next();
};

module.exports = {
    verificaToken,
    verificaAdmin_role
}