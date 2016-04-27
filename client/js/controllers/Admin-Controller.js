var adminApp = angular.module('adminApp', ['ngResource', 'ngCookies']);

adminApp.controller('adminController', ['$scope', '$cookieStore', '$resource', '$http', 
    function($scope, $cookieStore, $resource, $http) {

    var Q100 = $resource('/api_admin/signup_q100');
    var _Q100 = $resource('/api_admin/login_q100');

    $scope.loading = false;

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
            console.log('login success--',data[0]);
            if(data[0].qv101){
                $cookieStore.put('user',data[0]);
            }
            console.log('login sucaaacess--',$cookieStore.get('user'));
            $scope.user = $cookieStore.get('user');
        }).error(function() {
            console.log('login error');
        });

    }

}]);
