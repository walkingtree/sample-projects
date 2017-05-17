
//designer-area directive has information of template for designer-area

(function () {
    'use strict';

    angular.module('designer')
            .directive('aiFooter', function () {
                    return {
                        restrict: 'E',
                        templateUrl: 'app/components/footer/footer.html',
                        controller: function () {

                        }
                    };
                });

})();