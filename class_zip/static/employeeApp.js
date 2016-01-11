
var app = angular.module('employeeApp', ['ngRoute']);



app.config(function ($routeProvider) {
    $routeProvider
	.when('/', {
	    controller: 'customersController',
        templateUrl: '/partials/main.html'
    })
	.when('/edit', {
	    controller: 'newController',
        templateUrl: '/partials/edit.html'
    })
	.when('/back', {
	    controller: 'customersController',
        templateUrl: '/partials/main.html'
    });

});

app.controller('customersController', function($scope,$http) {
    $http.get('dummy_data.json')
    .success(function(response) 
	{
		$scope.employees = response.employees;
	});
	
});

app.controller('newController', function($scope,$location) {
    
	
	$scope.addUser = function()
	{
	    $location.path("/");
     	 $scope.newEmp = {
	     "name": $scope.newName,
		 "class": $scope.newSkill
	  };
	  $scope.employees.push($scope.newEmp);
	}
	
});


/*
function customersController($scope,$http) {
    $http.get('dummy_data.json')
    .success(function(response) {$scope.employees = response.employees;});
}
*/
