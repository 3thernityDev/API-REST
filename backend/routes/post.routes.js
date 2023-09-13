// Importataion de express
import express from "express";

// Mise en place du CRUD (Create, Response, Update, Delete)
export const router = express.Router();

// Response
router.get("/", (req, res) => {
    res.json({ message: "Test" });
});

// Create
router.post("/", (req, res) => {
    console.log(req.body);
    res.json({ message: req.body.message });
});

// Update
router.put("/:id", (req, res) => {
    res.json({ messageId: req.params.id });
});

// Delete
router.delete("/:id", (req, res) => {
    res.json({
        message:
            "Le poste qui a pour id: " + req.params.id + " à été supprimer",
    });
});

// Optionnel (like)
router.patch("/like-post/:id", (req, res) => {
    res.json({
        message: "Le poste portant l'id:" + req.params.id + "à été liké !",
    });
});

router.patch("/dislike-post/:id", (req, res) => {
    res.json({
        message: "Le poste portant l'id:" + req.params.id + "à été disliké !",
    });
});
