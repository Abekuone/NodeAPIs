// Importation des dépendances
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
var cors = require('cors');

// Configuration du serveur Express :
// Creation d'une instance d'Express en appelant express().
// Les middlewares express.json(), express.urlencoded() et morgan
// sont utilisés pour gérer les requêtes HTTP, le formatage des données et la journalisation.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/', require("./root/fils/index.js"));

// Route d'accueil : Une route GET pour l'URL racine '/'. 
app.get('/', async (req, res, next) => {
  res.send({ message: 'Bienvenu sur la page d\'accueil de notre API' });
});


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

/* Démarrage du serveur
 Configuré pour écouter sur un port spécifié dans la variable
 d'environnement PORT ou sur le port 3000 par défaut.
 Message affiché dans la console pour indiquer
 que le serveur est prêt à écouter les requêtes.
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
