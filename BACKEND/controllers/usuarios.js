const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const getUsuarios = async (req, res = response) => {
  try {
    const [users, total] = await Promise.all([
      Usuario.find({}, "nombre correo rol estado"),
      Usuario.countDocuments(),
    ]);

    const usuarios = users;

    res.json({
      ok: true,
      usuarios,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuarioFind = await Usuario.findById(id);

    const { password, ...usuario } = usuarioFind.toObject();

    if (!usuario) {
      res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearUsuario = async (req, res = response) => {
  const { correo, password, nombre, rol } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const data = {
      nombre,
      correo,
      password,
      rol,
    };

    const usuario = new Usuario(data);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    const usuarioGuardado = await usuario.save();

    console.log("usuarioGuardado", usuarioGuardado);

    const { password: pass, ...usuarioData } = usuarioGuardado.toObject();

    console.log("usuarioData", usuarioData);
    //Generar JWT
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      usuario: usuarioData,
      menu: getMenuFrontEnd(usuarioData.rol),
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

function comparePassword(password, usuarioDB) {
  return bcrypt.compareSync(password, usuarioDB);
}

const actualizarUsuario = async (req, res = response) => {
  const _id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(_id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    // Actualizaciones
    const { password, correo, ...campos } = req.body;

    if (usuarioDB.correo !== correo) {
      const existeEmail = await Usuario.findOne({ correo });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese correo",
        });
      }

      campos.correo = correo;
    }

    if (password !== undefined) {
      if (comparePassword(password, usuarioDB.password) === false) {
        if (usuarioDB.password !== password) {
          const salt = bcrypt.genSaltSync();
          campos.password = bcrypt.hashSync(password, salt);
        } else {
          campos.password = password;
        }
      }
    } else {
      campos.password = usuarioDB.password;
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(_id, campos, {
      new: true,
    });

    const { password: pass, ...usuario } = usuarioActualizado.toObject();

    console.log("usuario", usuario);

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarUsuario = async (req, res = response) => {
  const _id = req.params.id;

  console.log("id para eliminar", _id);

  try {
    const usuarioDB = await Usuario.findById(_id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    const usuarioEliminado = await Usuario.findByIdAndDelete(_id);

    const { password, ...usuario } = usuarioEliminado.toObject();

    res.json({
      ok: true,
      msg: "Usuario eliminado",
      usuario: usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getUsuarios,
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
