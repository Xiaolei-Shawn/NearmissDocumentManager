/**
 * Created by bettyzhaozhao on 16/6/13.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReportCtrl', Controller);

    function Controller(ReportTemplateService, FlashService) {
        var vm = this;
        vm.reports = null;
        initController();

        function initController() {
            // get current user
            ReportTemplateService.GetAllReports().then(function (reports) {
                vm.reports = reports;
                console.log("reports" + vm.reports);
            });
        }
    }

})();