(function () {
    'use strict';

    angular
        .module('app')
        .controller('TempCtrl', Controller);

    function Controller(ReportTemplateService, FlashService) {
        var vm = this;
        vm.templates = null;
        //vm.updateUser = updateUser;
        vm.buttonDisabled = false;

        // vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            ReportTemplateService.GetAllTemplates.then(function (templates) {
                vm.templates = templates;
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