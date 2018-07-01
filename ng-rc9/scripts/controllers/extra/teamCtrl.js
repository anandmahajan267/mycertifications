'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactusCtrl
 * @description
 * # contactusCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('teamCtrl', function ($scope, $rootScope, $http) {





            $scope.initData = function () {
                $scope.teamsObj = {};
                $scope.getTeams();
                
            };

            $scope.getTeams = function () {
                var lang = $scope.getAppSelectedLanguage();
                $http.get('l10n/json/extra/' + lang + '/team.json').success(function (data) {
                    var data = angular.fromJson(data);
                    $scope.teamsObj = data;

                }).error(function (data, status, error, config) {
                    //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                });
            };







        });

