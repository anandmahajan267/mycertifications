'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('carDetailsCtrl', function ($scope, $log, $rootScope, $state, toaster, apis, $filter) {
            $log.info("carDetailsCtrl");
            //$log.info("carDetailsCtrl");
            // $scope.mydate = "1990-05-02"; 
            $scope.dobOptions = {
                dateFormat: "dd/mm/yy",
                numberOfMonths: 1,
                changeMonth: true,
                changeYear: true,
                yearRange: "-80:-18",
                onSelect: function (date) {
                    console.log(date);
                    //$rootScope.carDetailsObj.dob = date;

                }
            };



            $scope.initDetails = function () {
                $scope.initChinseOptions();
                if ($rootScope.selCarObj) {
                    $scope.setSearchCounter();
                    $scope.getCurrencyList();
                    $scope.getLocationList();
                    if (!$rootScope.carDetailsObj.driver_name) {

                        $log.info($rootScope.currentUser);
                        if ($rootScope.currentUser) {
                            $rootScope.carDetailsObj.id = $rootScope.currentUser.id;
                            $rootScope.carDetailsObj.driver_name = $rootScope.currentUser.name;
                            $rootScope.carDetailsObj.email = $rootScope.currentUser.email;
                            $rootScope.carDetailsObj.confirm_email = $rootScope.currentUser.email;
                            $rootScope.carDetailsObj.contact_num = $rootScope.currentUser.phone;
                            $rootScope.carDetailsObj.address = $rootScope.currentUser.address;
                            $rootScope.carDetailsObj.city = $rootScope.currentUser.city;
                            $rootScope.carDetailsObj.postal_code = $rootScope.currentUser.postal_code;
                            if ($rootScope.currentUser.dob != "") {
                                var dob_arr = $rootScope.currentUser.dob.split("-");
                                var dob = dob_arr[0] + "/" + dob_arr[1] + "/" + dob_arr[2];
                                $rootScope.carDetailsObj.dob = $rootScope.currentUser.dob;
                            }
                        }


                    }

                }
                else {
                    $state.go("book_car");
                }


            };

            $scope.showActDriverBtn = true;
            $scope.validateDetails = function (isValid) {
                toaster.clear('*');
                console.log(isValid);
                if (isValid) {
                    $scope.showActDriverBtn = false;
                    $rootScope.canGoStep = 4;
                    $log.info($rootScope.carDetailsObj); //dd/mm/yy to yy-mm-dd
                    //var dob_arr = $rootScope.carDetailsObj.dob.split("/");
                    //var dob = dob_arr[2] + "-" + dob_arr[1] + "-" + dob_arr[0];

                    if ($rootScope.carDetailsObj.id) {
                        $scope.showActDriverBtn = true;
                        $state.go("book_car_payment");
                    }
                    else {
                        var dob = $filter('date')($rootScope.carDetailsObj.dob, 'yyyy-MM-dd')
                        $log.info(dob);
                        $scope.driverPostObj = {
                            full_name: $rootScope.carDetailsObj.driver_name,
                            email: $rootScope.carDetailsObj.email,
                            phoneCode: $rootScope.carDetailsObj.country_code,
                            phone: $rootScope.carDetailsObj.contact_num,
                            address: $rootScope.carDetailsObj.address,
                            city: $rootScope.carDetailsObj.city,
                            country: $rootScope.carDetailsObj.country,
                            postal_code: $rootScope.carDetailsObj.postal_code,
                            dob: dob,
                            //password:""
                        };
                        apis.signup.create($scope.driverPostObj).$promise.then(function (res) {
                            $scope.showActDriverBtn = true;
                            if (res.data) {
                                //$localStorage.currentUser = res.data;
                                //$rootScope.currentUser = res.data;
                                $rootScope.carDetailsObj.id = res.data.id;
                                $state.go("book_car_payment");
                            }
                            else {
                                toaster.pop({
                                    type: 'error',
                                    title: "Error!",
                                    body: res.message,
                                    showCloseButton: true
                                });
                            }
                        }, function (error) {
                            $scope.showActDriverBtn = true;
                            if (error) {
                                toaster.pop({
                                    type: 'error',
                                    title: "Error!",
                                    body: error.data.message,
                                    showCloseButton: true
                                });

                            }
                        });
                    }
                    //$state.go("book_car_payment");
                } else {

                    toaster.pop({
                        type: 'error',
                        title: "Error!",
                        body: "Please fill in all the details.",
                        showCloseButton: true
                    });
                    return false;
                }


            };

            $scope.chinesDriverObj = {
                driver_license_number: "",
                driver_last_name: "",
                driver_first_name: "",
                driver_gender: "男",
                province_name: "",
                value1: "",
                selection1: "",
                value2: "",
                selection2: "",
                value3: "",
                selection3: "",
                value4: "",
                selection4: "",
                value5: "",
                selection5: "",
                value6: "",
                selection6: "",
                value7: "",
                selection7: "",
                value8: "",
                selection8: "",
                value9: "",
                selection9: "",
                value10: "",
                selection10: "",
                driver_birth_year: "",
                driver_birth_month: "",
                driver_birth_date: "",
                driver_license_birth_year: "",
                driver_license_birth_month: "",
                driver_license_birth_date: "",
                licenseExpire_year: "",
                licenseExpire_month: "",
                licenseExpire_date: "",
                driver_license_type: "A1",
                driver_emailid: "",
                driver_phone_num: "",
                isFrmInvalid: true
            };

            $scope.validateChinesDetails = function (isValid) {
                $scope.chinesDriverObj.isFrmInvalid = isValid;
                $log.info(isValid);
                $log.info($scope.chinesDriverObj);
                if (isValid) {
                    var birth_date = $scope.chinesDriverObj.driver_birth_year + "-" + $scope.chinesDriverObj.driver_birth_month + "-" + $scope.chinesDriverObj.driver_birth_date + " 00:00:00"
                    var issue_date = $scope.chinesDriverObj.driver_license_birth_year + "-" + $scope.chinesDriverObj.driver_license_birth_month + "-" + $scope.chinesDriverObj.driver_license_birth_date + " 00:00:00"
                    var effective_date = $scope.chinesDriverObj.licenseExpire_year + "-" + $scope.chinesDriverObj.licenseExpire_month + "-" + $scope.chinesDriverObj.licenseExpire_date + " 00:00:00"
                    $scope.chinesDriverPostObj = {
                        document_type: "EuropCar专用翻译件",
                        license_number: $scope.chinesDriverObj.driver_license_number,
                        name: $scope.chinesDriverObj.driver_first_name + " " + $scope.chinesDriverObj.driver_last_name,
                        gender: $scope.chinesDriverObj.driver_gender,
                        provinces: $scope.chinesDriverObj.province_name,
                        value1: $scope.chinesDriverObj.value1,
                        selection1: $scope.chinesDriverObj.selection1,
                        value2: $scope.chinesDriverObj.value2,
                        selection2: $scope.chinesDriverObj.selection2,
                        value3: $scope.chinesDriverObj.value3,
                        selection3: $scope.chinesDriverObj.selection3,
                        value4: $scope.chinesDriverObj.value4,
                        selection4: $scope.chinesDriverObj.selection4,
                        value5: $scope.chinesDriverObj.value5,
                        selection5: $scope.chinesDriverObj.selection5,
                        value6: $scope.chinesDriverObj.value6,
                        selection6: $scope.chinesDriverObj.selection6,
                        value7: $scope.chinesDriverObj.value7,
                        selection7: $scope.chinesDriverObj.selection7,
                        value8: $scope.chinesDriverObj.value8,
                        selection8: $scope.chinesDriverObj.selection8,
                        value9: $scope.chinesDriverObj.value9,
                        selection9: $scope.chinesDriverObj.selection9,
                        value10: $scope.chinesDriverObj.value10,
                        selection10: $scope.chinesDriverObj.selection10,
                        birth_date: birth_date,
                        issue_date: issue_date,
                        class_type: $scope.chinesDriverObj.driver_license_type,
                        effective_date: effective_date,
                        email: $scope.chinesDriverObj.driver_emailid,
                        contact_number: $scope.chinesDriverObj.driver_phone_num,
                        front_image_url: "",
                        back_image_url: ""
                    };
                    $log.info($scope.chinesDriverPostObj);
                }
            };

            $scope.setAddressActiveBox = function (sectionId, sectionVal) {
                $scope.chinesDriverObj["selection" + sectionId] = sectionVal;
            };

            $scope.onChangeValText = function (sectionId, sectionVal) {
                var text_val = $scope.chinesDriverObj["value" + sectionId];
                var section_val = $scope.chinesDriverObj["selection" + sectionId];
                //console.log(text_val);
                if (text_val == "") {
                    $scope.chinesDriverObj["selection" + sectionId] = "";
                }
                if (text_val != "" && section_val == "") {
                    $scope.chinesDriverObj["selection" + sectionId] = sectionVal;
                }
            };

            $scope.onChangeValText2 = function (as) {
                console.log(as);

            };

            $scope.initChinseOptions = function () {
                var d = new Date();
                var current_year = new Date().getFullYear();
                $scope.year_options = $scope.getRangOptions((current_year - 1), 85, 'decri');
                $scope.month_options = $scope.getRangOptions(1, 12, 'incri');
                $scope.date_options = $scope.getRangOptions(1, 31, 'incri');

                $scope.licenseExpire_year_options = $scope.getRangOptions(current_year, 25, 'incri');
            };



            /*var aaa = $scope.getRangOptions(current_year, 20, 'incri');
             console.log(aaa);
             var aaa = $scope.getRangOptions(current_year, 80, 'decri');
             console.log(aaa);*/

            $scope.addressSectionData = [
                {
                    sectionId: 1,
                    dafault_text: "市",
                    options: [
                        {id: "市", text: "市"},
                        {id: "地区", text: "地区"},
                        {id: "自治州", text: "自治州"},
                        {id: "盟", text: "盟"}
                    ]
                },
                {
                    sectionId: 2,
                    dafault_text: "区",
                    options: [
                        {id: "区", text: "区"},
                        {id: "县", text: "县"},
                        {id: "自治县", text: "自治县"},
                        {id: "市", text: "市"},
                        {id: "旗", text: "旗"},
                        {id: "自治旗", text: "自治旗"},
                        {id: "林区", text: "林区"},
                        {id: "特区", text: "特区"},
                    ]
                },
                {
                    sectionId: 3,
                    dafault_text: "镇",
                    options: [
                        {id: "镇", text: "镇"},
                        {id: "乡", text: "乡"},
                        {id: "民族乡", text: "民族乡"},
                        {id: "街道办事处", text: "街道办事处"},
                        {id: "区公所", text: "区公所"},
                        {id: "苏木", text: "苏木"},
                        {id: "林区", text: "林区"},
                        {id: "民族苏木", text: "民族苏木"},
                    ]
                },
                {
                    sectionId: 4,
                    dafault_text: "社区",
                    options: [
                        {id: "社区", text: "社区"},
                        {id: "行政村", text: "行政村"},
                        {id: "村", text: "村"},
                        {id: "村民小组(组)", text: "村民小组(组)"},
                        {id: "大队", text: "大队"},
                    ]
                },
                {
                    sectionId: 5,
                    dafault_text: "路",
                    options: [
                        {id: "路", text: "路"},
                        {id: "街", text: "街"},
                        {id: "大道", text: "大道"},
                    ]
                },
                {
                    sectionId: 6,
                    dafault_text: "里",
                    options: [
                        {id: "里", text: "里"},
                        {id: "胡同", text: "胡同"},
                        {id: "组", text: "组"},
                        {id: "巷", text: "巷"},
                        {id: "弄", text: "弄"},
                        {id: "横", text: "横"},
                        {id: "纬", text: "纬"},
                        {id: "号", text: "号"},
                    ]
                },
                {
                    sectionId: 7,
                    dafault_text: "小区",
                    options: [
                        {id: "小区", text: "小区"},
                        {id: "社区", text: "社区"},
                        {id: "广场", text: "广场"},
                        {id: "大厦", text: "大厦"},
                    ]
                },
                {
                    sectionId: 8,
                    dafault_text: "幢",
                    options: [
                        {id: "幢", text: "幢"},
                        {id: "栋", text: "栋"},
                        {id: "号楼", text: "号楼"},
                        {id: "座", text: "座"},
                        {id: "号", text: "号"},
                    ]
                },
                {
                    sectionId: 9,
                    dafault_text: "单元",
                    options: [
                        {id: "单元", text: "单元"},
                        {id: "门", text: "门"},
                        {id: "号", text: "号"},
                    ]
                },
                {
                    sectionId: 10,
                    dafault_text: "室",
                    options: [
                        {id: "室", text: "室"},
                    ]
                },
            ];



        });
