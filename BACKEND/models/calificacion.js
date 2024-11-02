const { Schema, model } = require("mongoose");

const CalificacionSchema = Schema(
  {
    codigo: {
      type: String,
      required: [true, "EL codigo es obligarorio"],
    },
    estudiante: {
      type: Schema.Types.ObjectId,
      ref: "Estudiante",
      required: [true, "El estudiante es obligatorio"],
    },
    ciclo: {
      type: String,
      required: [true, "El año es obligatorio"],
    },
    curso: {
      type: Schema.Types.ObjectId,
      ref: "curso",
      required: [true, "El curso es obligatorio"],
    },
    primer_bimestre: {
      type: String,
    },
    segundo_bimestre: {
      type: String,
    },
    tercer_bimestre: {
      type: String,
    },
    cuarto_bimestre: {
      type: String,
    },
    quinto_bimestre: {
      type: String,
    },
    promedio: {
      type: String,
    },
  },
  { collection: "calificacion", timestamps: true, versionKey: false }
);

module.exports = model("Calificacion", CalificacionSchema);
