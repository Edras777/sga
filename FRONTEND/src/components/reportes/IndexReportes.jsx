import React, { useEffect } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ReporteChart from './ReporteEstudiantes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReportes, reset } from '../../features/reporteSlice';
import { SpinnerComponent } from '../../helpers/spinner';
import ReportePagos from './ReportePagos';
import PrestamoLibros from './PrestamoLibros';

const IndexChart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);

  const { reportes, isLoading, message } = useSelector(state => state.reportes);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (!user.token) {
      navigate('/login');
    }

    dispatch(getReportes());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, message, navigate, user]);

  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <Tabs isFitted variant="enclosed-colored" colorScheme="blue">
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>
          ESTUDIANTES
        </Tab>
        <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>PAGOS</Tab>
        <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>LIBROS</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ReporteChart reportes={reportes} />
        </TabPanel>
        <TabPanel>
          <ReportePagos reportes={reportes} />
        </TabPanel>
        <TabPanel>
          <PrestamoLibros reportes={reportes} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default IndexChart;
