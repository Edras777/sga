const { Schema, model } = require("mongoose");

const CursoSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    descripcion: {
      type: String,
    },
    grado: {
      type: Schema.Types.ObjectId,
      ref: "Grado",
      required: true,
      required: [true, "El grado es obligatorio"],
    },
    seccion: {
      type: Schema.Types.ObjectId,
      ref: "Seccion",
      required: true,
      required: [true, "La seccion es obligatorio"],
    },
    docente: {
      type: Schema.Types.ObjectId,
      ref: "Docente",
      required: true,
      required: [true, "EL docente es obligatorio"],
    },
  },
  { collection: "curso", timestamps: true, versionKey: false }
);

module.exports = model("curso", CursoSchema);
