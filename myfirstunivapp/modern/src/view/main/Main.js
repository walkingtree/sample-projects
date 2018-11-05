/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'app-main',

   
       requires: [
        'MyApp.view.main.MainController',
        'MyApp.view.main.MainModel',
        'MyApp.view.main.List',
        'MyApp.view.main.Users'
    ],


    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',
    
    items: [{
     xtype: 'tabpanel',
     tabBarPosition: 'bottom',
     title: 'Title',
     items: [{
         title: 'Home',
         iconCls: 'x-fa fa-home',
         layout: 'fit',
         // The following grid shares a store with the classic version's grid as well!
         items: [{
             xtype: 'mainlist',
         }, {
             xtype: 'toolbar',
             title: 'Personnel',
             docked: 'top'
         }]
     }, {
         title: 'Users',
         iconCls: 'x-fa fa-user',
         layout: 'fit',
         items: [{
             xtype: 'container',
             layout: 'fit',
             items: [{
             // The following grid shares a store with the classic version's grid as well!
                 xtype: 'mainusers',
                 reference: 'mainUsers',
                 bind: {
                     store: '{users}'
                 }
             }, {
                 xtype: 'toolbar',
                 title:'Users', 
                 docked: 'top',
                 defaults: {
                     margin: 5
                 },
                 items: [{
                     xtype: 'button',
                     text: 'Delete',
                     handler: 'deleteUser'
                 }, {
                     xtype: 'button',
                     text: 'Add'
                 }, {
                     xtype: 'button',
                     text: 'Update'
                 }]
             }]
         }]

     }, {
         title: 'Groups',
         iconCls: 'x-fa fa-users',
         bind: {
             html: '{loremIpsum}'
         }
     }, {
         title: 'Settings',
         iconCls: 'x-fa fa-cog',
         bind: {
             html: '{loremIpsum}'
         }
     }]
 }]
 
   });