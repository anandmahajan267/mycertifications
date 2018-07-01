'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
        .directive('mainFooter', function ($rootScope) {
            return {
                templateUrl: 'scripts/directives/footer/footer.html',
                restrict: 'E',
                replace: true,
                scope: {
                },
                controller: function ($scope) {
                    
                }
            }
        });


