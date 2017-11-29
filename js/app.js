var app = angular.module('myApp', []);
		app.controller('person', function($scope, $http){
			$scope.rcvd = "No message";
			$scope.send = function(){
					console.log("function called"+ $scope.message + " the ")
					$http.get("http://localhost:5000/get/"+$scope.message).then(function successCallback(response) {
						console.log("request sent")
						console.log(response)
					$scope.rcvd = response.data;
					console.log($scope.rcvd)
					$scope.message = "";
					});
			};
		});