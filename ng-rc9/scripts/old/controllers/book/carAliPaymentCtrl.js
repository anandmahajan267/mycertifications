'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('carAliPaymentCtrl', function ($scope, $log, $rootScope, $state, $interval, toaster, apis, $window, $location, $timeout, $localStorage) {

            console.log(123123);

            $scope.initAliPayment = function () {

                $scope.searchObject = $location.search();

                $scope.search = $location.$$url;
                $scope.search = $scope.search.replace($location.$$path, '');


                $interval(function () {
                    $scope.makealipaycompletepurchase();
                }, 1000, 1);
            };



            $scope.makealipaycompletepurchase = function () {
                $log.info($scope.searchObject);

                // return false;
                apis.alipaycompletepurchase.create($scope.searchObject).$promise.then(function (res) {
                    //$log.info(res);
                    toaster.pop({
                        type: 'success',
                        title: "Success!",
                        body: res.message,
                        showCloseButton: true
                    });

                    if (res.data) {
                        $scope.aliPayRes = res.data;
                        $scope.createTrans();
                    }
                }, function (error) {
                    $scope.showActionBtn = true;
                    if (error) {
                        toaster.pop({
                            type: 'error',
                            title: "Error!",
                            body: error.data.message,
                            showCloseButton: true
                        });

                    }
                });

            };
            //$scope.initAliPayment();

            $scope.createTrans = function (nonce) {
                $scope.showActionBtn = false;
                $scope.dataObj = $localStorage.dataObj;
                $scope.dataObj.trade_no = $scope.searchObject.trade_no;
                $scope.dataObj.total_fee = $scope.searchObject.total_fee;
                $scope.dataObj.out_trade_no = $scope.searchObject.out_trade_no;
                $scope.dataObj.trade_status = $scope.searchObject.trade_status;
                $scope.dataObj.currency = $scope.searchObject.currency;
               

                $scope.postTransObj = {
                    gateway: "alipay",
                    veh: $localStorage.selCarObj,
                    data: $scope.dataObj,
                };

                apis.transaction.create($scope.postTransObj).$promise.then(function (res) {
                    $log.info(res);
                    $rootScope.paymentSuccessObj = {};
                    toaster.pop({
                        type: 'success',
                        title: "Success!",
                        body: res.message,
                        showCloseButton: true
                    });

                    if (res.data) {
                        $rootScope.paymentSuccessObj = res.data;
                        $rootScope.canGoStep = 5;
                        //$scope.showTab(5);
                        $state.go("book_car_success");
                        $scope.showActionBtn = true;
                    }
                }, function (error) {
                    $scope.showActionBtn = true;
                    if (error) {
                        toaster.pop({
                            type: 'error',
                            title: "Error!",
                            body: error.data.message,
                            showCloseButton: true
                        });

                    }
                });
            };




        });
