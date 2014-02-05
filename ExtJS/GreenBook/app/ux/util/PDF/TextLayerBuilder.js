/**
 * Copyright (c) 2012 André Fiedler, <https://twitter.com/sonnenkiste>
 *
 * license: MIT-style license
 */
var CustomStyle = (function CustomStyleClosure() {

	// As noted on: http://www.zachstronaut.com/posts/2009/02/17/
	//              animate-css-transforms-firefox-webkit.html
	// in some versions of IE9 it is critical that ms appear in this list
	// before Moz
	var prefixes = ['ms', 'Moz', 'Webkit', 'O'];
	var _cache = { };

	function CustomStyle() {
	}

	CustomStyle.getProp = function get(propName, element) {
		// check cache only when no element is given
		if (arguments.length == 1 && typeof _cache[propName] == 'string') {
			return _cache[propName];
		}

		element = element || document.documentElement;
		var style = element.style, prefixed, uPropName;

		// test standard property first
		if (typeof style[propName] == 'string') {
			return (_cache[propName] = propName);
		}

		// capitalize
		uPropName = propName.charAt(0).toUpperCase() + propName.slice(1);

		// test vendor specific properties
		for (var i = 0, l = prefixes.length; i < l; i++) {
			prefixed = prefixes[i] + uPropName;
			if (typeof style[prefixed] == 'string') {
				return (_cache[propName] = prefixed);
			}
		}

		//if all fails then set to undefined
		return (_cache[propName] = 'undefined');
	};

	CustomStyle.setProp = function set(propName, element, str) {
		var prop = this.getProp(propName);
		if (prop != 'undefined')
			element.style[prop] = str;
	};

	return CustomStyle;
})();

