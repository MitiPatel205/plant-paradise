const express = require('express');
const router = express.Router();
const { Plant } = require('../models');

// GET /plants - Show all plants or search/filter
router.get('/', async (req, res) => {
  try {
    const { q, light, care } = req.query;
    const where = {};

    // Search by name or description
    if (q && q.trim() !== '') {
      where.$or = [
        { name: { $like: `%${q}%` } },
        { shortDescription: { $like: `%${q}%` } }
      ];
    }
    // Filter by light
    if (light && light.trim() !== '') {
      where.light = light;
    }
    // Filter by care level
    if (care && care.trim() !== '') {
      where.careLevel = care.charAt(0).toUpperCase() + care.slice(1); // Capitalize if needed
    }

    // Sequelize v5/v6: use [Op.or], [Op.like]
    const { Op } = require('sequelize');
    let searchWhere = {};
    if (q && q.trim() !== '') {
      searchWhere = {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { shortDescription: { [Op.like]: `%${q}%` } }
        ]
      };
    }
    if (light && light.trim() !== '') {
      searchWhere.light = light;
    }
    if (care && care.trim() !== '') {
      searchWhere.careLevel = care.charAt(0).toUpperCase() + care.slice(1);
    }

    const plants = await Plant.findAll({ where: searchWhere });
    res.render('plants', { plants, q, light, care }); // Pass filters for sticky form values
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Form to add a plant
router.get('/add', (req, res) => {
  res.render('addplant');
});

// Handle form submission
router.post('/add', async (req, res) => {
  try {
    await Plant.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      isNew: req.body.isNew === 'on',
      isEasyCare: req.body.isEasyCare === 'on'
    });
    res.redirect('/plants');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
