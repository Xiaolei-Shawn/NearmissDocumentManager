/**
 * Created by bettyzhaozhao on 16/2/25.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Nearmiss.IndexController', Controller);

    function Controller($scope, FormService) {
        // preview reportTemplate mode
        $scope.previewMode = false;

        // new reportTemplate
        $scope.form = {};
       // $scope.reportTemplate.form_id = 1;
       // $scope.reportTemplate.form_name = 'Nearmiss report Template';
        $scope.form.form_fields = [];

        // previewForm - for preview purposes, reportTemplate will be copied into this
        // otherwise, actual reportTemplate might get manipulated in preview mode
        $scope.previewForm = {};

        // add new field drop-down:
        $scope.addField = {};
        $scope.addField.types = FormService.fields;
        $scope.addField.new = $scope.addField.types[0].name;
        $scope.addField.lastAddedID = 0;

        // accordion settings
        $scope.accordion = {};
        $scope.accordion.oneAtATime = true;

        // create new field button click
        $scope.addNewField = function(){

            // incr field_id counter
            $scope.addField.lastAddedID++;

            var newField = {
                "field_id" : $scope.addField.lastAddedID,
                "field_title" : "New field - " + ($scope.addField.lastAddedID),
                "field_type" : $scope.addField.new,
                "field_value" : "",
                "field_required" : true,
                "field_disabled" : false
            };

            // put newField into fields array
            $scope.form.form_fields.push(newField);
        };

        // deletes particular field on button click
        $scope.deleteField = function (field_id){
            for(var i = 0; i < $scope.form.form_fields.length; i++){
                if($scope.form.form_fields[i].field_id == field_id){
                    $scope.form.form_fields.splice(i, 1);
                    break;
                }
            }
        };

        // add new option to the field
        $scope.addOption = function (field){
            if(!field.field_options)
                field.field_options = new Array();

            var lastOptionID = 0;

            if(field.field_options[field.field_options.length-1])
                lastOptionID = field.field_options[field.field_options.length-1].option_id;

            // new option's id
            var option_id = lastOptionID + 1;

            var newOption = {
                "option_id" : option_id,
                "option_title" : "Option " + option_id,
                "option_value" : option_id
            };

            // put new option into field_options array
            field.field_options.push(newOption);
        };

        // delete particular option
        $scope.deleteOption = function (field, option){
            for(var i = 0; i < field.field_options.length; i++){
                if(field.field_options[i].option_id == option.option_id){
                    field.field_options.splice(i, 1);
                    break;
                }
            }
        };


        // preview reportTemplate
        $scope.previewOn = function(){
            if($scope.form.form_fields == null || $scope.form.form_fields.length == 0) {
                var title = 'Error';
                var msg = 'No fields added yet, please add fields to the reportTemplate before preview.';
                var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];

                $dialog.messageBox(title, msg, btns).open();
            }
            else {
                $scope.previewMode = !$scope.previewMode;
                $scope.form.submitted = false;
                angular.copy($scope.form, $scope.previewForm);
            }
        };

        // hide preview reportTemplate, go back to create mode
        $scope.previewOff = function(){
            $scope.previewMode = !$scope.previewMode;
            $scope.form.submitted = false;
        };

        // decides whether field options block will be shown (true for dropdown and radio fields)
        $scope.showAddOptions = function (field){
            if(field.field_type == "dropdown")
                return true;
            else
                return false;
        };

        // deletes all the fields
        $scope.reset = function (){
            $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
            $scope.addField.lastAddedID = 0;
        }

    }

})();


