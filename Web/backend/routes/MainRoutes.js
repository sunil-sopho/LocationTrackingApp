
var express = require('express');
var mainController = require('../controllers/MainController');
var router = express.Router();
var app = require('../../ApplicationInstance');

// get req
router.route('/').get(mainController.map);   // for admin login -- No signup process as it's internal and only add users exists
router.route('/map').get(mainController.map);


// post req
// router.route('/map').post(mainController.post);



module.exports = router;