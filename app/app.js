'use strict';

var myapp = angular.module('myApp', ['ui.bootstrap']);

myapp.directive('availableEmail', ['$q', '$log','$http', function($q, $log, $http) {
  return {
     require: 'ngModel',
	 link: function(scope, elm, attrs, ctrl) {
        ctrl.$asyncValidators.abc = function(modelValue, viewValue) {
		    if(ctrl.$isEmpty(modelValue)) {
			  return $q.when();
			}
			var def = $q.defer();
			
			$http.get('http://localhost:8080/admissions-rest-api/rest/accounts/availibility/' + viewValue).success(function(data){
			   $log.log(data);
			   if(data.available == true) {
			      def.resolve();
			   } else {
			      def.reject();
			   }
			});

			return def.promise;
		}
	 }
  };
}]);

myapp.controller('anothercontroller', ['$scope', '$window','$log', '$http', function($scope, $window, $log, $http){
    $scope.customer = {"questions": [{"sequence" : 1},{"sequence" : 2}]};
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
	   $http.post('http://localhost:8080/admissions-rest-api/rest/customers', angular.toJson($scope.customer))
	   .then(function(data){
	       $log.log(data);
	       $window.alert(data.status);
		}, 
		function(errdata){
		   $log.log(errdata);
		   $window.alert(errdata.status);
		});
    };
    $scope.open = function($event) {
    	$scope.status.opened = true;
    };
	
	$scope.checkForm = function() {
	    return false;
	};
	
	$http.get('http://localhost:8080/admissions-rest-api/rest/securityquestions').success(function(data){
	   $scope.questions = data;
	});
	
	$http.get('http://localhost:8080/admissions-rest-api/rest/legaldeclaration/active').success(function(data){
	   $scope.activeLegalDeclaration = data;
	});

	$http.get('http://localhost:8080/admissions-rest-api/rest/countries').success(function(data){
	   $scope.countries = data;
	});
}]);
