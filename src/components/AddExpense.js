import React, { useState } from 'react';

const AddExpense = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount: Number(amount), category }),
      });

      if (res.ok) {
        setTitle('');
        setAmount('');
        setCategory('');
        onAdd(); // callback to refresh
      }
    } catch (err) {
      console.error('Failed to add expense');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense Title"
        required
        style={{ padding: '8px' }}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        style={{ padding: '8px' }}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        style={{ padding: '8px' }}
      />
      <button type="submit" disabled={submitting} style={{ padding: '8px', background: '#4CAF50', color: 'white', border: 'none' }}>
        {submitting ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default AddExpense;
