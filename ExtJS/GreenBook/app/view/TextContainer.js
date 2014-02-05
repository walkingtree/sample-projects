Ext.define("PDFSplitter.view.TextContainer", {
	extend: 'Ext.container.Container',
	xtype : 'textcontainer',
	name: 'pagecontainer',
	isThumbnail : this.isThumbnail,
	requires:['PDFSplitter.ux.util.PDF.TextLayerBuilder'],
	requiresTextDiv:false,
	cls : 'margin',
	pageNum : this.pageNum,
	/**
	 * First thumbanil should be highlighted by default. 
	 * This cfg will be true when the thumbnail is first item
	 */
	isFirstThumbnail : this.isFirstThumbnail,

	/**
	 * @cfg{Bool} ctrlClicked
	 * True if the control key was down during the event. 
	 * In Mac this will also be true when meta key was down.
	 */
	ctrlClicked : false,

	config:{
		viewport:undefined,
		pdfPage:undefined,
		pdfRendered:false
	},
	initComponent:function(){
		var me = this;
		Ext.apply( me,{

			html: me.isThumbnail ? ('<div class="maindiv"><canvas class="pdf-page-container" style="height:106px; width:86px; margin:7px;"></canvas><br/><span class="pageNum">'+ me.pageNum+'</span></div>' ) :
				('<div class="maindiv"><canvas class="pdf-page-container" "></canvas> <div class="pdf-text-layer" ></div>' ),
			
				listeners: {
					scope: this,
					afterrender: function (view) {
						var thumbnailView;
						var pdfPanel;
						var pagingToolbar;


						this.updatePage( view.getViewport() );

						if( view.isThumbnail == true ){
							thumbnailView = view.up('thumbnailview');
							view.el.addCls('thumbnailmargin');


							/**
							 * By defualt first thumbnail should be highlighted
							 */
							if( view.isFirstThumbnail == true ){
								view.addCls('showborders');
								thumbnailView.focussedItemId.push( view.itemId );
								thumbnailView.pageNums.push( view.pageNum );
							}

							/**
							 * To show the focus on mouseover
							 */
							view.el.on('mouseover', function(){
								view.addCls('showborder');

							});

							/**
							 * To remove the focus on mouseout
							 */
							view.el.on('mouseout', function(){
								if(view.isFirstThumbnail == false)
									view.removeCls('showborder');

							});

							/**
							 * When user clicks on the thumbnail then the thumbnail should be highlighted,
							 * respective preview should be displayed in preview region.
							 * If the user is clicking by pressing on ctrl key then the first selected thumnail's
							 * preview should be shown,if user select by shift+click then it is showing respective sequence of pages.
							 * 
							 */
							view.el.on('click', function( evt ){
								pdfPanel = thumbnailView.up('mainpage').down('pdfpanel');
								pagingToolbar = thumbnailView.up('mainpage').down('pagingtoolbar');

								if( evt.ctrlKey == true ){
									PAGES.controlKey = true;
									if( PAGES.shiftKey ){
										PAGES.shiftKey = false;
									}

									if( Ext.Array.contains( thumbnailView.focussedItemId, view.itemId ) && thumbnailView.focussedItemId.length > 1){
										view.removeCls('showborders');
										view.removeCls('showborder');
										thumbnailView.focussedItemId = Ext.Array.remove( thumbnailView.focussedItemId, view.itemId );
										PAGES.CountPages = thumbnailView.focussedItemId;
										thumbnailView.showPreview(thumbnailView.child('#'+thumbnailView.focussedItemId[0]),
												pdfPanel, pagingToolbar
										);

									} else {
										view.addCls('showborders');
										thumbnailView.focussedItemId.push( view.itemId );
									}
									
								} else if ( evt.shiftKey == true ) {
									
									if ( PAGES.controlKey ){
										 PAGES.controlKey = false;
										 PAGES.shiftKey = true;
										 PAGES.previousPageNum = view.pageNum;
										
										if ( Ext.isEmpty(PAGES.CountPages) ){
											var itemArray = Ext.Array.unique ( thumbnailView.focussedItemId );

											for( var i=0; i< itemArray.length; i++ ){
												thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborders'); 
												thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborder'); 
											}
										} else {
											var itemArray = Ext.Array.unique ( PAGES.CountPages );
											thumbnailView.focussedItemId = itemArray;

											for( var i=0; i< itemArray.length; i++ ){
												thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborders'); 
												thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborder'); 
											}
										}

										thumbnailView.focussedItemId = [];
										view.addCls('showborders');
										thumbnailView.showPreview( view, pdfPanel, pagingToolbar );
										thumbnailView.focussedItemId.push( view.itemId );
										PAGES.CountPages =[];
										
								} else { 
									
									PAGES.shiftKey = true;

									var firstSelectionPageNumber;
									var firstPage = 1;
									var index = 0;
									var highlightedPages;

									thumbnailView.focussedItemId = [];

									firstSelectionPageNumber = view.pageNum;

									if( !Ext.isEmpty(PAGES.previousPageNum ) ) {

										if( PAGES.previousPageNum > firstSelectionPageNumber ){

											highlightedPages = PAGES.previousPageNum-firstSelectionPageNumber;

											for (i= firstSelectionPageNumber ; i < PAGES.previousPageNum ; i++){
												thumbnailView.focussedItemId.push( thumbnailView.items.items[i].itemId );
											}

											if( Ext.isEmpty(PAGES.CountPages) ){

												PAGES.CountPages = PAGES.CountPages.concat( thumbnailView.focussedItemId );
												PAGES.CountPages = Ext.Array.unique ( PAGES.CountPages );
											} else {

												for( var j=0; j< thumbnailView.focussedItemId.length; j++ ){
													PAGES.CountPages = Ext.Array.remove( PAGES.CountPages, thumbnailView.focussedItemId[j]) ;
													PAGES.CountPages = Ext.Array.unique ( PAGES.CountPages );
												}
											}

											for (j= 0 ; j < highlightedPages ; j++) {

												if( thumbnailView.child('#'+thumbnailView.focussedItemId[j]).hasCls('showborders') ) {
													thumbnailView.child('#'+thumbnailView.focussedItemId[j]).removeCls('showborders');
													thumbnailView.child('#'+thumbnailView.focussedItemId[j]).removeCls('showborder');
												} else {
													thumbnailView.child('#'+thumbnailView.focussedItemId[j]).addCls('showborders');
												}

											}
										}

										if( PAGES.previousPageNum < firstSelectionPageNumber ){
											highlightedPages = firstSelectionPageNumber-PAGES.previousPageNum;

											for (i= PAGES.previousPageNum-1 ; i< firstSelectionPageNumber; i++){

												thumbnailView.focussedItemId.push( thumbnailView.items.items[i].itemId );
											}

											if( Ext.isEmpty(PAGES.CountPages) ){

												PAGES.CountPages = PAGES.CountPages.concat( thumbnailView.focussedItemId );
											} else {
												PAGES.CountPages = PAGES.CountPages.concat( thumbnailView.focussedItemId );
											}

											for (j= 0 ; j < highlightedPages ; j++) {

												thumbnailView.child('#'+thumbnailView.focussedItemId[j]).addCls('showborders'); 
												thumbnailView.child('#'+thumbnailView.focussedItemId[j]).addCls('showborder');
											}
										}

										if( PAGES.previousPageNum == firstSelectionPageNumber ){
											thumbnailView.focussedItemId = Ext.Array.unique( thumbnailView.focussedItemId );

											if( Ext.isEmpty(PAGES.CountPages) ){

												PAGES.CountPages = PAGES.CountPages.concat( thumbnailView.focussedItemId );
											} else {
												PAGES.CountPages = PAGES.CountPages.concat( thumbnailView.focussedItemId );
											}
										}

									} else {
										for (i= 0; i< firstSelectionPageNumber; i++){

											thumbnailView.focussedItemId.push( thumbnailView.items.items[i].itemId );

											thumbnailView.child('#'+thumbnailView.focussedItemId[i]).addCls('showborders'); 
											thumbnailView.child('#'+thumbnailView.focussedItemId[i]).addCls('showborder'); 
										}

										if( Ext.isEmpty(PAGES.CountPages) ){

											PAGES.CountPages = PAGES.CountPages.concat( thumbnailView.focussedItemId );
										} else {
											PAGES.CountPages = PAGES.CountPages.concat( thumbnailView.focussedItemId );
										}
									}

									PAGES.previousPageNum = firstSelectionPageNumber;

									view.addCls('showborders');
								}
								} else {
									PAGES.shiftKey = false;
									PAGES.previousPageNum = view.pageNum;
									if( view.isFirstThumbnail == true ){
										view.isFirstThumbnail = false;
									}
									if ( Ext.isEmpty(PAGES.CountPages) ){
										var itemArray = Ext.Array.unique ( thumbnailView.focussedItemId );

										for( var i=0; i< itemArray.length; i++ ){
											thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborders'); 
											thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborder'); 
										}
									} else {
										var itemArray = Ext.Array.unique ( PAGES.CountPages );

										thumbnailView.focussedItemId = itemArray;

										for( var i=0; i< itemArray.length; i++ ){
											/**
											 * If the pagenumber is starting from 7 or 8,
											 * in-case of splitdocument tab or remaining document tab then
											 * getting the selected container by its index
											 */
											var selectedThumbNail = thumbnailView.child('#'+thumbnailView.focussedItemId[i]);
											if( Ext.isEmpty(selectedThumbNail) ){
												selectedThumbNail = thumbnailView.child('#'+thumbnailView.items.items[i].itemId);
											}
											selectedThumbNail.removeCls('showborders'); 
											selectedThumbNail.removeCls('showborder'); 
//											thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborders'); 
//											thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborder'); 
										}
									}

									thumbnailView.focussedItemId = [];
									view.addCls('showborders');
									thumbnailView.showPreview( view, pdfPanel, pagingToolbar );
									thumbnailView.focussedItemId.push( view.itemId );
									PAGES.CountPages =[];

								}

							});

						} 

						/**
						 * Getting the canvas element of
						 * each container and sending to
						 * renderPage as a parameter
						 */
						view.ownerCt.pageContainer = view.el.query('.pdf-page-container')[0];
						if (view.ownerCt.pageContainer) {
							view.ownerCt.pageContainer.mozOpaque = true;

						}
						
					}
				}
		});
		this.callParent( arguments );
	},
	getTextDivLayer:function(){
		return this.el.query('.pdf-text-layer')[0];
	},
	getTextBuildLayer:function(){
		if( Ext.isEmpty( this.textBuildLayer ) ){
			this.textBuildLayer = Ext.create('PDFSplitter.ux.util.PDF.TextLayerBuilder',{
				textLayerDiv:this.getTextDivLayer(),
				id:this.itemId,
				cmp:this,
				pageIndex:this.pageNum-1

			});
		}
		if( Ext.isEmpty( this.textBuildLayer.textLayerDiv ) ){
			this.textBuildLayer.textLayerDiv  = this.getTextDivLayer();
		}
		return this.textBuildLayer;

	},
	clearTextDivLayer:function(){

		if( !this.isThumbnail ){
			var firstChild = this.el.query('.maindiv')[0];
			var flyEl = Ext.fly(firstChild);
			flyEl.remove();
			this.update('<div class="maindiv"><canvas class="pdf-page-container" "></canvas> <div class="pdf-text-layer"  ><div>');
			this.getCanvas().height =  this.getViewport().height; 
			this.getCanvas().width =  this.getViewport().width;
			this.getTextDivLayer().style.height =  this.getViewport().height+'px' ;
			this.getTextDivLayer().style.width =  this.getViewport().width +'px';

			pdfctx = this.getCanvas().getContext('2d');
			pdfctx.save();
			pdfctx.fillStyle = 'rgb(255, 255, 255)';
			pdfctx.fillRect(150, 100, this.getWidth(), this.getHeight());
			pdfctx.restore();
			this.getTextBuildLayer().reset();
		}else{
			this.getCanvas().height=120;
			this.getCanvas().width=100;
			thumbnailctx = this.getCanvas().getContext('2d');
			thumbnailctx.save();
			thumbnailctx.fillStyle = 'rgb(255, 255, 255)';
			thumbnailctx.fillRect(0, 0, 10, 10);
			thumbnailctx.restore();
		}


	},
	getCanvas:function(){
		return this.el.query('.pdf-page-container')[0];
	},
	updatePage:function( viewport ){
		this.setViewport(viewport);
		this.pdfRendered = false;
		if( !this.isThumbnail ){
			this.el.setHeight(this.getViewport().height );
			this.el.setWidth(this.getViewport().width )
//			this.setHeight( this.getViewport().height );
//			this.setWidth(  this.getViewport().width );

		}else{
			this.setHeight( 120 );
			this.setWidth( 100) ;

		}
	},
	renderPdfPage:function(){
		var me = this;
		this.ownerCt.lastRenderedPage = this.pageNum;
		if( !this.pdfRendered ){
			this.clearTextDivLayer();
			var pdfctx = this.getCanvas().getContext('2d'); 

			var pdfrenderContext ='';
			if( !this.isThumbnail ){
				pdfrenderContext = {
						canvasContext: pdfctx,
						viewport: this.getViewport(),
						textLayer:this.getTextBuildLayer()
				};
			}else{
				pdfrenderContext = {
						canvasContext: pdfctx,
						viewport: this.getViewport()


				};
			}

			this.pdfPage.render(pdfrenderContext);
			this.pdfRendered = true;
			var textLayer ='';
			var me = this;
			if( textLayer = this.getTextBuildLayer() ){
				this.getTextContent().then(
						function textContentResolved(textContent) {
							textLayer.setTextContent(textContent);
						});
			}
		}
	},
	getTextContent:function(){
		if (!this.textContent) {
			this.textContent = this.pdfPage.getTextContent();
		}
		return this.textContent;
	}




});
