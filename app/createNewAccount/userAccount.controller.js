(function() {

    'use strict';

    angular
        .module('app')
        .controller('AccountCtrl', Controller);

    function Controller() {

        var vm = this;

        vm.model = {};
        vm.options = {};


        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the <formly-form> element
        vm.fields = [
            {
                key: 'firstname',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'First Name',
                    placeholder: 'Enter your first name',
                    required:'true'
                }
            },
            {
                key: 'lastname',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Last Name',
                    placeholder: 'Enter your last name',
                    required:'true'

                }
            },
            {
                key: 'phone',
                type: 'input',
                templateOptions: {
                    label: 'Phone number',
                    placeholder: 'Enter your phone number',
                    required:'true'
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter your Email',
                    required:'true'
                }
            }


        ];
    }

})();