// Importataion de express
import express from "express";
import {
    createUser,
    deleteUser,
    editUser,
    getUser,
} from "../controllers/user.controller.js";

// Mise en place du CRUD (Create, Read, Update, Delete)
export const usersRouter = express.Router();

// Read
usersRouter.get("/", getUser);

// Create
usersRouter.post("/", createUser);

// Update
usersRouter.put("/:id", editUser);

// Delete
usersRouter.delete("/:id", deleteUser);

// Optionnel (like)
// router.patch("/like-post/:id", likePost);

// router.patch("/dislike-post/:id", dislikePost);
