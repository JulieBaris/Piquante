//__________________________________________Gestion de l'app_____________________________//
//Importations des outils express et mongoose
const express = require('express');
const mongoose = require('mongoose');
// Importation des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
// Importation de path
const path = require('path');

// Initialisation de Mongoose - connection à MongoDB
mongoose.connect('mongodb+srv://JulieBaris:P5TheHottestReviews@cluster0.eoenf.mongodb.net/TheHottestReviews?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log(e,'Connexion à MongoDB échouée !'));

// Initialisation du server
const app = express();

app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     next();
   });


// configuration du dossier "images" qui accueillera les images des sauces et qui sera mis à jour
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));
// configuration de body parser
app.use(express.json());
// configuration des routes 
app.use('/api/sauces/', sauceRoutes);
app.use('/api/auth', userRoutes);

// Exportation
module.exports = app;