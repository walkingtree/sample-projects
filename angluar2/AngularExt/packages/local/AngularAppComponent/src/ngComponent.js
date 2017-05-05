Ext.define("AngularAppComponent.ngComponent",{
   extend:'Ext.Component',
    alias:'widget.ngapp',
    config:{
        ngRootTag:"app-root",
        ngAppPath:"./angularapp",
    },
    afterRender:function() {
        var me = this;
        this.callParent(arguments);
        Ext.Ajax.request({
            url:me.getNgAppPath()+"/index.html",
            success:function(response){
                var el = document.createElement('html');
                el.innerHTML = response.responseText;
                var tags = [
                    "inline.bundle.js",
                    "polyfills.bundle.js",
                    "styles.bundle.js",
                    //"vendor.bundle.js",
                    "main.bundle.js"
                ];
                var newEl = document.createElement("base");
                newEl.setAttribute("href",me.getNgAppPath()+"/");
                me.el.appendChild(newEl);
                for( var i=0;i<tags.length;i++){


                        var newEl = document.createElement('script');
                            newEl.setAttribute("type","text/javascript");
                            newEl.setAttribute("src",tags[i]);
                        me.el.appendChild(newEl);

                }

                 newEl = document.createElement(me.getNgRootTag());
                me.el.appendChild(newEl);


            },
            failure:function(){

            }
        });
    }



});