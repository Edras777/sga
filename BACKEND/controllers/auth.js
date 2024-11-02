const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {
  try {
    const { correo, password } = req.body;

    const usuarioDB = await Usuario.findOne({ correo });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Verificar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales incorrectas",
      });
    }

    // Generar el TOKEN - JWT
    const token = await generarJWT(usuarioDB._id);

    res.json({
      ok: true,
      msg: "login",
      usuario: {
        _id: usuarioDB._id,
        nombre: usuarioDB.nombre,
        correo: usuarioDB.correo,
        rol: usuarioDB.rol,
      },
      menu: getMenuFrontEnd(usuarioDB.rol),
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res = response) => {
  const _id = req._id;

  // Generar el TOKEN - JWT
  const token = await generarJWT(_id);

  // Obtener el usuario por id
  const usuario = await Usuario.findById(_id);

  res.json({
    ok: true,
    token,
    usuario,
    menu: getMenuFrontEnd(usuario.role),
  });
};

module.exports = {
  login,
  renewToken,
};
