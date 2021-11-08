const {Schema, model} = require("mongoose");

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required:true
    },
    img:{
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,  /*relacion del esquema MedicoSchema con el esquema usuario */
        ref:'usuario',
        require:true
    },
    hospital: {
        type: Schema.Types.ObjectId,  /*relacion del esquema MedicoSchema con el esquema Hospital */
        ref:'Hospital',
        require:true
    }
}, { collection: 'medicos' } );

MedicoSchema.method('toJSON', function ( ) {
    const { __v, ...object } = this.toObject();  // extraer de ese objeto
    return object;
} )

module.exports = model('medico',MedicoSchema);