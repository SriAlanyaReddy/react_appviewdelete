import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [editEmail, setEditEmail] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    age: '',
    date: '',  // Add date here to track it in the edit form
  });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleEditClick = (user) => {
    setEditEmail(user.email);
    setEditFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      date: user.date,  // Ensure the date is passed to the edit form
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveClick = async (email) => {
    const confirmUpdate = window.confirm(
      `Are you sure you want to update the user with email: ${email}?`
    );
    if (confirmUpdate) {
      try {
        await axios.put(`http://localhost:5000/users/${email}`, editFormData);
        alert('User updated successfully');
        setEditEmail(null);
        fetchUsers();
      } catch (err) {
        console.error('Error updating user:', err);
        alert('Failed to update user');
      }
    }
  };

  const deleteUser = async (email) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the user with email: ${email}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${email}`);
        setUsers(users.filter((user) => user.email !== email));
        alert('User deleted successfully');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ backgroundColor: '#007bff', minHeight: '100vh', padding: '20px' }}>
      <div className="container p-4" style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">User List</h2>
          <button className="btn btn-danger" onClick={() => navigate('/create')}>
            + Add
          </button>
        </div>

        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Date</th> {/* Date column */}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) =>
              editEmail === user.email ? (
                <tr key={user.email} className="table-warning">
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="age"
                      value={editFormData.age}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={editFormData.date?.split('T')[0]}  // Fix date format for input
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleSaveClick(user.email)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditEmail(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  {/* 
  Format date as DD/MM/YYYY (British style)
  This will format the date to display as: 06/01/2025 
*/}
{/* Code: */}
{/* <td>{new Date(user.date).toLocaleDateString('en-GB')}</td> */}

{/* 
  Format date as ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)
  This will format the date as: 2025-01-06T00:00:00.000Z
*/}
{/* Code: */}
{/* <td>{new Date(user.date).toISOString()}</td> */}

{/* 
  Format date as full weekday, long month name, day, and year (e.g., Monday, January 6, 2025)
  This will format the date as: Monday, January 6, 2025
*/}
{/* Code: */}
{/* <td>{new Date(user.date).toLocaleDateString('en-US', {
  weekday: 'long',  // 'long' gives full weekday names
  year: 'numeric',
  month: 'long',    // 'long' gives full month names
  day: 'numeric'
})}</td> */}

{/* 
  Format date as abbreviated month, day, year (e.g., Jan 6, 2025)
  This will format the date as: Jan 6, 2025
*/}
{/* Code: */}
{/* <td>{new Date(user.date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',   // 'short' gives abbreviated month names (e.g., Jan, Feb, etc.)
  day: 'numeric'
})}</td> */}

{/* 
  Format date as custom format DD-MMM-YYYY (e.g., 06-Jan-2025)
  This will format the date as: 06-Jan-2025
*/}
{/* Code: */}
{/* <td>{new Date(user.date).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})}</td> */}

{/* 
  Format date as YYYY-MM-DD (custom format using manual string manipulation)
  This will format the date as: 2025-01-06
*/}
{/* Code: */}
{/* 
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();  // Get the full year (e.g., 2025)
    const month = String(d.getMonth() + 1).padStart(2, '0');  // Month is zero-based, so add 1 and pad to ensure two digits (e.g., '01' for January)
    const day = String(d.getDate()).padStart(2, '0');  // Ensure day has two digits (e.g., '06' for the 6th)
    return `${year}-${month}-${day}`;  // Format date as YYYY-MM-DD (e.g., 2025-01-06)
  };

  <td>{formatDate(user.date)}</td>
*/}


                  <td>{new Date(user.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/\s+/g, ', ')}</td>

                  <td>
                    <button className="btn btn-danger me-2" onClick={() => handleEditClick(user)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.email)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
