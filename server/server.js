const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Middleware pour gérer les sessions
app.use(session({
  secret: 'mysecret', // Clé secrète pour signer la session, changez-la en quelque chose de plus sécurisé en production
  resave: false,
  saveUninitialized: true
}));

// Connexion à MongoDB
mongoose.connect('mongodb://172.234.63.241:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch((err) => {
  console.error('Erreur de connexion à MongoDB:', err);
});

// Définition du schéma Mongoose
const coordsSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  userId: String
});

// Modèle Mongoose basé sur le schéma
const Coords = mongoose.model('Coords', coordsSchema);

// Endpoint pour recevoir les coordonnées GPS et l'élément d'identification de l'utilisateur
app.post('/coords', async (req, res) => {
  // Vérifie si l'utilisateur est connecté
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Utilisateur non authentifié' });
  }

  // Récupère les données envoyées dans le corps de la requête
  const { latitude, longitude } = req.body;

  // Vérifie que les coordonnées GPS sont présentes
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Coordonnées GPS manquantes' });
  }

  // Crée un nouvel enregistrement dans la base de données
  try {
    await Coords.create({ latitude, longitude, userId: req.session.userId });
    res.status(200).json({ message: 'Coordonnées GPS enregistrées avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement des coordonnées GPS' });
  }
});

// Endpoint pour connecter un utilisateur et créer une session
app.post('/login', (req, res) => {
  const { userId } = req.body;

  // Vérifie que l'identifiant de l'utilisateur est présent
  if (!userId) {
    return res.status(400).json({ error: "L'identifiant de l'utilisateur est requis" });
  }

  // Crée une session pour l'utilisateur
  req.session.userId = userId;

  // Répond avec un message de succès
  res.status(200).json({ message: 'Utilisateur connecté avec succès' });
});

// Endpoint pour déconnecter un utilisateur et détruire sa session
app.post('/logout', (req, res) => {
  // Détruit la session de l'utilisateur
  req.session.destroy();

  // Répond avec un message de succès
  res.status(200).json({ message: 'Utilisateur déconnecté avec succès' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
