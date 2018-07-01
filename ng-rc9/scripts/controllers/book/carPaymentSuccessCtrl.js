'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('carPaymentSuccessCtrl', function ($scope, $log, $rootScope, $state, toaster, apis, $localStorage) {


            $scope.initPaymentSuccess = function () {
                if ($localStorage.selCarObj) {
                    $scope.selCarObj = $localStorage.selCarObj;
                    //delete $rootScope.selCarObj;
                }
                else {
                    $state.go("book_car");
                }
            };



        });
