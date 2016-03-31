(function () {

    'use strict';

    angular
        .module('app')
        .controller('TemplateCtrl', Controller);

    function Controller($window, ReportTemplateService, FlashService) {

        var vm = this;

        // The model object that we reference
        // on the <formly-form> element in index.html
        vm.model = {};
        vm.options = {};
        vm.buttonDisabled = false;
        vm.createTemplate = createTemplate;

        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the <formly-form> element
        vm.fields = [
            {
                key: 'templateType',
                type: 'select',
                templateOptions: {
                    label: 'Report Template Type',
                    // Call our province service to get a list
                    // of provinces and territories
                    options: [
                        {name: ' Nearmiss report template', value: 'nearmiss'},
                        {name: ' Incident report template ', value: 'incident'},
                        {name: ' Idea report template ', value: 'idea'},
                        {name: ' Quality deviation report template', value: 'quality '}
                    ],
                    required:true
                }

            },


            {
                "type": "checkbox",
                "key": "company",
                "templateOptions": {
                    "label": "Company"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "name",
                "templateOptions": {
                    "label": "Full Name"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "department",
                "templateOptions": {
                    "label": "Department"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "phone",
                "templateOptions": {
                    "label": "Phone Number"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "email",
                "templateOptions": {
                    "label": "Email"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "date",
                "templateOptions": {
                    "label": "Date"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "time",
                "templateOptions": {
                    "label": "Time"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "severityLevel",
                "templateOptions": {
                    "label": "Severity Level"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "cause",
                "templateOptions": {
                    "label": "Cause"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "consequences",
                "templateOptions": {
                    "label": "Consequences"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "location",
                "templateOptions": {
                    "label": "Location"
                },
                hideExpression: '!model.templateType'
            },
            {
                "type": "checkbox",
                "key": "others",
                "templateOptions": {
                    "label": "Other Details"
                },
                hideExpression: '!model.templateType'
            }

        ];




        function createTemplate() {
            ReportTemplateService.CreateNewTemplate(vm.model)
                .then(function () {
                    vm.buttonDisabled = true;
                    FlashService.Success('The template has been successfully created !');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

    }

})();
