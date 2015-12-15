'use strict';

var myapp = angular.module('myApp', ['ui.bootstrap']);

myapp.controller('anothercontroller', ['$scope', '$log', function($scope, $log){
    $scope.customer = {};
    $scope.today = new Date();
    $scope.status = {opened:true};
    $scope.dateOptions = {
    	formatYear: 'yy',
    	startingDay: 1
    };
    $scope.minDate = new Date();
    $scope.maxDate = new Date(2020, 10, 22);
    $scope.retypeNotTheSame = function(){
       return true;
    };

    $scope.create = function() {
       $log.log($scope.customer);
    };
    $scope.open = function($event) {
    	$scope.status.opened = true;
    }
}]);