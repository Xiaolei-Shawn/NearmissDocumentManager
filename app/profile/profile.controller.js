(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', Controller);

    function Controller($location,UserService, FlashService) {
        var vm = this;
        vm.user = null;
        vm.updateUser = updateUser;
        vm.buttonDisabled = false;

       // vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function updateUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('Your profile has been updated !');
                    vm.buttonDisabled = true;
                   // $location.path ('/#/home');

                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

/*        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $location.path ('');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }*/

    }

})();