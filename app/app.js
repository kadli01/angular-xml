var app = angular.module('XmlPractice', [
  'ngRoute',
]).
config(['$routeProvider', function($routeProvider) {

	$routeProvider.
		when('/expenses', {templateUrl: 'expenses-page/expenses.html', controller: 'expensesController'}).
		otherwise({redirectTo: '/'});
}]);
