'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('homeCtrl', function ($scope, $filter, $state, $rootScope, $log, $localStorage, toaster, $http, apis, limitToFilter) {

           
            //$templateCache.removeAll();

            //console.log('inside home controller...');

            /*apis.testCall.get().$promise.then(function (res) {
             $log.info(res);
             
             }, function (error) {
             console.log(error);
             if (error) {
             
             }
             });*/

            $scope.initHome = function () {
                $scope.timesOptions = app_time_intervals;
                $scope.ageOptions = app_ages;
                //$log.info($scope.timesOptions);
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

            /*$scope.filterAge = function (age) {
             age = parseInt(age);
             if (isNaN(age)) {
             return 30;
             }
             else {
             return age;
             }
             };*/

            $scope.calenderDateObj = {opened_1: false, opened_2: false};
            $scope.openCalenderDate = function ($event, calModel) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.calenderDateObj.opened_1 = false;
                $scope.calenderDateObj.opened_2 = false;

                $scope.calenderDateObj[calModel] = true;
            };
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1,
                class: 'datepicker',
                showWeeks: 'false',
                minMode: 'day',
                maxMode: 'day',
                //numberOfMonths: 3
            };


            $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];


            $scope.dropOffDateOptions = {
                dateFormat: 'dd/mm/yy',
                min: new Date(),
                numberOfMonths: 2,
            };
            $scope.pickUpDateOptions = {
                dateFormat: 'dd/mm/yy',
                min: new Date(),
                numberOfMonths: 2,
            };
            $scope.onChangeDate = function (type) {
                console.log('onChangeDate :' + type);
                //$('#drop_off_date').blur();
            };

            //$scope.time = $filter('date')(new Date(), "yyyy-MM-dd") + 'T04:30:00.000Z'; // (formatted: 10:30 AM)
            $scope.today = new Date();
            var pick_up_date = new Date();
            pick_up_date = new Date(pick_up_date.setDate(pick_up_date.getDate() + 1));
            $scope.searchObj = {
                drop_off_date: "", //$filter('date')(new Date(), "yyyy-MM-dd")
                drop_off_time: "10:00",
                pick_up_date: "",
                pick_up_time: "10:00",
                pick_up_loc: "",
                drop_off_loc: "",
                pick_up_loc_id: "",
                drop_off_loc_id: "",
                show_drop_off: false,
                show_driver_age: true,
                driver_age: 30
            };
            $scope.isFrmInvalid = true;
            $scope.doSearch = function (isValid) {
                $scope.isFrmInvalid = isValid;
                $log.info(isValid);
                if (isValid) {
                    $log.info($scope.searchObj);

                    var pick_up_date_arr = $scope.searchObj.pick_up_date.split("/");
                    var pick_up_date = pick_up_date_arr[1] + "/" + pick_up_date_arr[0] + "/" + pick_up_date_arr[2] + " " + $scope.searchObj.pick_up_time + ":00";

                    var drop_off_date_arr = $scope.searchObj.drop_off_date.split("/");
                    var drop_off_date = drop_off_date_arr[1] + "/" + drop_off_date_arr[0] + "/" + drop_off_date_arr[2] + " " + $scope.searchObj.drop_off_time + ":00";

                    $scope.searchObj.pick_up_datetime = new Date(pick_up_date);
                    $scope.searchObj.drop_off_datetime = new Date(drop_off_date);

                    if ($scope.searchObj.drop_off_loc_id == "") {
                        $scope.searchObj.drop_off_loc_id = $scope.searchObj.pick_up_loc_id;
                        $scope.searchObj.drop_off_loc = $scope.searchObj.pick_up_loc;
                    }
                    $rootScope.homeSearchObj = $scope.searchObj;
                    $state.go('book_car');
                }
            };






        });

