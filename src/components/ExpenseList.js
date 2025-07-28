import React, { useState } from 'react';

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', amount: '', category: '' });

  const startEdit = (exp) => {
    setEditId(exp._id);
    setEditForm({ title: exp.title, amount: exp.amount, category: exp.category });
  };

  const handleUpdate = () => {
    onUpdate(editId, editForm);
    setEditId(null);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>All Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {expenses.map((exp) => (
            <li key={exp._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '6px' }}>
              {editId === exp._id ? (
                <>
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  />
                  <input
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  />
                  <button onClick={handleUpdate}>Save</button>
                </>
              ) : (
                <>
                  <strong>{exp.title}</strong> - ₹{exp.amount} [{exp.category}]
                  <button onClick={() => onDelete(exp._id)} style={{ marginLeft: '10px' }}>
                    Delete
                  </button>
                  <button onClick={() => startEdit(exp)} style={{ marginLeft: '5px' }}>
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
