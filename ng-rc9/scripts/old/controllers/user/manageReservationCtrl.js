'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('manageReservationCtrl', function ($scope, $filter, $state, $rootScope, $log, toaster, $http, apis) {



            $scope.initReservation = function () {

                $log.info("manageReservationCtrl...");
                $scope.getReservation();
            };
            
            $scope.getReservation = function () {
                $scope.reservationList = [];
                apis.reservation.get().$promise.then(function (res) {
                    if (res.data) {
                        $log.info(res.data);
                        $scope.reservationList = res.data;
                    }
                }, function (error) {
                    if (error) {
                       
                    }



                });
            };







        });

