/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('EA.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'EA',

        loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    stores:{
      childgrid:{
        fields: [
            'name', 'email', 'phone'
        ],

        data: { items: [
            { name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111" },
            { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" },
            { name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333" },
            { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444" }
        ]},

        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        }
      }
    }

    //TODO - add data, formulas and/or methods to support your view
});
