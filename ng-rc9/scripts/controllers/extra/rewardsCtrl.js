'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactusCtrl
 * @description
 * # contactusCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('rewardsCtrl', function ($scope, $rootScope, $http) {

            $scope.initData = function () {
                $scope.rewardsObj = {};
                $scope.getRewardsData();
            };
            $scope.getRewardsData = function () {
                var lang = $scope.getAppSelectedLanguage();
                $http.get('l10n/json/extra/' + lang + '/rewards.json').success(function (data) {
                    var data = angular.fromJson(data);
                    $scope.rewardsObj = data;

                }).error(function (data, status, error, config) {
                    //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                });
            };

        });

