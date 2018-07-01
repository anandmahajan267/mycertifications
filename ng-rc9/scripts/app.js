

sbAdminApp.run(function ($rootScope, $localStorage, $state, apis, $http, userMeService) {
    //console.log("in the run fun...");
    $rootScope.currentUser = $localStorage.currentUser;
    if (!$localStorage.geoLocations) {
        $localStorage.geoLocations = {};
    }
    $rootScope.geoLocations = $localStorage.geoLocations;
    console.log($rootScope.currentUser);
    console.log($rootScope.geoLocations);

    userMeService.get();




    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        $rootScope.current_page = toState.data.current_page;

        $rootScope.meta_title = toState.data.metadata.title;
        $rootScope.meta_description = toState.data.metadata.description;

        $rootScope.page_title = toState.title;

        //console.log($rootScope.page_title);
        //console.log($localStorage.currentUser);

        if (requireLogin && typeof $localStorage.currentUser === 'undefined') {
            event.preventDefault();
            $state.transitionTo('home');
            // $state.go("home");
            //event.preventDefault();
            // get me a login modal!
        }
    });

    if (!$rootScope.geoLocations.lat) {
        //http://ip-api.com/json/
        //http://gd.geobytes.com/GetCityDetails
        /*$http.get('http://ip-api.com/json/').success(function (data) {
         var data = angular.fromJson(data);
         if (data) {
         $rootScope.geoLocations = {};
         $rootScope.geoLocations.country_name = data.country;
         $rootScope.geoLocations.country_code = data.countryCode;
         $rootScope.geoLocations.lat = data.lat;
         $rootScope.geoLocations.lng = data.lon;
         
         $localStorage.geoLocations = $rootScope.geoLocations;
         }
         }).error(function (data, status, error, config) {
         //$scope.contents = [{heading: "Error", description: "Could not load json   data"}];
         });*/
        jQuery.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?&fqcn=", function (data)
        {
            var data = angular.fromJson(data);
            if (data) {
                $rootScope.geoLocations = {};
                $rootScope.geoLocations.country_name = data.geobytescountry;
                $rootScope.geoLocations.country_code = data.geobytesinternet;
                $rootScope.geoLocations.lat = data.geobyteslatitude;
                $rootScope.geoLocations.lng = data.geobyteslongitude;
                //console.log("geoLocations");
                //console.log($rootScope.geoLocations);

                $localStorage.geoLocations = $rootScope.geoLocations;
            }
        });

    }

    //console.log($rootScope.geoLocations);

    /*$rootScope.$on('$viewContentLoaded', function () {
     console.log('--- viewContentLoaded ---')
     $templateCache.removeAll(); // for clear all template cache
     });*/

});


