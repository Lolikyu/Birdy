const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');
const auth = require('../middleware/auth');

router.post('/inscription', userCtrl.Inscription);
router.post('/connexion', userCtrl.Connexion);

module.exports = router;