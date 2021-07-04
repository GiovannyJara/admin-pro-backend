const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {
    /* on payload can save all type of information  */
        const payload = {
            uid
        };

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn:'12h'
        },  ( err, token ) => {

            if(err){
                consolel.log(err);
                reject(error);
            }else{
                resolve(token);
            }

        } );
    
    } );

}

module.exports = {
    generateJWT
}