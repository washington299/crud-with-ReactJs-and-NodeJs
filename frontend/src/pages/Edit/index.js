import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Edit = ({ history }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const id = localStorage.getItem('id');

  useEffect(() => {
    async function getUserData() {
      const response = await api.get(`/users/edit/${id}`);

      const { data } = response;

      if (!data) {
        history.push('/');
        return;
      }

      setName(data.name);
      setAge(data.age);
    }

    getUserData();
  }, [history, id]);

  async function updateUserData(e) {
    e.preventDefault();

    await api.put(`/users/edit/${id}`, {
      name,
      age,
    });

    history.push('/');
  }

  return (
    <div>
      <h1>Edit User</h1>

      <form method="POST" onSubmit={updateUserData}>
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

        <button className="button form-add-button">Edit</button>
      </form>
    </div>
  );
};

export default Edit;
