import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      // Check if the response contains a token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/users');
      } else {
        alert('Credentials do not match. Please check your credentials.');
      }
    } catch (error) {
      // Handle error responses (e.g., incorrect credentials)
      if (error.response && error.response.status === 400) {
        alert('Credentials do not match. Please check your credentials.');
      } else {
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ bgcolor: '#1976d2', marginBottom: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              EmployWise
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Sign in to continue
            </Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                style: { borderRadius: '10px' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style: { borderRadius: '10px' },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                paddingY: 1.5,
                borderRadius: '10px',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#115293' },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
