'use strict';

angular.module('designer')

	.factory('aiservice', function($http, $q) {

		/*
         * Getting employee list
         */
        var getEmployeeList = function () {
            var deferred = $q.defer();

            var request = $http({
                method: "get",
                url: 'app/services/data/data.json'
            });

            request.success(
                function (result) {
                    deferred.resolve(result);
                }
            );

            request.error(
                function (data) {
                    deferred.reject(data);
                }
            );
            
            return deferred.promise;
        };

		return {
			getEmployeeList: getEmployeeList
		}
	})