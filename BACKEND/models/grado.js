const { Schema, model } = require("mongoose");

const GradoSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    docente: {
      type: Schema.Types.Array,
      ref: "Docente",
      required: [true, "El docente es obligatorio"],
    },
    descripcion: {
      type: String,
    },
    nivel: {
      type: String,
      required: [true, "El grado es obligatorio"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "grado", timestamps: true, versionKey: false }
);

module.exports = model("Grado", GradoSchema);
