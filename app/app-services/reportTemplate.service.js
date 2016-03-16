(function () {
    'use strict';

    angular
        .module('app')
        .factory('ReportTemplateService', Service);

    function Service($http, $q) {
        var service = {};
        //user use report template builder to build their own custom template
        service.CreateNewTemplate = CreateNewTemplate;
     //   service.CreateNewReport = CreateNewReport;
        service.Delete = Delete;

        return service;

        function CreateNewTemplate(template) {
            return $http.post('/api/templates', template).then(handleSuccess, handleError);
        }

/*        function CreateNewReport(report) {
            return $http.put('/api/reports/' + report).then(handleSuccess, handleError);
        }*/

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
