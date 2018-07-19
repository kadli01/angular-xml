app.directive('modal', function(ModalService) {
	return {
		link: function (scope, element, attrs) {
			if (!attrs.id) {
				console.error('modal must have an id');
				return
			}
			
			var modal = {
				id: attrs.id,
				open: Open,
				close: Close
			};
			//add modal to service
			ModalService.Add(modal);
			
			element.appendTo('body');

			//close modal on background click
			element.on('click', function(e) {
				var target = $(e.target);
				if (!target.closest('.modal-body').length) {
					scope.$evalAsync(Close);
				}
			});

			scope.$on('$destroy', function() {
				ModalService.Remove(attrs.id);
				element.remove();
			});

			function Open() {
				element.show();
				$('body').addClass('modal-open');
			}

			function Close() {
				element.hide();
				$('body').removeClass('modal-open');

			}
		}
	}
});