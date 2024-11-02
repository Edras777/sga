const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Construimos un string con los mensajes de error
    const errorMessages = errors
      .array()
      .map((err) => `${err.param}: ${err.msg}`)
      .join(", ");

    console.log(errorMessages);
    return res.status(400).json({
      ok: false,
      msg: errorMessages.toString(),
    });
  }
  next();
};

module.exports = {
  validarCampos,
};
