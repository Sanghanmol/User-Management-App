import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = ({ users, updateUserInList }) => {
  const { id } = useParams();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = users.find((user) => user.id === parseInt(id));
    if (currentUser) {
      setUser(currentUser);
    }
  }, [id, users]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);

      if (response.status === 200) {
        setSuccess('User updated successfully');
        updateUserInList(user);
        setTimeout(() => {
          navigate('/users');
        }, 2000);
      }
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          marginTop: 10,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Edit User
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <form onSubmit={handleUpdate}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              mt: 2,
              '&:hover': {
                backgroundColor: '#3b82f6',
              },
            }}
          >
            Update User
          </Button>
        </form>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/users')}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditUser;
