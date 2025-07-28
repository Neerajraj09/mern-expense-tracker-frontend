import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlySummary = ({ expenses }) => {
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const monthExpenses = expenses.filter(exp => new Date(exp.date).getMonth() === currentMonth);

    const grouped = {};
    monthExpenses.forEach(exp => {
      const cat = exp.category || 'Uncategorized';
      grouped[cat] = (grouped[cat] || 0) + exp.amount;
    });

    setCategoryData(grouped);
  }, [expenses]);

  const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
  const average = total > 0 ? (total / 30).toFixed(2) : 0;
  const topCategory = Object.keys(categoryData).reduce((a, b) => categoryData[a] > categoryData[b] ? a : b, '');

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#82ca9d', '#c45850'],
        hoverOffset: 6
      }
    ]
  };

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h2>📊 Monthly Summary</h2>

      {Object.keys(categoryData).length > 0 ? (
        <Pie data={chartData} style={{ maxWidth: '300px', margin: '0 auto' }} />
      ) : (
        <p>No data to display for this month.</p>
      )}

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Total this month:</strong> ₹{total}</p>
        <p><strong>Average per day:</strong> ₹{average}</p>
        <p><strong>Top category:</strong> {topCategory || 'N/A'}</p>
      </div>
    </div>
  );
};

export default MonthlySummary;
