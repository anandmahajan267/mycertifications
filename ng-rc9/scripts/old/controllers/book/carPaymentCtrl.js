'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('carPaymentCtrl', function ($scope, $log, $rootScope, $state, toaster, apis, $braintree, $locale, $window, $localStorage) {

            $scope.showAlipayBtn = true;
            $scope.getAliPayHtml = function () {

                $scope.dataObj = {
                    price: ($rootScope.selCarObj.selling_price + $rootScope.totalExtraAmount),
                    cust_id: $rootScope.carDetailsObj.id,
                    pickupID: $rootScope.searchParams.pickupID,
                    returnID: $rootScope.searchParams.returnID,
                    clientID: $rootScope.searchParams.clientID,
                    countryID: $rootScope.searchParams.countryID,
                    pickupDateTime: $rootScope.searchParams.pickupDateTime,
                    returnDateTime: $rootScope.searchParams.returnDateTime,
                    age: $rootScope.searchParams.age,
                    curr: $rootScope.searchParams.curr,
                    lang: $rootScope.searchParams.lang,
                };
                $localStorage.dataObj = $scope.dataObj

                // $window.open('http://localhost/ng-rc9/#/car/book/alipay', 'C-Sharpcorner', 'width=500,height=400');
                //$state.go("alipay");
                $scope.showAlipayBtn = false;
                $scope.alipayHTML = "";

                var pickupDateTime = $rootScope.searchParams.pickupDateTime.split(" ");
                var returnDateTime = $rootScope.searchParams.returnDateTime.split(" ");
                var subject = $rootScope.selCarObj.make + '(' + pickupDateTime[0] + ' - ' + returnDateTime[0]+')';

                //http://rc9.co/landing?sign=cf1df150b0fd17a0fe2bf750a853ebc0&trade_no=2016041421001003370208291095&total_fee=0.02&sign_type=MD5&out_trade_no=RC9201604140109489084&trade_status=TRADE_FINISHED&currency=SGD
                var data_url = appConfig.api_base_url + '/payment/alipaypurchase?rmb_fee=' + $scope.dataObj.price + '&subject=' + subject + '';
               // console.log(data_url);
                //return false;
                $window.location.href = data_url;

            };
            $scope.initPayment = function () {
                if ($rootScope.selCarObj) {
                    $scope.getCurrencyList();
                    $scope.getLocationList();
                    //startup();
                }
                else {
                     $state.go("book_car");
                }
            };

            $scope.showActionBtn = true;
            $scope.dropinOptions = {
                onPaymentMethodReceived: function (payload) {

                    if (payload.nonce) {
                        console.log(payload); // yay
                        $scope.createTrans(payload.nonce);
                    }
                    else {
                        toaster.pop({
                            type: 'error',
                            title: "Error!",
                            body: "There is an some error, Please try later.",
                            showCloseButton: true
                        });
                    }

                }
            };


            $scope.createTrans = function (nonce) {
                $scope.showActionBtn = false;
                $scope.dataObj = {
                    payment_method_nonce: nonce,
                    price: ($rootScope.selCarObj.selling_price + $rootScope.totalExtraAmount),
                    cust_id: $rootScope.carDetailsObj.id,
                    pickupID: $rootScope.searchParams.pickupID,
                    returnID: $rootScope.searchParams.returnID,
                    clientID: $rootScope.searchParams.clientID,
                    countryID: $rootScope.searchParams.countryID,
                    pickupDateTime: $rootScope.searchParams.pickupDateTime,
                    returnDateTime: $rootScope.searchParams.returnDateTime,
                    age: $rootScope.searchParams.age,
                    curr: $rootScope.searchParams.curr,
                    lang: $rootScope.searchParams.lang,
                };

                $scope.postTransObj = {
                    gateway: "braintree",
                    veh: $rootScope.selCarObj,
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
