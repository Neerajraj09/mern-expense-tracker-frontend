import React, { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import TotalChart from './components/TotalChart';
import FeedbackForm from './components/FeedbackForm';
import MonthlySummary from './components/MonthlySummary';
import './index.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [budgetLimit, setBudgetLimit] = useState(1000); // You can change default
  const [showWarning, setShowWarning] = useState(false);

  const fetchExpenses = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/expenses')
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    setShowWarning(total > budgetLimit);
  }, [expenses, budgetLimit]);

  const handleAddExpense = () => {
    fetchExpenses();
    setMessage('✅ Expense added!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteExpense = (id) => {
    fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setExpenses(expenses.filter(exp => exp._id !== id));
        setMessage('🗑️ Expense deleted!');
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(() => {
        setMessage('❌ Failed to delete.');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      {message && <p className="msg">{message}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Set Budget Limit: ₹</strong></label>
        <input
          type="number"
          value={budgetLimit}
          onChange={(e) => setBudgetLimit(Number(e.target.value))}
          style={{ padding: '5px', width: '100px', marginLeft: '10px' }}
        />
      </div>

      {showWarning && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ⚠️ Budget exceeded! Try to reduce your spending.
        </p>
      )}

      <AddExpense onAdd={handleAddExpense} />

      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <>
          <h3>Total: ₹{total}</h3>
          <TotalChart expenses={expenses} />
          <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        </>
      )}

      <MonthlySummary expenses={expenses} />
      <FeedbackForm />
      <footer>Made by Neeraj</footer>
    </div>
  );
}

export default App;
