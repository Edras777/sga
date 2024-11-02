import React from 'react';
import Cursos from '../../components/cursos/Cursos';
import Dashboard from '../../components/layout/Dashboard';

const CursosPage = () => {
  return <Dashboard componente={<Cursos />} />;
};

export default CursosPage;
