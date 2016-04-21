var myApp = angular.module('myApp', ['ngResource']);

myApp.controller('demoController', ['$scope', '$resource', function($scope, $resource) {

    var Meetup = $resource('/api/meetups');

    Meetup.query(function(results) {
        $scope.lists = results;
    });

    $scope.lists = [];


    $scope.demoSubmit = function() {

        var meetup = new Meetup();
        meetup.title = $scope.title;
        meetup.uuid = $scope.uuid;
        meetup.$save(function(data) {
            if (data.rs === 0) {
                alert('Error: ', data.result);
            } else {
                $scope.lists.push(data.result);
                $scope.title = '';
                $scope.uuid = '';
            }

        });

    }

    $scope.func_delete = function(id, index) {
        var meetup = new Meetup();

        meetup.$delete({ id: id }, function(data) {
            if (data.rs === 0) {
                alert('Error: ', data.result);
            } else {
                $scope.lists.splice(index, 1);
            }

        });
    }

    //Edit
    var User = $resource('/api/edit/:userId', { userId: '@id' });
    $scope.func_edit = function(id) {

        User.get({ userId: id }, function(data) {
            if (data.rs === 0) {
                alert('Error: ', data.result);
            } else {
                $scope.title = data.result.title;
                $scope.uuid = data.result.uuid;
            }
        });
    }

}]);
