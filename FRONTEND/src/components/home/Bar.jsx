import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default class GraficoBar extends PureComponent {
  render() {
    const { reportes } = this.props;

    var data = [];

    if (reportes?.estudiantes) {
      data = [
        {
          name: 'ESTUDIANTES',
          femeninos: reportes?.estudiantes[0]?.estudiantes_femeninos,
          masculinos: reportes?.estudiantes[0]?.estudiantes_masculinos,
          total: reportes?.estudiantes[0]?.total_estudiantes,
        },
      ];
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="10 10" />

          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ color: 'black' }} />
          <Legend />
          <Bar dataKey="masculinos" fill="#8884d8" />
          <Bar dataKey="femeninos" fill="#82ca9d" />
          <Bar dataKey="total" fill="gray" />
          <Cell fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
