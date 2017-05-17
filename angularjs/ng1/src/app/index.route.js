(function () {
    'use strict';
    angular.module('designer').config(routeConfig);
    function routeConfig($routeProvider) {
        $routeProvider
				.when('/', {
                    templateUrl: 'app/components/main/main.html'
				})
				.otherwise({
                    redirectTo: '/'
				});
    }

})();
