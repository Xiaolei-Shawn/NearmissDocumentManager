var express = require('express');
var router = express.Router();

var templates = require('./services/templates.service');
var auth = require('./services/auth.service');

router.post('/muser', auth.login);

router.get('/template/:id', templates.getOne});

router.post('/template/', templates.create);

router.put('/template/:id', templates.update);

router.delete('/template/:id', template.delete);