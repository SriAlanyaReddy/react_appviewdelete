import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './Components/CreateUser';
import ViewUsers from './Components/ViewUsers';

const App = () => {
  return (
    <Router>
      <div>
       
       

        {/* Routing for the pages */}
        <div className="container mt-4">
          <Routes>
            {/* Home page with only buttons */}
            <Route path="/" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Welcome to User Management</h2>
                <p>Please select an option to manage users:</p>
                {/* Buttons for navigating to respective pages */}
                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'center' }}>
                  <li style={{ marginRight: '20px' }}>
                    <Link to="/create" style={{ textDecoration: 'none', color: 'blue', fontSize: '18px' }}>+ Add User</Link>
                  </li>
                  <li>
                    <Link to="/view" style={{ textDecoration: 'none', color: 'blue', fontSize: '18px' }}>View Users</Link>
                  </li>
                </ul>
              </div>
            } />
            
            {/* Route for viewing users */}
            <Route path="/view" element={<ViewUsers />} />
            
            {/* Route for creating a new user */}
            <Route path="/create" element={<CreateUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
