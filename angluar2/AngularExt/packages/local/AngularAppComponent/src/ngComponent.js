Ext.define("AngularAppComponent.ngComponent",{
   extend:'Ext.Component',
    alias:'widget.ngapp',
    config:{
        angularRootTag:"app-root",
        angularAppPath:"./angularapp",
    },
    afterRender:function() {
        var me = this;
        this.callParent(arguments);
        Ext.Ajax.request({
            url: me.getAngularAppPath() + "/index.html",
            success: function(response) {
                var el = document.createElement('html');
                el.innerHTML = response.responseText;
                var tags = [
                    "inline.bundle.js",
                    "polyfills.bundle.js",
                    "styles.bundle.js",
                    //"vendor.bundle.js", TODO: investigate why is it commented?
                    "main.bundle.js"
                ];
                
                var angularAppPath = me.getAngularAppPath()+"/";
                for(var i = 0; i < tags.length; i++){
                    var scriptElement = document.createElement('script');
                    scriptElement.setAttribute("type", "text/javascript");
                    scriptElement.setAttribute("src", angularAppPath + tags[i]);
                    
                    me.el.appendChild(scriptElement);
                }

                var angularRootElement = document.createElement(me.getAngularRootTag());
                me.el.appendChild(angularRootElement);
            },
            failure: function() {
            }
        });
    }
});