Ext.define('PDFSplitter.ux.util.PDF.TextLayerBuilder', {

	textLayerDiv: null,
	matches:[],
	constructor: function(options){
		this.textLayerDiv = options.textLayerDiv;
		this.layoutDone = false;
		this.divContentDone = false;
		this.pageIdx = options.pageIndex;
		this.matches = [];
		this.lastScrollSource = options.lastScrollSource ? options.lastScrollSource : null;
		this.textLayerFrag = document.createDocumentFragment();
		this.cmp = options.cmp;
	},

	beginLayout: function(){
		this.textDivs = [];
		this.renderingDone = false;
	},
	endLayout : function () {
		this.layoutDone = true;
		this.insertDivContent();
	},
	insertDivContent:function(){
		if (!this.layoutDone || this.divContentDone || !this.textContent)
			return;

		this.divContentDone = true;

		var textDivs = this.textDivs;
		var bidiTexts = this.textContent.bidiTexts;

		for (var i = 0; i < bidiTexts.length; i++) {
			var bidiText = bidiTexts[i];
			var textDiv = textDivs[i];
			if (!/\S/.test(bidiText.str)) {
				textDiv.dataset.isWhitespace = true;
				continue;
			}

			textDiv.textContent = bidiText.str;
			// bidiText.dir may be 'ttb' for vertical texts.
			textDiv.dir = bidiText.dir === 'rtl' ? 'rtl' : 'ltr';
		}

		this.setupRenderLayoutTimer();
	},
	setupRenderLayoutTimer:function(){
		var RENDER_DELAY = 200; // in ms
		var self = this;
		var lastScroll = this.lastScrollSource === null ?
				0 : this.lastScrollSource.lastScroll;

		if (Date.now() - lastScroll > RENDER_DELAY) {
			// Render right away
			this.renderLayer();
		} else {
			// Schedule
			if (this.renderTimer)
				clearTimeout(this.renderTimer);
			this.renderTimer = setTimeout(function() {
				self.setupRenderLayoutTimer();
			}, RENDER_DELAY);
		}
	},
	appendText:function(geom){
		var textDiv = document.createElement('div');

		// vScale and hScale already contain the scaling to pixel units
		var fontHeight = geom.fontSize * Math.abs(geom.vScale);
		textDiv.dataset.canvasWidth = geom.canvasWidth * geom.hScale;
		textDiv.dataset.fontName = geom.fontName;

		textDiv.style.fontSize = fontHeight + 'px';
		textDiv.style.fontFamily = geom.fontFamily;
		textDiv.style.left = geom.x + 1+ 'px'; // added one pixel more the left position 
		textDiv.style.top = (geom.y - fontHeight) + 'px';

		// The content of the div is set in the `setTextContent` function.

		this.textDivs.push(textDiv);
	},
	renderLayer:function(){
		var self = this;
		var textDivs = this.textDivs;
		var bidiTexts = this.textContent.bidiTexts;
		var textLayerDiv = this.textLayerDiv;
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');

		// No point in rendering so many divs as it'd make the browser unusable
		// even after the divs are rendered
		var MAX_TEXT_DIVS_TO_RENDER = 100000;
		if (textDivs.length > MAX_TEXT_DIVS_TO_RENDER)
			return;

		for (var i = 0, ii = textDivs.length; i < ii; i++) {
			var textDiv = textDivs[i];
			if ('isWhitespace' in textDiv.dataset) {
				continue;
			}
			this.textLayerFrag.appendChild(textDiv);

			ctx.font = textDiv.style.fontSize + ' ' + textDiv.style.fontFamily;
			var width = ctx.measureText(textDiv.textContent).width;

			if (width > 0) {
				var textScale = textDiv.dataset.canvasWidth / width;

				var transform = 'scale(' + textScale + ', 1)';
				if (bidiTexts[i].dir === 'ttb') {
					transform = 'rotate(90deg) ' + transform;
				}
				CustomStyle.setProp('transform' , textDiv, transform);
				CustomStyle.setProp('transformOrigin' , textDiv, '0% 0%');

				textLayerDiv.appendChild(textDiv);
			}
		}

		this.renderingDone = true;
		this.updateMatches();

		textLayerDiv.appendChild(this.textLayerFrag);
	},
	reset:function(){
		this.renderingDone=false;
		this.textDivs=[];	
		this.divContentDone = false;
		this.textLayerDiv =null;
	},
	updateMatches:function(){
		// Only show matches, once all rendering is done.
		if (!this.renderingDone)
			return;

		// Clear out all matches.
		var matches = this.matches;
		var textDivs = this.textDivs;
		var bidiTexts = this.textContent.bidiTexts;
		var clearedUntilDivIdx = -1;

		// Clear out all current matches.
		for (var i = 0; i < matches.length; i++) {
			var match = matches[i];
			var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
			for (var n = begin; n <= match.end.divIdx; n++) {
				var div = textDivs[n];
				div.textContent = bidiTexts[n].str;
				div.className = '';
			}
			clearedUntilDivIdx = match.end.divIdx + 1;
		}

		var matches = this.cmp.up('pdfpanel').pageMatches[this.pageIdx] ? this.cmp.up('pdfpanel').pageMatches[this.pageIdx]  : [];
		// Convert the matches on the page controller into the match format used
		// for the textLayer.
		this.matches = matches = this.convertMatches( matches);

		this.renderMatches(this.matches);
	},
	renderMatches : function(matches) {
		// Early exit if there is nothing to render.
		if (matches.length === 0) {
			return;
		}
		var bidiTexts = this.textContent.bidiTexts;
		var textDivs = this.textDivs;
		var prevEnd = null;
		var isSelectedPage = (this.pageIdx === this.cmp.up('pdfpanel').selectedPageIdx) ;

		var selectedMatchIdx = this.cmp.up('pdfpanel').selected.matchIdx ? this.cmp.up('pdfpanel').selected.matchIdx : 0;

		var highlightAll = this.cmp.up('pdfpanel').state.highlightAll ? true : false; 

		var infty = {
				divIdx: -1,
				offset: undefined
		};

		function beginText(begin, className) {
			var divIdx = begin.divIdx;
			var div = textDivs[divIdx];
			div.textContent = '';

			var content = bidiTexts[divIdx].str.substring(0, begin.offset);
			var node = document.createTextNode(content);
			if (className) {
				var isSelected = isSelectedPage &&
				divIdx === selectedMatchIdx;
				var span = document.createElement('span');
				span.className = className + (isSelected ? ' selected' : '');
				span.appendChild(node);
				div.appendChild(span);
				return;
			}
			div.appendChild(node);
		}

		function appendText(from, to, className) {
			var divIdx = from.divIdx;
			var div = textDivs[divIdx];

			var content = bidiTexts[divIdx].str.substring(from.offset, to.offset);
			var node = document.createTextNode(content);
			if (className) {
				var span = document.createElement('span');
				span.className = className;
				span.appendChild(node);
				div.appendChild(span);
				return;
			}
			div.appendChild(node);
		}

		function highlightDiv(divIdx, className) {
			textDivs[divIdx].className = className;
		}

		var i0 = selectedMatchIdx, i1 = i0 + 1, i;

		if (highlightAll) {
			i0 = 0;
			i1 = matches.length;
		} else if (!isSelectedPage) {
			// Not highlighting all and this isn't the selected page, so do nothing.
			return;
		}

		for (i = i0; i < i1; i++) {
			var match = matches[i];
			var begin = match.begin;
			var end = match.end;

			var isSelected = isSelectedPage && i === selectedMatchIdx;
			var highlightSuffix = (isSelected ? ' selected' : '');
			if (isSelected)
				Ext.fly(textDivs[begin.divIdx]).scrollIntoView(this.cmp.up('pdfpanel').body);

			// Match inside new div.
			if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
				// If there was a previous div, then add the text at the end
				if (prevEnd !== null) {
					appendText(prevEnd, infty);
				}
				// clears the divs and set the content until the begin point.
				beginText(begin);
			} else {
				appendText(prevEnd, begin);
			}

			if (begin.divIdx === end.divIdx) {
				appendText(begin, end, 'highlight' + highlightSuffix);
			} else {
				appendText(begin, infty, 'highlight begin' + highlightSuffix);
				for (var n = begin.divIdx + 1; n < end.divIdx; n++) {
					highlightDiv(n, 'highlight middle' + highlightSuffix);
				}
				beginText(end, 'highlight end' + highlightSuffix);
			}
			prevEnd = end;
		}

		if (prevEnd) {
			appendText(prevEnd, infty);
		}
	},
	convertMatches : function( matches) {
		var i = 0;
		var iIndex = 0;
		var bidiTexts = this.textContent.bidiTexts;
		var end = bidiTexts.length - 1;
		var queryLen = this.cmp.up('pdfpanel').state.QUERY ? this.cmp.up('pdfpanel').state.QUERY.length : 0;

		var lastDivIdx = -1;
		var pos;

		var ret = [];

		// Loop over all the matches.
		for (var m = 0; m < matches.length; m++) {
			var matchIdx = matches[m];
			// # Calculate the begin position.

			// Loop over the divIdxs.
			while (i !== end && matchIdx >= (iIndex + bidiTexts[i].str.length)) {
				iIndex += bidiTexts[i].str.length;
				i++;
			}

			// TODO: Do proper handling here if something goes wrong.
			if (i == bidiTexts.length) {
				console.error('Could not find matching mapping');
			}

			var match = {
					begin: {
						divIdx: i,
						offset: matchIdx - iIndex
					}
			};

			// # Calculate the end position.
			matchIdx += queryLen;

			// Somewhat same array as above, but use a > instead of >= to get the end
			// position right.
			while (i !== end && matchIdx > (iIndex + bidiTexts[i].str.length)) {
				iIndex += bidiTexts[i].str.length;
				i++;
			}

			match.end = {
					divIdx: i,
					offset: matchIdx - iIndex
			};
			ret.push(match);
		}

		return ret;
	}
	,setTextContent:function(textContent){
		this.textContent = textContent;
	}
});