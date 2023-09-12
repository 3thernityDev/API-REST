// Creation du server express
import express from "express";
const app = express();
const port = 3000;

// Route

// Ecoute sur le port 3000
app.listen(port, () => console.log("Serveur en ligne sur le port 3000"));
