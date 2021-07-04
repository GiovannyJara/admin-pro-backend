const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    /* read token */

    const token = req.header('x-token');

    console.log(token);

    if( !token ) {
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        console.log(uid);

        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        })
    }

    next();

}

module.exports = {
    validarJWT
}