const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());


// Connexion à MongoDB
mongoose.connect(process.env.mongodb, {
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
  createdAt: String
});

// Modèle Mongoose basé sur le schéma
const Coords = mongoose.model('Coords', coordsSchema);

// Endpoint pour recevoir les coordonnées GPS et l'élément d'identification de l'utilisateur
app.post('/coords', async (req, res) => {
  // Récupère les données envoyées dans le corps de la requête
  const { latitude, longitude } = req.body;

  // Vérifie que les coordonnées GPS sont présentes
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Coordonnées GPS manquantes' });
  }

  // Crée un nouvel enregistrement dans la base de données
  try {
    await Coords.create({ latitude, longitude, createdAt: new Date().toString() });
    res.status(200).json({ message: 'Coordonnées GPS enregistrées avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement des coordonnées GPS' });
  }
});

// Endpoint pour recevoir les coordonnées GPS
app.get('/coords', async (req, res) => {

  // Récuperations des coords
  try {
    await Coords.find({}).exec();
    res.status(200).json({ message: 'Coordonnées GPS enregistrées avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement des coordonnées GPS' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
