const { dbConnection } = require("./database/config");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas

app.use(express.static(path.join(__dirname, "../FRONTEND/build")));

// app.get('/', function(req, res){
//     res.redirect('/index.html');
// });

app.use("/api/login", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/grados", require("./routes/grados"));
app.use("/api/secciones", require("./routes/secciones"));
app.use("/api/cursos", require("./routes/cursos"));
app.use("/api/tipos_activo", require("./routes/tipos_activo"));
app.use("/api/activos", require("./routes/activos"));
app.use("/api/inmobiliarios", require("./routes/inmobiliarios"));
app.use("/api/docentes", require("./routes/docentes"));
app.use("/api/estudiantes", require("./routes/estudiantes"));
app.use("/api/pagos", require("./routes/pagos"));
app.use("/api/libros", require("./routes/libros"));
app.use("/api/prestamo_libros", require("./routes/prestamo_libros"));
app.use("/api/laboratorios", require("./routes/laboratorios"));
app.use("/api/reportes", require("./routes/reportes"));

// Configura una ruta comodín para que todas las rutas usen el archivo `index.html`
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FRONTEND/build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
