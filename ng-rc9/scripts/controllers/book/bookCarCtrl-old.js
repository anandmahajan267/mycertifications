'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('bookCarCtrl', function ($scope, $filter, $state, $rootScope, $log, apis, limitToFilter, $interval, $http, toaster) {
            console.log('inside bookCarCtrl controller...');

            $scope.oneAtATime = true;
            $scope.status = {};



            /* $scope.icons = [
             {"value": "Gear", "label": "<img src=\"http://rc9.co/img/flag/my.png\" class=\"cls_flag_icon\"> Gear"},
             {"value": "Globe", "label": "<i class=\"fa fa-globe\"></i> Globe"},
             {"value": "Heart", "label": "<i class=\"fa fa-heart\"></i> Heart"},
             {"value": "Camera", "label": "<i class=\"fa fa-camera\"></i> Camera"}
             ];*/
            //$scope.currency_options = [];

            $scope.showCarLoading = true;
            $scope.pageScrollUp = function () {
                $('html,body').animate({
                    scrollTop: $(".cls_main_div").offset().top - 100},
                'slow');
            };
            $scope.showLoading = function () {
                $scope.pageScrollUp();
                $interval(function () {
                    $scope.showCarLoading = false;
                    console.log('loading done...');
                }, 5000, 1);
            };

            //$scope.time = $filter('date')(new Date(), "yyyy-MM-dd") + 'T04:30:00.000Z'; // (formatted: 10:30 AM)
            $scope.today = new Date();
            var pick_up_date = new Date();
            pick_up_date = new Date(pick_up_date.setDate(pick_up_date.getDate() + 1));
            $scope.searchObj = {
                drop_off_date: '', //$filter('date')(new Date(), "yyyy-MM-dd")
                drop_off_time: "10:00",
                pick_up_date: '',
                pick_up_time: "10:00",
                pick_up_loc: "",
                drop_off_loc: "",
                pick_up_loc_id: "",
                drop_off_loc_id: "",
                show_drop_off: false,
                show_driver_age: true,
                driver_age: 30
            };

            $scope.onChangeLoc = function () {
                console.log($scope.selectedLoc);
            };
            $scope.onChangeCurrency = function () {
                $scope.setCurCurrency($scope.selectedCurrency);
                console.log($scope.selectedCurrency);

                $scope.doSearchCars();
            };

            $scope.initCarBook = function () {
                //{{endpoint}}veh/search?pickupID=123&returnID=424&clientID=25&countryID=1
                //&pickupDateTime=2016-03-07 12:35:41&returnDateTime=2016-03-08 12:35:41&age=30&curr=SGD&lang=en


                $scope.getCurrencyList();
                $scope.getLocationList();
                $scope.timesOptions = app_time_intervals;
                $scope.doSearchCars();


            };
            $scope.doSearchCars = function (isValid) {
                $scope.showCarLoading = true;
                $scope.showLoading();
                if ($rootScope.homeSearchObj) {
                    $scope.searchObj = {
                        drop_off_date: $rootScope.homeSearchObj.drop_off_date, //$filter('date')(new Date(), "yyyy-MM-dd")
                        drop_off_time: $rootScope.homeSearchObj.drop_off_time,
                        pick_up_date: $rootScope.homeSearchObj.pick_up_date,
                        pick_up_time: $rootScope.homeSearchObj.pick_up_time,
                        pick_up_loc: $rootScope.homeSearchObj.pick_up_loc,
                        drop_off_loc: $rootScope.homeSearchObj.drop_off_loc,
                        pick_up_loc_id: $rootScope.homeSearchObj.pick_up_loc_id,
                        drop_off_loc_id: $rootScope.homeSearchObj.drop_off_loc_id,
                        show_drop_off: $rootScope.homeSearchObj.show_drop_off,
                        show_driver_age: $rootScope.homeSearchObj.show_driver_age,
                        driver_age: $rootScope.homeSearchObj.driver_age
                    };

                    $log.info($rootScope.homeSearchObj);
                    $log.info('homeSearchObj');
                }
                else {
                    $log.info(12312312312313113123);
                }

                $scope.search_result = {};
                $scope.car_list = {};
                var pickupDateTime = $filter('date')($scope.searchObj.pick_up_date, 'yyyy-MM-dd') + ' ' + $scope.searchObj.pick_up_time + ':00';
                var returnDateTime = $filter('date')($scope.searchObj.drop_off_date, 'yyyy-MM-dd') + ' ' + $scope.searchObj.drop_off_time + ':00';
                $scope.searchParams = {
                    pickupID: 0,
                    returnID: 0,
                    clientID: 0,
                    countryID: 0,
                    pickupDateTime: pickupDateTime,
                    returnDateTime: returnDateTime,
                    age: '30',
                    curr: $scope.selectedCurrency,
                    lang: 'en',
                };
                apis.search_cars.get($scope.searchParams).$promise.then(function (res) {
                    $log.info(res);
                    if (res.data) {
                        $scope.search_result = angular.fromJson(res.data);
                        if ($scope.search_result.cars) {
                            $scope.car_list = $scope.search_result.cars;
                        }
                        // $scope.search_result = data[0];

                    }
                    //$scope.showCarLoading = false;
                }, function (error) {
                    if (error) {
                        $log.info(error);
                    }
                });

                /*$http.get('json/searchResults.json').success(function (data) {
                 data = angular.fromJson(data);
                 if (data.length > 0) {
                 $scope.search_result = data[0];
                 }
                 
                 console.log($scope.search_result);
                 }).error(function (data, status, error, config) {
                 //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                 });*/

            };
            $scope.isFrmInvalid = true;
            $scope.doValidateSearchCars = function (isValid) {
                $scope.isFrmInvalid = isValid;
                if (isValid) {
                    $scope.searchObj.show_drop_off = false;
                    $rootScope.homeSearchObj = $scope.searchObj;

                    $scope.doSearchCars();
                }
            };

            $scope.filterData = {
                company_names: [],
                specifications: []
            };
            $scope.companyNamesArr = [];
            $scope.setFilterCompanyData = function () {
                $scope.companyNamesArr = [];
                //console.log($scope.filterData.company_names);
                //search_result_main
                angular.forEach($scope.filterData.company_names, function (val, key) {
                    if (val) {
                        var res = val.split("(");
                        var res2 = $.trim(res[0]);
                        //console.log(res2);
                        if (res2 != "") {
                            $scope.companyNamesArr.push(res2);
                        }
                        // $scope.searchStr = "({company_name: '"+$.trim(res[0])+"'})";
                    }
                });
                $scope.filterList();
            };
            $scope.carSpecNamesArr = [];
            $scope.setFilterSpecData = function () {
                $scope.carSpecNamesArr = [];
                //console.log($scope.filterData.specifications);
                //search_result_main
                angular.forEach($scope.filterData.specifications, function (val, key) {
                    if (val) {
                        var res = val.split("(");
                        var res2 = $.trim(res[0]);
                        //console.log(res2);
                        if (res2 != "") {
                            $scope.carSpecNamesArr.push(res2);
                        }
                        // $scope.searchStr = "({company_name: '"+$.trim(res[0])+"'})";
                    }
                });

                console.log($scope.carSpecNamesArr);
                $scope.filterList();
            };

            $scope.filterList = function () {
                $scope.listData = [];
                if ($scope.companyNamesArr.length > 0 || $scope.carSpecNamesArr.length) {
                    angular.forEach($scope.search_result.cars, function (val, key) {
                        var company_name = val.company_name;
                        var needToPush = "N";
                        if ($scope.companyNamesArr.indexOf(company_name) != -1) {
                            needToPush = "Y";
                        }
                        if ($scope.carSpecNamesArr.indexOf("Air Conditioning") != -1) {
                            needToPush = "Y";
                        }

                        if (needToPush == "Y") {
                            $scope.listData.push(val);
                        }
                    });
                    $scope.car_list = $scope.listData;
                }
                else {
                    $scope.car_list = $scope.search_result.cars;
                }
            };

            $scope.callBackLocation = function ($item, $label, field) {
                $log.info($item);
                if ($item.id != "") {
                    $scope.searchObj[field + "_id"] = $item.id;
                }
                else {
                    $scope.searchObj[field] = "";
                }

            };
            $scope.onBlueCallBack = function (field) {
                $log.info(field);

                var valID = ($scope.searchObj[field + "_id"]);
                $log.info(valID);
                if (valID == "") {
                    $scope.searchObj[field] = "";
                }
                $log.info($scope.searchObj[field]);
            };



            $scope.getLocations = function (keyword, field) {
                $scope.locationsList = [];
                return apis.routes.get({keyword: keyword}).$promise.then(function (res) {
                    if (res.data) {
                        var data = angular.fromJson(res.data);
                        angular.forEach(data, function (val, key) {
                            $scope.locationsList.push(
                                    {id: "",
                                        name: key,
                                        isocode: "",
                                        flag_url: "",
                                        isParent: true
                                    });
                            angular.forEach(val, function (val2, key2) {
                                if (val2.name != "") {
                                    $scope.locationsList.push(
                                            {id: val2.id,
                                                name: val2.name,
                                                isocode: val2.isocode,
                                                flag_url: appConfig.location_flag_url + "/" + val2.isocode + ".png",
                                                isParent: false
                                            });

                                }
                            });
                        });
                    }
                    //console.log($scope.locationsList);
                    $scope.searchObj[field + "_id"] = "";

                    return limitToFilter($scope.locationsList, 10);

                }, function (error) {
                    return limitToFilter($scope.locationsList, 10);
                    if (error) {
                        $log.info(error);
                    }
                });
            };


            $scope.calenderDateObj = {opened_1: false, opened_2: false};
            $scope.openCalenderDate = function ($event, scs) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.calenderDateObj.opened_1 = false;
                $scope.calenderDateObj.opened_2 = false;

                $scope.calenderDateObj[scs] = true;
            };
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                class: 'datepicker',
                showWeeks: 'false'
            };


            $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];

            $scope.showTab = function (tabid) {
                if ($rootScope.selCarObj) {

                    if (($rootScope.selCarObj.id > 0) && ($rootScope.canGoStep >= tabid)) {
                        $scope.pageScrollUp();
                        //$log.info("canGoStep - " + $rootScope.canGoStep);
                        // $log.info("tabid - " + tabid);
                        $('#tab_bar a[href="#tab' + tabid + '"]').tab('show');
                    }
                }

            };

            $scope.getSelectedCarObj = function () {
                return $rootScope.selCarObj;
            };

            $scope.email_quote = {
                email: "",
                isFrmInvalid: true
            };

            $scope.sendQuoteToEmail = function (isValid) {
                $scope.email_quote.isFrmInvalid = isValid;
                $log.info($scope.email_quote.isFrmInvalid);
                if (isValid) {
                    $log.info($scope.email_quote);

                    apis.carQuote.send({email: $scope.email_quote.email}).$promise.then(function (res) {
                        $log.info(res);
                        jQuery('#emailquoat-modal').modal('hide');
                        toaster.pop({
                            type: 'success',
                            title: "Success!",
                            body: "Car quotations has been send successfully to your email address.",
                            showCloseButton: true
                        });
                    }, function (error) {
                        if (error) {
                            toaster.pop({
                                type: 'error',
                                title: "Error!",
                                body: error.data.message,
                                showCloseButton: true
                            });
                            jQuery('#emailquoat-modal').modal('hide');
                        }
                    });
                }
            };
            $rootScope.selCarQuoteObj = {};
            $scope.viewCarQuote = function (car_val, car_key) {

                $scope.email_quote = {
                    email: "",
                    isFrmInvalid: true
                };
                $scope.carQuoteFrm.$setPristine();
                $rootScope.selCarQuoteObj = car_val;

                $log.info(car_val);
                $log.info(car_key);

                jQuery('#emailquoat-modal').modal('show');
            };
            $rootScope.selCarObj = {};
            $rootScope.canGoStep = 1;


            $scope.bookCar = function (car_val, car_key) {
                $rootScope.selCarObj = car_val;

                $log.info(car_val);
                $log.info(car_key);

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
                    $scope.showTab(2);
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

        })
        .controller('carExtrasCtrl', function ($scope, $log, $rootScope) {
            //$log.info("carExtrasCtrl");
            $scope.filterExtrasData = {};
            $scope.validateExtras = function () {
                $rootScope.canGoStep = 3;
                $scope.showTab(3);
            };
            $scope.initExtras = function () {
                $log.info('selling_price');
                $log.info($rootScope.selCarObj.selling_price);
            };

            $rootScope.totalExtraAmount = 0;
            $scope.setFilterExtraData = function () {
                //console.log($scope.filterExtrasData.vals);
                angular.forEach($scope.filterExtrasData, function (val, key) {
                    //console.log(val);
                    var val = angular.fromJson(val);
                    //$log.info(val);
                    angular.forEach(val, function (val2, key2) {
                        if (val2 != "") {
                            var val2 = angular.fromJson(val2);
                            $log.info(val2);
                            $rootScope.totalExtraAmount = $rootScope.totalExtraAmount + parseFloat(val2.cost);
                        }
                    });

                });
                $rootScope.totalExtraAmount = (Math.round($rootScope.totalExtraAmount * 100) / 100);
                // console.log($rootScope.totalExtraAmount);
            };

        })
        .controller('carDetailsCtrl', function ($scope, $log, $rootScope, toaster) {
            //$log.info("carExtrasCtrl");

            $scope.carDetailsObj = {
                country_code: $scope.selectedLoc,
                country: $scope.selectedLoc
            };
            $scope.validateDetails = function (isValid) {
                toaster.clear('*');
                console.log(isValid);
                if (isValid) {
                    $rootScope.canGoStep = 4;
                    $scope.showTab(4);
                    $log.info($scope.carDetailsObj);
                }
                else {
                    toaster.pop({
                        type: 'error',
                        title: "Error!",
                        body: "Please fill all details.",
                        showCloseButton: true
                    });
                    return false;
                }

            };

        })
        .controller('carPaymentCtrl', function ($scope, $log, $rootScope, $braintree, $locale, apis, toaster) {
            //$log.info("carExtrasCtrl");

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

            startup();


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
                        $scope.showTab(5);
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


        })
        .controller('carPaymentSuccessCtrl', function ($scope, $log, $rootScope) {
            //$log.info("carExtrasCtrl");


        });
