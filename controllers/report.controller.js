var express = require('express');
var router = express.Router();
var templates = require('services/templates.service');
var auth = require('services/auth.service');

router.post('/muser', auth.login);

router.get('/report/template/:id', templates.getOne);

router.get('/report/templates', templates.getAll);

router.post('/report/template/', templates.create);

router.put('/report/template/:id', templates.update);

router.delete('/report/admin/template/:id', templates.delete);

module.exports = router;