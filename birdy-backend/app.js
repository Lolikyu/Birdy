const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user.js');
const birdRoutes = require('./routes/bird.js');

mongoose.connect('mongodb+srv://Lolikyu:3ZvEVkFNpTDTvydx@birdy.79esshw.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/user', userRoutes);
app.use('/api/bird', birdRoutes);

module.exports = app;