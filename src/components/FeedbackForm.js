import React, { useState } from 'react';

const FeedbackForm = () => {
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:neerajrajssisodiya0909@gmail.com?subject=Expense Tracker Feedback&body=${msg}`;
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <textarea
        rows="3"
        placeholder="Your feedback..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        required
      />
      <button type="submit">Send Feedback</button>
    </form>
  );
};

export default FeedbackForm;
