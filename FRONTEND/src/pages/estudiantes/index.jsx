import React from 'react';
import Estudiantes from '../../components/estudiantes/Estudiantes';
import Dashboard from '../../components/layout/Dashboard';
import AgregarEstudiante from '../../components/estudiantes/AgregarEstudiante';
import DetallesEstudiante from '../../components/estudiantes/DetallesEstudiante';
import EditarEstudiante from '../../components/estudiantes/EditarEstudiante';
import HisotorialPagoEstudiantes from '../../components/estudiantes/HistorialPagosEstudiante';
import CalificacionEstudiante from '../../components/estudiantes/CalificacionEstudiante';

export const EstudiantesPage = () => {
  return <Dashboard componente={<Estudiantes />} />;
};

export const EstudiantesPageAgregar = () => {
  return <Dashboard componente={<AgregarEstudiante />} />;
};

export const EstudiantesPageDetalles = () => {
  return <Dashboard componente={<DetallesEstudiante />} />;
};

export const EstudiantesPageEditar = () => {
  return <Dashboard componente={<EditarEstudiante />} />;
};

export const EstudiantesPageHistorialPagos = () => {
  return <Dashboard componente={<HisotorialPagoEstudiantes />} />;
};

export const EstudiantesCalificacionPage = () => {
  return <Dashboard componente={<CalificacionEstudiante />} />;
};
