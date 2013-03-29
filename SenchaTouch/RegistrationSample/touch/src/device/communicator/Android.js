/**
 * @private
 */
Ext.define('Ext.device.communicator.Android', {
    extend: 'Ext.device.communicator.Default',

    doSend: function(args) {
    	args.__source = document.location.href;
    	window.Sencha.action(JSON.stringify(args));
    }
});
