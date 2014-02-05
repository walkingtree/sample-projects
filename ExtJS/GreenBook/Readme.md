Due to copyright issues, the ext folder has not been included in this project and sencha cdn URL has been used in the index.html file. If you download this project then you can also try extracting the ExtJS framework in a folder named ext and change the index.html file.

# PDFSplitter/app

This folder contains the javascript files for the application.

# PDFSplitter/resources

This folder contains static resources (typically an `"images"` folder as well).

# PDFSplitter/overrides

This folder contains override classes. All overrides in this folder will be 
automatically included in application builds if the target class of the override
is loaded.

# PDFSplitter/sass/etc

This folder contains misc. support code for sass builds (global functions, 
mixins, etc.)

# PDFSplitter/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'PDFSplitter'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in PDFSplitter/.sencha/app/sencha.cfg. 

# PDFSplitter/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'PDFSplitter'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in PDFSplitter/.sencha/app/sencha.cfg. 
