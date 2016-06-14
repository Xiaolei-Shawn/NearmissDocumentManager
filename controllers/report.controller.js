var express = require('express');
var router = express.Router();
var template = require('services/template.service');
var report = require('services/report.service');
var auth = require('services/auth.service');

//Mobile user requests for token 
//router.post('/mlogin', auth.login);

//Common api

router.post('/report/', report.create);

router.get('/reports/', report.getAll);

router.get('/reports/:key/:value', report.getSome);

router.get('/report/:id', report.getOne);

router.get('/template/:id', template.getOne);

router.get('/templates', template.getAll);

router.post('/template/', template.create);

//Only for angular usage. Can't be accessed from mobile

router.put('/template/:id', template.update);

router.delete('/template/:id', template.delete);

router.put('/report/:id', report.update);

router.delete('/report/:id', report.delete);

module.exports = router;