Ext.define("PDFSplitter.view.ThumbnailView", {
	extend: 'Ext.panel.Panel',

	xtype:'thumbnailview',
	requires:['PDFSplitter.ux.util.PDF.TextLayerBuilder',
	          'PDFSplitter.view.TextContainer'],

	          extraBaseCls: Ext.baseCSSPrefix + 'pdf',
	          extraBodyCls: Ext.baseCSSPrefix + 'pdf-body',

	          autoScroll: true,
	          layout:'column',
	          columnWidth : .2,
	          allowContext : true,
	          /**
	           * @cfg{Bool} isSplit
	           * The text displayed before the input item.
	           */
	          isSplit : this.isSplit,
	          /**
	           * @cfg{Bool} isEditable
	           * This will be set to make the pages field in splitdetailspanel pages field redonly true/false
	           */
	          isEditable : true,
	          allowContext : this.allowContext,
	          minWidth   : 150,
	          /**
	           * @cfg{String} src
	           * URL to the PDF - Same Domain or Server with CORS Support
	           */
	          src: '',

	          /**
	           * @cfg{Double} pageScale
	           * Initial scaling of the PDF. 1 = 100%
	           */
	          config :{
	        	  pageScale: 0.2,
	          },

	          /**
	           * @cfg{Boolean} disableWorker
	           * Disable workers to avoid yet another cross-origin issue(workers need the URL of
	           * the script to be loaded, and currently do not allow cross-origin scripts)
	           */
	          disableWorker: true,

	          /**
	           * @cfg{Boolean} disableTextLayer
	           * Enable to render selectable but hidden text layer on top of an PDF-Page.
	           * This feature is buggy by now and needs more investigation!
	           */
	          disableTextLayer: true,

	          /**
	           * @cfg{String} loadingMessage
	           * The text displayed when loading the PDF.
	           */
	          loadingMessage: 'Loading PDF, please wait...',

	          /**
	           * @cfg{String} afterPageText
	           * Customizable piece of the default paging text. Note that this string is formatted using
	           *{0} as a token that is replaced by the number of total pages. This token should be preserved when overriding this
	           * string if showing the total page count is desired.
	           */
	          afterPageText: 'of {0}',

	          scaleWidth: 60,

	          numOfPages : undefined,

	          pages : this.pages,

	          /**
	           * @cfg{String} focussedItemId
	           * itemId of the container that is focussed
	           */
	          focussedItemId : [],

	          pageNums : [],

	          /**
	           * @cfg{Bool} isToggleHide
	           * When the user is hiding the view by clcikng on the togglesidebarbutton,
	           * then the cfg will become true.
	           */
	          isToggleHide : false,

	          buffer : PAGES.THUMB_BUFFER,

	          lastRenderedPage : undefined,

	          /**
	           * This method will be called when the thumbnail is clicked.
	           * To show the respective preview in preview area
	           * @param container
	           * 
	           */
	          showPreview : function( currentThumb, pdfPanel, pagingtoolbar ){
	        	  var next;
	        	  var pdfContainer;
	        	  var top;
	        	  var isEmpty;
	        	  var pageCount;
	        	  isEmpty = pageCount === 0;


	        	  next = currentThumb.pageNum-1;
	        	  pdfContainer = pdfPanel.child('#pdfPageContainer'+next);
	        	  top = pdfContainer.el.getRegion().top;
	        	  pdfPanel.fromThumbnail = true;
	        	  pdfPanel.scrollBy(0, top-100, false);
	        	  pdfPanel.currentPage = currentThumb.pageNum;

	        	  pageCount = pdfPanel.numOfPages;
	        	  currPage = pdfPanel.currentPage;
	        	  pagingtoolbar.child('#prev').setDisabled(currPage === 1 || isEmpty);
	        	  pagingtoolbar.child('#next').setDisabled(currPage === pageCount || isEmpty);

	        	  pagingtoolbar.child('#inputItem').setValue(currentThumb.pageNum);
	        	  var pages = this.prioritizeItemsToBeRendered( currentThumb, true );
	        	  for( var k =0; k<pages.length ;k++ ){
	        		  pdfPanel.up('mainpage').pdfPages[k].renderPdfPage();
	        	  }

	          },
	          listeners : {

	        	  render : function( view ){
	        		  view.body.on('scroll', function(event, target, eObj){

	        			  var thumbPages = view.up('mainpage').thumbnails;
	        			  var mainViewRegion = view.el.getRegion();
	        			  var childRegion;
	        			  for( var i=0; i<thumbPages.length; i++ ){
	        				  childRegion = thumbPages[i].el.getRegion();
	        				  if( ( mainViewRegion.top > childRegion.top && mainViewRegion.bottom < childRegion.bottom ) ||
	        						  ( mainViewRegion.top < childRegion.top && mainViewRegion.bottom > childRegion.bottom )
	        						  ||( mainViewRegion.top > childRegion.top && childRegion.bottom > mainViewRegion.top && mainViewRegion.bottom > childRegion.bottom )

	        				  ){

	        					  child = thumbPages[i];
	        					  var pages = view.prioritizeItemsToBeRendered( child );
	        					  /**
	        					   * Calling if pagescale changes then the other pages will be updated
	        					   */
	        					  child.renderPdfPage();
	        					  this.renderContainers( pages );

	        				  }

	        			  }

	        		  },view);
	        	  },
	          },
	          prioritizeItemsToBeRendered : function( focussedContainer, isFromThumbnailOrInput ){
	        	  var pagenum = focussedContainer.pageNum;
	        	  var pages = [];
	        	  pagenum = pagenum+1;

	        	  var totalPages = this.pdfDoc.numPages;	
	        	  var pageSet = PAGES.PDF_SET;

	        	  /**
	        	   * Checking the condition if pages that are yet to be rendered are less than the total number of pages
	        	   */
	        	  if( (totalPages - pagenum ) > pageSet ) {
	        		  pageSet = pageSet;

	        	  } else {
	        		  pageSet = (totalPages- pagenum )+1;

	        	  }

	        	  if( isFromThumbnailOrInput == true ){
	        		  pages = this.getPages( focussedContainer, totalPages );

	        		  return pages;
	        	  }

	        	  for( var i = 0; i < pageSet; i++ ){
	        		  pages.push(pagenum+i);

	        	  }
	        	  return pages;
	          },

	          renderContainers : function( arrayOfPageNumbers ){

	        	  for( var i = 0; i< arrayOfPageNumbers.length; i++){
	        		  var containerId = arrayOfPageNumbers[i]-1;
	        		  var container = this.child('#pdfPageContainer'+containerId);
	        		  container.renderPdfPage();
	        	  }
	          },

	          /**
	           * This method will be called to return the next and previouos pages of current page
	           */
	          getPages : function( container, totalNumOfPages ){
	        	  var renderPages = [];
	        	  if( container.pageNum < totalNumOfPages ){
	        		  if(container.pageNum !== 1){
	        			  renderPages.push( container.pageNum-1)
	        		  }
	        		  renderPages.push( container.pageNum+1);
	        		  renderPages.push( container.pageNum );


	        	  }else {
	        		  renderPages.push( container.pageNum );
	        	  }

	        	  return renderPages;
	          }

});
