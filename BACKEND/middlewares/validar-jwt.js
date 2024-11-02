const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {
  // Leer el token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req._id = _id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

const validarADMIN_ROLE = async (req, res, next) => {
  const _id = req._id;
  try {
    const usuarioDB = await Usuario.findById(_id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No encontrado el usuario",
      });
    }

    if (usuarioDB.rol !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios de administrador",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const varlidarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
  const _id = req._id;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(_id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    if (usuarioDB.rol === "ADMIN_ROLE" || _id === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para hacer eso",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  validarJWT,
  validarADMIN_ROLE,
  varlidarADMIN_ROLE_o_MismoUsuario,
};
