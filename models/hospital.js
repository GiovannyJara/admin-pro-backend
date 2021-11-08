const {Schema, model} = require("mongoose");

const HospitalSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,  /*relacion del esquema HospitalSchema con el esquema usuario */
        ref:'usuario'
    }
}, { collecion: 'hospitales' } );

HospitalSchema.method('toJSON', function ( ) {
    const { __v, ...object } = this.toObject();  // extraer de ese objeto
    return object;
} )

module.exports = model('Hospital',HospitalSchema);