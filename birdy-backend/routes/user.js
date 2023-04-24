const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');
const auth = require('../middleware/auth');

router.post('/inscription', userCtrl.Inscription);
router.post('/connexion', userCtrl.Connexion);
router.post('/checkemail', userCtrl.CheckEmail);
router.post('/checkpseudo', userCtrl.CheckPseudo);

module.exports = router;