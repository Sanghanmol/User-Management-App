import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Grid, TextField, Button, Box, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UsersList = ({ users, page, setPage, totalPages }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const usersPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredUsers(users); 
      setPage(1);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(lowerCaseQuery) ||
          user.last_name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
      setPage(1);
    }
  };

  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
  const totalDisplayedPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <Container>
      <TextField
        label="Search users by name or email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(event) => handleSearch(event.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4}>
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 4,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={user.avatar}
                  alt={user.first_name}
                  sx={{ borderRadius: '4px 4px 0 0' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>

                  <Box display="flex" justifyContent="space-around" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => alert(`Delete user ${user.id}`)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            No users found.
          </Typography>
        )}
      </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalDisplayedPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
    </Container>
  );
};

export default UsersList;
