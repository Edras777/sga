import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomeContent from '../pages/home';
import SettingsPage from '../pages/settings';
import PersonasPage from '../pages/personas';
import LoginPage from '../pages/auth/Login';
import NotFoundPage from '../pages/404/NotFoundPage';
import RegisterPage from '../pages/auth/Register';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import LibrosPage from '../pages/libros';
import GradosPage from '../pages/grados';
import CarpetasPage from '../pages/carpetas';
import {
  ActivosPage,
  AgregarActivoPage,
  DetallesActivosPage,
  EditarActivoPage,
} from '../pages/activos';
import MiPerfilPage from '../pages/perfil';
import {
  EstudiantesCalificacionPage,
  EstudiantesPage,
  EstudiantesPageAgregar,
  EstudiantesPageDetalles,
  EstudiantesPageEditar,
  EstudiantesPageHistorialPagos,
} from '../pages/estudiantes';
import CategoriasEquipoPage from '../pages/activos/categorias';
import {
  DocentesPage,
  DocentesPageDetalles,
  DocentesPageAgregar,
} from '../pages/docentes';

import {
  PrestamoLibrosPage,
  PrestamoLibrosPageRegistro,
} from '../pages/libros/prestamos';

import { PagosPage, PagosPageDetalles } from '../pages/pagos';

import { ReportesEBRPage } from '../pages/reportes';
import SeccionesPage from '../pages/Secciones';
import {
  CalificacionesPage,
  CalificacionesPageDetalles,
} from '../pages/calificaciones';
import CursosPage from '../pages/Cursos';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/inicio" element={<HomeContent />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<MiPerfilPage />} />
        <Route path="/usuarios" element={<PersonasPage />} />
        <Route path="/grados" element={<GradosPage />} />
        <Route path="/secciones" element={<SeccionesPage />} />
        <Route path="/cursos" element={<CursosPage />} />

        <Route path="/libros/" element={<LibrosPage />} />
        <Route path="/libros/prestamos" element={<PrestamoLibrosPage />} />
        <Route
          path="/libros/prestamos/agregar"
          element={<PrestamoLibrosPageRegistro />}
        />

        <Route path="/inmobiliarios/" element={<CarpetasPage />} />

        <Route path="/equipos/" element={<ActivosPage />} />
        <Route path="/equipos/:id" element={<DetallesActivosPage />} />
        <Route path="/equipos/agregar" element={<AgregarActivoPage />} />
        <Route path="/equipos/editar/:id" element={<EditarActivoPage />} />
        <Route path="/equipos/categorias" element={<CategoriasEquipoPage />} />

        <Route path="/estudiantes/" element={<EstudiantesPage />} />
        <Route
          path="/estudiantes/agregar"
          element={<EstudiantesPageAgregar />}
        />
        <Route path="/estudiantes/:id" element={<EstudiantesPageDetalles />} />
        <Route
          path="/estudiantes/editar/:id"
          element={<EstudiantesPageEditar />}
        />
        <Route
          path="estudiantes/pagos/:id"
          element={<EstudiantesPageHistorialPagos />}
        />
        <Route
          path="estudiantes/calificacion/:id"
          element={<EstudiantesCalificacionPage />}
        />

        <Route path="/docentes/" element={<DocentesPage />} />
        <Route path="/docentes/agregar" element={<DocentesPageAgregar />} />
        <Route path="/docentes/:id" element={<DocentesPageDetalles />} />

        <Route path="/pagos/" element={<PagosPage />} />
        <Route path="/pagos/:id" element={<PagosPageDetalles />} />

        <Route path="/calificaciones/" element={<CalificacionesPage />} />
        <Route
          path="/calificaciones/:id"
          element={<CalificacionesPageDetalles />}
        />

        <Route path="/reportes" element={<ReportesEBRPage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/" element={<HomeContent />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
