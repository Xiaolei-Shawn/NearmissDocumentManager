'use strict';

angular.module('app').
    directive('form', function () {
    return {
        controller: function($scope){
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
            }

            $scope.cancel = function(){
                alert('Form canceled..');
            }
        },
        templateUrl: 'directives/reportTemplate/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
});
