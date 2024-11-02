const { response } = require("express");
const EstudianteUniforme = require("../models/estudiante_uniforme");

const getEstudiantesUniforme = async (req, res = response) => {
  try {
    const estudiantes_uniforme = await EstudianteUniforme.find().populate([
      "estudiante",
      "uniforme",
    ]);

    res.json(estudiantes_uniforme);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getEstudianteUniforme = async (req, res = response) => {
  try {
    const estudiante_uniforme = await EstudianteUniforme.findById(
      req.params.id
    ).populate(["estudiante", "uniforme"]);

    if (!estudiante_uniforme) {
      return res.status(404).json({
        ok: false,
        msg: "Registro de estudiante_uniforme no encontrado",
      });
    }

    res.json(estudiante_uniforme);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const registrarEstudianteUniforme = async (req, res = response) => {
  try {
    const {
      codigo,
      estudiante,
      uniforme,
      descripcion,
      monto_pagado,
      metodo_pago,
      estado,
      fecha_estudiante,
      observaciones,
    } = req.body;

    const estudiante_uniformeDB = await EstudianteUniforme.findOne({ codigo });

    if (estudiante_uniformeDB) {
      return res.status(400).json({
        ok: false,
        msg: "El registro de estudiante_uniformeDB ya existe",
      });
    }

    const data = {
      codigo,
      estudiante,
      uniforme,
      descripcion,
      monto_pagado,
      metodo_pago,
      estado,
      fecha_estudiante,
      observaciones,
    };

    const estudiante_uniforme = new EstudianteUniforme(data);

    await estudiante_uniforme.save();

    const estudiantes_uniforme = await estudiante_uniforme.populate([
      "estudiante",
      "uniforme",
    ]);

    res.json(estudiantes_uniforme);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarEstudianteUniforme = async (req, res = response) => {
  try {
    const { id } = req.params;

    const estudiante_uniforme = await EstudianteUniforme.findByIdAndDelete(id);

    res.json(estudiante_uniforme);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEstudiantesUniforme,
  getEstudianteUniforme,
  registrarEstudianteUniforme,
  eliminarEstudianteUniforme,
};
