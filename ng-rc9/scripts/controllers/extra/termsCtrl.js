'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactusCtrl
 * @description
 * # contactusCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('termsCtrl', function ($scope, $rootScope, $http) {

            $scope.initData = function () {
                $scope.termsObj = {};
                $scope.getTermsData();
            };
            $scope.getTermsData = function () {
                var lang = $scope.getAppSelectedLanguage();
                $http.get('l10n/json/extra/' + lang + '/terms.json').success(function (data) {
                    var data = angular.fromJson(data);
                    $scope.termsObj = data;

                }).error(function (data, status, error, config) {
                    //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                });
            };

        });

