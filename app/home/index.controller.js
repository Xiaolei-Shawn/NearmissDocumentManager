(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);


        var myApp = angular.module('myApp');
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('My First Admin');
    // more configuration here later
    // ...
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

    function Controller(UserService) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
    }

})();