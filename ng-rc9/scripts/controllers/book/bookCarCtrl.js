'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('bookCarCtrl', function ($scope, $filter, $state, $rootScope, $log, apis, $localStorage, limitToFilter, $interval, $http, toaster) {
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

                $('.cls_search_animation').removeClass("cls_spinimage loader tick-mark flipInX");
                //$('.cls_search_animation').addClass("flipInX");
                //$('.cls_search_animation').removeClass("flipInX");
                //$('.cls_search_animation').addClass("rotateIn");
                $('.cls_search_animation').addClass("cls_spinimage loader");

                $interval(function () {
                    $('.cls_search_animation').removeClass("cls_spinimage loader").addClass("flipInX").addClass("tick-mark");
                    console.log('inside 222...');
                    $interval(function () {
                        console.log('inside 333...');
                        $('#id_main_html').removeClass('search-bg');
                        $scope.showCarLoading = false;
                        console.log('loading done...');
                    }, 1000, 1);
                }, 4000, 1);
                /*$('#id_main_html').removeClass('search-bg');
                 $scope.showCarLoading = false;
                 console.log('loading done...');*/

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
                $rootScope.selectedLoc = $scope.selectedLoc;
            };
            $scope.onChangeCurrency = function () {
                $scope.setCurCurrency($scope.selectedCurrency);
                console.log($scope.selectedCurrency);

                // $scope.doSearchCars();
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
                delete $localStorage.selCarObj;
                $rootScope.carDetailsObj = {
                    country_code: $rootScope.selectedLoc,
                    country: $rootScope.selectedLoc,
                    dob: ""
                };

                $('#id_main_html').addClass('search-bg');
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

                var pick_up_date_arr = $scope.searchObj.pick_up_date.split("/"); //dd/mm/yy to mm/dd/yy
                var pick_up_date = pick_up_date_arr[1] + "/" + pick_up_date_arr[0] + "/" + pick_up_date_arr[2] + " " + $scope.searchObj.pick_up_time + ":00";
                console.log(pick_up_date);
                var drop_off_date_arr = $scope.searchObj.drop_off_date.split("/"); //dd/mm/yy to mm/dd/yy
                var drop_off_date = drop_off_date_arr[1] + "/" + drop_off_date_arr[0] + "/" + drop_off_date_arr[2] + " " + $scope.searchObj.drop_off_time + ":00";

                $scope.searchObj.pick_up_datetime = new Date(pick_up_date);
                $scope.searchObj.drop_off_datetime = new Date(drop_off_date);
                console.log($scope.searchObj.pick_up_datetime);
                $rootScope.searchObj = $scope.searchObj;
                $scope.search_result = {};
                $scope.car_list = [];
                var pickupDateTime = $filter('date')(new Date(pick_up_date), 'yyyy-MM-dd') + ' ' + $scope.searchObj.pick_up_time + ':00';
                var returnDateTime = $filter('date')(new Date(drop_off_date), 'yyyy-MM-dd') + ' ' + $scope.searchObj.drop_off_time + ':00';
                console.log(pickupDateTime);

                var oneDay = 60 * 60 * 1000;
                var diffDays = Math.round(Math.abs(($scope.searchObj.drop_off_datetime.getTime() - $scope.searchObj.pick_up_datetime.getTime()) / (oneDay)));
                diffDays = parseInt(diffDays);
                if (isNaN(diffDays)) {
                    diffDays = 0;
                }

                if (diffDays <= 23) {
                    $rootScope.diffDaysType = "hour";

                }
                else {
                    diffDays = Math.ceil(diffDays / 24);
                    $rootScope.diffDaysType = "day";
                }
                $rootScope.diffDays = diffDays;
                //$rootScope.diffDaysType = diffDaysType;

                $rootScope.searchParams = {
                    pickupID: $scope.searchObj.pick_up_loc_id,
                    returnID: $scope.searchObj.drop_off_loc_id,
                    clientID: 0,
                    countryID: 0,
                    pickupDateTime: pickupDateTime,
                    returnDateTime: returnDateTime,
                    age: $scope.searchObj.driver_age,
                    curr: $scope.selectedCurrency,
                    lang: 'en',
                };

                apis.search_cars.get($rootScope.searchParams).$promise.then(function (res) {
                    $log.info(res);
                    if (res.data) {
                        $scope.search_result = angular.fromJson(res.data);
                        if ($scope.search_result.cars) {
                            $scope.car_list = $scope.search_result.cars;
                        }
                        $scope.setSearchCounter();
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

            $scope.$on('$destroy', function () {
                $scope.doStopSearchCounter();
            });

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
            

            $scope.isSupplierNameSelected = function (name) {
                var supplierName = $scope.filterSupplierName(name)
                if ($scope.companyNamesArr.indexOf(supplierName) > -1) {
                    return true;
                }
                return false;
            };

            $scope.filterSupplierName = function (supplierName) {
                if (supplierName != "") {
                    var res = supplierName.split("(");
                    var res2 = $.trim(res[0]);
                    return res2;
                }
                else {
                    return '';
                }
            };
            $scope.searchBySupplier = function (supplierName) {
               
                $scope.companyNamesArr = [];
                if (supplierName != "") {
                    $scope.companyNamesArr.push($scope.filterSupplierName(supplierName));
                }
                $scope.filterList();
            };
            $scope.setFilterCompanyData = function () {
                $scope.companyNamesArr = [];
              
                angular.forEach($scope.filterData.company_names, function (val, key) {
                    if (val) {
                         $scope.companyNamesArr.push($scope.filterSupplierName(val));
                     }
                });
                $scope.filterList();
            };
            $scope.carSpecNamesArr = [];


            $scope.setFilterSpecData = function () {
                $scope.carSpecNamesArr = [];
                angular.forEach($scope.filterData.specifications, function (val, key) {
                    if (val) {
                        var res = val.split("(");
                        var res2 = $.trim(res[0]);
                        if (res2 != "") {
                            $scope.carSpecNamesArr.push(res2);
                        }
                        // $scope.searchStr = "({company_name: '"+$.trim(res[0])+"'})";
                    }
                });

                //console.log($scope.carSpecNamesArr);
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

            $scope.onChangeLocation = function (field) {
                $log.info(field);
                $scope.searchObj[field + "_id"] = "";
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
                return apis.routesV2.get({keyword: keyword}).$promise.then(function (res) {
                    if (res.data) {
                        var data = angular.fromJson(res.data);
                        angular.forEach(data, function (val, key) {
                            $scope.locationsList.push(
                                    {id: "",
                                        name: key,
                                        isocode: "",
                                        flag_url: val.icon,
                                        isParent: true
                                    });
                            angular.forEach(val.locations, function (val2, key2) {
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

            $scope.onChangeTime = function (modalName) {
                if (modalName == "pick_up_time") {
                    $scope.searchObj.drop_off_time = $scope.searchObj.pick_up_time;
                }
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
                /*if ($rootScope.selCarObj) {
                 
                 if (($rootScope.selCarObj.id > 0) && ($rootScope.canGoStep >= tabid)) {
                 $scope.pageScrollUp();
                 //$log.info("canGoStep - " + $rootScope.canGoStep);
                 // $log.info("tabid - " + tabid);
                 $('#tab_bar a[href="#tab' + tabid + '"]').tab('show');
                 }
                 }*/

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
                    $scope.showActCarQuoteBtn = false;
                    $log.info($scope.email_quote);

                    $scope.carQuotePostObj = {
                        email: $scope.email_quote.email,
                        carinfo: $rootScope.selCarQuoteObj,
                        searchparam: {
                            pickupDateTime: $scope.searchParams.pickupDateTime,
                            returnDateTime: $scope.searchParams.returnDateTime,
                            pickupID: $scope.searchParams.pickupID,
                            returnID: $scope.searchParams.returnID,
                        }
                    };


                    apis.carQuote.send($scope.carQuotePostObj).$promise.then(function (res) {
                        $scope.showActCarQuoteBtn = true;
                        $log.info(res);
                        jQuery('#emailquoat-modal').modal('hide');
                        toaster.pop({
                            type: 'success',
                            title: "Success!",
                            body: "Car quotation has been sent successfully to the email address.",
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
                $scope.showActCarQuoteBtn = true;
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
                $localStorage.selCarObj = car_val;
                $rootScope.selCarObj = car_val;

                $log.info(car_val);
                $log.info(car_key);

                $state.go('book_car_extra');


            };

        });
