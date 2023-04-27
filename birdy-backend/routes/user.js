const express = require('express');
const userCtrl = require('../controllers/user.js');
const router = express.Router();

router.post('/inscription', userCtrl.Inscription);
router.post('/connexion', userCtrl.Connexion);
router.post('/checkemail', userCtrl.CheckEmail);
router.post('/checkpseudo', userCtrl.CheckPseudo);
router.post('/getuserinfos', userCtrl.GetUserInfos);

module.exports = router;