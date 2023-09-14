// Importataion de express
import express from "express";
import {
    createPost,
    deletePost,
    dislikePost,
    editPost,
    getPost,
    likePost,
} from "../controllers/post.controller.js";

// Mise en place du CRUD (Create, Read, Update, Delete)
export const router = express.Router();

// Read
router.get("/", getPost);

// Create
router.post("/", createPost);

// Update
router.put("/:id", editPost);

// Delete
router.delete("/:id", deletePost);

// Optionnel (like)
router.patch("/like-post/:id", likePost);

router.patch("/dislike-post/:id", dislikePost);
