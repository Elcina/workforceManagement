
var app = angular.module('employeeApp', ['ngRoute','tc.chartjs']);


app.config(function ($routeProvider) {
    $routeProvider
	.when('/', {
	    controller: 'dashboardController',
        templateUrl: '/partials/main.html'
    })
	.when('/headCount', {
	    controller: 'newController',
        templateUrl: '/partials/headCount.html'
    })
	.when('/talent', {
	    controller: 'newController',
        templateUrl: '/partials/talent.html'
    })
	.when('/trends', {
	    controller: 'trendController',
        templateUrl: '/partials/trends.html'
    })
	.when('/back', {
	    controller: 'dashboardController',
        templateUrl: '/partials/main.html'
    });

});

app.factory('Data', function($http) {
    return {
	getEmpAsync: function(callback) {
	$http.get('emp_data.json').success(callback);
	},
	getHiresAsync: function(callback) {
	$http.get('headCount_data.json').success(callback);
	}
	
   };
});


app.controller('dashboardController', function($scope, Data) {  
	Data.getEmpAsync(function(results){
		
		$scope.employees = results.employees;
		 
		 var jobType = [0,0,0,0];
		 //Job type array for counting people for different types of jobs.
		 for(i=0; i < $scope.employees.length; i++)
		 {
			
			switch($scope.employees[i].job){
			
			case "Technical":
				jobType[0]++;
				break;
			case "Professional":
				jobType[1]++;
				break;
			case "Commercial":
				jobType[2]++;
				break;
			case "Business Support":
				jobType[3]++;
				break;
			}
		 }
		
		$scope.dataJobType = [
		{
			value: jobType[0],
			color:'#DE3F43',
			highlight: '#E8797B',
			label: 'Technical Jobs'
		},
		{
			value: jobType[1],
			color: '#46BFBD',
			highlight: '#B5E5E5',
			label: 'Commercial Jobs'
		},
		{
			value: jobType[2],
			color: '#009900',
			highlight: '#94D494',
			label: 'Professional Jobs'
		},
		{
			value: jobType[3],
			color: '#FDB45C',
			highlight: '#FED29D',
			label: 'Business Support'
		}
		];
		
		
		var deptType = [0,0,0,0,0,0,0];
		for(i=0; i < $scope.employees.length; i++)
		{
			switch($scope.employees[i].department){
			
			case "IT":
				deptType[0]++;
				break;
			case "Sales":
				deptType[1]++;
				break;
			case "R&D":
				deptType[2]++;
				break;
			case "Administration":
				deptType[3]++;
				break;
			case "Marketing":
				deptType[4]++;
				break;
			case "Finance":
				deptType[5]++;
				break;
			case "HR":
				deptType[6]++;
				break;
			}
		}
		 
		$scope.dataDeptHires = {
		labels: ["IT", "Sales", "R&D", "Administration","Marketing",  "Finance", "HR"],
		datasets: [
			{
				label: "HIRES BY DEPARTMENT",
				fillColor: "#478AA0",
				strokeColor: "rgba(220,220,220,0.8)",
				highlightFill: "#B5E5E5",
				highlightStroke: "rgba(220,220,220,1)",
				data: [deptType[0], deptType[1], deptType[2], deptType[3], deptType[4], deptType[5], deptType[6]]
			}
			]
		};
		
		
	
	});
	 	
});

app.controller('newController', function($scope, Data) {   
		
	Data.getEmpAsync(function(results){
	$scope.employees = results.employees;
	
	var deptType = [0,0,0,0,0,0,0];
	for(i=0; i < $scope.employees.length; i++)
		{
			switch($scope.employees[i].department){
			
			case "IT":
				deptType[0]++;
				break;
			case "Sales":
				deptType[1]++;
				break;
			case "R&D":
				deptType[2]++;
				break;
			case "Administration":
				deptType[3]++;
				break;
			case "Marketing":
				deptType[4]++;
				break;
			case "Finance":
				deptType[5]++;
				break;
			case "HR":
				deptType[6]++;
				break;
			}
		}
	
	
	$scope.dataDeptType = [
		{
			value: deptType[0],
			color:'#DE3F43',
			highlight: '#E8797B',
			label: 'IT'
		},
		{
			value: deptType[1],
			color: '#46BFBD',
			highlight: '#B5E5E5',
			label: 'Sales'
		},
		{
			value: deptType[2],
			color: '#009900',
			highlight: '#94D494',
			label: 'R&D'
		},
		{
			value: deptType[3],
			color: '#FDB45C',
			highlight: '#FED29D',
			label: 'Administration'
		},
		{
			value: deptType[4],
			color: '#46BFBD',
			highlight: '#B5E5E5',
			label: 'Marketing'
		},
		{
			value: deptType[5],
			color: '#009900',
			highlight: '#94D494',
			label: 'Finance'
		},
		{
			value: deptType[6],
			color: '#FDB45C',
			highlight: '#FED29D',
			label: 'HR'
		}
		];

	$scope.options = {
			 rotated: true,
			  scaleShowGridLines : false
		}
	});	
	
});


app.controller('trendController', function($scope, Data) {   
		
	Data.getHiresAsync(function(results){
	$scope.hires = results.hires;
	
	var hdCnt = [0,0,0,0,0,0,0,0,0,0,0,0];
	for(i=0; i < $scope.hires.length; i++)
		{
			hdCnt[i] = $scope.hires[i].count;
		}
	
	$scope.dataHeadCount = {
		labels: ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
		datasets: [
			{
				label: "Head Count for all departments",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [hdCnt[0],hdCnt[1],hdCnt[2],hdCnt[3],hdCnt[4],hdCnt[5],hdCnt[6],hdCnt[7],hdCnt[8],hdCnt[9],hdCnt[10],hdCnt[11]]
			}
			]
		};

	
	});	
	
});

/*
function customersController($scope,$http) {
    $http.get('dummy_data.json')
    .success(function(response) {$scope.employees = response.employees;});
}
*/
