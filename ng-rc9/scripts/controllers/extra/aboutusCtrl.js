'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactusCtrl
 * @description
 * # contactusCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('aboutusCtrl', function ($scope, $rootScope, $http) {

            $scope.initData = function () {
                $scope.aboutusObj = {};
                $scope.getAboutUs();
            };
            $scope.getAboutUs = function () {
                var lang = $scope.getAppSelectedLanguage();
                $http.get('l10n/json/extra/' + lang + '/aboutus.json').success(function (data) {
                    var data = angular.fromJson(data);
                    $scope.aboutusObj = data;

                }).error(function (data, status, error, config) {
                    //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                });
            };

        });

