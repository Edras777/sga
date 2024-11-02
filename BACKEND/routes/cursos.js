/*
    Ruta: /api/secciones
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT, validarADMIN_ROLE } = require("../middlewares/validar-jwt");
const {
  getCursos,
  getCurso,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
  getCursosByGrado,
} = require("../controllers/cursos");

const router = Router();

router.get("/", [validarJWT], getCursos);

router.get("/:id", [validarJWT], getCurso);

router.get("/grado/:id", [validarJWT], getCursosByGrado);

router.post(
  "/",
  [
    [validarJWT, validarADMIN_ROLE],
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCurso
);

router.put(
  "/:id",
  [
    [validarJWT, validarADMIN_ROLE],
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCurso
);

router.delete(
  "/:id",
  [
    [validarJWT, validarADMIN_ROLE],
    check("id", "El id es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  eliminarCurso
);

module.exports = router;
