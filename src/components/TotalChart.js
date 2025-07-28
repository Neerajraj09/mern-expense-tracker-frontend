import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const TotalChart = ({ expenses }) => {
  const data = Object.values(
    expenses.reduce((acc, cur) => {
      acc[cur.category] = acc[cur.category] || { name: cur.category, value: 0 };
      acc[cur.category].value += cur.amount;
      return acc;
    }, {})
  );

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h4>Category Breakdown</h4>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={70}
          fill="#8884d8"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TotalChart;
