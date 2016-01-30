var express = require('express');
var router = express.Router();

router.get('/templates/:id', function(req, res, next){
	var template = null;
	var id = req.params.id;

	//Get specific template by given id from db

	template !== null ? res.json(template) : res.json({"STATUS": "404 NOT FOUND"})
});

router.post('/template' function(req, res, next){
	var template = req.body();

	//Push the new template to db
	res.json({"STATUS": "200 OK"});
});