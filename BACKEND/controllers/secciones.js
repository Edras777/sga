const { response } = require("express");
const Seccion = require("../models/seccion");

const getSecciones = async (req, res = response) => {
  try {
    let secciones = await Seccion.find().populate("grado", "nombre _id");

    secciones = secciones.map((seccion) => ({
      ...seccion.toObject(),
      grado: seccion?.grado[0]?.nombre,
      idGrado: seccion?.grado[0]?._id,
    }));

    res.json(secciones);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getSeccion = async (req, res = response) => {
  try {
    let seccion = await Seccion.findById(req.params.id).populate(
      "grado",
      "nombre _id"
    );

    seccion = {
      ...seccion.toObject(),
      grado: seccion?.grado[0]?.nombre,
      idGrado: seccion?.grado[0]?._id,
    };
    res.json(seccion);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getSeccionesXGrado = async (req, res = response) => {
  try {
    let secciones = await Seccion.find({ grado: req.params.id });
    console.log(secciones);
    res.json(secciones);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearSeccion = async (req, res = response) => {
  try {
    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion.toUpperCase();
    const grado = req.body.grado;

    const seccionDB = await Seccion.findOne({ nombre });
    if (seccionDB) {
      return res.status(400).json({
        ok: false,
        msg: "La seccion ya existe",
      });
    }

    const data = {
      nombre,
      descripcion,
      grado,
    };

    let seccion = new Seccion(data);

    await seccion.save().populate("grado", "nombre _id");

    seccion = {
      ...seccion.toObject(),
      grado: seccion?.grado[0]?.nombre,
      idGrado: seccion?.grado[0]?._id,
    };

    res.status(201).json(seccion);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarSeccion = async (req, res = response) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevaSeccion = {
      ...req.body,
      nombre: nombre.toUpperCase(),
      descripcion: descripcion.toUpperCase(),
    };

    let seccionActualizado = await Seccion.findByIdAndUpdate(
      req.params.id,
      nuevaSeccion,
      { new: true }
    ).populate("grado", "nombre _id");

    seccionActualizado = {
      ...seccionActualizado.toObject(),
      grado: seccionActualizado?.grado[0]?.nombre,
      idGrado: seccionActualizado?.grado[0]?._id,
    };

    res.json(seccionActualizado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarSeccion = async (req, res = response) => {
  try {
    const seccionDB = await Seccion.findById(req.params.id);

    if (!seccionDB) {
      return res.status(400).json({
        ok: false,
        msg: "La seccion seleccionada, no existe",
      });
    }

    const { id } = req.params;
    const seccion = await Seccion.findByIdAndDelete(id);
    res.json(seccion);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getSecciones,
  getSeccionesXGrado,
  getSeccion,
  crearSeccion,
  actualizarSeccion,
  eliminarSeccion,
};
