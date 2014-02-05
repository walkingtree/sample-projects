Ext.define('PDFSplitter.controller.PdfSplitterController', {
    extend: 'Ext.app.Controller',
    refs: [{
            ref: 'pdfPanel',
            selector: 'pdfpanel'
        }, {
            ref: 'thumbnailView',
            selector: 'thumbnailview'
        }, {
            ref: 'viewport',
            selector: 'pdfviewport'
        }, {
            ref: 'pagingToolbar',
            selector: 'pagingtoolbar'
        }, {
            ref: 'mainPage',
            selector: 'mainpage'
        }, {
            ref: 'tabView',
            selector: 'tabview'
        }, {
            ref: 'readFile',
            selector: 'readfile'
        }, {
            ref: 'textContainer',
            selector: 'textcontainer'
        }, {
            ref: 'splitDetailspanel',
            selector: 'splitdetailspanel'
        }, {
            ref: 'mainPage',
            selector: 'mainpage'
        }, {
            ref: 'documentList',
            selector: 'documentlist'
        },
        {
            ref: 'searchbar',
            selector: 'searchbar'
        }],
    init: function() {
        Setu.Ajax.init();
        this.control({
            'searchbar button[action=searchpdf]': {
                'click': function(btn) {
                    this.searchPdf(btn, true)
                }
            },
            'searchbar textfield[name=find]': {
                'change': function(btn) {
                    this.searchPdf(btn, true)
                }
            },
            'searchbar button[itemId=prev]': {
                'click': function(btn) {
                    this.searchPdf(btn, false)
                }
            },
            'searchbar button[itemId=next]': {
                'click': function(btn) {
                    this.searchPdf(btn, false)
                }
            },
            'searchbar checkbox[action=highlightall]': {
                'change': function(btn) {
                    this.searchPdf(btn, false)
                }
            },
            'searchbar checkbox[action=casesensitive]': {
                'change': function(btn) {
                    this.searchPdf(btn, true)
                }
            },
            'pagingtoolbar': {
                'togglesidebar': this.toggleSideBar,
                'changemode': this.changePresentationMode,
                'zoomin': this.zoomInPage,
                'zoomout': this.zoomOutPage,
                'searchtext': this.searchText,
                'changefieldmode': this.changeFieldMode,
                'movetopage': this.moveToPage,
                'movetonextpage': this.moveNext,
                'movetopreviouspage': this.movePrev,
                'changepagenumber': this.changePageNumber,
                'changescale': this.changeScale,
                'showsplitwindow': this.showSplitWindow
            },
            'readfile': {
                'readfile': this.readSelectedFile,
                'showloadmask': this.showLoadMask,
            },
            'mainpage': {
                'read': this.readSelected
            },
            'textcontainer': {
                'showsplitwindow': this.showSplitWindow
            },
            'splitdetailspanel': {
                'savedocument': this.saveDocument
            },
            'documentlist': {
                'nodeselected': this.nodeSelected
            },
            'mainpage treepanel': {
                'treeitemclick': this.readSelected,
                'showloadmask': this.showLoadMask

            },
            'mainpage':{
                'showloadmask': this.showLoadMask

            },  'viewport':{			 
                'showpdf':this.showpdf, 
                'showloadmask': this.showLoadMask,	
                'treeitemclick':this.readSelected,
            }


        });
        var me = this;

        var finder = new Ext.util.KeyMap({
            target: Ext.getBody(),
            key: "f",
            ctrl: true,
            defaultEventAction: 'preventDefault',
            fn: function() {
                var btn = me.getTabView().getActiveTab().down('pdfpanel').down('pagingtoolbar').down('button[itemId=findBar]');

                if (this.fullScreenMode) {
                    searchBar.hide();
                } else {
                    me.searchText(btn);
                }
                this.fullScreenMode = false;
            },
            scope: me
        });

    },
    
    showpdf:function(record){
	 
        this.getTabView().removeAll();

        var acttab= this.getTabView().add({

                    xtype : 'mainpage',
                itemId :'originaltab',
                title : record.get('text'),
                allowContext : true,
                showSplitIcon : true,
                splitted : false,

                 })

        this.getTabView().setActiveTab(acttab);
        this.getMainPage().down('thumbnailview').show();
        this.getMainPage().down('thumbnailview').setTitle('Thumbnail Preview');

        },
                
    showLoadMask: function(show) {
        this.getViewport().setLoading(show);
    },
    /**
     * This method will be called when the user clicks on toggleSideBar icon
     */
    toggleSideBar: function() {
        var panel = this.getTabView().getActiveTab().down('thumbnailview');
        if (panel.hidden == true) {
            panel.show();
            panel.isToggleHide = false;

        } else {
            panel.hide();
            panel.isToggleHide = true;
        }
    },
    /**
     * This method will be called when the user clicks on Next/Previos buttons.
     * @param view
     * @param page
     */
    moveToPage: function(view, thumbnailView, page) {
        var isEmpty;
        var pageCount;
        var toolbar;
        var thumbnailView;
        var thumbNailPanelRegion;
        var thumbnailRegion;
        var currPage;

        currPage = page - 1;
        toolbar = view.child('#pagingToolbar');
        pageCount = view.numOfPages;
        isEmpty = pageCount === 0;
        thumbNailPanelRegion = thumbnailView.el.getRegion();
        thumbnailRegion = thumbnailView.child('#pdfPageContainer' + currPage).el.getRegion();
        /**
         * Checking whether the focussed thumbnail is within the view or not
         */
        if ((thumbNailPanelRegion.top > thumbnailRegion.top && thumbNailPanelRegion.bottom > thumbnailRegion.bottom) || (thumbNailPanelRegion.top < thumbnailRegion.top && thumbNailPanelRegion.bottom < thumbnailRegion.bottom)) {

            thumbnailView.scrollBy(0, thumbnailRegion.top - 60, false);

        }
        view.child('#pdfPageContainer' + currPage).focus();
        thumbnailView.child('#pdfPageContainer' + currPage - 1).removeCls('showborders');
        var itemArray = Ext.Array.unique(thumbnailView.focussedItemId);

        for (var i = 0; i < itemArray.length; i++) {
            thumbnailView.child('#' + thumbnailView.focussedItemId[i]).removeCls('showborders');
            thumbnailView.child('#' + thumbnailView.focussedItemId[i]).removeCls('showborder');
        }
        thumbnailView.focussedItemId = [];

        thumbnailView.child('#pdfPageContainer' + currPage).addCls('showborders');
        thumbnailView.focussedItemId.push('pdfPageContainer' + currPage);
        toolbar.child('#prev').setDisabled(view.currentPage === 1 || isEmpty);
        toolbar.child('#next').setDisabled(view.currentPage === view.numOfPages || isEmpty);
        toolbar.child('#inputItem').setValue(page);

    },
    /**
     * This method will be called when the user clicks on the zoom out button
     */
    zoomOutPage: function(panel) {
        var currentScale;
        var panel;
        var pages;

        if (this.getTabView().getActiveTab().splitted == true) {
            pages = this.getTabView().getActiveTab().numOfPages;

        } else {
            pages = this.numOfPages;
        }
        if (Ext.isEmpty(pages)) {
            return;
        }
        /**
         * If the activetab is splittab and no split-ted document is present yet then simply return
         */
        if ((this.getTabView().getActiveTab().isSplit == true && this.getTabView().getActiveTab().splitted == false)) {
            return;
        }

        panel = this.getTabView().getActiveTab();
        currentScale = panel.down('pdfpanel').pageScale;
        var newScale = (currentScale / (1.1)).toFixed(2);
        newScale = Math.floor(newScale * 10) / 10;
        newScale = Math.max(0.25, newScale);
        if (panel.down('pdfpanel').pageScale == parseFloat(newScale)) {
            return;
        }
        panel.down('pdfpanel').setPageScale(parseFloat(newScale));
        panel.down('pdfpanel').scaleValue = panel.down('pdfpanel').pageScale;
        panel.updateScale(newScale, true);

    },
    /**
     * This method will be called when the user clicks on the zoom in button
     */
    zoomInPage: function( ) {
        var currentScale;
        var panel;
        var pages;


        if (this.getTabView().getActiveTab().splitted == true) {
            pages = this.getTabView().getActiveTab().numOfPages;

        } else {
            pages = this.numOfPages;
        }
        if (Ext.isEmpty(pages)) {
            return;
        }
        /**
         * If the activetab is splittab and no split-ted document is present yet then simply return
         */
        if ((this.getTabView().getActiveTab().isSplit == true && this.getTabView().getActiveTab().splitted == false)) {
            return;
        }

        panel = this.getTabView().getActiveTab();
        currentScale = panel.down('pdfpanel').pageScale;
        var newScale = (currentScale * (1.1)).toFixed(2);
        newScale = Math.ceil(newScale * 10) / 10;
        newScale = Math.min((4.0), newScale);
        if (panel.down('pdfpanel').pageScale == parseFloat(newScale)) {
            return;
        }
        panel.down('pdfpanel').setPageScale(parseFloat(newScale));
        panel.down('pdfpanel').scaleValue = panel.down('pdfpanel').pageScale;
        panel.down('pdfpanel').pdfDoc = this.getTabView().getActiveTab().uploadedFile;
        panel.updateScale(newScale, true);

    },
    /**
     * This method will be called when the user selects a value in the scale combo
     */
    changeScale: function(view, value, panel) {
        var panel;
        var pages;
        var pdfPanel;
        var thumbnailView;
        var activeTab;

        activeTab = this.getTabView().getActiveTab();
        pdfPanel = activeTab.down('pdfpanel');
        thumbnailView = activeTab.down('thumbnailview');

        if (activeTab.splitted == true) {
            pages = activeTab.numOfPages;

        } else {
            pages = this.numOfPages;

        }

        pdfPanel.pageScale = view.value;
        activeTab.updateScale(parseFloat(view.value));


    },
    /**
     * This method will be called when the user clicks on the change presentation mode button
     */
    changePresentationMode: function(toolbar) {
        var searchBar = this.getPdfPanel().down('searchbar');
        this.fullScreenMode = true;
        var tabView;

        tabView = PDFSplitter.getApplication().getController('PdfSplitterController').getTabView();
        var body = tabView.getActiveTab().down('pdfpanel').body.dom;

        if (body.webkitRequestFullScreen) {

            body.webkitRequestFullScreen();

        } else if (body.mozRequestFullScreen) {

            body.mozRequestFullScreen();

        }

    },
    /**
     * This method will be called when the user clicks on openfile button
     */
    readSelectedFile: function(evt) {
        var fileReader;
        var files;
        this.uploadedFile;

        files = evt.target.files;

        Globals.fileName = files;

        if (!files || files.length === 0)
            return;

        // Read the local file into a Uint8Array.
        fileReader = new FileReader();
        fileReader.panel = this.getTabView().getActiveTab().down('pdfpanel');
        fileReader.onload = function webViewerChangeFileReaderOnload(evt) {
            var buffer;
            var uint8Array;
            var controller;

            buffer = evt.target.result;

            uint8Array = new Uint8Array(buffer);
            /**
             * Inside onload method due to scope we are not able to get the controller.
             * So Getting by using the following approach to make use of the uploaded file
             * throughout the controller
             */
            controller = PDFSplitter.getApplication().getController('PdfSplitterController');
            controller.numOfPages = [];
            /**
             * using promise to fetch the document
             */
            try {
                PDFJS.getDocument(uint8Array).then(
                        function(pdfDoc) {
                            var tabView;
                            var originalTabView;
                            var remainingTabView;
                            var splitTabView;

                            tabView = PDFSplitter.getApplication().getController('PdfSplitterController').getTabView();
                            originalTabView = tabView.down('#originaltab');


                            originalTabView.down('pdfpanel').removeAll();
                            originalTabView.down('thumbnailview').removeAll();


                            for (var i = 1; i <= pdfDoc.numPages; i++) {
                                controller.numOfPages.push(i);

                            }
                            /**
                             * To renderPage we are passing the document and the array of pages that needs to be rendered
                             */
                            tabView.down('#originaltab').uploadedFile = pdfDoc;


                            originalTabView.renderPage(pdfDoc, controller.numOfPages);
                            /**
                             * When a second document is uploaded then all child items should be removed
                             * form tree and thumnailview, pdfpanel
                             */
                            controller.getTabView().getActiveTab().down('documentlist').getRootNode().removeAll();
                            controller.getTabView().getActiveTab().down('thumbnailview').removeAll();
                            controller.getTabView().getActiveTab().down('pdfpanel').removeAll();

                            tabView.setActiveTab(0);
                        });
            }
            catch (err) {
                Ext.MessageBox.show({
                    title: 'ERROR',
                    msg: err,
                    buttons: Ext.MessageBox.OK,
                    icon: 'x-message-box-error'
                });
            }


        };

        var file = files[0];
        /**
         * Starts reading the contents of the specified Blob or File.
         * When the read operation is finished, 
         * the readyState will become DONE, and the onloadend callback, if any,
         * will be called. At that time, the result attribute contains an ArrayBuffer representing the file's data.
         */
        fileReader.readAsArrayBuffer(file);
    },
    readSelected: function(record) {

        this.uploadedFile;
        
        //To get pdf file 
        Ext.Ajax.request({
            //url:'ReadFiles.php?path=' +record.data.url,
            url: 'GetFile.php?path=' + record.data.url,
            method: 'GET',
            timeout: 90000,
            params: {
                name: record.data.text
            },
            scope: this,
            success: function(resp) {

                /**
                 * Inside onload method due to scope we are not able to get the controller.
                 * So Getting by using the following approach to make use of the uploaded file
                 * throughout the controller
                 */
                controller = PDFSplitter.getApplication().getController('PdfSplitterController');
                controller.numOfPages = [];
                try {
                    /**
                     * using promise to fetch the document
                     */
                    PDFJS.getDocument(record.data.url.substring(1)+'/' + resp.responseText).then(
                            function(pdfDoc) {
                                var tabView;
                                var originalTabView;
                                tabView = PDFSplitter.getApplication().getController('PdfSplitterController').getTabView();
                                originalTabView = tabView.down('#originaltab');
                                /**
                                 * When a second document is uploaded then all child items should be removed
                                 * form tree and thumnailview, pdfpanel
                                 */
                                originalTabView.down('pdfpanel').removeAll();
                                originalTabView.down('thumbnailview').removeAll();

                                for (var i = 1; i <= pdfDoc.numPages; i++) {
                                    controller.numOfPages.push(i);

                                }
                                /**
                                 * To renderPage we are passing the document and the array of pages that needs to be rendered
                                 */

                                originalTabView.renderPage(pdfDoc, controller.numOfPages);

                                tabView.setActiveTab(0);

                            });


                }
                catch (err) {
                    Ext.MessageBox.show({
                        title: 'ERROR',
                        msg: err,
                        buttons: Ext.MessageBox.OK,
                        icon: 'x-message-box-error'
                    });
                }

            }


        });
    },
    /**
     * This method will be called when the user clicks on search button
     */
    searchText: function(btn, target) {
        var searchBar = Ext.ComponentQuery.query('searchbar')[0];

        if (Ext.isEmpty(searchBar)) {
            searchBar = Ext.create('PDFSplitter.view.SearchBar', {});
        }
        var xy = btn.getXY();
        xy[1] = xy[1] + 28;
        searchBar.showAt(xy);


    },
    /**
     * This method will be called when the user changing the poage number using numberfield.
     * 
     * @param field
     * @param toolbar
     * @param newValue
     * @param oldValue
     * @param view
     */
    changePageNumber: function(field, newValue, oldValue, view) {
        var isEmpty;
        var pageCount;
        var thumbnailView;
        var top;
        var focussedThumbnailRegion;
        var toolbar;

        toolbar = this.getTabView().getActiveTab().down('pagingtoolbar');
        thumbnailView = this.getTabView().getActiveTab().down('thumbnailview');
        view = this.getTabView().getActiveTab().down('pdfpanel');
        isEmpty = pageCount === 0;
        pageCount = view.numOfPages;

        if (Ext.isEmpty(newValue) || newValue > pageCount || newValue < field.minValue) {
            field.setValue(oldValue);

        } else {
            field.setValue(newValue);
            var curPage = newValue - 1
            focussedThumbnailRegion = thumbnailView.child('#pdfPageContainer' + curPage).el.getRegion();
            top = view.child('#pdfPageContainer' + curPage).el.getRegion().top;
            view.scrollBy(0, top, false);

            if (!Ext.isEmpty(thumbnailView.child('#pdfPageContainer' + view.currentPage - 1))) {
                thumbnailView.child('#pdfPageContainer' + view.currentPage - 1).removeCls('showborders');
            }
            if (!Ext.isEmpty(thumbnailView.child('#pdfPageContainer' + curPage))) {
                thumbnailView.child('#pdfPageContainer' + curPage).addCls('showborders');
                thumbnailView.scrollBy(0, focussedThumbnailRegion.top - 40, false);
            }
            view.currentPage = newValue;
            view.oldValue = newValue

        }
        toolbar.child('#prev').setDisabled(view.currentPage === 1 || isEmpty);
        toolbar.child('#next').setDisabled(view.currentPage === view.numOfPages || isEmpty);
    },
    moveNext: function() {
        var pdfpanel;
        var thumbnailView;
        var total;
        var curPage;

        pdfpanel = this.getTabView().getActiveTab().down('pdfpanel');
        thumbnailView = this.getTabView().getActiveTab().down('thumbnailview');
        curPage = pdfpanel.currentPage - 1;
        total = pdfpanel.numOfPages;
        thumbnailView.child('#pdfPageContainer' + curPage).removeCls('showborders');
        page = pdfpanel.currentPage + 1;
        if (page <= total) {
            pdfpanel.currentPage = page;
            this.moveToPage(pdfpanel, thumbnailView, page);
        }

    },
    movePrev: function() {
        var pdfpanel;
        var thumbnailView;
        var total;
        var curPage;

        pdfpanel = this.getTabView().getActiveTab().down('pdfpanel');
        thumbnailView = this.getTabView().getActiveTab().down('thumbnailview');
        curPage = pdfpanel.currentPage - 1;
        total = pdfpanel.numOfPages;
        thumbnailView.child('#pdfPageContainer' + curPage).removeCls('showborders');
        page = pdfpanel.currentPage - 1;
        if (page <= total) {
            pdfpanel.currentPage = page;
            this.moveToPage(pdfpanel, thumbnailView, page);
        }

    },
    /**
     * On click of treenode in document list it should display the documnet related to that node
     */
    /*nodeSelected : function( view, record ){
     
     if( record.get('leaf') == true ){
     var activeTab = this.getTabView().getActiveTab();
     activeTab.numOfPages = [];
     var pdfpanel;
     var thumbnailview ;
     activeTab.down('pdfpanel').removeAll();
     activeTab.down('thumbnailview').removeAll();
     
     
     PDFJS.getDocument('html.pdf').then(function(pdfDoc){
     activeTab.uploadedFile = pdfDoc;
     for (var i = 1; i <= pdfDoc.numPages; i++) {
     activeTab.numOfPages.push(i);
     
     }
     activeTab.renderPage(pdfDoc,  activeTab.numOfPages)
     });
     }
     
     
     },*/
    searchPdf: function(btn, find) {

        var activeMainPage = this.getTabView().getActiveTab();
        var me = this;
        if (btn.up('fieldcontainer')) {
            var searchField = btn.up('fieldcontainer').down('textfield');
            var searchText = searchField.getValue();
            activeMainPage.down('pdfpanel').state.QUERY = searchText;

        }

        activeMainPage.down('pdfpanel').state.caseSensitive = this.getSearchbar().isCaseSensitive();
        activeMainPage.down('pdfpanel').state.highlightAll = this.getSearchbar().isHightLighAll();
        activeMainPage.down('pdfpanel').state.findPrevious = (btn.itemId == 'prev') ? true : false;
        if (find) {
            activeMainPage.down('pdfpanel').dirtyMatch = true;
        }
        activeMainPage.down('pdfpanel').extractText();
        if (find) {
            var task = new Ext.util.DelayedTask(function() {
                activeMainPage.down('pdfpanel').nextMatch();
                task.cancel();
            }, this);
            task.delay(250);
        } else {
            activeMainPage.down('pdfpanel').nextMatch();
        }


    }


});
