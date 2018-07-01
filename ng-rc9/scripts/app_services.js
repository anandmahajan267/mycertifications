
sbAdminApp.service('userMeService', function (apis, $rootScope, $localStorage) {
    this.get = function () {
        apis.userMe.get().$promise.then(function (res) {
            //console.log(res);
            if (res.data) {
                $localStorage.currentUser = res.data;
                $rootScope.currentUser = res.data;
            }
            return true;
        }, function (error) {
            if (error) {
                delete $localStorage.currentUser;
                delete $rootScope.currentUser;
            }
            return true;
        });
    };
});