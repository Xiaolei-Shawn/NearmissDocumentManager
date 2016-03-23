(function () {

    'use strict';

    angular
        .module('app')
        .controller('NearmissCtrl', Controller);

    function Controller($window, ReportTemplateService, FlashService) {

        var vm = this;

        // The model object that we reference
        // on the <formly-form> element in index.html
        vm.model = {};
        vm.options = {};


        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the <formly-form> element
        vm.fields = [
            {
                "type": "checkbox",
                "key": "company",
                "templateOptions": {
                    "label": "Company"
                }
            },
            {
                "type": "checkbox",
                "key": "name",
                "templateOptions": {
                    "label": "Full Name"
                }
            },
            {
                "type": "checkbox",
                "key": "department",
                "templateOptions": {
                    "label": "Department"
                }
            },
            {
                "type": "checkbox",
                "key": "phone",
                "templateOptions": {
                    "label": "Phone Number"
                }
            },
            {
                "type": "checkbox",
                "key": "email",
                "templateOptions": {
                    "label": "Email"
                }
            },
            {
                "type": "checkbox",
                "key": "date",
                "templateOptions": {
                    "label": "Date"
                }
            },
            {
                "type": "checkbox",
                "key": "time",
                "templateOptions": {
                    "label": "Time"
                }
            },
            {
                "type": "checkbox",
                "key": "severityLevel",
                "templateOptions": {
                    "label": "Severity Level"
                }
            },
            {
                "type": "checkbox",
                "key": "cause",
                "templateOptions": {
                    "label": "Cause"
                }
            },
            {
                "type": "checkbox",
                "key": "consequences",
                "templateOptions": {
                    "label": "Consequences"
                }
            },
            {
                "type": "checkbox",
                "key": "location",
                "templateOptions": {
                    "label": "Location"
                }
            },
            {
                "type": "checkbox",
                "key": "others",
                "templateOptions": {
                    "label": "Other Details"
                }
            }

        ];
        vm.template = null;
        vm.createTemplate = createTemplate;

        function createTemplate() {
            ReportTemplateService.CreateNewTemplate(vm.fields)
                .then(function () {
                    FlashService.Success('The Nearmiss report template has been successfully submitted !');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();
