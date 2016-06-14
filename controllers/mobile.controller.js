var express = require('express');
var router = express.Router();
var auth = require('services/auth.service');

router.post('/mlogin', auth.login);

module.exports = router;