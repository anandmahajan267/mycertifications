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
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'angular-loading-bar',
    'ngResource',
    'ngStorage',
    'toaster',
    'angular.filter',
    'ngMap',
    'ngSanitize',
//    'mgcrea.ngStrap',
    'braintree-angular',
    'angular-jwt',
    'ui.date',
    'credit-cards',
    'facebook',
]).constant('clientTokenPath', '' + api_base_url + '/payment/clienttoken?gateway=braintree');
