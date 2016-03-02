var dataService = require('services/data.service');
var _ = require('lodash');

var template = {
 
  getOne: function(req, res) {
    var id = req.params.id;

    dataService.getOneTemplate(id)
      .then(function(template){
        res.json(template);
    })
    .catch(function(err){
        res.json(err/*{"STATUS": "404 NOT FOUND", "ERROR": err}*/);
    });
  },

 getAll: function(req, res) {
    dataService.getAllTemplates()
     .then(function(allTemplates){
        res.json(allTemplates);
     })
     .catch(function(err){
        res.json();
     })
     .done();
    
  },

  create: function(req, res) {
    var template = req.body;

    dataService.createTemplate(template)
      .then(function(template){
        res.json({"STATUS": "200 OK"});
    })
    .catch(function(err){
        res.json(err);
    });
  },
 
  update: function(req, res) {
    var updateTemplate = req.body;
    var id = req.params.id;
    //Update specific template in db
    dataService.updateTemplate(updateTemplate, id);
    res.json(updateProduct);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    //Delete specific template from bd
    dataService.deleteTemplate(id);
    res.json(true);
  }
  
};

module.exports = template;