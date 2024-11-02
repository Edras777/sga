const { response } = require("express");

const Docente = require("../models/docente");

const getDocentes = async (req, res = response) => {
  try {
    const docente = await Docente.find();

    res.json(docente);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getDocente = async (req, res = response) => {
  try {
    const docente = await Docente.findById(req.params.id);

    if (!docente) {
      return res.status(404).json({
        ok: false,
        msg: "Persona no encontrado",
      });
    }

    res.json(docente);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const registrarDocente = async (req, res = response) => {
  try {
    const {
      nombres,
      apellidos,
      CUI,
      correo,
      celular,
      fecha_nacimiento,
      estado,
    } = req.body;

    const docentesDB = await Docente.findOne({ CUI });

    if (docentesDB) {
      return res.status(400).json({
        ok: false,
        msg: "El docente con ese CUI ya existe",
      });
    }

    const data = {
      nombres,
      apellidos,
      CUI,
      correo,
      celular,
      fecha_nacimiento,
      estado,
    };

    const docente = new Docente(data);

    await docente.save();

    res.status(201).json(docente);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarDocente = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      CUI,
      correo,
      celular,
      fecha_nacimiento,
      estado,
    } = req.body;

    const data = {
      nombres,
      apellidos,
      CUI,
      correo,
      celular,
      fecha_nacimiento,
      estado,
    };

    const docenteActualizado = await Docente.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json(docenteActualizado);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarDocente = async (req, res = response) => {
  try {
    const { id } = req.params;

    const docente = await Docente.findByIdAndDelete(id);

    res.json(docente);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const getDocenteByCUI = async (req, res = response) => {
  try {
    const { CUI } = req.params;

    const docente = await Docente.findOne({ CUI });

    if (!docente) {
      return res.status(404).json({
        ok: false,
        msg: "El docente no ha sido encontrado",
      });
    }

    res.json(docente);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getDocentes,
  getDocente,
  registrarDocente,
  actualizarDocente,
  eliminarDocente,
  getDocenteByCUI,
};
