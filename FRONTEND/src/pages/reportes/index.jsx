import React from 'react';
import Dashboard from '../../components/layout/Dashboard';

import IndexChart from '../../components/reportes/IndexReportes';

export const ReportesEBRPage = () => {
  return <Dashboard componente={<IndexChart />} />;
};
