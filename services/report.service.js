var dataService = require('services/data.service');

var report = {
	create : function(req, res){
    	var report = req.body;
        if(!report.reportid){
            res.json({"STATUS": "404 NOT FOUND", "ERROR": "INVALID, NO reportid"});
        } else {
            dataService.createReport(report)
              .then(function(report){
                res.json({"STATUS": "200 OK"});
            })
            .catch(function(err){
                res.json(err/*{"STATUS": "404 NOT FOUND", "ERROR": err}*/);
            });
        }
        
	},

    getOne : function(req, res){
        var id = req.params.id;

        dataService.getOneReport(id)
          .then(function(report){
            res.json(report);
        })
        .catch(function(err){
            res.json(err/*{"STATUS": "404 NOT FOUND", "ERROR": err}*/);
        });
    },
    getAll: function(req, res) {
        dataService.getAllReports()
         .then(function(allReports){
            res.json(allReports);
         })
         .catch(function(err){
            res.json();
         })
         .done();
    
    },
    update: function(req, res) {
    var report = req.body;
    var reportid = req.params.id;
    //Update specific report in db
    dataService.updateReport(report, reportid)
      .then(function(report){
        res.json({"STATUS": "200 OK"});
    })
    .catch(function(err){
        res.json(err);
    });
    },
   
    delete: function(req, res) {
      var id = req.params.id;
      //Delete specific report from bd
      dataService.deleteReport(id)
        .then(function(report){
          res.json({"STATUS": "200 OK"});
      })
      .catch(function(err){
          res.json(err);
      });
    }
};

module.exports = report;