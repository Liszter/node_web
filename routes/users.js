var express = require('express');
let fs = require('fs');
let multer = require('multer');
var router = express.Router();
var sendEmail = require('../controllers/sendMailController');
const dbconfig = require('../utils/dbconfig');



router.post('/uploadImg1', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/uploadImg', upload, sendEmail.uploadImage);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/getEmailCode', sendEmail.getEmailCode);
router.post('/codeEmailLogin', sendEmail.codeEmailLogin);
module.exports = router;