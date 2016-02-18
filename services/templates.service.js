var dbService = require('services/db.service');

var templates = {
 
  getAll: function(req, res) {
    var allTemplates = dbService.getAllTemplates();
    res.json(allTemplates);
  },
 
  getOne: function(req, res) {
    var id = req.params.id;

    //Get specific template by given id from db
    var template = dbService.getOneTemplate(id);
    template !== null ? res.json(template) : res.json({"STATUS": "404 NOT FOUND"});
  },
 
  create: function(req, res) {
    var template = req.body();
    dbService.createTemplate(template);
    //Push the new template to db
    res.json({"STATUS": "200 OK"});
  },
 
  update: function(req, res) {
    var updateTemplate = req.body;
    var id = req.params.id;
    //Update specific template in db
    dbService.updateTemplate(updateTemplate, id);
    res.json(updateProduct);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    //Delete specific template from bd
    dbService.deleteTemplate(id);
    res.json(true);
  }
};

module.exports = templates;