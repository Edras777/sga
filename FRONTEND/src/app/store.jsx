import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import categoriaReducer from '../features/categoriaSlice';
import fraseReducer from '../features/fraseSlice';
import personaReducer from '../features/personaSlice';
import libroReducer from '../features/libroSlice';
import gradoReducer from '../features/gradoSlice';
import seccionReducer from '../features/seccionSlice';
import cursoReducer from '../features/cursoSlice';
import uniformeReducer from '../features/uniformeSlice';
import categoriaUniformeReducer from '../features/categoriaUniformeSlice';
import inmobiliarioReducer from '../features/inmobiliarioSlice';
import activoReducer from '../features/activoSlice';
import tipoActivoReducer from '../features/tipoActivoSlice';
import estudianteReducer from '../features/estudianteSlice';
import docenteReducer from '../features/docenteSlice';
import prestamoLibroReducer from '../features/prestamo_libroSlice';
import mapaReducer from '../features/mapaSlice';
import laboratorioReducer from '../features/laboratorioSlice';
import venta_uniformeReducer from '../features/venta_uniformeSlice';
import prestamoMapaReducer from '../features/prestamo_mapaSlice';
import pagoReducer from '../features/pagoSlice';
import reporteReducer from '../features/reporteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categorias: categoriaReducer,
    frases: fraseReducer,
    personas: personaReducer,
    libros: libroReducer,
    grados: gradoReducer,
    secciones: seccionReducer,
    cursos: cursoReducer,
    uniformes: uniformeReducer,
    categoria_uniformes: categoriaUniformeReducer,
    inmobiliarios: inmobiliarioReducer,
    activos: activoReducer,
    tipo_activos: tipoActivoReducer,
    estudiantes: estudianteReducer,
    pagos: pagoReducer,
    docentes: docenteReducer,
    prestamo_libros: prestamoLibroReducer,
    mapas: mapaReducer,
    laboratorios: laboratorioReducer,
    ventas_uniforme: venta_uniformeReducer,
    prestamo_mapas: prestamoMapaReducer,
    reportes: reporteReducer,
  },
});
