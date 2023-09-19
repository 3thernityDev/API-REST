// Importation des dépendences
import express from "express";
import { router } from "./routes/post.routes.js";
import { connectDB } from "./config/db.js";
import { usersRouter } from "./routes/user.routes.js";

// Connexion a la BDD
connectDB();

// Creation du server express
const app = express();
const port = 3000;

// Middleware (permet de traiter les données des request)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ecoute sur le port spécifié
app.listen(port, () => console.log("Serveur en ligne sur le port " + port));

app.use("/post", router);
app.use("/user", usersRouter);