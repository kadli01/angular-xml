app.factory('ModalService', function(){

	var modals = [];
	var service = {};

	service.Add = function(modal) {
		modals.push(modal);
	}

	service.Remove = function(id) {
		var modalToRemove = _.findWhere(modals, { id: id});
		modals = _.without(modals, modalToRemove);
	}

	service.Open = function(id) {
		console.log(id);
		var modal = _.findWhere(modals, { id: id});
		modal.open();
	}

	service.Close = function(id) {
		var modal = _.findWhere(modals, { id: id});
		modal.close();
	}

	return service;
});