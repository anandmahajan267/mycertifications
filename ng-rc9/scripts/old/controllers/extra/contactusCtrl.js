'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:contactusCtrl
 * @description
 * # contactusCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
        .controller('contactusCtrl', function ($scope, $filter, $state, $rootScope, $log, toaster, apis) {

            $scope.showSignUp = function () {
                console.log('showSignUp');
                $rootScope.$broadcast('signupModalEvt', {});
            };



            $scope.initData = function () {
                
                $scope.contactusObj = {
                    firstname: "",
                    lastname: "",
                    email: "",
                    subject: "",
                    url: "",
                    body: "",
                    phone: "",
                    isFrmInvalid: true
                };
                $scope.showActContactUsBtn = true;
            };

            $scope.doValidateContactUs = function (isValid) {
                $log.info(isValid);
                $scope.contactusObj.isFrmInvalid = isValid;
                if (isValid) {
                     $scope.showActContactUsBtn = false;
                    $log.info($scope.contactusObj);

                    $scope.contactusPostObj = {
                        name: $scope.contactusObj.firstname + " " + $scope.contactusObj.firstname,
                        email: $scope.contactusObj.email,
                        subject: $scope.contactusObj.subject,
                        url: "",
                        body: $scope.contactusObj.body,
                        phone: $scope.contactusObj.phone
                    };

                    apis.contactus.send($scope.contactusPostObj).$promise.then(function (res) {
                        $scope.contactUsFrm.$setPristine();
                        if (res.data) {
                            //$localStorage.currentUser = res.data;
                            //$rootScope.currentUser = res.data;

                            toaster.pop({
                                type: 'success',
                                title: "Success!",
                                body: "Thanks for contacting us! We will get in touch with you shortly.",
                                showCloseButton: true
                            });
                            $scope.initData();
                        }
                        else {
                            toaster.pop({
                                type: 'error',
                                title: "Error!",
                                body: res.message,
                                showCloseButton: true
                            });
                            $scope.initData();
                        }
                    }, function (error) {
                        $scope.contactUsFrm.$setPristine();
                        $scope.initData();
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




        });

