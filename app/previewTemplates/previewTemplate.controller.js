(function () {
    'use strict';

    angular
        .module('app')
        .controller('TempCtrl', Controller);

    function Controller(ReportTemplateService, FlashService) {
        var vm = this;
        vm.templates = null;
        initController();

        function initController() {
            // get current user
            ReportTemplateService.GetAllTemplates.then(function (templates) {
                vm.templates = templates;
                console.log("templates" + vm.templates);
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