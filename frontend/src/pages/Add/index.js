import React, { useState } from 'react';
import api from '../../services/api';

import './style.css';

const Add = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [alert, setAlert] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();

    const response = await api.post('/users/add', {
      name,
      email,
      age,
    });

    if (response.data.error) {
      setAlert(response.data.error);
      return;
    }

    history.push('/');
  }

  return (
    <div className="page-add-user">
      <h1>Add User</h1>

      {alert && <div className="alert-message">{alert}</div>}

      <form method="POST" onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>E-mail:</label>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <button className="button form-add-button">Add</button>
      </form>
    </div>
  );
};

export default Add;
