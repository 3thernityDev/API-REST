import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
// ============= \\
//      READ      \\
// =============== \\

// Fonction de lecture des posts
export const getUser = async (req, res) => {
    // Récuperation des posts
    const users = await userModel.find();
    // Réponse 200 plus envoie des posts sous format json
    res.status(200).json(users);
};

// ============= \\
//     CREATE     \\
// =============== \\

// Fonction pour créer un post
export const createUser = async (req, res) => {
    // On vérifie que les champs ont bien été remplis
    if (
        !req.body.nom ||
        !req.body.prenom ||
        !req.body.pseudo ||
        !req.body.age ||
        !req.body.mail
    ) {
        // res.status(400) correspond à l'envoi d'une mauvaise requête erreur 400
        return res
            .status(400)
            .json({ message: "Merci de remplir tous les champs!" });
    }

    // Création d'un nouveau post dans la base de données
    const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        age: req.body.age,
        mail: req.body.mail,
        genre: req.body.genre,
    });

    try {
        // Enregistrement du post en base de données
        const savedUser = await newUser.save();
        // Réponse avec le post créé
        res.status(201).json(savedUser);
    } catch (error) {
        // En cas d'erreur, répondre avec une erreur 500 (erreur serveur)
        console.error(
            "Erreur lors de l'enregistrement de l'utilisateur : " + error
        );
        res.status(500).json({
            message:
                "Une erreur s'est produite lors de l'enregistrement de l'utilisateur.",
        });
    }
};

// ============= \\
//      EDIT      \\
// =============== \\

// Fonction pour editer un post
export const editUser = async (req, res) => {
    // Localisation du post a modifier par son id
    const user = await userModel.findById(req.params.id);

    // On verifie si le poste selectionner existe
    if (!user) {
        res.status(400).json({
            message: "L'utilisateur selectionner n'existe pas!!",
        });
    }

    // Mise à jour du post
    const updateUser = await userModel.findByIdAndUpdate(user, req.body, {
        new: true,
    });

    res.status(200).json(updateUser);
};

// ============= \\
//     DELETE     \\
// =============== \\

export const deleteUser = async (req, res) => {
    // Localisation du post a supprimer
    const user = await userModel.findById(req.params.id);

    // On verifie si le poste selectionner existe
    if (!user) {
        res.status(400).json({
            message: "L'utilisateur selectionner n'existe pas!",
        });
    }

    // Suppression du post
    // const removePost = await postModel.findByIdAndDelete(post, req.body);

    // res.status(200).json({
    //     message: "Le poste à été supprimer",
    // });

    // Seconde technique pour supprimer un post
    await user.deleteOne();
    res.status(200).json({
        message: "L'utilisateur à été supprimer",
    });
};

// // ============= \\
// //     LIKERS     \\
// // =============== \\

// // Pour liké un post
// export const likePost = async (req, res) => {
//     try {
//         await postModel
//             .findByIdAndUpdate(
//                 req.params.id,
//                 {
//                     $addToSet: { likers: req.body.userID },
//                 },
//                 { new: true }
//             )
//             .then((data) => res.status(200).send(data));
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };

// // Pour disliké un post
// export const dislikePost = async (req, res) => {
//     try {
//         await postModel
//             .findByIdAndUpdate(
//                 req.params.id,
//                 {
//                     $pull: { likers: req.body.userID },
//                 },
//                 { new: true }
//             )
//             .then((data) => res.status(200).send(data));
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };
