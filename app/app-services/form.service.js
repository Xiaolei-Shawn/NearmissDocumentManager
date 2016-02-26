/**
 * Report template service
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('FormService', Service);

    var formsJsonPath = 'sample_forms.json';

    function Service($http) {
        return {
            fields:[
                {
                    name : 'textfield',
                    value : 'Name'
                },
                {
                    name : 'dropdown',
                    value : 'Reporter'
                },
                {
                    name : 'textfield',
                    value : 'Department'
                },
                {
                    name : 'textfield',
                    value : 'Phone Number'
                },
                {
                    name : 'email',
                    value : 'Email'
                },
                {
                    name : 'date',
                    value : 'Date'
                },
                {
                    name : 'dropdown',
                    value : 'Report Area'
                },
                {
                    name : 'dropdown',
                    value : 'Severity Level'
                },
                {
                    name : 'dropdown',
                    value : 'Location'
                },
                {
                    name : 'dropdown',
                    value : 'Consequence'
                },
                {
                    name : 'dropdown',
                    value : 'Cause'
                },
                {
                    name : 'dropdown',
                    value : 'Report Status'
                },
                {
                    name : 'textarea',
                    value : 'Other Details'
                }
            ],
            form:function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                return $http.get(formsJsonPath).then(function (response) {
                    var requestedForm = {};
                    angular.forEach(response.data, function (form) {
                        if (form.form_id == id) requestedForm = form;
                    });
                    return requestedForm;
                });
            },
            forms: function() {
                return $http.get(formsJsonPath).then(function (response) {
                    return response.data;
                });
            }
        };
    }

})();
