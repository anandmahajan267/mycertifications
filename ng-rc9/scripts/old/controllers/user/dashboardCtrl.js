'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('dashboardCtrl', function ($scope, $filter, $state, $rootScope, $log, toaster, $http, apis) {



            $scope.initDashboard = function () {
                
                $log.info("dashboardCtrl...");
            };







        });

