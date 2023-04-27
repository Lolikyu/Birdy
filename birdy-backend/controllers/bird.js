const Bird = require('../models/bird');

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
        .then(() => res.status(201).json (
            {
                message: 'Bird posté !',
                birdInfos: 
                {   id: bird._id,
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
            }
        ))
        .catch(error => res.status(400).json({ message : 'Erreur de sauvegarde du Bird dans la BDD' }));
};

exports.modifyBird = (req, res, next) => {
    Bird.updateOne({_id: req.body.idBirdCible}, {$push: {commentaires: req.body.idBirdCommentaire}})
        .then(bird => res.status(201).json(bird))
        .catch(error => res.status(400).json({ message : "Erreur de modification de Bird" }))
};

exports.deleteBird = (req, res, next) => {
    Bird.deleteOne(
        {
            _id: req.body.idBird
        }
    )
    .then(() => res.status(200).json({ message: "Bird supprimé !" }))
    .catch((error) => { res.status(500).json({ error })})
};
