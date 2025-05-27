const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Plant = require('./models/plant'); // Sequelize model
const plantsRouter = require('./routes/plants');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Helper: Get current season
function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "Winter";
  if ([3, 4, 5].includes(month)) return "Spring";
  if ([6, 7, 8].includes(month)) return "Summer";
  if ([9, 10, 11].includes(month)) return "Autumn";
  return "Unknown";
}

// Home route
app.get('/', async (req, res) => {
  try {
    // Fetch all plants
    const plants = await Plant.findAll();

    // Categories for gallery/filters
    const categories = [
      { name: 'Indoor', slug: 'indoor', icon: 'bi bi-house-door', description: 'Perfect for inside your home.' },
      { name: 'Outdoor', slug: 'outdoor', icon: 'bi bi-tree', description: 'Great for gardens and balconies.' },
      { name: 'Succulents', slug: 'succulents', icon: 'bi bi-droplet', description: 'Low-maintenance and trendy.' },
      { name: 'Flowering', slug: 'flowering', icon: 'bi bi-flower1', description: 'Add color to any space.' }
    ];

    // Trending Plants (customize logic as needed)
    const trendingPlants = await Plant.findAll({ where: { isTrending: true }, limit: 4 });

    // Seasonal Picks
    const currentSeason = getCurrentSeason();
    // Make sure your Plant model has a 'season' field
    const seasonalPlants = await Plant.findAll({ where: { season: currentSeason }, limit: 4 });

    // Plant of the Week (customize as needed)
    const plantOfWeek = await Plant.findOne({ where: { isPlantOfWeek: true } }) || {
      name: "Monstera Variegata",
      image: "/images/Monstera-Variegata.jpg",
      careLevel: "Medium",
      origin: "Central America",
      description: "A rare and stunning variegated Monstera with beautiful white and green leaves.",
      light: "Bright, indirect",
      water: "Moderate",
      petFriendly: false,
      funFact: "Each leaf has a unique variegation pattern.",
      whyWeLove: "It's the ultimate statement piece for any plant lover.",
      id: 4
    };

    // Gallery images (example, replace with your own logic/database if needed)
    const userGallery = [
      { url: '/images/user-plant1.jpg', user: 'Ava' },
      { url: '/images/user-plant2.jpg', user: 'Liam' },
      { url: '/images/user-plant3.jpg', user: 'Maya' },
      { url: '/images/user-plant4.jpg', user: 'Noah' }
    ];

    // Calendar tasks (example)
    const calendarTasks = [
      { title: 'Fertilize Indoor Plants', date: 'June 1', description: 'Feed your indoor plants for healthy growth.' },
      { title: 'Repot Succulents', date: 'June 5', description: 'Give your succulents fresh soil and space.' },
      { title: 'Prune Flowering Plants', date: 'June 10', description: 'Remove dead blooms to encourage new flowers.' }
    ];

    // Expert answers (example)
    const expertAnswers = [
      { question: 'How often should I water my Monstera?', expert: 'Dr. Green', answer: 'Water when the top 2 inches of soil are dry. Usually once a week.' },
      { question: 'Why are my succulent leaves mushy?', expert: 'Plant Pro', answer: 'Overwatering is the most common cause. Let soil dry completely between waterings.' }
    ];

    // Blog posts (example)
    const blogPosts = [
      { title: '5 Easy Indoor Plants for Beginners', slug: 'easy-indoor-plants', image: '/images/blog1.jpg', excerpt: 'Start your plant journey with these low-maintenance favorites.' },
      { title: 'How to Make Your Own Terrarium', slug: 'diy-terrarium', image: '/images/blog2.jpg', excerpt: 'A step-by-step guide to creating a mini jungle in glass.' },
      { title: 'Pet-Friendly Plants for Your Home', slug: 'pet-friendly-plants', image: '/images/blog3.jpg', excerpt: 'Keep your furry friends safe with these non-toxic picks.' }
    ];

    res.render('index', {
      plants,
      categories,
      trendingPlants,
      seasonalPlants,
      plantOfWeek,
      userGallery,
      calendarTasks,
      expertAnswers,
      blogPosts,
      currentSeason
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// All plants and related routes
app.use('/plants', plantsRouter);

// Sequelize DB connection and server start
const { sequelize } = require('./models');
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
