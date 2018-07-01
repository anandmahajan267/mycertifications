'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactusCtrl
 * @description
 * # contactusCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('pdpaCtrl', function ($scope, $rootScope, $http) {

            $scope.initData = function () {
                $scope.pdpaObj = {};
                $scope.getpdpaData();
            };
            $scope.getpdpaData = function () {
                var lang = $scope.getAppSelectedLanguage();
                $http.get('l10n/json/extra/' + lang + '/pdpa.json').success(function (data) {
                    var data = angular.fromJson(data);
                    $scope.pdpaObj = data;

                }).error(function (data, status, error, config) {
                    //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                });
            };

        });

