var express = require('express');
var router = express.Router();
var template = require('services/template.service');
var report = require('services/report.service');
var auth = require('services/auth.service');

router.post('/mlogin', auth.login);

router.get('/template/:id', template.getOne);

/*
//Disable the following api from mobile user

router.get('/templates', template.getAll);

router.post('/template/', template.create);

router.put('/template/:id', template.update);

router.delete('/admin/template/:id', template.delete);

*/

router.post('/report/', report.create);

module.exports = router;