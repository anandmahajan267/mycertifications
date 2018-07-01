sbAdminApp.directive("startDateCalendar", [
    function () {
        return function (scope, element, attrs) {

            scope.$watch("searchObj.drop_off_date", (function (newValue, oldValue) {
                element.datepicker("option", "maxDate", newValue);
            }), true);

            //console.log(window.innerWidth);
            var numberOfMonths = 2;
            if (window.innerWidth <= 550) {
                numberOfMonths = 1;
            }

            return element.datepicker({
                dateFormat: "dd/mm/yy",
                numberOfMonths: numberOfMonths,
                minDate: new Date(),
                maxDate: scope.searchObj.drop_off_date,
                //beforeShowDay: $.datepicker.noWeekends,
                onSelect: function (date) {
                    console.log(date);
                    scope.searchObj.pick_up_date = date;
                    scope.$apply();
                }
            });
        };
    }

]).directive("endDateCalendar", [
    function () {
        return function (scope, element, attrs) {
            scope.$watch("searchObj.pick_up_date", (function (newValue, oldValue) {
                if (newValue != "") {
                    element.datepicker("option", "minDate", newValue);
                }
                else {
                    element.datepicker("option", "minDate", new Date());
                }
            }), true);
            var numberOfMonths = 2;
            if (window.innerWidth <= 550) {
                numberOfMonths = 1;
            }
            return element.datepicker({
                dateFormat: "dd/mm/yy",
                numberOfMonths: numberOfMonths,
                //minDate: scope.searchObj.pick_up_date,
                //defaultDate: scope.searchObj.drop_off_date,
                //beforeShowDay: $.datepicker.noWeekends,
                onSelect: function (date) {
                    console.log(date);
                    scope.searchObj.drop_off_date = date;
                    return scope.$apply();
                }
            });
        };
    }

]).directive('atag', function ($rootScope, $log, $state) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            /*if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
             elem.on('click', function (e) {
             e.preventDefault();
             });
             }*/
            elem.on('click', function (e) {
                e.preventDefault();
            });
        }
    };
}).directive('loginModalView', function ($rootScope, apis, toaster, $localStorage, $state, Facebook, jwtHelper, $interval, userMeService) {
    return {
        templateUrl: 'views/common/login_popup.html',
        restrict: 'E',
        replace: true,
        scope: {
        },
        controller: function ($scope) {

            $scope.resetLoginScope = function () {
                $scope.showActSignInBtn = true;
                $scope.userLoginObj = {
                    email: "",
                    password: "",
                    isFrmInvalid: true
                };
            };
            $scope.resetLoginScope();
            
            $scope.doValidateLogin = function (isValid) {
                $scope.userLoginObj.isFrmInvalid = isValid;
                if (isValid) {
                    $scope.showActSignInBtn = false;
                    //console.log('333333333asdasdsa');
                    $scope.userLoginPostObj = {
                        email: $scope.userLoginObj.email,
                        password: $scope.userLoginObj.password,
                    };
                    apis.login.check($scope.userLoginPostObj).$promise.then(function (res) {
                        $scope.showActSignInBtn = true;
                        if (res.data) {
                            //console.log(res.data);
                            var expToken = res.data.token;
                            var date = jwtHelper.getTokenExpirationDate(expToken);
                            var bool = jwtHelper.isTokenExpired(expToken);
                            console.log(date);
                            console.log(bool);

                            $localStorage.jwt_token = expToken;
                            jQuery('#login-modal').modal('hide');


                            $interval(function () {
                                toaster.pop({
                                    type: 'success',
                                    title: "Success!",
                                    body: "Login success",
                                    showCloseButton: true
                                });

                                //$scope.getUserMe();
                                userMeService.get();
                                //$state.go($state.current, {}, {reload: true});
                            }, 100, 1);


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
                        $scope.showActSignInBtn = true;
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
            };

            var cleanUpLoginModalEvt = $rootScope.$on('loginModalEvt', function (event, data) {
                //console.log("inside login trigger...");
                $scope.userLoginFrm.$setPristine();
                jQuery('#login-modal').modal('show');
                $scope.resetLoginScope();
            });
            $scope.$on('$destroy', function () {
                cleanUpLoginModalEvt();
            });
            
            $scope.user = {};
            // Defining user logged status
            $scope.logged = false;
            // And some fancy flags to display messages upon user status change
            $scope.byebye = false;
            $scope.salutation = false;
            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
            $scope.$watch(
                    function () {
                        return Facebook.isReady();
                    },
                    function (newVal) {
                        if (newVal)
                            $scope.facebookReady = true;
                    }
            );

            var userIsConnected = false;

            Facebook.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    userIsConnected = true;
                }
            });

            /**
             * IntentLogin
             */
            $scope.IntentLogin = function () {
                if (!userIsConnected) {
                    
                    $scope.login();
                }
                else {
                    $scope.me();
                }
            };

            /**
             * Login
             */
            $scope.login = function () {
                Facebook.login(function (response) {
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }

                });
            };

            /**
             * me 
             */
            $scope.me = function () {
                $scope.showActSignInBtn = false;
                Facebook.api('/me', function (response) {
                    console.log(response);
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */

                    // $scope.user = response;
                    var fb_email;
                    if (response.email) {//jshint ignore:line
                        fb_email = response.email;
                    }
                    else {
                        fb_email = response.id + "@noemail.com";
                    }
                    $scope.userFBLoginPostObj = {
                        social_id: response.id,
                        name: response.name,
                        email: fb_email
                    };
                    apis.fbLogin.check($scope.userFBLoginPostObj).$promise.then(function (res) {
                        $scope.showActSignInBtn = true;
                        if (res.data) {
                            //console.log(res.data);
                            var expToken = res.data.token;
                            var date = jwtHelper.getTokenExpirationDate(expToken);
                            var bool = jwtHelper.isTokenExpired(expToken);
                            console.log(date);
                            console.log(bool);

                            $localStorage.jwt_token = expToken;
                            jQuery('#login-modal').modal('hide');


                            $interval(function () {
                                /*toaster.pop({
                                 type: 'success',
                                 title: "Success!",
                                 body: "Login success",
                                 showCloseButton: true
                                 });*/

                               // $scope.getUserMe();
                               userMeService.get();
                                //$state.go($state.current, {}, {reload: true});
                            }, 100, 1);


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
                        $scope.showActSignInBtn = true;
                        if (error) {
                            toaster.pop({
                                type: 'error',
                                title: "Error!",
                                body: error.data.message,
                                showCloseButton: true
                            });

                        }
                    });


                });
            };
        }
    }
}).directive('signupModalView', function ($rootScope, apis, toaster, $localStorage, $state, $filter, $http, Facebook, jwtHelper, $interval, userMeService) {
    return {
        templateUrl: 'views/common/signup_popup.html',
        restrict: 'E',
        replace: true,
        scope: {
        },
        controller: function ($scope) {
            $scope.userSignupObj = {};
            $scope.getLocationList = function () {
                var rootCountry = $rootScope.geoLocations.country_code;
                $scope.userSignupObj.phoneCode = rootCountry;
                $scope.location_options = [];
                $http.get('json/locations.json').success(function (data) {
                    var data = angular.fromJson(data);
                    angular.forEach(data, function (val, key) {
                        $scope.location_options.push({"value": val.code, "name": val.name, "code": val.code, "dial_code": val.dial_code});
                    });

                }).error(function (data, status, error, config) {
                    //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
                });
            };



            $scope.resetSignupScope = function () {
                $scope.showActSignupBtn = true;
                $scope.userSignupObj = {
                    first_name: "",
                    last_name: "",
                    //phoneCode: "",
                    phone: "",
                    //address: "",
                    //city: "",
                    //country: "",
                    //postal_code: "",
                    //dob: "",
                    password: "",
                    confirm_password: "",
                    isFrmInvalid: true
                };
                $scope.getLocationList();
            };
            $scope.resetSignupScope();

            $scope.doValidateSignup = function (isValid) {
                $scope.userSignupObj.isFrmInvalid = isValid;
                if (isValid) {
                    $scope.showActSignupBtn = false;
                    // console.log($scope.userSignupObj);
                    var dob = "";
                    /*if ($scope.userSignupObj.dob != "") {
                     dob = $filter('date')($scope.userSignupObj.dob, 'yyyy-MM-dd')
                     }*/


                    $scope.userSignupPostObj = {
                        full_name: $scope.userSignupObj.first_name + ' ' + $scope.userSignupObj.last_name,
                        email: $scope.userSignupObj.email,
                        phoneCode: $scope.userSignupObj.phoneCode,
                        phone: $scope.userSignupObj.phone,
                        //address: $scope.userSignupObj.address,
                        //city: $scope.userSignupObj.city,
                        //country: $scope.userSignupObj.country,
                        //postal_code: $scope.userSignupObj.postal_code,
                        //dob: dob,
                        password: $scope.userSignupObj.password,
                    };

                    apis.signup.create($scope.userSignupPostObj).$promise.then(function (res) {
                        $scope.showActSignupBtn = true;
                        if (res.data) {
                            //$localStorage.currentUser = res.data;
                            //$rootScope.currentUser = res.data;

                            toaster.pop({
                                type: 'success',
                                title: "Success!",
                                body: "Your account has been created successfully.",
                                showCloseButton: true
                            });
                            jQuery('#register-modal').modal('hide');
                            //$state.go($state.current, {}, {reload: true});
                            /*$state.transitionTo($state.current, {}, {
                             reload: true,
                             inherit: false,
                             notify: true
                             });*/
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
                        $scope.showActSignupBtn = true;
                        if (error) {
                            toaster.pop({
                                type: 'error',
                                title: "Error!",
                                body: error.data.message,
                                showCloseButton: true
                            });

                        }
                    });
                    //console.log($scope.userSignupPostObj);
                }
            };

            var cleanUpSignupModalEvt = $rootScope.$on('signupModalEvt', function (event, data) {
                //console.log("inside login trigger...");
                $scope.userSignupFrm.$setPristine();
                jQuery('#register-modal').modal('show');
                $scope.resetSignupScope();
            });
            $scope.$on('$destroy', function () {
                cleanUpSignupModalEvt();
            });

//           facebook login
            $scope.user = {};
            // Defining user logged status
            $scope.logged = false;
            // And some fancy flags to display messages upon user status change
            $scope.byebye = false;
            $scope.salutation = false;
            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
            $scope.$watch(
                    function () {
                        return Facebook.isReady();
                    },
                    function (newVal) {
                        if (newVal)
                            $scope.facebookReady = true;
                    }
            );

            var userIsConnected = false;

            Facebook.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    userIsConnected = true;
                }
            });

            /**
             * IntentLogin
             */
            $scope.IntentLogin = function () {
                if (!userIsConnected) {
                    
                    $scope.login();
                }
                else {
                    $scope.me();
                }
            };

            /**
             * Login
             */
            $scope.login = function () {
                Facebook.login(function (response) {
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }

                });
            };

            /**
             * me 
             */
            $scope.me = function () {
                $scope.showActSignupBtn = false;
                Facebook.api('/me', function (response) {
                    console.log(response);
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */

                    // $scope.user = response;
                    var fb_email;
                    if (response.email) {//jshint ignore:line
                        fb_email = response.email;
                    }
                    else {
                        fb_email = response.id + "@noemail.com";
                    }
                    $scope.userFBLoginPostObj = {
                        social_id: response.id,
                        name: response.name,
                        email: fb_email
                    };
                    apis.fbLogin.check($scope.userFBLoginPostObj).$promise.then(function (res) {
                        $scope.showActSignupBtn = true;
                        if (res.data) {
                            //console.log(res.data);
                            var expToken = res.data.token;
                            var date = jwtHelper.getTokenExpirationDate(expToken);
                            var bool = jwtHelper.isTokenExpired(expToken);
                            console.log(date);
                            console.log(bool);

                            $localStorage.jwt_token = expToken;
                            jQuery('#register-modal').modal('hide');


                            $interval(function () {
                                /*toaster.pop({
                                 type: 'success',
                                 title: "Success!",
                                 body: "Login success",
                                 showCloseButton: true
                                 });*/

                               // $scope.getUserMe();
                               userMeService.get();
                                //$state.go($state.current, {}, {reload: true});
                            }, 100, 1);


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
                        $scope.showActSignupBtn = true;
                        if (error) {
                            toaster.pop({
                                type: 'error',
                                title: "Error!",
                                body: error.data.message,
                                showCloseButton: true
                            });

                        }
                    });


                });
            };
            
            


        }
    }
});


