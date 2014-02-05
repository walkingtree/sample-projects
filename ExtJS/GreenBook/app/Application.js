Ext.define('PDFSplitter.Application', {
    name: 'PDFSplitter',
    extend: 'Ext.app.Application',
    views: [
        'PdfPanel',
        'SearchBar',
        'ThumbnailView',
        'ErrorPanel',
        'MainPage',
        'PagingToolbar',
        'TabView',
        'ReadFile',
        'SplitDetailsPanel',
        'DocumentCategory',
        'DocumentType',
        'DocumentList'
    ],
    controllers: [
        'PdfSplitterController'
    ],
    stores: [
        'DocumentCategory',
        'DocumentType',
        'DocumentList'
    ],
    models: [
        'DocumentCategory',
        'DocumentType'
    ]
});
