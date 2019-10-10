import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdPersonAdd } from 'react-icons/md';
import axios from '../../services/api';

import './style.css';

const Table = ({ history }) => {
  const [data, setData] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      const users = await axios.get('/users');
      const info = users.data;

      setData(info);
    }

    loadUsers();
  }, []);

  async function deleteUser(id) {
    const response = await axios.delete(`/users/delete/${id}`);
    const { success } = response.data;
    if (success) {
      setSuccessMessage(success);
    }
  }

  return (
    <div className="page-list-users">
      {deleteMessage && (
        <div className="alert-background">
          <div className="alert-box">
            <p>Are you sure you want to delete this user?</p>
            <button
              className="button delete"
              onClick={() => {
                deleteUser(localStorage.getItem('id'));
                setDeleteMessage(false);
              }}
            >
              Yes
            </button>
            <button
              className="button cancel"
              onClick={() => {
                setDeleteMessage(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h1>Users Table</h1>

      <div style={{ display: 'flex' }}>
        <div
          role="button"
          className="button add"
          onClick={() => {
            history.push('/add');
          }}
        >
          <MdPersonAdd size={22} />
          <span>Add User</span>
        </div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>

      <div className="table">
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td className="actions">
                  <MdEdit
                    size={20}
                    title="Edit"
                    className="edit-icon"
                    onClick={() => {
                      localStorage.setItem('id', user._id);
                      history.push('/edit');
                    }}
                  />
                  <MdDelete
                    size={20}
                    title="Delete"
                    className="delete-icon"
                    onClick={() => {
                      setDeleteMessage(true);
                      localStorage.setItem('id', user._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
