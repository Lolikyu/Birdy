const express = require('express');
const userCtrl = require('../controllers/user.js');
const router = express.Router();

router.post('/inscription', userCtrl.inscription);
router.post('/connexion', userCtrl.connexion);
router.post('/FollowUser', userCtrl.followUser);
router.post('/UnfollowUser', userCtrl.unfollowUser);

router.post('/checkEmail', userCtrl.checkEmail);
router.post('/checkPseudo', userCtrl.checkPseudo);

router.post('/getUserInfosById', userCtrl.getUserInfosById);
router.post('/getUserInfosByPseudo', userCtrl.getUserInfosByPseudo);
router.post('/getUsersListeId', userCtrl.getUsersListeId);
router.post('/getUsersFiltre', userCtrl.getUsersFiltre);

module.exports = router;