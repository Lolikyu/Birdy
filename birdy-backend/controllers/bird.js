const Bird = require('../models/bird');
const User = require('../models/user');

exports.getBirdsFiltre = (req, res, next) => {
    Bird.find({ content: { $regex: req.body.keyword, $options: "i" } })
      .then((birds) => {res.status(200).json(birds)})
      .catch((error) => {res.status(500).json({ message: "Erreur de lecture de Bird filtré" });
      });
};

exports.getBirdById = (req, res, next) => {
    Bird.findById(req.body.idBird)
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
            idUser: req.body.idUser,
            pseudo: req.body.pseudo,
            avatar: req.body.avatar,
            content: req.body.content,
            date: req.body.date,
            heure: req.body.heure,
            isPublic: req.body.isPublic,
            isComment: req.body.isComment,
            isRebird: req.body.isRebird,
            dateDepuis70: req.body.dateDepuis70,
            commentaires: req.body.commentaires,
            likes: req.body.likes,
            rebirds: req.body.rebirds
        }
    );
    bird.save()
    .then(() => {
        User.updateOne({_id: req.body.idUser}, {$push: {birds: bird.id}})
        .then (() => {
            if (bird.isComment) {
            Bird.updateOne({_id: bird.isComment}, {$push: {commentaires: bird.id}})
            .then(() => res.status(201).json ({ message: 'Bird posté !', id: bird.id }))
            .catch(error => res.status(400).json({ message : "Erreur d'update du Bird cible dans la BDD" }))
            }
            else {
                res.status(201).json ({ message: 'Bird posté !', id: bird.id });
            }
        }
        )
        .catch((error) => { res.status(500).json({ error })})
    }
    )
    .catch(error => res.status(400).json({ message : 'Erreur de sauvegarde du Bird dans la BDD' }));
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

exports.getBirdsByPageConnected = (req, res, next) => {
    const nb = 6;
    var nbskip = nb * req.body.page;

    Bird.find(
        { $or: [{ idUser: req.body.idUser },
                { idUser: { $in: req.body.follows } },
                { isPublic: true }]},
        null,
        { sort: { dateDepuis70: -1 }, skip: nbskip, limit: nb }
    )
    .then((birds) => res.status(201).json(birds))
    .catch((error) =>res.status(400).json({ message: "Erreur de getBirdsByPageConnected" }));
};

exports.getBirdsByPageDisconnected = (req, res, next) => {
    const nb = 6;
    var nbskip = nb * req.body.page;

    Bird.find (
        {isPublic: true},
        null,
        { sort: { dateDepuis70: -1 }, skip: nbskip, limit: nb }
    )
    .then(birds => res.status(201).json(birds))
    .catch(error => res.status(400).json({ message : "Erreur de getBirdsByPageDisconnected" }))
};

exports.getBirdsByPageProfileBirds = (req, res, next) => {
    const nb = 6;
    var nbskip = nb * req.body.page;

    Bird.find(
        { idUser: req.body.idUser },
        null,
        { sort: { dateDepuis70: -1 }, skip: nbskip, limit: nb }
    )
    .then((birds) => res.status(201).json(birds))
    .catch((error) =>res.status(400).json({ message: "Erreur de getBirdsByPageProfileBirds" }));
};

exports.getBirdsByPageListeId = (req, res, next) => {
    const nb = 6;
    var nbskip = nb * req.body.page;

    Bird.find(
        { _id: {$in: req.body.listeId} },
        null,
        { sort: { dateDepuis70: -1 }, skip: nbskip, limit: nb }
    )
    .then((birds) => res.status(201).json(birds))
    .catch((error) =>res.status(400).json({ message: "Erreur de getBirdsByPageListeId" }));
};