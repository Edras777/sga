const { Schema, model } = require("mongoose");

const EstudianteSchema = Schema(
  {
    apellidos: {
      type: String,
      required: [true, "Los apellidos son obligatorios"],
    },
    nombres: {
      type: String,
      required: [true, "Los nombres son obligatorios"],
    },
    CUI: {
      type: String,
      required: [true, "El CUI es obligatorio"],
    },
    grado: {
      type: Schema.Types.ObjectId,
      ref: "Grado",
      required: true,
    },
    seccion: {
      type: Schema.Types.ObjectId,
      ref: "Seccion",
      required: true,
    },
    sexo: {
      type: String,
      emun: ["M", "F"],
      default: "M",
      required: [true, "El sexo es obligatorio"],
    },
    correo: {
      type: String,
    },
    celular: {
      type: String,
    },
    domicilio: {
      type: String,
    },
    fecha_nacimiento: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    nombre_padres: {
      type: String,
      required: [true, "Los nombres de los padres es obligatorio"],
    },
    celular_padres: {
      type: String,
      required: [true, "El celular de los padres es obligatorio"],
    },
    correo_padres: {
      type: String,
    },
    colegio_procedencia: {
      type: String,
    },
    observaciones: {
      type: String,
    },
    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "RETIRADO"],
      default: "ACTIVO",
      required: [true, "El estado es obligatorio"],
    },
  },
  { collection: "estudiante", timestamps: true, versionKey: false }
);

module.exports = model("Estudiante", EstudianteSchema);
