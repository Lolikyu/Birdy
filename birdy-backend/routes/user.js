const express = require('express');
const userCtrl = require('../controllers/user.js');
const router = express.Router();

router.post('/inscription', userCtrl.Inscription);
router.post('/connexion', userCtrl.Connexion);
router.post('/checkEmail', userCtrl.CheckEmail);
router.post('/checkPseudo', userCtrl.CheckPseudo);
router.post('/getUserInfosById', userCtrl.GetUserInfosById);
router.post('/getUserInfosByPseudo', userCtrl.GetUserInfosByPseudo);

module.exports = router;