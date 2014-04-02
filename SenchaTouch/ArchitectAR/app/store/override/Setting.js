Ext.define('AR.store.override.Setting', {
    override: 'AR.store.Setting',
    
    statics: {
        Initialization: function() {
           
            Ext.create('AR.store.Setting');
        }
    },

    config: {
        autoLoad: true,
        autoSync: true,
        model: 'AR.model.Setting',
        storeId: 'settingStore',
        proxy: {
            type: 'localstorage',
            id: 'setting-store'
        }
    }
    
},function(){ this.Initialization();});