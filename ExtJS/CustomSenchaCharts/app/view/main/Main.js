/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('CustomSenchaCharts.view.main.Main', {
    extend: 'Ext.container.Container',

    requires: ['CustomSenchaCharts.view.test.WilliamPctR'],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'fit'
    },

    items: [{
        xclass: 'CustomSenchaCharts.view.test.WilliamPctR'
    }]
});
