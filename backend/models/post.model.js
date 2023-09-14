// Importation des dépendances
import mongoose from "mongoose";

// Modèle JSON pour la base de données
const postSchema = new mongoose.Schema(
    {
        // Définition des champs du schéma
        message: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        likers: {
            type: [String],
        },
    },
    {
        // Options du schéma
        timestamps: true, // Crée automatiquement les champs "createdAt" et "updatedAt"
    }
);

// Création d'un modèle à partir du schéma
export default mongoose.model("Post", postSchema);
