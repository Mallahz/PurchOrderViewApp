// Make sure AngularJS calls our WCF Service as a "GET", rather than as an "OPTION"
angular.module('purchOrder',[])
// purchOrder.config(['$httpProvider', function ($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);

.factory('XMLfactory', ['$http', function($http){
	var factory = [];
	var postXML = '<XML_OrderStatus_Submit><Header><UserName>550596</UserName><Password>xmluser550596</Password><TransSetIDCode>869</TransSetIDCode><TransControlID>10000</TransControlID><ResponseVersion>1.8</ResponseVersion></Header><Detail><PurposeCode>01</PurposeCode><EDIInd>N</EDIInd><NonEDIInd>Y</NonEDIInd><RefInfo><RefIDQual>PO</RefIDQual><RefID>219030</RefID></RefInfo></Detail><Summary><NbrOfSegments/></Summary></XML_OrderStatus_Submit>'

	factory.getXMLres = function (){
		return $.ajax({
			url:'https://tdxml.techdata.com/xmlservlet',
			type: 'POST',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: postXML,
			dataType: "xml"			
		}).done(function(data){
			var PO = x2js.xml_str2json(data);
			console.log(PO);
		})

		return factory;
	}
}])


.controller('MasterDetailCtrl', ['$scope', '$http', function ($scope, $http, XMLfactory) {

var ponbr = '219253';
$scope.POs = {};

$scope.submit = function () {
	if ($scope.pid) {

		// Get PO's from SL
		var url = "http://localhost:53191/Service1.svc/getSalesOrderData/" + $scope.pid;
		// solomonsvc.get($scope.pid)
		$http.get(url)
			.success(function(data) {
				$scope.POs = {};
				$scope.POs = data;
				// tdjson($scope.POs.PONbr);
				console.log($scope.POs.PONbr);
			})
			.error(function (data, status, headers, config) {
				$scope.errorMessage = "Couldn't load the list of POs, error # " + status;
			});
	}

	// var tdjson = loadTDXML(ponbr);

	// Check for Order Number (ON) and Invoice (IN) number
	// if (tdjson.XML_OrderStatus_Response[0].Detail[0].RefInfo[0]) {
	// 	var refinfo = tdjson.XML_OrderStatus_Response[0].Detail[0].RefInfo;

	// 	angular.forEach(refinfo, function(value, key){
	// 		if (refinfo[key].RefIDQual[0]._text == "ON") {
	// 			console.log("Order Number: " + refinfo[key].RefID[0]._text);
	// 			// console.log("loadTDXML param: " + ponbr);
	// 		} else if (refinfo[key].RefIDQual[0]._text == "IN") {
	// 			console.log("Order Number: " + refinfo[key].RefID[0]._text);
	// 		}
			
	// 	})
	// }
	//console.log(tdjson.XML_OrderStatus_Response[0].Header[0].TransSetIDCode[0]._text);
}
	

}]);

	function loadTDXML(ponbr) {
		var postXML = '<XML_OrderStatus_Submit><Header><UserName>550596</UserName><Password>xmluser550596</Password><TransSetIDCode>869</TransSetIDCode><TransControlID>10000</TransControlID><ResponseVersion>1.8</ResponseVersion></Header><Detail><PurposeCode>01</PurposeCode><EDIInd>N</EDIInd><NonEDIInd>Y</NonEDIInd><RefInfo><RefIDQual>PO</RefIDQual><RefID>' + ponbr + '</RefID></RefInfo></Detail><Summary><NbrOfSegments/></Summary></XML_OrderStatus_Submit>';

		var urlStr = "https://tdxml.techdata.com/xmlservlet"; // urlStr is Tech Data's URL
		var xmlRecv = new ActiveXObject("Microsoft.XMLHTTP");
		xmlRecv.open("POST", urlStr, false); // send the submit XML document
		xmlRecv.setRequestHeader("Content-Type", "text/xml");
		xmlRecv.send(postXML);
		var xmlResult = xmlRecv.responseText;
		
		// Take Tech Data (TD) xml response and convert to JSON
		var tdres = xmlToJSON.parseString(xmlResult);
		
		return tdres;
	};


// function loadTDXML() {
	// 	var postXML = '<XML_OrderStatus_Submit><Header><UserName>550596</UserName><Password>xmluser550596</Password><TransSetIDCode>869</TransSetIDCode><TransControlID>10000</TransControlID><ResponseVersion>1.8</ResponseVersion></Header><Detail><PurposeCode>01</PurposeCode><EDIInd>N</EDIInd><NonEDIInd>Y</NonEDIInd><RefInfo><RefIDQual>PO</RefIDQual><RefID>219030</RefID></RefInfo></Detail><Summary><NbrOfSegments/></Summary></XML_OrderStatus_Submit>'
	// 	// XMLfactory.getXMLres();

	// 	// var urlStr = "https://tdxml.techdata.com/xmlservlet"; // urlStr is Tech Data's URL
         
	// 	// var xmlRecv = new ActiveXObject("Microsoft.XMLHTTP");
	// 	// xmlRecv.open("POST", urlStr, false); // send the submit XML document
	// 	// xmlRecv.setRequestHeader("Content-Type", "text/xml");
	// 	// xmlRecv.send(postXML);

	// 	// var xmlDoc2 = new ActiveXObject("Microsoft.XMLDOM");
	// 	// xmlDoc2.async="false"
	// 	// xmlResult = xmlRecv.responseXML   // receive the response XML document
	// 	// 	document
 //  //       console.log = xmlResult.xml;
		 
	// 	 var http = new XMLHttpRequest();
	// 	 var url = 'https://tdxml.techdata.com/xmlservlet';
	// 	 http.open("POST", url, true);

	// 	 // Send the proper header information along with the request
	// 	 http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// 	 http.setRequestHeader("Content-length", postXML.length);
	// 	 http.setRequestHeader("Connection", "close");

	// 	 http.onreadystatechange = function() {
	// 	 	if(http.readyState == 4 && https.status == 200) {
	// 	 		var PO = x2js.xml_str2json(http.responseText);
	// 	 		console.log(PO);
	// 	 	}
	// 	 }
	// 	 http.send(postXML);
	// };