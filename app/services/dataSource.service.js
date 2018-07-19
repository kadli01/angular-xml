app.factory('DataSource', function($http){
	var xml = {};	

	xml.get = function(file) {

		return $http({
			method: 'get',
			url: file
		}).

		success(function(data){
			// console.log(data);
			return data;
		}).error(function() {
			console.log('error');
		});
	}

	return xml;
});