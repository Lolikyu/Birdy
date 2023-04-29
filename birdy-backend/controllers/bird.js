const Bird = require('../models/bird');
const User = require('../models/user');

//get : on filtre les birds > date du jour - 1 pour ne pas renvoyer une liste trop longue
exports.getBirdsFiltre = (req, res, next) => { 
    Bird.find(
        {
            dateDepuis70: {$gte: req.body.dateDebut, $lte: req.body.dateFin},
        }
    )
    .then(bird => res.status(201).json(bird))
    .catch(error => res.status(400).json({ message : "Erreur de lecture de Bird filtré" }))
};

exports.getBirds = (req, res, next) => {
    Bird.findById(req.body.idBird.idBirdCourant)
        .then(bird => res.status(201).json(bird))
        .catch(error => res.status(400).json({ message : "Erreur de lecture de Bird" }))
};

exports.getBirdsFiltreIdList = (req, res, next) => {
    Bird.find(
        {
            dateDepuis70: {$gte: req.body.dateDebut, $lte: req.body.dateFin},
            _id: {$in: req.body.listeIdBird}
        }
    )
    .then(bird => res.status(201).json(bird))
    .catch(error => res.status(400).json({ message : "Erreur de lecture de Bird filtré" }))
};

exports.postBird = (req, res, next) => {
    const bird = new Bird(
        {
            pseudo: req.body.pseudo,
            avatar: req.body.avatar,
            content: req.body.content,
            date: req.body.date,
            heure: req.body.heure,
            isPublic: req.body.isPublic,
            dateDepuis70: req.body.dateDepuis70,
            commentaires: req.body.commentaires,
            likes: req.body.likes,
            rebirds: req.body.rebirds
        }
    );
    bird.save()
    .then(() => {
        User.updateOne({_id: req.body.userId}, {$push: {birds: String(bird._id)}})
        .then (() => 
            res.status(201).json (
            {
                message: 'Bird posté !',
                birdInfos: 
                {   
                    id: bird._id,
                    pseudo: bird.pseudo,
                    avatar: bird.avatar,
                    content: bird.content,
                    date: bird.date,
                    heure: bird.heure,
                    isPublic: bird.isPublic,
                    dateDepuis70: bird.dateDepuis70,
                    commentaires: bird.commentaires,
                    likes: bird.likes,
                    rebirds: bird.rebirds
                }
            })
    
        )
        .catch((error) => { res.status(500).json({ error })})
    }
    )
    .catch(error => res.status(400).json({ message : 'Erreur de sauvegarde du Bird dans la BDD' }));
};

exports.modifyBird = (req, res, next) => {
    Bird.updateOne({_id: req.body.idBirdCible}, {$push: {commentaires: req.body.idBirdCommentaire}})
        .then(bird => res.status(201).json(bird))
        .catch(error => res.status(400).json({ message : "Erreur de modification de Bird" }))
};

exports.deleteBird = (req, res, next) => {
    User.updateMany({}, {$pull: {birds: req.body.idBird}})
    .then(() => 
        User.updateMany({}, {$pull: {likes: req.body.idBird}})
        .then(() => 
            User.updateMany({}, {$pull: {favorites: req.body.idBird}})
            .then(() => 
                Bird.deleteOne(
                    {
                        _id: req.body.idBird
                    }
                )
                .then(() => res.status(200).json({ message: "Bird supprimé !" }))
                .catch((error) => { console.log("erreur suppr"); res.status(500).json({ error })})
            )
            .catch((error) => { console.log("erreur update favs"); res.status(500).json({ error })})
        )
        .catch((error) => { console.log("erreur update likes"); res.status(500).json({ error })})
    )
    .catch((error) => { console.log("erreur update birds"); res.status(500).json({ error })})  
};

exports.likeBird = (req, res, next) => {
    Bird.updateOne({_id: req.body.idBirdCible}, {$push: {likes: req.body.idUser}})
    .then(() => {
        User.updateOne({_id: req.body.idUser}, {$push: {likes: req.body.idBirdCible}})
        .then(() => res.status(200).json({ message: "Bird liké" }))
        .catch((error) => { res.status(500).json({ error })})
    })
    .catch((error) => { res.status(500).json({ error })}) 
};

exports.dislikeBird = (req, res, next) => {
    Bird.updateOne({_id: req.body.idBirdCible}, {$pull: {likes: req.body.idUser}})
    .then(() => { 
        User.updateOne({_id: req.body.idUser}, {$pull: {likes: req.body.idBirdCible}})
        .then(() => res.status(200).json({ message: "Bird disliké" }))
        .catch((error) => { res.status(500).json({ error })})
    })
    .catch((error) => { res.status(500).json({ error })}) 
};

exports.favBird = (req, res, next) => {
    Bird.updateOne({_id: req.body.idBirdCible}, {$push: {favorites: req.body.idUser}})
    .then(() => {
        User.updateOne({_id: req.body.idUser}, {$push: {favorites: req.body.idBirdCible}})
        .then(() => res.status(200).json({ message: "Bird ajouté aux favoris" }))
        .catch((error) => { res.status(500).json({ error })})
    })
    .catch((error) => { res.status(500).json({ error })}) 
};

exports.unfavBird = (req, res, next) => {
    Bird.updateOne({_id: req.body.idBirdCible}, {$pull: {favorites: req.body.idUser}})
    .then(() => { 
        User.updateOne({_id: req.body.idUser}, {$pull: {favorites: req.body.idBirdCible}})
        .then(() => res.status(200).json({ message: "Bird retiré aux favoris" }))
        .catch((error) => { res.status(500).json({ error })})
    })
    .catch((error) => { res.status(500).json({ error })}) 
};