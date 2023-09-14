import postModel from "../models/post.model.js";
import Post from "../models/post.model.js";

// ============= \\
//      READ      \\
// =============== \\

// Fonction de lecture des posts
export const getPost = async (req, res) => {
    // Récuperation des posts
    const posts = await postModel.find();
    // Réponse 200 plus envoie des posts sous format json
    res.status(200).json(posts);
};

// ============= \\
//     CREATE     \\
// =============== \\

// Fonction pour créer un post
export const createPost = async (req, res) => {
    // On vérifie que les champs ont bien été remplis
    if (!req.body.message || !req.body.author) {
        // res.status(400) correspond à l'envoi d'une mauvaise requête erreur 400
        return res
            .status(400)
            .json({ message: "Merci de remplir tous les champs!" });
    }

    // Création d'un nouveau post dans la base de données
    const newPost = new Post({
        message: req.body.message,
        author: req.body.author,
    });

    try {
        // Enregistrement du post en base de données
        const savedPost = await newPost.save();
        // Réponse avec le post créé
        res.status(201).json(savedPost);
    } catch (error) {
        // En cas d'erreur, répondre avec une erreur 500 (erreur serveur)
        console.error("Erreur lors de l'enregistrement du post : " + error);
        res.status(500).json({
            message:
                "Une erreur s'est produite lors de l'enregistrement du post.",
        });
    }
};

// ============= \\
//      EDIT      \\
// =============== \\

// Fonction pour editer un post
export const editPost = async (req, res) => {
    // Localisation du post a modifier par son id
    const post = await postModel.findById(req.params.id);

    // On verifie si le poste selectionner existe
    if (!post) {
        res.status(400).json({
            message: "Le poste selectionner n'existe pas!!",
        });
    }

    // Mise à jour du post
    const updatePost = await postModel.findByIdAndUpdate(post, req.body, {
        new: true,
    });

    res.status(200).json(updatePost);
};

// ============= \\
//     DELETE     \\
// =============== \\

export const deletePost = async (req, res) => {
    // Localisation du post a supprimer
    const post = await postModel.findById(req.params.id);

    // On verifie si le poste selectionner existe
    if (!post) {
        res.status(400).json({
            message: "Le poste selectionner n'existe pas!",
        });
    }

    // Suppression du post
    // const removePost = await postModel.findByIdAndDelete(post, req.body);

    // res.status(200).json({
    //     message: "Le poste à été supprimer",
    // });

    // Seconde technique pour supprimer un post
    await post.deleteOne();
    res.status(200).json({
        message: "Le poste à été supprimer",
    });
};

// ============= \\
//     LIKERS     \\
// =============== \\

// Pour liké un post
export const likePost = async (req, res) => {
    try {
        await postModel
            .findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likers: req.body.userID },
                },
                { new: true }
            )
            .then((data) => res.status(200).send(data));
    } catch (err) {
        res.status(400).json(err);
    }
};

// Pour disliké un post
export const dislikePost = async (req, res) => {
    try {
        await postModel
            .findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likers: req.body.userID },
                },
                { new: true }
            )
            .then((data) => res.status(200).send(data));
    } catch (err) {
        res.status(400).json(err);
    }
};
