var dataService = require('services/data.service');

var report = {
	create : function(req, res){
	var report = req.body;

    dataService.createReport(report)
      .then(function(report){
        res.json({"STATUS": "200 OK"});
    })
    .catch(function(err){
        res.json(err/*{"STATUS": "404 NOT FOUND", "ERROR": err}*/);
    });
	}
};

module.exports = report;