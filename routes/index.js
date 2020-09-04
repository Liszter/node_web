var express = require('express');
var router = express.Router();
var userList = require('../controllers/userListController'); 
var userLogin = require('../controllers/loginController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('welcome');
  });
router.get('/checkUserIsExisit', userList.checkUserIsExisit);
router.get('/cheackUser', userList.cheackUser);
router.get('/getUserInfo', userList.getUserInfo);
router.post('/getCode', userLogin.getCode);
router.post('/codePhoneLogin', userLogin.codePhoneLogin);


module.exports = router;

