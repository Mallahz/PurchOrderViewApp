angular.module('Solomonsvc', []).factory('solomonsvc', ['$http', function($http) {

	return {
		
		// call to get Solomon data based off of Project ID
		get: function(pid) {
			return $http.get('http://localhost:53191/Service1.svc/getSalesOrderData/' + pid);
		}
	}
	
}]);