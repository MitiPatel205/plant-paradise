const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Plant = require('./models/plant'); // or use CLI loader if you use it
const plantsRouter = require('./routes/plants');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get('/', async (req, res) => {
  try {
    const plants = await Plant.findAll();
    res.render('index', { plants });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// All plants and related routes
app.use('/plants', plantsRouter);

const { sequelize } = require('./models'); // If you use CLI loader, else use your db.js

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
