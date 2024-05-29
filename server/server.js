const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
var cors = require('cors');
dotenv.config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(cors());

console.log(process.env.MONGODB_SERVER,)
// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_SERVER, {
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
    const pos = req.body;

    // Vérifie que les coordonnées GPS sont présentes
    if (!pos) {
        return res.status(400).json({ error: 'Coordonnées GPS manquantes' });
    }

    // Crée un nouvel enregistrement dans la base de données
    try {
        await Coords.create({ latitude: pos[0], longitude: pos[1], createdAt: new Date().toString() });
        res.status(200).json({ message: 'Coordonnées GPS enregistrées avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement des coordonnées GPS' });
    }
});

// Endpoint pour recevoir les coordonnées GPS
app.get('/coords', async (req, res) => {

    // Récuperations des coords
    try {
        const result = await Coords.find({}).exec();
        res.status(200).json({ message: 'Coordonnées GPS récupéré succès', result: result });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des coordonnées GPS' });
    }
});

// Définition du schéma Mongoose
const postScheme = new mongoose.Schema({
    installed: Boolean,
    device: String
});
// Modèle Mongoose basé sur le schémas
const PostInstallModel = mongoose.model('post-install', postScheme);

// Endpoint enrgistrer des stats device
app.post('/post-install', async (req, res) => {
    // Récupère les données envoyées dans le corps de la requête
    const { installed, device } = req.body;

    // Vérifie que les données
    if (!installed || !device) {
        return res.status(400).json({ error: 'Données devices manquantes' });
    }

    // Crée un nouvel enregistrement dans la base de données
    try {
        await PostInstallModel.create({ installed, device });
        res.status(200).json({ message: 'Nouveau device sauvegardé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement du device' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
});
