(function () {
    'use strict';

    angular
        .module('app')
        .controller('TempCtrl', Controller);

    function Controller(ReportTemplateService, FlashService,$scope) {
        var vm = this;
        vm.templates = null;
        initController();

        function initController() {
            // get all templates from database
            ReportTemplateService.GetAllTemplates().then(function (templates) {
                vm.templates = templates;
                //console.log("templates" + vm.templates);

            });
        }
    }

})();