import React from 'react';
import Dashboard from '../../components/layout/Dashboard';
import Calificaciones from '../../components/calificaciones/calificaciones';
import DetallesCalificacion from '../../components/calificaciones/DetalleCalificacion';

export const CalificacionesPage = () => {
  return <Dashboard componente={<Calificaciones />} />;
};

export const CalificacionesPageDetalles = () => {
  return <Dashboard componente={<DetallesCalificacion />} />;
};
