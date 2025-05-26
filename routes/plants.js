const express = require('express');
const router = express.Router();
const { Plant } = require('../models');

// Show all plants
router.get('/', async (req, res) => {
  const plants = await Plant.findAll();
  res.render('index', { plants });
});

// Form to add a plant
router.get('/add', (req, res) => {
  res.render('addplant');
});

// Handle form submission
router.post('/add', async (req, res) => {
  const { name, description, image } = req.body;
  await Plant.create({ name, description, image });
  res.redirect('/');
});
router.post('/add', async (req, res) => {
  await Plant.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    isNew: req.body.isNew === 'on',
    isEasyCare: req.body.isEasyCare === 'on'
  });
  res.redirect('/');
});
// GET /plants - Show all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.findAll();
    res.render('plants', { plants }); // Make sure you have views/plants.ejs
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
