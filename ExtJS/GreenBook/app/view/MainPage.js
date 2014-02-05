Ext.define('PDFSplitter.view.MainPage', {
	extend: 'Ext.panel.Panel',
	requires: ['Ext.layout.container.Border', 'PDFSplitter.view.PdfPanel', 'PDFSplitter.view.ThumbnailView','PDFSplitter.view.DocumentList' ],

	xtype: 'mainpage',
	loadingMessage: 'Loading PDF, please wait...',
	layout: {
		type: 'border'
	},
	showSplitIcon : this.showSplitIcon,
	initComponent: function() {
                var me=this;
/*Ext.Ajax.request({
url : 'data/tree.php',
method : 'GET',
params: {
	action : 'getContent'
},
success : function(response){
console.log(response);
	alert('sasas')
}
})*/
		this.items = [/*{
			region:'west',
			xtype : 'documentlist',
			hidden: !this.isSplit,
			collapsible:true,
			collapseDirection :'left',
			width: 200,														
			title : 'Documents'

		}*/
			/*{
			region:'west',
			xtype:'treepanel',
			rootVisible:false,
			store:Ext.create("PDFSplitter.store.TreeStore", {}),
			itemId:'treestore',
			hidden: this.isSplit,
			collapsible:true,
			collapseDirection :'left',
			width: 200,														
			title : 'All Files',
			listeners:{
					itemclick:function(view, record, item, index, e, eOpts){
						
						//record.set('iconCls', 'myIcon1');
						if(record.get('leaf')==true){
						
						this.fireEvent('showloadmask',me.loadingMessage);
						this.fireEvent('treeitemclick',record);
						this.up('mainpage').setTitle(record.get('text')+'.pdf');
						this.up('mainpage').down('thumbnailview').show();
						
							
						}

						}
				}
		     },*/{
			region: 'west',
			xtype: 'thumbnailview',
			width: 180,
			minWidth: 150,
			split: true,
			hidden: true,
			allowContext : this.allowContext,
			pageScale: 0.2,
			collapsible:true,
			collapseDirection :'left',

		}, {
			region: 'center',
			xtype: 'pdfpanel',
			pageScale: 0.9,
			showSplitIcon : this.showSplitIcon,
			split: true,
		}]
		this.callParent(arguments);
	},

	renderPage: function(pdfdoc, pages ) {
		var me = this;
		var pdfcontainer;
		var thumbnailcontainer;
		var remainingtab;
		var toolbar = this.up('tabview').getActiveTab().down('pagingtoolbar'),
		isEmpty,
		pageCount,
		currPage,
		afterText;
		pdfcontainer = this.down('pdfpanel');
		pdfcontainer.numOfPages = pages.length;
		thumbnailcontainer = this.down('thumbnailview');

		if (pdfcontainer.isRendering || thumbnailcontainer.isRendering)
			return;

		pdfcontainer.pdfDoc = thumbnailcontainer.pdfDoc = pdfdoc;

		pdfcontainer.isRendering = thumbnailcontainer.isRendering = true;
		currPage = 1;
		pageCount = pages.length;
		afterText = Ext.String.format(toolbar.afterPageText, isNaN(pageCount) ? 1: pageCount);
		isEmpty = pageCount === 0;
		toolbar.child('#afterTextItem').setText(afterText);
		toolbar.child('#inputItem').setDisabled(isEmpty).setValue(1);
		toolbar.child('#prev').setDisabled(currPage === 1 || isEmpty);
		toolbar.child('#next').setDisabled(currPage === pageCount || isEmpty);
		var pageScale;
		pdfcontainer.pageScale = pdfcontainer.getPageScale();
		thumbnailcontainer.pageScale = thumbnailcontainer.pageScale;
		pdfcontainer.currentPage = 1;

		if (pdfcontainer.scaleValue) {
			pageScale = (parseInt(pdfcontainer.getPageScale() * 100)) + '%'

		} else {
			pageScale =  pdfcontainer.getPageScale();
		}
		toolbar.child('#scaleCombo').setDisabled(isEmpty).setValue(pageScale);
		var me = this;
		me.pdfPages=[];me.thumbnails=[];

		pdfdoc.getPage(pages[0]).then(function(page) {
			var pdfViewport;
			var thumbnailViewport;
			var pdfctx;
			var thumbnailctx;
			var textLayer;
			var textLayer1;
			var pdfrenderContext;
			var thumbnailrenderContext;

			pdfViewport = page.getViewport(pdfcontainer.pageScale);

			pdfcontainer.setDefaultViewport( Ext.apply( {},pdfViewport) );

			thumbnailViewport = page.getViewport(0.2);
			pdfcontainer.setThumbnailViewport(  Ext.apply( {},thumbnailViewport)  );
			var pdfpage = Ext.create('PDFSplitter.view.TextContainer',{
				requiresTextDiv:true,
				itemId: 'pdfPageContainer' + 0,
				cls: 'preview-area',
				pageNum:1,
				viewport:pdfcontainer.getDefaultViewport()
			});
			me.pdfPages.push( pdfpage );
			pdfcontainer.add( pdfpage );
			pdfpage.setPdfPage(page);
			pdfpage.renderPdfPage();
			var thumbnail = Ext.create('PDFSplitter.view.TextContainer',{
				xtype		: 'textcontainer',
				pageNum 	: 1,
				requiresTextDiv:!PDFJS.disableTextLayer,
				itemId		: 'pdfPageContainer' + 0,
				isThumbnail : true,
				pages : pages,
				isFirstThumbnail : true,
				allowContext : this.allowContext,
				cls: 'thumbnail-area',
				height:120,
				width:100,
				viewport:pdfcontainer.getThumbnailViewport()
			});
			me.thumbnails.push(thumbnail);
			thumbnailcontainer.add(thumbnail);
			thumbnail.setPdfPage(page);
			thumbnail.renderPdfPage();
			for (var j = 1; j < pages.length; j++) {
				var pdfpage = Ext.create('PDFSplitter.view.TextContainer',{
					requiresTextDiv:true,
					itemId: 'pdfPageContainer' + j,
					cls: 'preview-area',
					pageNum:j+1,
					viewport:pdfcontainer.getDefaultViewport()
				});
				pdfcontainer.add(pdfpage);
				me.pdfPages.push( pdfpage );

				var thumbnailpage = Ext.create('PDFSplitter.view.TextContainer',{
					pageNum 	: j+1,
					requiresTextDiv:!PDFJS.disableTextLayer,
					itemId		: 'pdfPageContainer' + j,
					isThumbnail : true,
					isFirstThumbnail : j==0 ? true : false,
							allowContext : this.allowContext,
							pages : pages,
							cls: 'thumbnail-area',
							height:120,
							width:100,
							viewport:pdfcontainer.getThumbnailViewport()
				});
				thumbnailcontainer.add(thumbnailpage);
				me.thumbnails.push(thumbnailpage);


			}
			pdfcontainer.pages =me.pdfPages;
			for (var pageNum = 1; pageNum <= pages.length; ++pageNum) {
				var pagePromise = pdfdoc.getPage(pageNum);
				pagePromise.then(function(pdfPage) {
					var pageNum = pdfPage.pageNumber;
					var pageView = me.pdfPages[pageNum - 1];
					if (!pageView.pdfPage) {
						// The pdfPage might already be set if we've already entered
						pageView.setPdfPage(pdfPage);

					}

					var thumbnailView = me.thumbnails[pageNum - 1];
					if (!thumbnailView.pdfPage) {
						thumbnailView.setPdfPage(pdfPage);
					}
					if( pageNum <= PAGES.PDF_SET)
					{
						thumbnailView.renderPdfPage();
						pageView.renderPdfPage();
					}
				});
			}
			Ext.resumeLayouts(true);

		});

		/**
		 * using promise to fetch the page
		 */


		me.fireEvent('showloadmask', false);
		pdfcontainer.isRendering = false;
		thumbnailcontainer.isRendering = false;


		if (me.rendered) {
			me.fireEvent('change', me, {
				current: 1,
				total: pages.length
			});
		}


	},

	/**
	 * This method will be called when user is changing the pageScale either through zoomin/out or scalecombo
	 */
	updateScale:function( newScale, fromZoomOption ){
		var pdfPagesLength;
		
		var page = this.pdfPages[0].getPdfPage();

		var newViewport = page.getViewport( newScale );
		var pageIndex = this.down('pdfpanel').currentPage-1;
		var pages = this.down('pdfpanel').prioritizeItemsToBeRendered(this.pdfPages[pageIndex], true );
		this.down('pdfpanel').renderContainers( pages );
		
		pdfPagesLength = this.pdfPages.length;
		for( var k = 0; k<pdfPagesLength ;k += 1 ) {
			this.pdfPages[k].updatePage( newViewport );

		}
		this.pdfPages[pageIndex].el.scrollIntoView(this.down('pdfpanel').body);
		
		for( var l = 0;l < pages.length; l++) {
			this.pdfPages[pages[l]-1].renderPdfPage();
		}

		if( fromZoomOption == true ){
			newScale = parseInt(newScale * 100)+'%';
			this.down('pagingtoolbar').child('#scaleCombo').setValue(newScale);
		}
	}
});
