import React from 'react';
import Highcharts from 'highcharts';
import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import BarChart from 'highcharts-react-official';

require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

const ReporteEstudiantes = ({ reportes }) => {
  const bgChart = useColorModeValue('white', '#1e1e1e');

  var data_estudiantes = [];

  if (reportes?.estudiantes) {
    data_estudiantes = reportes?.estudiantes[0];
  }

  const BarOptions = {
    chart: {
      backgroundColor: bgChart,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bar',
    },
    title: {
      text: 'CANTIDAD DE ESTUDIANTES POR ESTADO',
    },
    subtitle: {
      text: 'Source: <a href="/estudiantes">Más Detalles</a>',
    },
    xAxis: {
      categories: ['Estudiantes Por Estados'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad de Estudiantes',
      },
    },
    series: [
      {
        name: 'ACTIVOS',
        data: [data_estudiantes?.estado_activo],
        color: '#38a169',
      },
      {
        name: 'INACTIVOS',
        data: [data_estudiantes?.estado_inactivo],
        color: '#e53e3e',
      },
      {
        name: 'EGRESADOS',
        data: [data_estudiantes?.estado_egresado],
        color: '#3182CE',
      },
      {
        name: 'TOTAL',
        data: [data_estudiantes?.total_estudiantes],
        color: '#4a5568',
      },
    ],
    exporting: {
      showTable: false,
    },
  };

  const Barras = {
    chart: {
      backgroundColor: bgChart,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'column',
    },
    title: {
      text: 'ESTUDIANTES POR GENERO',
    },
    subtitle: {
      text: 'Source: <a href="/estudiantes">Más Detalles</a>',
    },
    xAxis: {
      categories: ['CANTIDAD DE ESTUDIANTES POR GENERO'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'CANTIDAD DE ESTUDIANTES',
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}<br/>',
    },
    plotOptions: {
      column: {
        stacking: 'number',
      },
    },
    series: [
      {
        name: 'FEMENINOS',
        data: [data_estudiantes?.estudiantes_femeninos],
        color: '#e53e3e',
      },
      {
        name: 'MASCULINOS',
        data: [data_estudiantes?.estudiantes_masculinos],
        color: '#38a169',
      },
    ],
  };

  return (
    <>
      <Stack spacing="40px" direction={'column'} w={'full'}>
        <Box height="100%" borderRadius="xs" boxShadow={'base'}>
          <BarChart highcharts={Highcharts} options={BarOptions} />
        </Box>

        <Box height="100%" borderRadius="xs" boxShadow={'base'}>
          <BarChart highcharts={Highcharts} options={Barras} />
        </Box>
      </Stack>
    </>
  );
};

export default ReporteEstudiantes;
