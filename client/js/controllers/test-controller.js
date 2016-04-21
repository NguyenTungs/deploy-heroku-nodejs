var myApp = angular.module('myApp', ['ngResource']);

myApp.controller('demoController', ['$scope', '$resource', function($scope, $resource) {

    var Meetup = $resource('/api/meetups');

    Meetup.query(function(results){
    	$scope.lists = results;
    });

    $scope.lists = [];


    $scope.demoSubmit = function() {

        var meetup = new Meetup();
        meetup.title = $scope.title;
        meetup.$save(function (result){
        	$scope.lists.push(result);
        });

    }

}]);
