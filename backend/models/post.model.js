// Importation des depedences
import mongoose from "mongoose";

// Models JSON pour la bdd
export const postSchema = mongoose.Schema(
    {
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
        timestamps: true,
    }
);