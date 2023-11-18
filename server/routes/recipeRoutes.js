// server/routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const axios = require('axios');
require('dotenv').config();
// ... other imports

// GET all recipes
router.get('/recipes', async (req, res) => {
  // ... logic to get all recipes
});

// POST a new recipe
router.post('/recipes', async (req, res) => {
  // ... logic to create a new recipe
});



router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const APP_ID = process.env.APP_ID;
    const APP_KEY = process.env.APP_KEY;
    console.log(`url : https://api.edamam.com/search?q=${q}&app_id=${APP_ID}&app_key=${APP_KEY}`);

    const url = `https://api.edamam.com/search?q=${q}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
