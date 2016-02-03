var templates = {
 
  getAll: function(req, res) {
    var allProducts = data; // Spoof a DB call
    res.json(allProducts);
  },
 
  getOne: function(req, res) {
    var template = null;
    var id = req.params.id;

    //Get specific template by given id from db

    template !== null ? res.json(template) : res.json({"STATUS": "404 NOT FOUND"})
  },
 
  create: function(req, res) {
    var template = req.body();

    //Push the new template to db
    res.json({"STATUS": "200 OK"});
  },
 
  update: function(req, res) {
    var updateTemplate = req.body;
    var id = req.params.id;
    //Update specific template in db

    res.json(updateProduct);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    //Delete specific template from bd
    
    res.json(true);
  }
};

module.export = templates;