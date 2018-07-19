app.controller('expensesController', function($scope, DataSource, ModalService){
	
	var file = 'test.xml';

	$scope.xml = null;
	$scope.deals = [];
	$scope.dates = [];
	$scope.filter = {};

	$scope.expense = {
		dealExpectedDate : new Date(),
		dealStatus: 1,
		dealCurrency: 'HUF',
	};

	$scope.editDeal = {};

	var x2js = new X2JS();

	$scope.xml = DataSource.get(file).success(function(response) {
		
		$scope.xml = response;

		$scope.deals = x2js.xml_str2json($scope.xml).deals.deal;
		// console.log($scope.deals);
		// console.log(x2js.xml_str2json($scope.xml));
		angular.forEach($scope.deals, function(value, key){

			var month = value.dealExpectedDate.substr(0,7);

			if (!$scope.dates.includes(month)) {

				$scope.dates.push(month);
			}

			$scope.filter = {
				type: '1',
				date: $scope.dates[0]
			}
			value.dateGroup = month;
			value.dealExpectedDate = new Date(value.dealExpectedDate);
			value.dealValue = parseInt(value.dealValue);
		});
	});

	$scope.openModal = function(id){
		ModalService.Open(id);
	}

	$scope.closeModal = function(id){
		ModalService.Close(id);
	}

	$scope.saveExpense = function(){
		$scope.submitted = true;
		// $scope.expense.expectedDate.toISOString().substring(0, 10);
		var expense = angular.copy($scope.expense);
		var nextId = parseInt(_.max($scope.deals, function(deal){return parseInt(deal._id);})._id) + 1;
		expense._id = nextId;
		expense.dealType = $scope.filter.type;

		if ($scope.expense.dealExpectedDate) {
			expense.dateGroup = $scope.expense.dealExpectedDate.toISOString().substring(0, 10).substr(0,7);
		}
		$scope.deals.push(expense);
		
		$scope.expense = {};

		var toXml = {
			deals: {
				deal: $scope.deals
			}
		};
		var xmlStr = x2js.json2xml_str(JSON.parse(angular.toJson(toXml)));

		ModalService.Close('add-expense-modal');
		console.log(xmlStr);
	}

	$scope.editExpense = function(deal){
		$scope.editDeal = angular.copy(deal);
		ModalService.Open('edit-deal');
	}

	$scope.deleteExpense = function(deal){
		$scope.deals = _.without($scope.deals, deal);

		var toXml = {
			deals: {
				deal: $scope.deals
			}
		};

		var xmlStr = x2js.json2xml_str(JSON.parse(angular.toJson(toXml)));
		console.log(xmlStr);
	}

	$scope.updateDeal = function(editDeal) {
		var index = null;
		var deal = $scope.deals.find(function(deal, key){
			index = key;
			return deal._id == editDeal._id;
		});
		
		$scope.deals.splice(index, 1, editDeal)

		var toXml = {
			deals: {
				deal: $scope.deals
			}
		};

		var xmlStr = x2js.json2xml_str(JSON.parse(angular.toJson(toXml)));
		ModalService.Close('edit-deal');
		console.log(xmlStr);
	}
});