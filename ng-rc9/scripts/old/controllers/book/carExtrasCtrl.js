'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('carExtrasCtrl', function ($scope, $log, $rootScope, $state, toaster, apis) {
            $log.info("carExtrasCtrl");
            //$log.info("carExtrasCtrl");
            $scope.filterExtrasData = {};
            $scope.validateExtras = function () {
                $rootScope.canGoStep = 3;
                //$scope.showTab(3);
                $state.go("book_car_details");
            };

            $scope.showExtraBtnSection = false;
            $scope.getVehExtraInfo = function () {
                var car_val = $rootScope.selCarObj;
                $scope.vehExtraObj = {
                    car_id: car_val.id,
                    company_name: car_val.company_name,
                    currency: $scope.getCurCurrency(),
                };
                //$log.info($scope.vehExtraObj);
                apis.vehExtra.get($scope.vehExtraObj).$promise.then(function (res) {
                    $log.info(res);
                    $rootScope.selCarVehExtraObj = res.data;
                    $rootScope.canGoStep = 2;
                    $scope.showExtraBtnSection = true;

                    // $scope.showTab(2);
                }, function (error) {
                    console.log(error);
                    if (error.data) {
                        toaster.pop({
                            type: 'error',
                            title: "Error!",
                            body: error.data.message,
                            showCloseButton: true
                        });
                    }
                });
            };

            $scope.initExtras = function () {

                if ($rootScope.selCarObj) {
                    $scope.setSearchCounter();
                    //$rootScope.selCarVehExtraObj = {};
                    $log.info($rootScope.selCarObj.selling_price);
                    $scope.getCurrencyList();
                    $scope.getLocationList();
                    $scope.getVehExtraInfo();
                }
                else {
                    $state.go("book_car");
                }
            };
            $scope.$on('$destroy', function () {
                $scope.doStopSearchCounter();
            });

            $rootScope.totalExtraAmount = 0;
            $scope.setFilterExtraData = function () {
                $rootScope.totalExtraAmount = 0;
                angular.forEach($scope.filterExtrasData, function (val, key) {
                    if (val != "") {
                        var val2 = angular.fromJson(val);
                        $rootScope.totalExtraAmount = $rootScope.totalExtraAmount + parseFloat(val2.cost);
                    }
                });
                $rootScope.totalExtraAmount = (Math.round($rootScope.totalExtraAmount * 100) / 100);
                // console.log($rootScope.totalExtraAmount);
            };

        });
