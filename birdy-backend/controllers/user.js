const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
  
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
                    listeAmis: []
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
                            listeAmis: user.listeAmis
                            //token: jwt.sign({ userId: user._id },'BIRDY_TOKEN_SECRET',{ expiresIn: '24h' })}
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
                    return res.status(200).json(
                        {
                            message: 'Erreur, utilisateur introuvable',
                            isConnected: false,
                            userInfos: {id:'non défini'}
                        }
                    );
                }
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(201).json(
                                    { 
                                        message: 'Mot de passe incorrect !',
                                        isConnected:false,userInfos:{id:'non défini'}
                                    }
                                );
                            }
                            res.status(200).json(
                                { 
                                    message:'Utilisateur dans la base',
                                    isConnected:true,
                                    userInfos:{
                                        id: user._id,
                                        pseudo: user.pseudo,
                                        email: user.email,
                                        nom: user.nom,
                                        prenom: user.prenom,
                                        dateNaissance: user.dateNaissance,
                                        avatar: user.avatar,
                                        listeAmis: user.listeAmis
                                        //token: jwt.sign({ userId: user._id },'BIRDY_TOKEN_SECRET',{expiresIn:'24h'})
                                    }
                                }
                            );
                        })
                        .catch(error => res.status(201).json({ isConnected:false}));
                }
            }
        )
        .catch(error => res.status(200).json({ isConnected:false}));
 };