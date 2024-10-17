import React from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/users')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
