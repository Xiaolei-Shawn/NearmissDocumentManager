var express = require('express');
var router = express.Router();
var template = require('services/template.service');
var report = require('services/report.service');

router.get('/template/:id', template.getOne);

router.get('/templates', template.getAll);

router.post('/template/', template.create);

router.put('/template/:id', template.update);

router.delete('/admin/template/:id', template.delete);

module.exports = router;