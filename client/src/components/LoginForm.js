// client/src/components/LoginForm.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import { TextField, Button, Paper, Typography, Container, Grid } from '@material-ui/core';
import useStyles from '../styles/loginForm'; // Import custom styles

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // initialize navigate
  const classes = useStyles();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token); // Store the token
      login(response.data.user); // Handle login success
      setMessage('Logged in successfully');
      navigate('/profile'); // Navigate to home page after login
    } catch (error) {
      console.error(error); // Handle login error
      setMessage('Login failed: ' + error.response.data.message);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to register page when button is clicked
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
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
    //     <button type="submit">Login</button>
    //     {message && <p>{message}</p>}
    //   </form>
    //   {/* Button to go to the register page */}
    //   <button onClick={handleRegisterClick}>Register</button>
    //   {/* or use a text link */}
    //   <p>
    //     Don't have an account? <span onClick={handleRegisterClick} style={{color: 'blue', cursor: 'pointer'}}>Register here</span>
    //   </p>
    // </div>
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h5">Login</Typography>
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
              Login
            </Button>
            {message && <Typography color="error">{message}</Typography>}
            <Button fullWidth color="secondary" onClick={handleRegisterClick}>
              Register
            </Button>
            <Typography variant="body2">
              Don't have an account?{' '}
              <span onClick={handleRegisterClick} className={classes.registerLink}>
                Register here
              </span>
            </Typography>
          </form>
        </Paper>
      </Container>
  
  );
};

export default LoginForm;
