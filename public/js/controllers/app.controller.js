angular.module('MaintCtrl', [])
.controller('MasterDetailCtrl', function ($scope, solomonsvc) {

$scope.POs = null;

// $scope.submit = function () {
// 	if ($scope.pid) {

		// Get PO's from SL
		
		solomonsvc.get('55990')
			.sucess(function(data) {
				$scope.POs = data;
			})
			.error(function (data, status, headers, config) {
				$scope.errorMessage = "Couldn't load the list of POs, error # " + status;
			});
// 	}

// }

});