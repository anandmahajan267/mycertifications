'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
        .directive('fileField2', function ($rootScope, toaster) {
            return {
                require: 'ngModel',
                restrict: 'E',
                link: function (scope, element, attrs, ngModel) {
                    //set default bootstrap class
                    if (!attrs.class && !attrs.ngClass) {
                        element.addClass('btn');
                    }

                    var fileField = element.find('input');

                    fileField.bind('change', function (event) {
                        scope.$evalAsync(function () {

                            var filesize = event.target.files[0].size;
                            //console.log(filesize);
                            var sizeInMB = (filesize / (1024 * 1024)).toFixed(2);
                            //console.log(sizeInMB);
                            if (sizeInMB > 2) {
                                toaster.pop({
                                    type: 'error',
                                    title: "Error!",
                                    body: "您上传的照片过大，请压缩至2MB以下后再上传！",
                                    showCloseButton: true
                                });
                                return false;
                            }

                            ngModel.$setViewValue(event.target.files[0]);

                            //console.log(event.target.files[0].getAsDataURL());
                            if (attrs.preview) {
                                var reader = new FileReader();
                                var r = new FileReader();
                                reader.onload = function (e) {
                                    scope.$evalAsync(function () {
                                        scope[attrs.preview] = e.target.result;
                                        //scope.datarow.dis_photo = e.target.result;
                                        //scope.$root.file_str = btoa(e.target.result);
                                        //scope.$root.file_str = e.target.result;

                                        //console.log(btoa(e.target.result));



                                    });
                                };
                                reader.readAsDataURL(event.target.files[0]);
                                scope.doUpload2();
                                //console.log(event.target.files[0]);
                                //reader.readAsBinaryString(event.target.files[0]);

                                //$rootScope.file_str = r.readAsBinaryString(event.target.files[0]);
                                //ngModel.$setViewValue(r.readAsBinaryString(event.target.files[0]));
                                //alert('asd');

                            }
                        });
                    });

                    fileField.bind('click', function (e) {
                        e.stopPropagation();
                    });
                    element.bind('click', function (e) {
                        e.preventDefault();
                        fileField[0].click()
                    });

                },
                template: '<button class="btn btn-warning" type="button"><ng-transclude></ng-transclude><input type="file" accept="image/*" style="display:none"> 上传图片</button>',
                replace: true,
                transclude: true
            };
        });

