var dataService = require('services/data.service');

var report = {
    create: function (req, res) {
        var report = req.body;

        dataService.createReport(report)
            .then(function (report) {
                res.status(200);
                res.json({"STATUS": "200 OK"});
            })
            .catch(function (err) {
                res.status(404);
                res.json(err/*{"STATUS": "404 NOT FOUND", "ERROR": err}*/);
            });
    },

    getOne: function (req, res) {
        var _id = req.params._id;

        dataService.getOneReport(_id)
            .then(function (report) {
                res.status(200);
                res.json(report);
            })
            .catch(function (err) {
                res.status(404);
                res.json(err/*{"STATUS": "404 NOT FOUND", "ERROR": err}*/);
            });
    },

    getAll: function (req, res) {
        dataService.getAllReports()
            .then(function (allReports) {
                res.status(200);
                res.json(allReports);
            })
            .catch(function (err) {
                res.status(404);
                res.json(err);
            })
            .done();

    },

    getSome: function (req, res) {
        var key = req.params.key;
        var value = req.params.value;
        dataService.getSomeReports(key, value)
            .then(function (someReports) {
                res.status(200);
                res.json(someReports);
            })
            .catch(function (err) {
                res.status(404);
                res.json(err);
            })
            .done();
    },

    update: function (req, res) {
        var report = req.body;
        var _id = req.params._id;
        //Update specific report in db
        dataService.updateReport(report, _id)
            .then(function (report) {
                res.status(200);
                res.json({"STATUS": "200 OK"});
            })
            .catch(function (err) {
                res.status(404);
                res.json(err);
            });
    },

    delete: function (req, res) {
        var _id = req.params._id;
        //Delete specific report from bd
        dataService.deleteReport(_id)
            .then(function (report) {
                res.status(200);
                res.json({"STATUS": "200 OK"});
            })
            .catch(function (err) {
                res.status(404);
                res.json(err);
            });
    }
};

module.exports = report;