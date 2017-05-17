(function () {
    'use strict';

    angular.module('designer')
        .filter('Search', function ($filter) {
            return function (list, search) {
                return (search) ? $filter('filter')(list, search) : list;
            };
        });

})();