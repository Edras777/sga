const { response } = require("express");

const Estudiante = require("../models/estudiante");
const Calificacion = require("../models/calificacion");

const getEstudiantes = async (req, res = response) => {
  try {
    const estudiantes = await Estudiante.find()
      .populate("grado", "nombre descripcion estado createdAt updatedAt")
      .populate("seccion", "nombre descripcion estado createdAt updatedAt");

    res.json(estudiantes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getEstudiante = async (req, res = response) => {
  try {
    console.log("entraraaaaa", req.params.id);
    const estudiante = await Estudiante.findById(req.params.id)
      .populate("grado", "nombre descripcion estado createdAt updatedAt")
      .populate("seccion", "nombre descripcion estado createdAt updatedAt");

    if (!estudiante) {
      return res.status(404).json({
        ok: false,
        msg: "Estudiante no encontrado",
      });
    }

    res.json(estudiante);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getCalificacionByEstuidiante = async (req, res = response) => {
  try {
    console.log("entraraaaaa", req.params.id);
    const calificaciones = await Calificacion.find({
      estudiante: req.params.id,
    }).populate("curso", "_id nombre");

    res.json(calificaciones);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const registrarEstudiante = async (req, res = response) => {
  try {
    const {
      nombres,
      apellidos,
      CUI,
      sexo,
      correo,
      celular,
      domicilio,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      seccion,
      observaciones,
      estado,
    } = req.body;

    const estudianteDB = await Estudiante.findOne({ CUI });

    if (estudianteDB) {
      return res.status(400).json({
        ok: false,
        msg: "El estudiante con ese CUI ya existe",
      });
    }

    const data = {
      nombres,
      apellidos,
      CUI,
      sexo,
      correo,
      celular,
      domicilio,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      seccion,
      observaciones,
      estado,
    };

    console.log(CUI);

    const estudiante = new Estudiante(data);

    await estudiante.save();

    const estudiantes = await Estudiante.find().populate(
      "grado",
      "nombre descripcion estado createdAt updatedAt"
    );

    res.status(201).json(estudiantes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEstudiante = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      CUI,
      sexo,
      correo,
      celular,
      domicilio,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      seccion,
      observaciones,
      estado,
    } = req.body;

    const data = {
      nombres,
      apellidos,
      CUI,
      sexo,
      correo,
      celular,
      domicilio,
      fecha_nacimiento,
      nombre_padres,
      celular_padres,
      correo_padres,
      colegio_procedencia,
      tipo_estudiante,
      grado,
      seccion,
      observaciones,
      estado,
    };

    const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("grado", "nombre descripcion estado createdAt updatedAt")
      .populate("seccion", "nombre descripcion estado createdAt updatedAt");

    res.json(estudianteActualizado);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEstudiante = async (req, res = response) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findByIdAndDelete(id);

    res.json(estudiante);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getEstudianteByCUI = async (req, res = response) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findOne({ CUI: id });

    if (!estudiante) {
      return res.status(404).json({
        ok: false,
        msg: "El estudiante no ha sido encontrado",
      });
    }

    res.json(estudiante);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const registrarCalificacion = async (req, res = response) => {
  try {
    const {
      codigo,
      ciclo,
      curso,
      estudiante,
      primer_bimestre,
      segundo_bimestre,
      tercer_bimestre,
      cuarto_bimestre,
      quinto_bimestre,
      promedio,
    } = req.body;

    const isCursoExistCalificacion = await Calificacion.findOne({ curso });
    const isCursoExistCalificacionCiclo = await Calificacion.findOne({ ciclo });

    if (isCursoExistCalificacion || isCursoExistCalificacionCiclo) {
      return res.status(400).json({
        ok: false,
        msg: "Ya se encuentra una nota con ese curso, en el ciclo",
      });
    }

    const data = {
      codigo,
      ciclo,
      curso,
      estudiante,
      primer_bimestre,
      segundo_bimestre,
      tercer_bimestre,
      cuarto_bimestre,
      quinto_bimestre,
      promedio,
    };

    const calificacion = new Calificacion(data);

    await calificacion.save();

    const calificaciones = await Calificacion.find().populate(
      "curso",
      "_id nombre"
    );

    res.status(201).json(calificaciones);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEstudiantes,
  getEstudiante,
  registrarEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  getEstudianteByCUI,
  getCalificacionByEstuidiante,
  registrarCalificacion,
};
