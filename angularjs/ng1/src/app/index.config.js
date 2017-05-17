(function () {
    'use strict';

    angular
        .module('designer')
        .config(function ($translateProvider) {
            $translateProvider.translations('en', {
                HEADLINE: 'Hello there, This is my awesome app!',
                INTRO_TEXT: 'And it has i18n support!',

                HEADER: {
                    TITLE: 'AngularJS',
                    LANGUAGE: {
                        TITLE: 'Change Language',
                        OPTIONS: {
                            1: 'HINDI',
                            2: 'ENGLISH'
                        }
                    }
                },

                EMPLOYEE: {
                    TITLE: 'Employee',
                    SEARCH_PLACEHOLDER: 'Search by name',
                    NAME: 'Name',
                    AGE: 'Age'
                },

                FOOTER: {
                    COPY_RIGHTS: '2017 © Walking Tree Pvt Ltd'
                }
            })
            .translations('de', {
                HEADLINE: 'Hey, das ist meine großartige App!',
                INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!'
            })
            .translations('hi', {
                HEADLINE: 'हैलो, यह मेरा बहुत अच्छा ऐप है!',
                INTRO_TEXT: 'और इसमें आईअठारहएन का समर्थन है!',

                HEADER: {
                    TITLE: 'कोणीय जेएस',
                    LANGUAGE: {
                        TITLE: 'भाषा बदलो',
                        OPTIONS: {
                            1: 'हिंदी',
                            2: 'अंग्रेज़ी'
                        }
                    }
                },

                EMPLOYEE: {
                    TITLE: 'कर्मचारी',
                    SEARCH_PLACEHOLDER: 'नाम से खोजें',
                    NAME: 'नाम',
                    AGE: 'आयु'
                },

                FOOTER: {
                    COPY_RIGHTS: '2017 © वाइकिंग ट्री प्राइवेट लिमिटेड'
                }
            })
            debugger;
            if(!localStorage.getItem('language'))
                localStorage.setItem('language', 'en');
            else
                $translateProvider.preferredLanguage(localStorage.getItem('language'));

        });

})();
