const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "Los nombres y apellidos son obligatorios"],
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    rol: {
      type: String,
      required: true,
      emun: ["ADMIN_ROLE", "USER_ROLE"],
      default: "USER_ROLE",
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "usuario", timestamps: true, versionKey: false }
);

module.exports = model("Usuario", UsuarioSchema);
