'use strict';

var myapp = angular.module('myApp', ['ui.bootstrap']);

myapp.directive('availableEmail', ['$log', function($log) {
  return {
     require: 'ngModel',
	 link: function(scope, elm, attrs, ctrl) {
	    $log.log('in directive');
	    if (ctrl) {
		   ctrl.$validators.unshift(function(viewValue) {
		      $log.log('in directive');
		      return false;
		   });
		}
	 }
  };
}]);

myapp.controller('anothercontroller', ['$scope', '$log', function($scope, $log){
    $scope.customer = {"questions": [{},{}]};
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
       $log.log(angular.toJson($scope.customer, true));
    };
    $scope.open = function($event) {
    	$scope.status.opened = true;
    };
	
	$scope.checkForm = function() {
	    return false;
	};
	$scope.questions = [{"id":1, "description": "question 1"}, {"id":2, "description": "question 2"}];
	$scope.activeLegalDeclaration = {"content": "this is the content of legal declaration", "version": 5};
	$scope.countries =["Australia", "China", "Chile"];
}]);