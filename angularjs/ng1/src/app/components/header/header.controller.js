'use strict';

angular.module('designer')
.controller('HeaderController', function ($scope, $translate) {
    var me = $scope;

    me.setLanguale = function(language) {
        if(language == 'hi') {
            me.languages = [
                {
                    id: 1,
                    desc : 'हिंदी',
                    code: 'hi'
                },
                {
                    id: 2,
                    desc : 'अंग्रेज़ी',
                    code: 'en'
                }
            ];
            me.selected = me.languages[0];
        } else {
            me.languages = [
                {
                    id: 1,
                    desc : 'Hindi',
                    code: 'hi'
                },
                {
                    id: 2,
                    desc : 'English',
                    code: 'en'
                }
            ];
            me.selected = me.languages[1];
        }
    }

    var language = localStorage.getItem('language');

    me.setLanguale(language);

    me.changeLanguage = function() {
        var key = me.selected.code;
    	$translate.use(key);
        localStorage.setItem('language', key);
        me.setLanguale(key);
    }
});