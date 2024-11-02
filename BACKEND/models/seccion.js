const { Schema, model } = require("mongoose");

const SeccionSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
    },
    grado: {
      type: Schema.Types.Array,
      ref: "Grado",
      required: true,
      required: [true, "El grado es obligatorio"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "seccion", timestamps: true, versionKey: false }
);

module.exports = model("Seccion", SeccionSchema);
