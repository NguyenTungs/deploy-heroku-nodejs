var adminApp = angular.module('blogApp', []);

adminApp.controller('blogController', ['$scope', '$http', '$location',
    function($scope, $http, $location) {

        $scope.url = $location.protocol() +'://'+ location.host;

        $scope.getListB050 = function() {
            $http.get('/api_blog/listB050')
                .success(function(results) {
                    console.log("I got the data I requested..................");
                    $scope.lists = results;
                });
        };

        $scope.lists = [];

        $scope.getListB050();


    }
]);
