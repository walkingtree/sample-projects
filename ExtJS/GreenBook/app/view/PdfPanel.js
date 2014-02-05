Ext.define("PDFSplitter.view.PdfPanel", {
	extend: 'Ext.panel.Panel',
	xtype: 'pdfpanel',
	requires: ['PDFSplitter.ux.util.PDF.TextLayerBuilder', 'PDFSplitter.view.ErrorPanel','PDFSplitter.view.TextContainer','PDFSplitter.view.PagingToolbar'],

	extraBaseCls: Ext.baseCSSPrefix + 'pdf',
	extraBodyCls: Ext.baseCSSPrefix + 'pdf-body',

	autoScroll: true,

	/**
	 * @cfg{String} src URL to the PDF - Same Domain or Server
	 *              with CORS Support
	 */
	src: '',

	/**
	 * @cfg{Double} pageScale Initial scaling of the PDF. 1 =
	 *              100%
	 */
	config :{
		pageScale: 0.9,
		defaultViewport:undefined,
		thumbnailViewport:undefined
	},

	/**
	 * @cfg{Boolean} disableWorker Disable workers to avoid yet
	 *               another cross-origin issue(workers need the
	 *               URL of the script to be loaded, and
	 *               currently do not allow cross-origin
	 *               scripts)
	 */
	disableWorker: true,

	/**
	 * @cfg{Boolean} disableTextLayer Enable to render
	 *               selectable but hidden text layer on top of
	 *               an PDF-Page. This feature is buggy by now
	 *               and needs more investigation!
	 */
	disableTextLayer: false,

	numOfPages: undefined,

	uploadedUrl: undefined,

	scaleValue: undefined,
	extractTextPromises :[],

	buffer : PAGES.BUFFER,

	lastRenderedPage : undefined,
	pageMatches:[],
	pendingFindMatches:[],
	startedTextExtraction:false,
	state:{},
	selected:{},
	offset:{},
	fromThumbnail : false,
	initComponent: function () {
		var me = this;

		PDFJS.disableTextLayer = me.disableTextLayer;

		var textLayerDiv = '';
		if (!PDFJS.disableTextLayer) {
			textLayerDiv = '<div class="pdf-text-layer"></div>';
		}
		me.dockedItems = [{
			xtype : 'pagingtoolbar',
			showSplitIcon : this.showSplitIcon
		}],
		me.items = [{
			itemId: 'searchhide',
			xtype: 'searchbar',
			width: 500,
			cls: 'search',
			hidden: true
		}];

		me.callParent(arguments);

		if (me.disableWorker) {
			/**
			 * Disable workers to avoid yet another cross-origin
			 * issue (workers need the URL of the script to be
			 * loaded, and dynamically loading a cross-origin
			 * script does not work)
			 */

			PDFJS.disableWorker = true;
		}

		// Asynchronously download PDF as an ArrayBuffer
		me.getDocument();
	},
	listeners : {

		render : function( view ){
			var me = this;
			view.body.on('scroll', function(event,target, eObj){
				var pdfPages = view.up('mainpage').pdfPages;
				var mainViewRegion = view.el.getRegion();
				var childRegion;
				for( var i=0; i<pdfPages.length; i++ ){
					childRegion = pdfPages[i].el.getRegion();
					/**
					 * Looping through all container and checking which container is inside view
					 */
					if( ( mainViewRegion.top > childRegion.top && mainViewRegion.bottom < childRegion.bottom ) ||
							( mainViewRegion.top < childRegion.top && mainViewRegion.bottom > childRegion.bottom )||
							( mainViewRegion.top > childRegion.top && childRegion.bottom > mainViewRegion.top && mainViewRegion.bottom > childRegion.bottom )
							||( mainViewRegion.top < childRegion.top && childRegion.top < mainViewRegion.bottom && mainViewRegion.bottom < childRegion.bottom )

					)
					{


						child = pdfPages[i];
						var pages = view.prioritizeItemsToBeRendered( child );
						var page = child.getPdfPage();
						/**
						 * Calling if pagescale changes then the other pages will be updated
						 */
						var newViewPort = page.getViewport( this.getPageScale() )
						pdfPages[i].renderPdfPage();
						this.renderContainers( pages );

					}

					if( mainViewRegion.top < childRegion.top && (mainViewRegion.bottom)/1.5 > childRegion.top  )
					{
						view.currentPage = child.pageNum;
						me.selectedPageIdx = i;
						var toolbar = view.child('#pagingToolbar');
						var pageCount = view.numOfPages;
						var isEmpty = pageCount === 0;
						toolbar.child('#prev').setDisabled(view.currentPage === 1 || isEmpty);
						toolbar.child('#next').setDisabled(view.currentPage === view.numOfPages || isEmpty);
						/**
						 * Checking the condition whether the scroll is firing from click of thumbnail or not
						 */
						if( view.fromThumbnail == true )
						{
							view.down('pagingtoolbar').child('#inputItem').setValue(view.currentPage);
							this.addClassToThumbnail( view, child );
							return;
							
						}else{
							view.down('pagingtoolbar').child('#inputItem').setValue(child.pageNum);
							this.addClassToThumbnail( view, child );
						}
			
					}
				}

			},view);
		},
	},

	onScaleBlur: function (e) {
		this.child('#pagingToolbar').child('#scaleCombo').setValue(this.pageScale);
	},

	onScaleChange: function (combo, newValue) {
		var me = this;
		me.fireEvent('changescale', me, newValue);
	},

	setSrc: function (src) {
		this.src = src;
		return this.getDocument();
	},

	getDocument: function () {
		var me = this;
		if ( !! me.src) {
			PDFJS.getDocument(me.src).then(function (pdfDoc) {
				me.pdfDoc = pdfDoc;
				me.onLoad();
			});
		}
		return me;
	},


	/**
	 * This method will be called form the fileuploadfield
	 * 
	 * @param url
	 * @param panel
	 * 
	 */
	open: function pdfViewOpen(url, panel, fromZoomOption) {
		/**
		 * Removing all components from panel
		 */
		if (url == null) {
			url = panel.uploadedUrl;
		}

		try {

			PDFJS.getDocument(url).then(

					function (pdfDoc) {
						panel.pdfDoc = pdfDoc;
						panel.removeAll();
						panel.add({
							xtype: 'errorpanel',
							columnWidth: 1,
							anchor: '100%',
							name: 'errorPanel',
							bodyCls: 'panelstyles',
							closeAction: 'hide',
							cls: 'errorpanel',
							border: 1,
							html: 'sadsad'

						});
						panel.add({
							itemId: 'searchhide',
							xtype: 'searchbar',
							width: 500,
							hidden: true,
							cls: 'search'

						});

						panel.onLoad();
						if (fromZoomOption == true) {
							return;
						}
						var thumbnailPanel = panel.up('container').down('thumbnailview');

						thumbnailPanel.pdfDoc = pdfDoc;
						thumbnailPanel.removeAll();

						panel.up('container').down('thumbnailview').onLoad();

					}, this);

		} catch (err) {
			// Handle errors here
			panel.fireEvent('showloadmask', false);
			var ep;
			ep = panel.down('#errorPanel');
			ep.update(err.message);
			ep.show();

			return;
		}

	},
	extractText:function(){
		var me = this;
		if (me.startedTextExtraction) {
			return;
		}
		me.startedTextExtraction = true;

		this.pageContents = [];
		for (var i = 0, ii = me.pdfDoc.numPages; i < ii; i++) {
			me.extractTextPromises.push(new PDFJS.Promise());
		}



		me.extractPageText(0);
		return me.extractTextPromise;
	},
	extractPageText:function (pageIndex) {
		var me = this;
		me.pages[pageIndex].getTextContent().then( 
				function textContentResolved(data) {
					// Build the find string.
					var bidiTexts = data.bidiTexts;
					var str = '';

					for (var i = 0; i < bidiTexts.length; i++) {
						str += bidiTexts[i].str;
					}
					// Store the pageContent as a string.
					me.pageContents.push(str);

					me.extractTextPromises[pageIndex].resolve(pageIndex);
					if ((pageIndex + 1) < me.pages.length) 
						me.extractPageText(pageIndex + 1);
				}
		);
	},
	nextMatch:function(query,caseSensitive){
		var me = this;
		var pages = this.pages;
		var previous = this.state.findPrevious;
		var numPages = this.pages.length;
		if( this.dirtyMatch ){


			this.dirtyMatch = false;
			this.selected.pageIdx = this.selected.matchIdx = 0;
			this.offset.pageIdx = previous ? numPages - 1 : 0;
			this.offset.matchIdx = null;
			this.hadMatch = false;
			this.resumeCallback = null;
			this.resumePageIdx = null;
			for (var i = 0; i < this.pages.length; i++) {
				// Wipe out any previous highlighted matches.
				this.updatePage(i);

				// As soon as the text is extracted start finding the matches.
				if (!(i in this.pendingFindMatches)) {
					this.pendingFindMatches[i] = true;
					this.extractTextPromises[i].then(function(pageIdx) {
						delete me.pendingFindMatches[pageIdx];

						me.calcFindMatch(pageIdx,me.state.QUERY,me.state.caseSensitive);
					});
				}
			}
		}


		// If we're waiting on a page, we return since we can't do anything else.
		if (this.resumeCallback) {
			return;
		}

		var offset = this.offset;
		// If there's already a matchIdx that means we are iterating through a
		// page's matches.
		if ( !Ext.isEmpty( offset.matchIdx ) ) {
			var numPageMatches = this.pageMatches[offset.pageIdx].length;
			if ((!previous && offset.matchIdx + 1 < numPageMatches) ||
					(previous && offset.matchIdx > 0)) {
				// The simple case, we just have advance the matchIdx to select the next
				// match on the page.
				this.hadMatch = true;
				offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
//				offset.pageIdx = offset.pageIdx +1;
				this.updateMatch(true);
				return;
			}
			// We went beyond the current page's matches, so we advance to the next
			// page.
			this.advanceOffsetPage(previous);
		}
		// Start searching through the page.
		this.nextPageMatch();
	},
	calcFindMatch: function(pageIndex,query,caseSensitive) {
		var pageContent = this.pageContents[pageIndex];
		var caseSensitive = this.state.caseSensitive;
		var queryLen = query.length;

		if (queryLen === 0) {
			// Do nothing the matches should be wiped out already.
			return;
		}

		if (!caseSensitive) {
			pageContent = pageContent.toLowerCase();
			query = query.toLowerCase();
		}

		var matches = [];

		var matchIdx = -queryLen;
		while (true) {
			matchIdx = pageContent.indexOf(query, matchIdx + queryLen);
			if (matchIdx === -1) {
				break;
			}

			matches.push(matchIdx);
		}
		this.pageMatches[pageIndex] = matches;
		this.updatePage(pageIndex);
		if (this.resumePageIdx === pageIndex) {
			var callback = this.resumeCallback;
			this.resumePageIdx = null;
			this.resumeCallback = null;
			callback();
		}
	},
	/**
	 * update's the page of the passed index, update the matches and scroll the page into view
	 */
	updatePage: function(idx) {
		var page = this.pages[idx];

		if (this.selected.pageIdx === idx) {
			// If the page is selected, scroll the page into view, which triggers
			// rendering the page, which adds the textLayer. Once the textLayer is
			// build, it will scroll onto the selected match.
			page.el.scrollIntoView(this.body);
			this.selectedPageIdx = idx;
		}

		if (page.textBuildLayer) {
			page.textBuildLayer.updateMatches();
		}
	},
	/**
	 * find the matches for the next page
	 */
	nextPageMatch: function() {
		if ( !Ext.isEmpty( this.resumePageIdx ) )
			console.error('There can only be one pending page.');

		var matchesReady = function(matches) {
			var offset = this.offset;
			var numMatches = matches.length;
			var previous = this.state.findPrevious;
			if (numMatches) {
				// There were matches for the page, so initialize the matchIdx.
				this.hadMatch = true;
				offset.matchIdx = previous ? numMatches - 1 : 0;
				this.updateMatch(true);
			} else {
				// No matches attempt to search the next page.
				this.advanceOffsetPage(previous);
				if (offset.wrapped) {
					offset.matchIdx = null;
					if (!this.hadMatch) {
						// No point in wrapping there were no matches.
						this.updateMatch(false);
						return;
					}
				}
				// Search the next page.
				this.nextPageMatch();
			}
		}.bind(this);

		var pageIdx = this.offset.pageIdx;
		var pageMatches = this.pageMatches;
		if (!pageMatches[pageIdx]) {
			// The matches aren't ready setup a callback so we can be notified,
			// when they are ready.
			this.resumeCallback = function() {
				matchesReady(pageMatches[pageIdx]);
			};
			this.resumePageIdx = pageIdx;
			return;
		}
		// The matches are finished already.
		matchesReady(pageMatches[pageIdx]);
	},

	/**
	 * update the offset pageindex to the next page
	 */
	advanceOffsetPage: function(previous) {
		var offset = this.offset;
		var numPages = this.extractTextPromises.length;
		offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
		offset.matchIdx = null;
		if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
			offset.pageIdx = previous ? numPages - 1 : 0;
			offset.wrapped = true;
			return;
		}
	},
	/**
	 * update's the match and call update page to update the match in the textlayer
	 */
	updateMatch: function(found) {
		var wrapped = this.offset.wrapped;
		this.offset.wrapped = false;
		if (found) {
			var previousPage = this.selected.pageIdx;
			this.selected.pageIdx = this.offset.pageIdx;
			this.selected.matchIdx = this.offset.matchIdx;
			// Update the currently selected page to wipe out any selected matches.
			if (previousPage !== -1 && previousPage !== this.selected.pageIdx) {
				this.updatePage(previousPage);
			}
		}
		if (this.selected.pageIdx !== -1) {
			this.updatePage(this.selected.pageIdx, true);
		}
	},


	prioritizeItemsToBeRendered : function( focussedContainer, isFromThumbnailOrInput ){
		var pagenum = focussedContainer.pageNum;
		var pages = [];
		pagenum = pagenum+1;
		var totalPages = this.numOfPages;	
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

	/**
	 * This method will be called to render the text
	 */
	renderContainers : function( arrayOfPageNumbers ){

		for( var i = 0; i< arrayOfPageNumbers.length; i++){
			var containerId = arrayOfPageNumbers[i]-1;
			var container = this.child('#pdfPageContainer'+containerId);
			var page = container.getPdfPage();
			/**
			 * Calling if pagescale changes then the other pages will be updated
			 */
			container.renderPdfPage();
		}

	},

	/**
	 * This method will be called when the user is scrolling and pages are changing
	 */
	addClassToThumbnail : function(  pdfPanel, container ){
		var thumbnailView = pdfPanel.up('mainpage').down('thumbnailview');
		var page = thumbnailView.child('#'+container.itemId);
		var thumbNailPanelRegion = thumbnailView.el.getRegion();
		var thumbnailRegion = page.el.getRegion();
		/**
		 * Checking whether the focussed thumbnail is within the view or not
		 */
		if ((thumbNailPanelRegion.top > thumbnailRegion.top && thumbNailPanelRegion.bottom > thumbnailRegion.bottom) || (thumbNailPanelRegion.top < thumbnailRegion.top && thumbNailPanelRegion.bottom < thumbnailRegion.bottom)) {

			thumbnailView.scrollBy(0, thumbnailRegion.top-50, false);

		}

		var itemArray = Ext.Array.unique ( thumbnailView.focussedItemId );

		for( var i=0; i< itemArray.length; i++ ){
			thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborders'); 
			thumbnailView.child('#'+thumbnailView.focussedItemId[i]).removeCls('showborder'); 
		}
		thumbnailView.focussedItemId = [];
		page.addCls('showborders');
		thumbnailView.focussedItemId.push( page.itemId );
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
