(function () {
    'use strict';
 
    angular
        .module('app')

        .controller('DashboardCtrl', Controller);
 
    function Controller(UserService) {
        var vm = this;
 
        vm.user = null;
 
    /*    initController();
 
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }*/
    }
 
})();
