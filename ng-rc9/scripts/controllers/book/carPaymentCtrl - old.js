'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('carPaymentCtrl', function ($scope, $log, $rootScope, $state, toaster, apis, $braintree, $locale) {


            $scope.initPayment = function () {
                if ($rootScope.selCarObj) {
                    $scope.getCurrencyList();
                    $scope.getLocationList();
                    startup();
                    if (!$rootScope.carDetailsObj) {
                        $rootScope.carDetailsObj = {
                            country_code: $rootScope.selectedLoc,
                            country: $rootScope.selectedLoc
                        };
                    }
                }
                else {
                    $state.go("book_car");
                }
            };


            var client;
            $scope.creditCard = {
                number: '',
                expirationDate: ''
            };

            var startup = function () {
                $braintree.getClientToken().success(function (token) {
                    client = new $braintree.api.Client({
                        clientToken: token
                    });
                });
            }

            $scope.payButtonClicked = function () {
                $log.info('payButtonClicked');
                $log.info($scope.creditCard);
                // - Validate $scope.creditCard 
                // - Make sure client is ready to use 

                client.tokenizeCard({
                    number: $scope.creditCard.number,
                    expirationDate: $scope.creditCard.expirationDate
                }, function (err, nonce) {
                    $log.info('payButtonClicked 2222');
                    $log.info(err);
                    $log.info(nonce);
                    // - Send nonce to your server (e.g. to make a transaction) 

                });
            };




            $scope.carPaymentObj = {
                card_holder_name: "",
                card_number: "",
                card_cvc: "",
                card_exp_mm: "",
                card_exp_yy: "",
                coupon_code: "",
                isFrmInvalid: true,
            };



            $scope.doValidatePayment = function (isValid) {
                $scope.carPaymentObj.isFrmInvalid = isValid;
                if (isValid) {
                    $scope.creditCard.number = $scope.carPaymentObj.card_number;
                    $scope.creditCard.expirationDate = $scope.carPaymentObj.card_exp_mm + "/" + $scope.carPaymentObj.card_exp_yy;
                    client.tokenizeCard({
                        number: $scope.creditCard.number,
                        expirationDate: $scope.creditCard.expirationDate
                    }, function (err, nonce) {
                        $log.info('payButtonClicked 2222');
                        $log.info(err);
                        $log.info(nonce);

                        $scope.createTrans(nonce);


                        // - Send nonce to your server (e.g. to make a transaction) 

                    });
                }
                //$rootScope.canGoStep = 5;
                //$scope.showTab(5);
            };

            $scope.createTrans = function (nonce) {
                $scope.dataObj = {
                    payment_method_nonce: nonce,
                    price: ($rootScope.selCarObj.selling_price + $rootScope.totalExtraAmount),
                    cust_id: 1,
                    pickupID: 124,
                    returnID: 112,
                    clientID: 25,
                    countryID: 1,
                    pickupDateTime: "2016-03-07 12:35:41",
                    returnDateTime: "2016-03-10 12:35:41",
                    age: 30,
                    curr: "SGD",
                    lang: "en"
                }
                $scope.postTransObj = {
                    gateway: "braintree",
                    veh: $rootScope.selCarObj,
                    data: $scope.dataObj,
                };

                apis.transaction.create($scope.postTransObj).$promise.then(function (res) {
                    $log.info(res);

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
                    }

                }, function (error) {
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
