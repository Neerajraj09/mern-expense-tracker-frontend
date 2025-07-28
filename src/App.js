import React, { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import TotalChart from './components/TotalChart';
import FeedbackForm from './components/FeedbackForm';
import MonthlySummary from './components/MonthlySummary';
import './index.css';

const BACKEND_URL = 'https://mern-expense-tracker-backend-s2qe.onrender.com/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const budgetLimit = 5000;

  const fetchExpenses = () => {
    setLoading(true);
    fetch(BACKEND_URL)
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

  const handleAddExpense = () => {
    fetchExpenses();
    setMessage('✅ Expense added!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteExpense = (id) => {
    fetch(`${BACKEND_URL}/${id}`, {
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
  const isOverBudget = total > budgetLimit;

  return (
    <div className={darkMode ? 'dark container' : 'container'}>
      <h1>Expense Tracker</h1>
      <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle">
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {message && <p className="msg">{message}</p>}
      {isOverBudget && <p className="warning">⚠️ Budget limit exceeded! ₹{total}</p>}

      <AddExpense onAdd={handleAddExpense} />
      <MonthlySummary expenses={expenses} />
      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <>
          <h3>Total: ₹{total}</h3>
          <TotalChart expenses={expenses} />
          <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        </>
      )}
      <FeedbackForm />
      <footer>Made by Neeraj</footer>
    </div>
  );
}

export default App;
