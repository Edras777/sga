const { Schema, model } = require("mongoose");

const DocenteSchema = Schema(
  {
    nombres: {
      type: String,
      required: [true, "Los nombres son obligatorios"],
    },
    apellidos: {
      type: String,
      required: [true, "Los apellidos son obligatorios"],
    },
    CUI: {
      type: String,
      required: [true, "El CUI es obligatorio"],
    },
    correo: {
      type: String,
      unique: true,
    },
    celular: {
      type: String,
    },
    fecha_nacimiento: {
      type: Date,
    },
    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "RETIRADO"],
      default: "ACTIVO",
      required: [true, "El estado es obligatorio"],
    },
  },
  { collection: "docente", timestamps: true, versionKey: false }
);

module.exports = model("Docente", DocenteSchema);
