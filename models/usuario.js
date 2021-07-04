const {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        default:'USER_ROLE'
    },
    google:{
        type: Boolean,
        default:false
    }
});

UsuarioSchema.method('toJSON', function ( ) {
    // this.toObject();  //la instancia del objeto actual (vesto es de mongoose)
    const { __v, _id, password, ...object } = this.toObject();  // extraer de ese objeto
    object.uid = _id;
    return object;
} )

module.exports = model('usuario',UsuarioSchema);