sbAdminApp.controller("appCtrl", function ($rootScope, $scope, $state, $http, $localStorage, $interval, $log, $translate) {
    //console.log('inside appCtrl...');
    $rootScope.selectLang = app_langs[$translate.proposedLanguage()] || "English";
    $rootScope.selectLangCode = $translate.proposedLanguage();

    $scope.getAppSelectedLanguage = function () {
        return $rootScope.selectLangCode;
    };


    $('.modal-backdrop').remove();
    var stopSearchCounter;
    $scope.setSearchCounter = function () {
        /*var j = 0
         $interval(function () {
         j = j+1;
         $log.info(j);
         }, 1000); // 1000 = 1 sec*/
        $scope.doStopSearchCounter();
        stopSearchCounter = $interval(function () {
            $log.info("refresh-search-modal...");
            $('#refresh-search-modal').modal('show');
        }, 600000, 1); // 1000 = 1 sec
    };

    $scope.doStopSearchCounter = function () {
        $log.info("doStopSearchCounter...");
        if (angular.isDefined(stopSearchCounter)) {
            $interval.cancel(stopSearchCounter);
            stopSearchCounter = undefined;
        }
    };

    $scope.continueToSearch = function () {
        $scope.doStopSearchCounter();
        $log.info("continueToSearch...");
        $('#refresh-search-modal').modal('hide');
        $('.modal-backdrop').remove();
        $state.go("book_car", {}, {reload: true});
    };

    $scope.getCurrencyList = function () {
        $scope.selectedCurrency = $scope.getCurCurrency();
        $scope.currency_options = [];
        angular.forEach(app_rates, function (val, key) {
            //$scope.currency_options.push({"value": val.symbol, "label": "<img src=\"" + app_base_url + "/assets/img/flag/" + val.icon + "\" class=\"cls_flag_icon\">&nbsp;&nbsp;" + val.name + ""});
            $scope.currency_options.push({"value": val.code, "name": val.code});
        });
    };
    $scope.setCurCurrency = function (cur_currency) {
        $localStorage.cur_currency = cur_currency;
    };
    $scope.getCurCurrency = function () {
        if ($localStorage.cur_currency) {
            return $localStorage.cur_currency;
        }
        else {
            return appConfig.currency;
        }
    };
    $scope.getLocationList = function () {
        var rootCountry = $rootScope.geoLocations.country_code;
        $scope.selectedLoc = rootCountry;
        $rootScope.selectedLoc = rootCountry;
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

    $scope.getRangOptions = function (startTO, loopCounter, type) {
        startTO = parseInt(startTO);
        var dataArr = [];
        var j;
        if (type == "incri") {
            var endTo = startTO + loopCounter;
            for (var i = startTO; i <= endTo; i++) {
                if (i < 10) {
                    j = "0" + i;
                }
                else {
                    j = i;
                }
                dataArr.push({id: j, name: i});
            }
        }
        else {
            var endTo = startTO - loopCounter;
            for (var i = startTO; i >= endTo; i--) {
                dataArr.push({id: i, name: i});
            }
        }

        return dataArr;

    };



});
/*sbAdminApp.config(function ($httpProvider) {
 $httpProvider.defaults.useXDomain = true;
 delete $httpProvider.defaults.headers.common["X-Requested-With"];
 });*/

sbAdminApp.config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', '$localStorage', function (config, $localStorage) {
            // Skip authentication for any requests ending in .html
            /*if (config.url.substr(config.url.length - 5) == '.html') {
             return null;
             }*/

            if ($localStorage.jwt_token) {
                return $localStorage.jwt_token;
            }
            else {
                return null;
            }

            //console.log($localStorage);
            console.log(123);

            //return 111;
        }];

    $httpProvider.interceptors.push('jwtInterceptor');
});

sbAdminApp.config(['$translateProvider', function ($translateProvider) {
        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: 'l10n/',
            suffix: '.json'
        });
        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en_US');
        // Tell the module to store the language in the local storage
        $translateProvider.useLocalStorage();
    }]);


