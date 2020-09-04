var express = require('express');
var router = express.Router();
var sendEmail = require('../controllers/sendMailController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getEmailCode', sendEmail.getEmailCode);
router.post('/codeEmailLogin', sendEmail.codeEmailLogin);
module.exports = router;
