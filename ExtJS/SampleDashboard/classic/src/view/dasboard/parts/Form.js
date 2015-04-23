 Ext.define('AppsBoard.view.dashboard.parts.Form', {
     requires: [
         'Ext.form.Panel'
     ],
     extend: 'Ext.dashboard.Part',
     alias: 'part.formwidget',

     viewTemplate: {
         layout: 'fit',
         title: 'My Form',
         items: [{
            xtype: 'form',
            bodyPadding: 5,
            //width: 350,

            // The form will submit an AJAX request to this URL when submitted
            url: 'save-form.php',

            // Fields will be arranged vertically, stretched to full width
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },

            // The fields
            defaultType: 'textfield',
            items: [{
                    fieldLabel: 'First Name',
                    name: 'first',
                    allowBlank: false
                },{
                    fieldLabel: 'Last Name',
                    name: 'last',
                    allowBlank: false
                }],

                // Reset and Submit buttons
                buttons: [{
                    text: 'Reset'
                }, {
                    text: 'Submit'
                }]
            }]
     },

     displayForm: function (instance, currentConfig, callback, scope) {
         var me = this,
             title = instance ? 'Edit RSS Feed' : 'Add RSS Feed';

         // Display a prompt using current URL as default text.
         //
         Ext.Msg.prompt(title, 'RSS Feed URL', function (btn, text) {
             if (btn === 'ok') {
                 var config = {
                     feedUrl: text
                 };

                 callback.call(scope || me, config);
             }
         }, me, false, currentConfig ? currentConfig.feedUrl : '');
     }
 });