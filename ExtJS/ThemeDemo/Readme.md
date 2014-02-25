# DemoApp/app

This folder contains the javascript files for the application.

# DemoApp/resources

This folder contains static resources (typically an `"images"` folder as well).

# DemoApp/overrides

This folder contains override classes. All overrides in this folder will be 
automatically included in application builds if the target class of the override
is loaded.

# DemoApp/sass/etc

This folder contains misc. support code for sass builds (global functions, 
mixins, etc.)

# DemoApp/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'DemoApp'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in DemoApp/.sencha/app/sencha.cfg. 

# DemoApp/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'DemoApp'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in DemoApp/.sencha/app/sencha.cfg. 
# Setup Instructions

Software Requirements:
---------------------

1. Extjs 4.2.1.883
2. Sencha CMD 4.0.2.67
 
Steps:
-----

1. Pull or clone the project to your local machine
2. rename extjs 4.2.1 package to ext and place it in project main structure.
