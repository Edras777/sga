import React from 'react';
import Highcharts from 'highcharts';
import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import BarChart from 'highcharts-react-official';

require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

const PrestamoLibros = ({ reportes }) => {
  const bgChart = useColorModeValue('white', '#1e1e1e');

  var prestamo_libros = [];

  if (reportes?.pagos) {
    prestamo_libros = reportes?.prestamo_libros[0];
  }

  const BarOptions = {
    chart: {
      backgroundColor: bgChart,
      responsive: true,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bar',
    },
    title: {
      text: 'PRESTAMO DE LIBROS',
    },
    subtitle: {
      text: 'Source: <a href="/libros/prestamos">Más Detalles</a>',
    },
    xAxis: {
      categories: ['PRESTAMOS'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'CANTIDAD DE PRESTAMOS',
      },
    },
    series: [
      {
        name: 'LIBROS PRESTADOS',
        data: [prestamo_libros?.libros_prestados],
        color: '#3498db',
      },
      {
        name: 'LIBROS DEVUELTOS',
        data: [prestamo_libros?.libros_devueltos],
        color: '#2ecc71',
      },
      {
        name: 'TOTAL DE REGISTROS',
        data: [prestamo_libros?.cantidad_prestamo_libros],
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
      text: 'PRESTAMOS EN GENERAL',
    },
    xAxis: {
      categories: ['PRESTAMOS'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'TOTAL DE PRESTAMOS',
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
        name: 'LIBROS',
        data: [prestamo_libros?.cantidad_prestamo_libros],
        color: '#3498db',
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

export default PrestamoLibros;
