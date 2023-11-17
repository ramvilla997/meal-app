import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Paper, Typography, Container, Grid } from '@material-ui/core';
import useStyles from '../styles/RegisterForm'; // Import custom styles


const RegisterForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { setUser } = useContext(AuthContext);  // Ensure setUser is defined in AuthContext
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const classes = useStyles();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');  // Reset message before the new request
    try {
      const response = await axios.post('/auth/register', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Store the token
        setUser(response.data.user);  // Update user context
        navigate('/login');  // Redirect to login page
      } else {
        // Handle the case where there is no token in the response
        setMessage('Registration successful, but no token received.');
      }
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Registration failed: ' + error.message;
      setMessage(errorMessage);
      console.error(error);
    }
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       name="username"
    //       value={credentials.username}
    //       onChange={handleChange}
    //       placeholder="Username"
    //       required
    //     />
    //     <input
    //       name="password"
    //       type="password"
    //       value={credentials.password}
    //       onChange={handleChange}
    //       placeholder="Password"
    //       required
    //     />
    //     <button type="submit">Register</button>
    //     {message && <p>{message}</p>}
    //   </form>
    // </div>
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h5">Register</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  required
                  value={credentials.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  value={credentials.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Register
            </Button>
            {message && <Typography color="error">{message}</Typography>}
            {/* Add any other buttons or links you need */}
          </form>
        </Paper>
      </Container>
  );
};

export default RegisterForm;
