var adminApp = angular.module('adminApp', ['ngResource', 'ngCookies', 'ui.tinymce']);

adminApp.controller('adminController', ['$scope', '$cookieStore', '$resource', '$http', '$location',
    function($scope, $cookieStore, $resource, $http, $location) {

    var Q100 = $resource('/api_admin/signup_q100');
    var _Q100 = $resource('/api_admin/login_q100');

    $scope.loading = false;
    if($cookieStore.get('user')){
        $scope.user  = $cookieStore.get('user');
    }
    

    $scope.url = $location.protocol() +'://'+ location.host;


    $scope.signupSubmit = function() {

        var q100 = new Q100();
        $scope.loading = true;
        q100.qv101 = $scope.qv101;
        q100.qv102 = $scope.qv102;
        q100.$save(function(data) {
            if (data.rs === 0) {
                alert('Error: ', data.result);
            } else {
                window.location.href = '/admin/login';
            }

        });
    }


    $scope.loginSubmit = function() {
        var encodeString = 'qv101='+encodeURIComponent($scope.qv101)+'&qv102='+encodeURIComponent($scope.qv102);
        $http({
            method: 'POST',
            url: '/api_admin/login_q100',
            data: encodeString,
            headers: {'content-type' : 'application/x-www-form-urlencoded'}
        }).success(function(data, status) {
            console.info('data-',data);
            if(data[0].qv101){
                $cookieStore.put('user',data[0]);
                $scope.user = $cookieStore.get('user');
                window.location.href = $scope.url +'/admin';
            }

        }).error(function() {
            console.log('login error');
        });

    }

    $scope.addSubmit = function() {
        var encodeString = 'bv051='+encodeURIComponent($scope.bv051)+'&bv052='+encodeURIComponent($scope.bv052)+'&bv053='+encodeURIComponent($scope.bv053)+'&bv054='+encodeURIComponent($scope.bv054)+'&bv055='+encodeURIComponent($scope.bv055);
        $http({
            method: 'POST',
            url: '/api_admin/add_b050',
            data: encodeString,
            headers: {'content-type' : 'application/x-www-form-urlencoded'}
        }).success(function(data, status) {
            if(data.rs === 1){
                window.location.href = $scope.url +'/admin/blog';
            }

        }).error(function() {
            console.log('login error');
        });

    }

}]);


adminApp.controller('blogController', ['$scope', '$http', '$location',
    function($scope, $http, $location) {

        $scope.getListB050 = function() {
            $http.get('/api_blog/listB050')
                .success(function(results) {
                    console.log("I got the data I requested..................");
                    $scope.lists = results;
                });
        };

        $scope.lists = [];

        $scope.getListB050();

        $scope.delB050 = function(pb050, index) {
            var encodeString = 'obj='+encodeURIComponent(pb050);
            $http({
                method: 'POST',
                url: '/api_admin/del_b050',
                data: encodeString,
                headers: {'content-type' : 'application/x-www-form-urlencoded'}
            }).success(function(data, status) {

                if(data.rs === 1){
                    $scope.lists.splice(index, 1);
                }

            }).error(function() {
                console.log('login error');
            });

        }


    }
]);
