const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
  
exports.Inscription = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User(
                {
                    pseudo: req.body.pseudo,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    password: hash,
                    dateNaissance: req.body.dateNaissance,
                    avatar: req.body.avatar,
                    birds: req.body.birds,
                    follows: req.body.follows,
                    followers: req.body.followers,
                    likes: req.body.likes,
                    rebirds: req.body.rebirds,
                    favorites: req.body.favorites,
                }
            );
            user.save()
                .then(() => res.status(201).json(
                    {
                        message: 'Utilisateur créé !',
                        isConnected: true,
                        userInfos:
                        {
                            id: user._id,
                            pseudo: user.pseudo,
                            email: user.email,
                            nom: user.nom,
                            prenom: user.prenom,
                            dateNaissance: user.dateNaissance,
                            avatar: user.avatar,
                            birds: user.birds,
                            follows: user.follows,
                            followers: user.followers,
                            likes: user.likes,
                            rebirds: user.rebirds,
                            favorites: user.favorites,
                            token: jwt.sign({ userId: user._id, email: user.email }, 'BIRDY_SECRET_TOKEN', { expiresIn: '1h' })
                        }
                    }
                ))
                .catch(error => res.status(400).json({ message : 'Erreur de sauvegarde du User dans la BDD' }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.Connexion = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => 
            {
                if (!user) {
                    return res.status(401).json(
                        {
                            message: 'Erreur, utilisateur introuvable',
                            isConnected: false,
                            userInfos: null
                        }
                    );
                }
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json(
                                    {
                                        message: 'Mot de passe incorrect !',
                                        isConnected: false,
                                        userInfos: null
                                    }
                                );
                            }
                            res.status(200).json(
                                { 
                                    message: 'Utilisateur dans la base',
                                    isConnected: true,
                                    userInfos: {
                                        id: user._id,
                                        pseudo: user.pseudo,
                                        email: user.email,
                                        nom: user.nom,
                                        prenom: user.prenom,
                                        dateNaissance: user.dateNaissance,
                                        avatar: user.avatar,
                                        birds: user.birds,
                                        follows: user.follows,
                                        followers: user.followers,
                                        likes: user.likes,
                                        rebirds: user.rebirds,
                                        favorites: user.favorites,
                                        token: jwt.sign({ userId: user._id, email: user.email }, 'BIRDY_SECRET_TOKEN', { expiresIn: '1h' })
                                    }
                                }
                            );
                        })
                        .catch(error => res.status(201).json({ isConnected:false}));
                }
            }
        )
        .catch(error => res.status(200).json({ isConnected:false}));
}

exports.CheckEmail = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user){
                res.status(201).json(
                    {
                        message: 'Email déjà utilisé',
                        isValid: false
                    }
                );
            }
            else {
                res.status(201).json(
                    {
                        message: 'Email libre',
                        isValid: true
                    }
                );
            }
        })
        .catch(error => res.status(400).json({message : "Erreur CheckEmail"}));
}

exports.CheckPseudo = (req, res, next) => {
    User.findOne({ pseudo: req.body.pseudo })
        .then((user) => {
            if (user){
                res.status(201).json(
                    {
                        message: 'Pseudo déjà utilisé',
                        isValid: false
                    }
                );
            }
            else {
                res.status(201).json(
                    {
                        message: 'Pseudo libre',
                        isValid: true
                    }
                );
            }
        })
        .catch(error => res.status(400).json({message : "Erreur CheckPseudo"}));
}

exports.GetUserInfos = (req, res, next) => {
    User.findOne({ _id: req.body.id })
        .then((user) => {
            if (user){
                res.status(200).json(
                    { 
                        message:'Utilisateur dans la base',
                        isConnected: true,
                        userInfos:{
                            id: user._id,
                            pseudo: user.pseudo,
                            email: user.email,
                            nom: user.nom,
                            prenom: user.prenom,
                            dateNaissance: user.dateNaissance,
                            avatar: user.avatar,
                            birds: user.birds,
                            follows: user.follows,
                            followers: user.followers,
                            likes: user.likes,
                            rebirds: user.rebirds,
                            favorites: user.favorites
                        }
                    }
                );
            }
            else {
                res.status(201).json(
                    {
                        message: 'Erreur utilisateur non-trouvé',
                        isConnected: false
                    }
                );
            }
        })
        .catch(error => res.status(404).json({message : "Erreur utilisateur non-trouvé", isConnected: false}));
}