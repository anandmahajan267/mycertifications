'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactusCtrl
 * @description
 * # contactusCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('privacyPoliciesCtrl', function ($scope, $rootScope, $http) {

            $scope.initData = function () {
                $scope.ppObj = {};
                $scope.getPPData();
            };
            $scope.getPPData = function () {
                var lang = $scope.getAppSelectedLanguage();
                $http.get('l10n/json/extra/' + lang + '/privacyPolicies.json').success(function (data) {
                    var data = angular.fromJson(data);
                    $scope.ppObj = data;

                }).error(function (data, status, error, config) {
                    //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                });
            };


        });

