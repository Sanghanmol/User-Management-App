import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DeleteUser = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      navigate('/users');
    } catch (err) {
      alert('Error deleting user');
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteUser;
