import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/login';
import UsersList from './pages/UserList';
import EditUser from './components/EditUser';
import NotFound from './pages/NotFound';

const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const response1 = await axios.get(`https://reqres.in/api/users?page=1`);
      const response2 = await axios.get(`https://reqres.in/api/users?page=2`);
      const combinedUsers = [...response1.data.data, ...response2.data.data];

      setUsers(combinedUsers);
      setTotalPages(2);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserInList = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={<UsersList users={users} page={page} setPage={setPage} totalPages={totalPages} />}
        />
        <Route
          path="/edit-user/:id"
          element={<EditUser users={users} updateUserInList={updateUserInList} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
