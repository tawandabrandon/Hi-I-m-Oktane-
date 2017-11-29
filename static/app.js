var app = angular.module('myApp', []);
app.config(['$interpolateProvider', function($interpolateProvider) {
	$interpolateProvider.startSymbol('{a');
	$interpolateProvider.endSymbol('a}');
}]);
app.controller('oktane', function($scope, $http){
	$scope.status = 'Online';
	$scope.time = new Date();
	$scope.send = function(){
		console.log($scope.message + ' called on send()');
		$scope.appendS($scope.message);
		$scope.status = 'typing...';
		$http.get("http://localhost:9999/get/"+$scope.message).then(function successCallback(response) {
			console.log('got response: '+ response.data)
			$scope.status = 'online';
			$scope.appendR(response.data);
		});
	};
	$scope.appendR = function(text) {
		var el = angular.element(document.querySelector('#chats'));
		el.append('<li class="other"> <div class="msg" style="{position : relative; bottom:0;}">  <p>'+ text + '</p> <time>'+ $scope.time.getHours() + ':' + $scope.time.getMinutes()+'</time> </div> </li>')
		$scope.scroll();
	}
	$scope.appendS = function(text) {
		var el = angular.element(document.querySelector('#chats'));
		el.append('<li class="self" style="{position : relative; bottom:0;}"> <div class="msg">  <p>'+ text + '</p> <time>'+ $scope.time.getHours() + ':' + $scope.time.getMinutes()+'</time> </div> </li>')
		$scope.scroll()
	}
	$scope.typing = function(c) {
		var el = angular.element(document.querySelector('#chats'));
		if(c){
			el.append('<li id="typing" class="other"> <div class="msg">  <p>typing</p></div> </li>')
		}else{

		}
	}
	$scope.scroll = function updateScroll(){
		var element = document.querySelector("#chats");
		element.scrollTop = element.scrollHeight;
		console.log('Scrolled at'+ $scope.time.getHours() + ':' + $scope.time.getMinutes());
	}
});