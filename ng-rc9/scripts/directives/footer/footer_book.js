'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
        .directive('mainFooterBook', function ($rootScope, $localStorage) {
            return {
                templateUrl: 'scripts/directives/footer/footer_book.html',
                restrict: 'E',
                replace: true,
                scope: {
                },
                controller: function ($scope) {

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
                    $scope.getCurrencyList();
                    /*$scope.setCurCurrency2 = function (cur_currency) {
                     $localStorage.cur_currency = cur_currency;
                     };
                     
                     $scope.onChangeCurrency2 = function () {
                     $scope.setCurCurrency2($scope.selectedCurrency);
                     console.log($scope.selectedCurrency);
                     };
                     $scope.getCurCurrency2 = function () {
                     if ($localStorage.cur_currency) {
                     return $localStorage.cur_currency;
                     }
                     else {
                     return appConfig.currency;
                     }
                     };
                     
                     $scope.selectedCurrency2 = $scope.getCurCurrency2();
                     $scope.currency_options = [];
                     angular.forEach(app_rates, function (val, key) {
                     $scope.currency_options.push({"value": val.symbol, "label": "<img src=\"" + app_base_url + "/assets/img/flag/" + val.icon + "\" class=\"cls_flag_icon\">&nbsp;&nbsp;" + val.name + ""});
                     });
                     */
                }
            }
        });


