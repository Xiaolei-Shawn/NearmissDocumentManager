var express = require('express');
var router = express.Router();
var template = require('services/template.service');
var report = require('services/report.service');
var auth = require('services/auth.service');

//Mobile api

router.post('/mlogin', auth.login);

router.get('/template/:id', template.getOne);

router.post('/report/', report.create);

//Only for angular usage

router.get('/web/templates', template.getAll);

router.post('/web/template/', template.create);

router.put('/web/template/:id', template.update);

router.delete('/web/template/:id', template.delete);

module.exports = router;