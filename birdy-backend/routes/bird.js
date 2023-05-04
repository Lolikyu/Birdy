const express = require('express');
const birdCtrl = require('../controllers/bird.js');
const router = express.Router();

router.post('/getBirdById', birdCtrl.getBirdById);
router.post('/getBirdsFiltre', birdCtrl.getBirdsFiltre);
router.post('/getBirdsFiltreIdList', birdCtrl.getBirdsFiltreIdList);
router.post('/postBird', birdCtrl.postBird);
router.post('/deleteBird', birdCtrl.deleteBird);
router.post('/likeBird', birdCtrl.likeBird);
router.post('/dislikeBird', birdCtrl.dislikeBird);
router.post('/favBird', birdCtrl.favBird);
router.post('/unfavBird', birdCtrl.unfavBird);
router.post('/getBirdsByPageConnected', birdCtrl.getBirdsByPageConnected);
router.post('/getBirdsByPageDisconnected', birdCtrl.getBirdsByPageDisconnected);
router.post('/getBirdsByPageProfileBirds', birdCtrl.getBirdsByPageProfileBirds);
router.post('/getBirdsByPageProfileLikes', birdCtrl.getBirdsByPageProfileLikes);
router.post('/getBirdsByPageProfileFavorites', birdCtrl.getBirdsByPageProfileFavorites);

module.exports = router;