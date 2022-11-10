const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JuegosSchema = new Schema({
    id_juego: {type: String, required: true, max:60},
    nombre: {type: String, required: true, max:60},
    descripcion: {type: String, required: true, max:300},
    precio: {type: Number, required: true, max:60},
    categoria: {type: String, required: true, max:60}
});

module.exports = mongoose.model("juegos", JuegosSchema);