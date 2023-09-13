// Importation des dépendences
import mongoose from "mongoose";
import dotenv from "dotenv";

// Chargement des variables d'environnement
dotenv.config();

// Connexion BDD

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Force l'utilisation de l'ipV4 patch la non connexion a la bdd en LocalHost
            family: 4, // Force IPv4
        });
        console.log("Connexion à la base de données réussie");
    } catch (error) {
        console.error("Erreur de connexion à la base de données:", error);
    }
};
