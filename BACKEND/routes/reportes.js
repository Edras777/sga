/*
    Ruta: /api/reportes/ebr || /api/reportes/ceba || /api/reportes/residencia
*/

const { Router } = require("express");

const { reportes } = require("../controllers/reportes");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, reportes);

module.exports = router;
