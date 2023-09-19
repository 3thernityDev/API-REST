// Importation des dépendances
import mongoose from "mongoose";

// Modèle JSON pour la base de données
const userSchema = new mongoose.Schema(
    {
        // Définition des champs du schéma
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
        pseudo: {
            type: String,
            required: true,
        },
        age: {
            type: Date,
            required: true,
        },
        genre: {
            type: String,
        },
        mail: {
            type: String,
            required: true,
        },
    },
    {
        // Options du schéma
        timestamps: true, // Crée automatiquement les champs "createdAt" et "updatedAt"
    }
);

// Création d'un modèle à partir du schéma
export default mongoose.model("User", userSchema);
