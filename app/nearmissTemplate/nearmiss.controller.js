(function() {

    'use strict';

    angular
        .module('app')
        .controller('NearmissCtrl', Controller);

    function Controller(ReportTemplateService, FlashService) {

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
                key: 'company',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Company',
                    placeholder: 'Enter your Company'
                }
            },
            {
                key: 'name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Full name',
                    placeholder: 'Enter your full name'

                }
            },
            {
                key: 'department',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Department',
                    placeholder: 'Enter your department'
                }
            },
            {
                key: 'phone',
                type: 'input',
                templateOptions: {
                    label: 'Phone number',
                    placeholder: 'Enter your phone number'
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter your Email'
                }
            },

            {
                key: 'roles',
                type: 'radio',
                templateOptions: {
                    label: 'Roles',
                    options: [{id: 1, title : "Manager"}, {id: 2, title : "Employee"}],
                    valueProp: 'id',
                    labelProp: 'title'
                }
            },
            {
                template: '<hr />'
            },

            {
                key: 'date',
                type: 'datepicker',
                templateOptions: {
                    label: 'Date ',
                    datepickerPopup: 'dd-MMMM-yyyy'
                }
            },
            {
                key: 'time',
                type: 'timepicker',
                templateOptions: {
                    label: 'Time'
                }
            },
            {
                key: 'severityLevel',
                type: 'select',
                templateOptions: {
                    label: 'Severity Level',
                    // Call our province service to get a list
                    // of provinces and territories
                    options:[
                        {name:'Green', value: '1'},
                        {name:'Yellow', value: '2'},
                        {name:'Red', value: '3'}
                     ]
                }

            },
            {
                key: 'cause',
                type: 'select',
                templateOptions: {
                    label: 'Cause',
                    // Call our province service to get a list
                    // of provinces and territories
                    options: [
                        {name:' Technological Failure', value:'technological_failure'},
                        {name:' Working Environment ', value:'working_environmentt'},
                        {name:' Lack of Protective Equipment', value:'lack_of_protective_equipment'},
                        {name:' Disorder ', value:'disorder '},
                        {name:' Machinery and Equipment', value:'machinery_and_equipment'},
                        {name:' Unsafe Human Action ', value:'unsafe_human_action '}
                    ]
                }
            },
            {
                key: 'consequences',
                type: 'select',
                templateOptions: {
                    label: 'Consequences',
                    // Call our province service to get a list
                    // of provinces and territories
                    options: [
                        {name:' Personal Injury', value:'personal_injury'},
                        {name:' Machine Breakdown', value:'machine_breakdown'},
                        {name:' Fire ', value:'fire'},
                        {name:' Environment ', value:'environment '},
                        {name:' Damage', value:'damage'},
                        {name:' Other', value:'other'}
                    ]
                }

            },

            {
                key: 'location',
                type: 'select',
                templateOptions: {
                    label: 'Location',
                    options: [
                        {}
                    ]
                }

            },
            {
                key: 'details',
                type: 'textarea',
                templateOptions: {
                    "placeholder": "Please write down other details...",
                    "label": "Other details",
                    "rows": 4,
                    "cols": 15
                }
            }
 ];
    }

})();
