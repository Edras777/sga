import React from 'react';
import Highcharts from 'highcharts';
import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import BarChart from 'highcharts-react-official';

require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

const ReportePagos = ({ reportes }) => {
  const bgChart = useColorModeValue('white', '#1e1e1e');

  var pagos = [];

  if (reportes?.pagos) {
    pagos = reportes?.pagos[0];
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
      text: 'CANTIDAD DE PAGOS',
    },
    subtitle: {
      text: 'Source: <a href="/pagos">Más Detalles</a>',
    },
    xAxis: {
      categories: ['Cantidad de pagos por estudiantes'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'CANTIDAD DE PAGOS',
      },
    },
    series: [
      {
        name: 'AÑO ACTUAL',
        data: [pagos?.cantidad_pagos_por_anio],
        color: '#3498db',
      },
      {
        name: 'ESTE MES',
        data: [pagos?.cantidad_pagos_por_mes],
        color: '#2ecc71',
      },
      {
        name: 'TOTAL DE REGISTROS',
        data: [pagos?.total_registro_pagos],
        color: '#4a5568',
      },
    ],
    exporting: {
      showTable: false,
    },
  };

  const BarOptions2 = {
    chart: {
      backgroundColor: bgChart,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'bar',
    },
    title: {
      text: 'MONTO TOTAL DE PAGOS RECIBIDOS',
    },
    subtitle: {
      text: 'Source: <a href="/pagos">Más Detalles</a>',
    },
    xAxis: {
      categories: ['PAGOS POR AÑO / PAGOS TOTALES'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'MONTO EN QUETZALES',
      },
    },
    series: [
      {
        name: 'MONTO TOTAL ANUAL',
        data: [pagos?.monto_total_pagos_por_anio],
        color: '#154360',
      },
      {
        name: 'MONTO TOTAL GENERAL',
        data: [pagos?.monto_total_pagos],
        color: '#5dade2',
      },
    ],
    exporting: {
      showTable: false,
    },
  };

  const PieOptions = {
    chart: {
      backgroundColor: bgChart,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    tooltip: {
      headerFormat: '',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'TOTAL DE PAGOS: <b>{point.y}</b><br/>',
    },
    title: {
      text: 'CANTIDAD DE PAGOS POR ESTADO',
    },
    subtitle: {
      text: 'Source: <a href="/pagos">Más Detalles</a>',
    },
    xAxis: {
      categories: 'PAGOS POR ESTADO',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 10,
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
    },
    series: [
      {
        colorByPoint: true,
        showInLegend: true,
        data: [
          {
            name: 'PAGOS CANCELADOS',
            y: pagos?.pagos_cancelados,
            color: '#38a169',
          },
          {
            name: 'PAGOS PENDIENTES',
            y: pagos?.pagos_pendientes,
            color: '#e53e3e',
          },
          {
            name: 'PAGOS INCOMPLETOS',
            y: pagos?.pagos_incompletos,
            color: '#f1c40f',
          },
        ],
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
      text: 'METODOS DE PAGO UTILIZADOS',
    },
    subtitle: {
      text: 'Source: <a href="/pagos">Más Detalles</a>',
    },
    xAxis: {
      categories: ['METODOS DE PAGO'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'CANTIDAD DE VECES UTILIZADOS',
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
        name: 'EFECTIVO',
        data: [pagos?.pagos_efectivo],
        color: '#e53e3e',
      },
      {
        name: 'TARJETA',
        data: [pagos?.pagos_tarjeta],
        color: '#3498db',
      },
      {
        name: 'TRANSFERENCIA BANCARIA',
        data: [pagos?.pagos_transferencia],
        color: '#34495e',
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
          <BarChart highcharts={Highcharts} options={BarOptions2} />
        </Box>
        <Box height="100%" borderRadius="xs" boxShadow={'base'}>
          <BarChart highcharts={Highcharts} options={PieOptions} />
        </Box>
        <Box height="100%" borderRadius="xs" boxShadow={'base'}>
          <BarChart highcharts={Highcharts} options={Barras} />
        </Box>
      </Stack>
    </>
  );
};

export default ReportePagos;
