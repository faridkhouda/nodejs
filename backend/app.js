const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

const app = express();

mongoose.connect('mongodb+srv://user:user@archiwebserverlessinsta.bd218.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json());
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.use('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }))
  });
module.exports = app;