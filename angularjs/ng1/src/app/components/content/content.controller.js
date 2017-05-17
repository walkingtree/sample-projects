'use strict';

angular.module('designer')
	.controller('ContentController', function ($scope, aiservice) {
		var me = $scope;
		me.employees = [];
		me.search = '';
		me.monay = 1111;
		aiservice.getEmployeeList().then(function (response) {
			me.employees = response;
		});
	});