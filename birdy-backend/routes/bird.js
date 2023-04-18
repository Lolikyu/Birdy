const express = require('express');
const router = express.Router();
const birdCtrl = require('../controllers/bird.js');
const auth = require('../middleware/auth');

router.post('/postBird', birdCtrl.postBird);
router.post('/getBirds', birdCtrl.getBirds);
router.post('/getBirdsFiltre', birdCtrl.getBirdsFiltre);
router.post('/modifyBird', birdCtrl.modifyBird);
router.post('/getBirdsFiltreIdList', birdCtrl.getBirdsFiltreIdList);

module.exports = router;