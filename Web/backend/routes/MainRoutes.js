
var express = require('express');
var mainController = require('../controllers/MainController');
var router = express.Router();
var app = require('../../ApplicationInstance');

// get req
router.route('/').get(mainController.home);   // for admin login -- No signup process as it's internal and only add users exists
router.route('/map').get(mainController.map);
router.route('/users').get(mainController.user);



// post req
router.route('/getUserList').post(mainController.userList);
router.route('/usrCreate').post(mainController.userCreate);



module.exports = router;