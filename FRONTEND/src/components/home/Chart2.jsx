import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default class Example extends PureComponent {
  render() {
    const { reportes } = this.props;

    var data = [];

    if (reportes?.pagos) {
      data = [
        {
          name: 'PAGOS',
          total_pagos_año_actual: reportes.pagos[0].monto_total_pagos_por_anio,
          total_pagos: reportes.pagos[0].monto_total_pagos,
        },
      ];
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="10 10" />

          <XAxis dataKey="name" />

          <YAxis />
          <Tooltip
            contentStyle={{ color: 'black' }}
            formatter={(value, name, props) => {
              return [value, name];
            }}
            shared
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total_pagos_año_actual"
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="total_pagos"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          {/* <Cell fill="#8884d8" /> */}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