sbAdminApp.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, FacebookProvider) {
    FacebookProvider.init(appConfig.fbid);
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
    });

    $urlRouterProvider.otherwise('/home');
    //$locationProvider.requireBase(true);
    //$locationProvider.html5Mode(true);
    /*$locationProvider.html5Mode({
     enabled: true,
     requireBase: true
     });
     $locationProvider.hashPrefix('!');*/

    /*$locationProvider.html5Mode(true);
     $locationProvider.hashPrefix = '!';*/

    $stateProvider



            .state('home', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/home',
                templateUrl: 'views/home/home.html',
                controller: 'homeCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'home',
                    metadata: {
                        title: "RC9.co - Affordable car rental & leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/home/homeCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('book_car', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/car/book',
                templateUrl: 'views/book/book_car.html',
                controller: 'bookCarCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'book_car',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/book/bookCarCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('book_car_extra', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/car/book/extra',
                templateUrl: 'views/book/book_car_extra.html',
                controller: 'carExtrasCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'book_car_extra',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/book/carExtrasCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('book_car_details', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/car/book/details',
                templateUrl: 'views/book/book_car_details.html',
                controller: 'carDetailsCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'book_car_details',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/directives/book/file-field.js',
                                'scripts/directives/book/file-field2.js',
                                'scripts/controllers/book/carDetailsCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('book_car_payment', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/car/book/payment',
                templateUrl: 'views/book/book_car_payment.html',
                controller: 'carPaymentCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'book_car_payment',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/book/carPaymentCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('book_car_success', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/car/book/success',
                templateUrl: 'views/book/book_car_success.html',
                controller: 'carPaymentSuccessCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'book_car_payment',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/book/carPaymentSuccessCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('alipay', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/car/book/alipay',
                templateUrl: 'views/book/book_car_alipayment.html',
                controller: 'carAliPaymentCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'book_car_payment',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/book/carAliPaymentCtrl.js'
                            ]
                        })

                    }
                }
            })


            .state('manage_reservation', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/reservation',
                templateUrl: 'views/user/manage_reservation.html',
                controller: 'manageReservationCtrl',
                data: {
                    requireLogin: true,
                    current_page: 'manage_reservation',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/user/manageReservationCtrl.js'
                            ]
                        })

                    }
                }
            })
            .state('dashboard', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/dashboard',
                templateUrl: 'views/user/dashboard.html',
                controller: 'dashboardCtrl',
                data: {
                    requireLogin: true,
                    current_page: 'dashboard',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/user/dashboardCtrl.js'
                            ]
                        })

                    }
                }
            })


            .state('contactus', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/contactus',
                templateUrl: 'views/extra/contactus.html',
                controller: 'contactusCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'contactus',
                    metadata: {
                        title: "Contact Us - Affordable car rental & car leasing marketplace",
                        description: "Just ask. Get answers. Your questions and comments are important to us. Reach us by phone or email. We've got everything covered for you.",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/contactusCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('aboutus', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/aboutus',
                templateUrl: 'views/extra/aboutus.html',
                controller: 'aboutusCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'aboutus',
                    metadata: {
                        title: "About Us - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/aboutusCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('team', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/team',
                templateUrl: 'views/extra/team.html',
                controller: 'teamCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'aboutus',
                    metadata: {
                        title: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                        description: "Each and every one of our employees represent the spirit of our company: driven, committed, and acutely aware of how limitless Hanover’s potential is to grow.",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/teamCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('privacy_policies', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/privacy_policies',
                templateUrl: 'views/extra/privacy_policies.html',
                controller: 'privacyPoliciesCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'aboutus',
                    metadata: {
                        title: "Privacy - Affordable car rental & car leasing marketplace",
                        description: "Customer privacy is very important and taken very seriously with RC9 Car Rental Singapore. And Here’s the detail.",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/privacyPoliciesCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('terms', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/terms',
                templateUrl: 'views/extra/terms.html',
                controller: 'termsCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'terms',
                    metadata: {
                        title: "Our Term - Affordable car rental & car leasing marketplace",
                        description: "Customer privacy is very important and taken very seriously with RC9 Car Rental Singapore. And Here’s the detail.",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/termsCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('rewards', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/rewards',
                templateUrl: 'views/extra/rewards.html',
                controller: 'rewardsCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'rewards',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/rewardsCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('pdpa', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/pdpa',
                templateUrl: 'views/extra/pdpa.html',
                controller: 'pdpaCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'rewards',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/pdpaCtrl.js'
                            ]
                        })

                    }
                }
            })

            .state('partners', {
                title: 'RC9.CO - Affordable car rental & car leasing marketplace',
                url: '/partners',
                templateUrl: 'views/extra/partners.html',
                controller: 'partnersCtrl',
                data: {
                    requireLogin: false,
                    current_page: 'partners',
                    metadata: {
                        title: "RC9.co - Affordable car rental & car leasing marketplace",
                        description: "Connecting people through affordable car rental & car leasing. RC9 is a trusted community marketplace where people can rent cars and connect with others",
                    },
                },
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                //'scripts/modals/api.js',
                                'assets/js/custom.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/footer/footer_book.js',
                                'scripts/controllers/extra/partnersCtrl.js'
                            ]
                        })

                    }
                }
            })


});