const express = require('express');
const birdCtrl = require('../controllers/bird.js');
const router = express.Router();

router.post('/getBirds', birdCtrl.getBirds);
router.post('/getBirdsFiltre', birdCtrl.getBirdsFiltre);
router.post('/getBirdsFiltreIdList', birdCtrl.getBirdsFiltreIdList);
router.post('/postBird', birdCtrl.postBird);
router.post('/modifyBird', birdCtrl.modifyBird);
router.post('/deleteBird', birdCtrl.deleteBird);

module.exports = router;