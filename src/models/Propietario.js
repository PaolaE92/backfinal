ceronst mongoose = require("mongoose");
let Schema = mongoose.Schema;

let propietarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cedula: { type: String, required: true, unique: true },
  apto: { type: Number, required: true, unique: true },
  Observaciones: { type: String },
 fecha_act: { type: Date, default: Date.now },
},
{
  collection :"propietarios",

}
);

module.exports = mongoose.Model("Propietario", propietarioSchema);