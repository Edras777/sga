/*
    Ruta: /api/secciones
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getSeccion,
  getSecciones,
  crearSeccion,
  actualizarSeccion,
  eliminarSeccion,
  getSeccionesXGrado,
} = require("../controllers/secciones");

const { validarJWT, validarADMIN_ROLE } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [validarJWT], getSecciones);

router.get("/:id", [validarJWT], getSeccion);

router.get("/grado/:id", [validarJWT], getSeccionesXGrado);

router.post(
  "/",
  [
    [validarJWT, validarADMIN_ROLE],
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearSeccion
);

router.put(
  "/:id",
  [
    [validarJWT, validarADMIN_ROLE],
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarSeccion
);

router.delete(
  "/:id",
  [
    [validarJWT, validarADMIN_ROLE],
    check("id", "El id es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  eliminarSeccion
);

module.exports = router;
