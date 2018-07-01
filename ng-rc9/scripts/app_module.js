'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var sbAdminApp = angular.module('sbAdminApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'toaster',
    'angular.filter',
    'ngMap',
    'pascalprecht.translate',
//    'mgcrea.ngStrap',
    'braintree-angular',
    'angular-jwt',
    'ui.date',
    'credit-cards',
    'facebook',
]).constant('clientTokenPath', '' + api_base_url + '/payment/clienttoken?gateway=braintree');
