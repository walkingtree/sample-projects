describe('header controller', function () {

  beforeEach(module('designer'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('Language', function () {
		it('setLanguage should be available', function () {
			var $scope = {};
			var controller = $controller('HeaderController', { $scope: $scope });
			expect($scope.setLanguale).toBeDefined();
		});
		it('Selected language should be available', function () {
			var $scope = {};
			var controller = $controller('HeaderController', { $scope: $scope });
			$scope.setLanguale('hi');
			expect($scope.selected).toBeDefined();
			console.log($scope.selected);
		});
		it('Default language should be available', function () {
			var $scope = {};
			var controller = $controller('HeaderController', { $scope: $scope });
			expect($scope.changeLanguage).toBeDefined();
			$scope.changeLanguage();
			
		});
		it('Selected language should be available', function () {
			var $scope = {};
			var controller = $controller('HeaderController', { $scope: $scope });
			$scope.setLanguale('en');
			expect($scope.selected).toBeDefined();
			console.log($scope.selected);
		});
	});

});