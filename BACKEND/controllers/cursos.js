const { response } = require("express");
const Curso = require("../models/curso");

const getCursos = async (req, res = response) => {
  try {
    let cursos = await Curso.find()
      .populate("grado", "nombre _id")
      .populate("seccion", "nombre _id")
      .populate("docente", "nombres _id");

    res.json(cursos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getCursosByGrado = async (req, res = response) => {
  try {
    let cursos = await Curso.find({ grado: req.params.id });

    res.json(cursos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getCurso = async (req, res = response) => {
  try {
    let curso = await Curso.findById(req.params.id)
      .populate("grado", "nombre _id")
      .populate("seccion", "nombre _id")
      .populate("docente", "nombres _id");

    res.json(curso);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearCurso = async (req, res = response) => {
  try {
    const nombre = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion.toUpperCase();
    const grado = req.body.grado;
    const seccion = req.body.seccion;
    const docente = req.body.docente;

    const cursoDB = await Curso.findOne({ nombre });
    if (cursoDB) {
      return res.status(400).json({
        ok: false,
        msg: "El curso ya existe",
      });
    }

    const data = {
      nombre,
      descripcion,
      grado,
      seccion,
      docente,
    };

    let curso = new Curso(data);

    curso = await curso
      .save()
      .populate("grado", "nombre _id")
      .populate("seccion", "nombre _id")
      .populate("docente", "nombres _id");

    res.status(201).json(curso);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarCurso = async (req, res = response) => {
  try {
    const { nombre, descripcion, grado, seccion, docente } = req.body;
    const nuevoCurso = {
      ...req.body,
      nombre: nombre.toUpperCase(),
      descripcion: descripcion.toUpperCase(),
      grado,
      seccion,
      docente,
    };

    let cursoActualizado = await Curso.findByIdAndUpdate(
      req.params.id,
      nuevoCurso,
      { new: true }
    )
      .populate("grado", "nombre _id")
      .populate("seccion", "nombre _id")
      .populate("docente", "nombres _id");

    res.json(cursoActualizado);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarCurso = async (req, res = response) => {
  try {
    const cursoDB = await Curso.findById(req.params.id);

    if (!cursoDB) {
      return res.status(400).json({
        ok: false,
        msg: "El curso seleccionado, no existe",
      });
    }

    const { id } = req.params;
    const curso = await Curso.findByIdAndDelete(id);
    res.json(curso);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getCursos,
  getCurso,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
  getCursosByGrado,
};
