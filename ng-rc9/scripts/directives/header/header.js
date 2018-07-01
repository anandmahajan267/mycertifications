'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
        .directive('mainHeader', function ($rootScope, $localStorage, $state, $translate, $http) {
            return {
                templateUrl: 'scripts/directives/header/header.html',
                restrict: 'E',
                replace: true,
                scope: {
                },
                controller: function ($scope) {
                    $scope.currentUser = $rootScope.currentUser;

                    $rootScope.$watch('currentUser', function (refs) {
                        //console.log('currentUser root watch...');
                        //console.log(refs);
                        $scope.currentUser = refs;
                    }, true);

                    if ($rootScope.current_page == 'home') {
                        if (!$('#id_main_html').hasClass('home-bg')) {
                            $('#id_main_html').removeClass('search-bg');
                            $('#id_main_html').addClass('home-bg');
                        }
                    }
                    else {
                        $('#id_main_html').removeClass('home-bg');
                    }

                    $("html").niceScroll({styler: "fb", cursorcolor: "#f05826", cursorwidth: '6', cursorborderradius: '10px', background: '#f05826', spacebarenabled: false, cursorborder: '', zindex: '1000'});

                    $scope.showLogin = function () {
                        console.log('showLogin');
                        //jQuery('#login-modal').modal('show');

                        $rootScope.$broadcast('loginModalEvt', {});
                    };
                    $scope.showSignUp = function () {
                        console.log('showSignUp');
                        $rootScope.$broadcast('signupModalEvt', {});

                    };
                    $scope.doLogout = function () {
                        //$localStorage.$reset();
                        delete $localStorage.jwt_token;
                        delete $localStorage.currentUser;
                        delete $rootScope.currentUser;
                        $state.transitionTo("home", {}, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    };


                   
                    $scope.langs = app_langs;
                    $scope.selectLang = $rootScope.selectLang;
                    $scope.selectLangCode = $rootScope.selectLangCode;
                     //console.log("proposedLanguage 2 :"+$scope.selectLang);
                    $scope.setLang = function (langKey, $event) {
                        $scope.selectLang = $scope.langs[langKey];
                        $rootScope.selectLang = $scope.selectLang;
                        $scope.selectLangCode = langKey;
                        $rootScope.selectLangCode = langKey;
                        $http.defaults.headers.common['app_locale'] = langKey;
                        $translate.use(langKey);
                        $state.go($state.current, {}, {reload: true});
                    };
                }
            }
        });


