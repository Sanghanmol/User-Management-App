import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setSuccess(true);
        navigate('/users');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Login successful!</Alert>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
