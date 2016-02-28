var express = require('express');
var router = express.Router();
var templates = require('services/templates.service');
var auth = require('services/auth.service');

router.post('/mlogin', auth.login);

router.get('/template/:id', templates.getOne);

router.get('/templates', templates.getAll);

router.post('/template/', templates.create);

router.put('/template/:id', templates.update);

router.delete('/admin/template/:id', templates.delete);

module.exports = router;