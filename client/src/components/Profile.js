import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button,Grid, FormControl, FormControlLabel, FormGroup, Checkbox, Select, MenuItem, InputLabel, Paper, Typography, Container } from '@material-ui/core';
import useStyles from '../styles/profileForm'; // Import custom styles

const ProfileForm = () => {
  const { user } = useContext(AuthContext);
  // Initialize the profile with null and check its existence before rendering the form
  // const [profile, setProfile] = useState(null);
  const classes = useStyles();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    tastePreferences: '',
    dietaryRestrictions: [],
    preferredCuisines: [],
    mealTypes: [],
    shoppingFrequency: '',
    // Additional preferences can be added here
  });
  const [success, setSuccess] = useState(''); // New state for success message
  const [error, setError] = useState(''); // New state for error message
  useEffect(() => {
    // Fetch the profile when the component is mounted
    const fetchProfile = async () => {
      if (!user) return; // If there's no user, don't fetch the profile

      try {
        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Make sure to send the token
          },
        });
        // Set the profile or initialize it if there's no data
        setProfile(response.data || { tastePreferences: '', dietaryRestrictions: [] });
      } catch (err) {
        console.error(err);
        // If there's an error (like a 404), initialize the profile state
        setProfile({ tastePreferences: '', dietaryRestrictions: [] });
      }
    };

    fetchProfile();
  }, [user]); // Depend on the user state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Make sure to send the token
        },
      });
      console.log('Profile updated', response.data);
      setSuccess('Profile updated successfully!'); // Set success message
      navigate("/recipes")
      setError(''); // Clear any previous errors
      //navigate('/dashboard'); // Adjust the route as needed
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. Please try again.'); // Set error message
      setSuccess(''); // Clear any previous success message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        // Add the value to the array
        setProfile((prevProfile) => ({
          ...prevProfile,
          [name]: [...prevProfile[name], value],
        }));
      } else {
        // Remove the value from the array
        setProfile((prevProfile) => ({
          ...prevProfile,
          [name]: prevProfile[name].filter((item) => item !== value),
        }));
      }
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  // If the profile is null (data is still loading or there was an error), display a loading message or return null
  if (!profile) {
    return <div>Loading...</div>;
  }

  // Render the form once the profile data is loaded
  return (
    <>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      {/* <form onSubmit={handleSubmit}>
      <label>
        Taste Preferences:
        <input
          type="text"
          name="tastePreferences"
          value={profile.tastePreferences}
          onChange={handleChange}
        />
      </label>

      <fieldset>
        <legend>Dietary Restrictions:</legend>
        <label>
          <input
            type="checkbox"
            name="dietaryRestrictions"
            value="Gluten Free"
            onChange={handleChange}
            checked={profile.dietaryRestrictions.includes('Gluten Free')}
          />
          Gluten Free
        </label>
      </fieldset>

      <fieldset>
        <legend>Preferred Cuisines:</legend>
        <label>
          <input
            type="checkbox"
            name="preferredCuisines"
            value="Italian"
            onChange={handleChange}
            checked={profile.preferredCuisines.includes('Italian')}
          />
          Italian
        </label>
      </fieldset>

      <fieldset>
        <legend>Meal Types:</legend>
        <label>
          <input
            type="checkbox"
            name="mealTypes"
            value="Breakfast"
            onChange={handleChange}
            checked={profile.mealTypes.includes('Breakfast')}
          />
          Breakfast
        </label>
      </fieldset>

      <label>
        Shopping Frequency:
        <select
          name="shoppingFrequency"
          value={profile.shoppingFrequency}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="Weekly">Weekly</option>
          <option value="Bi-Weekly">Bi-Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </label>

      <button type="submit">Save Profile</button>
    </form> */}

<Container component="main" maxWidth="md">
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6">Profile Settings</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Taste Preferences"
                name="tastePreferences"
                value={profile.tastePreferences}
                onChange={handleChange}
                variant="outlined"
                className={classes.formControl}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <InputLabel shrink>Dietary Restrictions</InputLabel>
                <FormGroup className={classes.formGroup}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={profile.dietaryRestrictions.includes('Gluten Free')}
                        onChange={handleChange}
                        name="dietaryRestrictions"
                        value="Gluten Free"
                        className={classes.checkbox}
                      />
                    }
                    label="Gluten Free"
                    className={classes.formLabel}
                  />
                  {/* Repeat for other dietary restrictions */}
                </FormGroup>
              </FormControl>
            </Grid>

            {/* Repeat similar structure for Preferred Cuisines and Meal Types */}

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Shopping Frequency</InputLabel>
                <Select
                  value={profile.shoppingFrequency}
                  onChange={handleChange}
                  label="Shopping Frequency"
                  name="shoppingFrequency"
                  className={classes.selectEmpty}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  {/* ... other options ... */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submitButton}
              >
                Save Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default ProfileForm;
