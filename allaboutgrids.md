# All About Grids

## Overview
This CodeLab is all about Ext JS Data Grids. Apart from talking about the exhaustive set of its off-the-shelf functionalities, it will also delve deep into its integration with the Ext JS data package, data selection, pagination, the available features and plug-ins and lots more that shall enable you to take advantage of this component. 

### What you'll learn?
1. Introduction to Ext JS data grids.
2. What are the types of columns available for rendering different types of data?
3. How do we render widgets/components inside a grid column?
4. How do we render widgets/components inside a grid row?
5. How do we nest the column headers?
6. How do we lock the grid columns?
7. How do we style the grid rows and columns?
8. What are the different ways of grid data selection?
9. How do we edit the selected data?
10. How do we sort, filter and group the grid data?
11. How do we do pagination?
12. What are the special features available and how do we use them?
13. What are the common plugins available and how do we use them?
14. How do we sync a grid with a chart?

## What you'll need?
1. [Sencha Ext JS 6.x SDK](https://www.sencha.com/products/extjs/#overview)
2. [Sencha Cmd 6.x](https://www.sencha.com/products/sencha-cmd/download)
3. [Google Chrome Browser](https://www.google.com/intl/en/chrome/)
4. Text Editor or IDE
5. [XAMPP - Web Server](https://www.apachefriends.org/index.html) - optional


## Setup & Getting Started
In this section, we will setup the needed environment and download the starter project for this section of the codelab.

### Environment Setup
**1. Install Sencha Cmd**

* Install the latest copy of Cmd from <http://www.sencha.com/products/sencha-cmd/download>. Choose the option that includes Java JRE.
* Open terminal window and run the command `sencha which`. It should show the latest installed Cmd version.
  
**2. Obtain Sencha Ext JS SDK**

* Downlaod Ext JS 6.x SDK from URL <https://www.sencha.com/products/extjs/#overview>.
* After downloading, unzip the Ext JS SDK at the system root folder.
* Change the SDK folder's name to  `ext-6`. It should be as follows:
  * Windows: C:/ext-6
  * Mac/UNIX: ~/ext-6
 
**3. Install Google Chrome**

* Download and install Chrome from <https://www.google.com/intl/en/chrome/>.
   
**4. Obtain Text Editor or IDE**

* Choose a text editor or IDE of your choice.

**5. Start the Web server**

* Open terminal window and type the following command at `c:/`
     
  `sencha web start`
     
* The following message in terminal window indicates that the server has started. Leave the window open and running.
     
  ![Jetty Server started](https://github.com/walkingtree/images/blob/master/sencha/allaboutgrids/JettyServer.png)
     
**6. Test the Server and Ext JS install**

* Open URL `localhost:1841` in the browser. You should see the following page: 
   
  ![Ext Extracted](https://github.com/walkingtree/images/blob/master/sencha/allaboutgrids/ExtExtracted.png)

* Click on `ext-6`, you should see the Ext JS welcome page. (This is 6.2 welcome page.) If it does not show, then please review the
  install instructions and ensure that the server is running.
   
  ![Welcome to Ext JS](https://github.com/walkingtree/images/blob/master/sencha/allaboutgrids/ExtWelcomePage.png)
  
### Starter Project Setup
The application to be used for this codelab is the `Article Reader` application. 

![Starter Article Reader](https://github.com/walkingtree/sample-projects/blob/master/Images/Allaboutforms/starterarticlereader.png)

Clicking on the **Edit** button shows the Edit Window, which has a Form loaded with the selected record.

![Edit Window](https://github.com/walkingtree/sample-projects/blob/master/Images/Allaboutforms/editwindow.png)

1. For this, download `allaboutgrids` from [here](https://github.com/walkingtree/codelabs/blob/master/sencha/downloads/allaboutgrids.zip?raw=true). Unzip it and place it at `c:/`.

2. The extracted folder `allaboutgrids` contains the starter code for `ArticleReader` application. It shall have the following folder
   structure:

   ```javascript
   c:/
     allaboutgrids
       app
       resources
   ``` 
  
3. Open command line and navigate to `c:/ext-6` folder.

4. Generate the `ArticleReader` application by copying and pasting the following command at `c:/ext-6`.
   
   ```
   sencha generate app -classic -starter=false ArticleReader c:/allaboutgrids
   ```   
   
   This will generate the infrastructure for a classic Ext JS application. The `-starter=false` parameter makes sure that the starter
   code is not created as you already placed your starter code in this folder.

5. Open file `c:/allaboutgrids/app.json` in the editor and around `line no. 274` in `CSS[]` array, add the following code to
   include the CSS resources: 
  
   ```json
	{
		"path": "resources/css/stylesheet.css",
		"bootstrap": false
	}
   ```
   
6. In the same file, edit the `requires` array (approx. at line no. 69) to add the "charts" package.

    ```javascript
	"requires": [
		"font-awesome",
		"charts"
	],
    ```
    
7. Open `app.js` and replace it with the following code:
   
   ```javascript
	Ext.application({
		name: 'ArticleReader',
		extend: 'ArticleReader.Application',
		requires: [
			'ArticleReader.view.main.Main'
		],
		mainView: 'ArticleReader.view.main.Main'
	});
   ```
   
8. Open `app/Application.js` and replace it with the following code:

   ```javascript
	Ext.define('ArticleReader.Application', {
		extend: 'Ext.app.Application',
		name: 'ArticleReader',

		launch: function () {
			// TODO - Launch the application
		},

		onAppUpdate: function() {
			Ext.Msg.confirm('Application Update', 'This application has an update, reload?', function(choice) {
				if (choice === 'yes') {
					window.location.reload();
				}	
			});
		}  
	});
   ```
   
9. Save your work.   

10. The first time an application is created, you need to initialize the Microloader and create the CSS. To do that, navigate to
    `c:/allaboutgrids` in the terminal window and run the following command:
  
    ```
    sencha app build development 
    ```
   
11. Open browser and run the application with URL `localhost:1841/allaboutgrids`. You should see the Article Reader initial screen.
   
### Understand the files and folders
* `app/view/Banner.js` - Docked top banner with image and title.

* `app/view/PostFilter.js` - Docked at the top, it has a combo box to select posts by category. The selection does not work right now.
 
* `app/view/posts/Tabpanel.js` - Tab Panel in the center region to hold the **View** and **Stats** tabs.

* `app/view/posts/View.js` - **View** tab to show selected posts as thumbnails.

* `app/view/posts/Stats.js` - **Stats** tab to show the column chart representing monthly hit count of the selected post.

* `app/view/edit/Detail.js` - **Details** Panel in the east region to show details of the selected post. Its **Edit** button is to edit the post details. 

* `app/view/edit/Window.js` - **Edit Window** with a form, which is loaded with the selected post for editing.

* `app/view/main/Main.js` - The Main View (viewport) of the application. 
 
* `app/view/main/MainController.js` - Main Controller to handle selection of category from the combo box.

* `app/view/edit/DetailController.js` - Controller to handle the click event of **Edit** button along with the **Save** and **Cancel**   actions of the **Edit Window**.

* `app/model/Feed.js` - Model for the `feeds` store, which is used to populate the combo box.

* `app/model/Post.js` - Model for the `posts` store, which is used to populate the **View** (dataview) component.

* `app/model/HitCount.js` - Model for the `hitCounts` store, which is used to populate the **Stats** view.

* `app/view/main/MainModel.js` - Main Model to declare the `feeds`, `posts` and `hitCounts` stores, alongwith other bindable data.

* `resources` - This folder contains the data, CSS and other assets required for the application.

## Introduction to Grids
An Ext JS data grid presents all kinds of data in an orderly tabular format and provides an easy way to sort, filter, group, and edit data. Here's a list of some of the common grid column configs:

* text

* dataIndex

* width

* flex

* rowLines

* columnLines

* cellWrap

* sortable

* resizable

* draggable

* hideable

* tooltip (for column header)

* editor (used with cell or row editors)

* columns (to add sub columns)

<p data-height="265" data-theme-id="0" data-slug-hash="XpOaYB" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids1" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/XpOaYB/">XpOaYB</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## UML
Grids are panels so they can have title, docked items, tools, buttons, etc. Additionally, they also inherit the `store` and `columns:[]` properties from their parent class `Ext.panel.Table`.

![Grids UML](https://github.com/walkingtree/sample-projects/blob/master/Images/Allaboutforms/GridsUML.png)

## Column Types
* **Inbuilt Renderers:** These column types provide default rendering for various data types:

  * **Ext.grid.column.Column:** It calls the `toString()` function to return the column value as a string. Its xtype is `gridcolumn` and is the default.

  * **Ext.grid.column.Number:** It calls the `Ext.util.Format.number()` function, using the specified formatting string. Its xtype is `numbercolumn`.

  * **Ext.grid.column.Date:** It calls the `Ext.util.Format.date()` function, using the specified formatting string. Its xtype is `datecolumn`.

  * **Ext.grid.column.Boolean:** It renders the values specified as `trueText` and `falseText` properties. Its xtype is `booleancolumn`.

  <p data-height="265" data-theme-id="0" data-slug-hash="MJxjzr" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids3" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/MJxjzr/">MJxjzr</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

* **Custom Renderer:** It can be used to transform data before it is rendered. 

  <p data-height="265" data-theme-id="0" data-slug-hash="oBVWPb" data-default-tab="js,result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids5" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/oBVWPb/">oBVWPb</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.column.Template:** It allows to specify a template via `tpl` config. Its xtype is `templatecolumn`.

  <p data-height="265" data-theme-id="0" data-slug-hash="OWqWRw" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids4" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/OWqWRw/">OWqWRw</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

* **Ext.grid.column.Action:** It can have one or more clickable icons. Its xtype is `actioncolumn`.

  <p data-height="265" data-theme-id="0" data-slug-hash="QdogoW" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids6" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/QdogoW/">QdogoW</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.column.RowNumberer:** It automatically numbers the rows. Its xtype is `rownumberer`.

  <p data-height="265" data-theme-id="0" data-slug-hash="EZMdgG" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids7" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/EZMdgG/">EZMdgG</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.column.Check:** It renders a checkbox in each column cell. Its xtype is `checkcolumn`. It can be at any index in the
  columns array.

  <p data-height="265" data-theme-id="0" data-slug-hash="QpXLZZ" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids23checkcolumn" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/QpXLZZ/">QpXLZZ</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.column.Widget:** It allows to add a component or widget to a grid column. Its xtype is `widgetcolumn`.

  A widget is a lightweight component. There are several types of widgets specifically designed to be used in grids. 
  
  For efficiency, `widgetcolumn` reuses the widget as the user scrolls. The widget value is determined by setting its `defaultBindProperty` to the `dataIndex` value.

  <p data-height="265" data-theme-id="0" data-slug-hash="KaYWMp" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids8" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/KaYWMp/">KaYWMp</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
 
  **Example: Adding a Component to a Grid Cell**
  <p data-height="265" data-theme-id="0" data-slug-hash="MpZryR" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids12AddingCompo" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/MpZryR/">MpZryR</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

  **Example: Widget Columns are Reused**
  <p data-height="265" data-theme-id="0" data-slug-hash="bgPawm" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids11" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/bgPawm/">bgPawm</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
## Lab 1: Define and Use the Grid Class
1. **Define the Grid Class:** Open editor, create a new file and copy-paste the following code. Save it as `app/view/posts/Grid.js`.

   ```javascript
	Ext.define('ArticleReader.view.posts.Grid', {
		extend: 'Ext.grid.Panel',

		requires: [
			'Ext.sparkline.Pie',
			'Ext.grid.column.Widget'
		],

		xtype: 'postsgrid',

		title: 'Grid',

		scrollable: true,
	
		columns: [{
			text: 'Title',
			dataIndex: 'title',
			flex: 1,
			align: 'end',
			cellWrap: true
		}, {
			text: 'Author',
			dataIndex: 'authorName',
			flex: .5,
			align: 'end',
			cellWrap: true
		}, {
			text: 'Category',
			dataIndex: 'category',
			flex: .5,
			align: 'end',
			cellWrap: true
		}, {
			xtype: 'datecolumn',
			text: 'Published On',
			dataIndex: 'date',
			format: 'jS M,  Y',
			width: 150,
			align: 'end',
			cellWrap: true
		}, {
			xtype: 'widgetcolumn',
			dataIndex: 'tagCount',
			text: 'Tags',
			width: 120,
			widget: {
				xtype: 'sparklinepie',
				height: 30
			}
		}]
	});
   ```

  The `dataIndex` config maps to the fields in the `Post` Model.

  Apart from other configs, notice the use of `scrollable` and `cellWrap`.

2. **Use the Grid Class:** Open `app/view/posts/TabPanel.js` and add grid as a second item.

   ```javascript
   items: [{
    title: 'View',
    xtype: 'postsview',
    bind: {
      store: '{posts}',
      selection: '{post}'
    }
   }, {
    xtype: 'postsgrid',
    title: 'Grid'
   }, {
    title: 'Stats',
    xtype: 'postschart'
   }]
   ```

3. **Require Grid.js** - Add `app/view/posts/Grid.js` to the `requires` array of Tab Panel.

4. **Bind Grid to the Store:** The **View** component gets populated with the `posts` store. We want to use the same store for grid
   also, so configure it by using the `bind` config.

   ```javascript
   {
    xtype: 'postsgrid',
    title: 'Grid',
    bind: {
      store: '{posts}'
    }
   }
   ```
   
5. **Run the application:** Save your work and run the app in the browser with URL `http://localhost:1841/allaboutgrids/`. It should
   show the grid as a second tab in the tabpanel.
   
6. **Customize tooltips for the pie widget:** Notice the default tooltips rendered for the pie widget. We want to customize them so that
   rather than showing the total tag count, they show the categorical tag count. We can do this by adding a renderer function. For this,
   
   * Open `app/view/posts/Grid.js` and add `tipTpl: ''` to the widget config to make the default tooltip empty.
   
   * Configure a renderer function `renderer: 'rendererFunc'` on the `widgetcolumn`.
   
     ```javascript
     {
        xtype: 'widgetcolumn',
        dataIndex: 'tagCount',
        text: 'Tags',
        width: 120,
        renderer: 'rendererFunc',
        widget: {
            xtype: 'sparklinepie',
            height: 30,
            itemId: 'pie',
            tipTpl: ''
        }
     }
     ```
     
   * The view controller for tabpanel and its child classes is `MainController`. So, open `app/view/main/MainController.js` and add the
     definiton for `rendererFunc` function.
     
     ```javascript
		rendererFunc: function(val, metaData, rec, rowIndex, colIndex, store, view) {
			var tags = rec.get('tagTitleCount');
			var tips = "";

			for( var i = 0; i < tags.length; i++){
				var title = tags[i].title;
				var count = tags[i].count;
				tip = title + ":&nbsp" + count + ",&nbsp";
				tips = tips + tip;
			};

			var toolTip = tips.substr(0,((tips.length)-6));

			console.log(metaData);

			if(tags.length > 0) {
				metaData.tdAttr = 'data-qtip=' + toolTip; 
			} 
		}
     ```
     
   * Save your work and refresh the aplication. Check the widget tooltips.
     
## Selection Model
The selection model keeps track of the selected cells or rows and is specified via the `selModel` config. There are several types:

* **Ext.selection.RowModel:** This is the default selection model. 

  <p data-height="265" data-theme-id="0" data-slug-hash="qRzxWp" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids12" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/qRzxWp/">qRzxWp</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

* **Ext.selection.CellModel:** It allows selection of a single cell at a time. It implements cell based navigation via arrow keys.

  <p data-height="265" data-theme-id="0" data-slug-hash="QdXrYL" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids13" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/QdXrYL/">QdXrYL</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

* **Ext.selection.CheckboxModel:**  It renders a column of checkboxes that can be toggled to select or deselect rows.

  <p data-height="265" data-theme-id="0" data-slug-hash="KajROp" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids14" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/KajROp/">KajROp</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.selection.SpreadsheetModel:** It allows to select data in a spreadsheet-like manner. 

  <p data-height="265" data-theme-id="0" data-slug-hash="apgKNV" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids15" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/apgKNV/">apgKNV</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
#### Events
Amongst others, the selection models fire the `select` and `selectionchange` events. For convenience purpose, these events are also fired by the grid, so normally you would listen to the grid event rather than listen to the selection model directly.

* `select (selectionModel, record, index, eOpts):` It fires after a record is selected. 'record' holds the record selected just now.

* `selectionchange (selectionModel, records, eOpts):` It fires after a selection change has occurred. 'records' holds everything
  currently selected.
  
  In this code, both the events have been handled. Check console to see the selected records.

  <p data-height="265" data-theme-id="0" data-slug-hash="rjEKgv" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids16" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/rjEKgv/">rjEKgv</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
## Lab 2: Handle the Grid Selection
We want that when a record is selected from the grid, its details are shown in the east detail panel `(xtype: 'editdetail')`.

The detail panel displays details via template. So we must set its `data` property to the selected post so that the `tpl` property has the data.

Both the grid and detail panel are in the main view hierarchy and share the `MainModel`.

All store aware components have the `selection` property; so has the grid panel. So, if we bind the `selection` property of grid to some property, say `post`, in the `MainModel`,  the `post` property will get updated on grid selection change.

Since both the grid and detail panel share the same view model, the selected record (i.e. `post`) will be available to the detail panel. We can now bind it to its `data` property.

* The default selection model is `rowmodel`. But as we want to pass some more configs, we will declare a config object for this. Open
  `app/view/posts/Grid.js` and add the following code after `title`.

  ```javascript
        selModel: {
          selType: 'rowmodel',
          allowDeselect: true,
          toggleOnClick: true //Default is true. Applicable only with allowDeselect: true
        },
   ```
	
* Open `app/view/main/MainModel.js` and notice that `post` is already configured there as a property. This is because we have already
  done the `selection` binding on dataview.

* Open `app/view/posts/TabPanel.js` and bind the `selection` property of grid to the `post` property of `MainModel`. 

  ```javascript
	{
	  title: 'Grid',
	  xtype: 'postsgrid',
	  bind: {
	    store: '{sortablePosts}',
	    selection: '{post}'
	  }
	}
  ```

* Open `app/view/main/Main.js` and notice that the `data` property of detail panel is already bound to `post`. This is because we are
  already showing details on dataview selection.

  ```javascript
	{
	  region: 'east',
	  xtype: 'editdetail',
	  width: 380,
	  title: 'Details',
	  bind: {
	    data: {
		bindTo: '{post}',
		deep: true
	    },
	    collapsed: '{!post}'
	  }
	}
  ```

* Save your work and refresh the app. Select a record from grid view. You shall see its details displayed in the detail panel. You can
  also deselect the selected row.

## Features
The `features` config is like a plugin, designed specifically for grids. Some of the features are:

* **Ext.grid.feature.Summary:** This feature places a summary row at the bottom of the grid. To show the summary, we have to specify
  the `summaryType` which can be: 

	* any pre-defined value from `count`, `sum`, `min`, `max`, `average`

	* or a function that returns a summary value

	* the `summaryRenderer` function to format the summary value. It is optional.

  <p data-height="265" data-theme-id="0" data-slug-hash="KajLOq" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids17" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/KajLOq/">KajLOq</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.feature.Grouping:** This feature groups data by the specified `groupField` on the store. By default, the group title
  shows the group field and its value, but it can be modified  via the `groupHeaderTpl` property.

  <p data-height="265" data-theme-id="0" data-slug-hash="PWrvbv" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids18" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/PWrvbv/">PWrvbv</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.feature.GroupingSummary:** This feature provides grouping with a summary row for each group.

  <p data-height="265" data-theme-id="0" data-slug-hash="PWrrpG" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids19" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/PWrrpG/">PWrrpG</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
## Lab 3: Group the Grid Data by Author Name
We want to group the grid data by author name. But the problem is that, as both the dataview and grid share the same store, the dataview will also show the grouped data which we don't want. Therefore, we will have to declare a different store for grid. We will declare a chained store.

* Open `app/view/main/MainModel.js` and declare a new store in the `stores` config object.

  ```javascript
	sortablePosts: {
	  source: '{posts}',
	  groupField: 'authorName'
	}
   ```
   
   The source store for this chained store is `posts`.
   
   Notice the `groupfield` property. We are grouping by `authorName` Model field.
   
* Open `app/view/posts/Grid.js` and add the `features` array after `title`.

  ```javascript
	features: [{
	  ftype: 'grouping',
	  groupHeaderTpl: [
	    '<span style = "background-color:#b0c4de;">',
	    '{columnName}: {name}',
	    '({children.length}',
	    ' Item{[values.children.length > 1 ? "s" : ""]})',
	    '</span>'
	  ],
	  startCollapsed: true, //false by default
	  hideGroupedHeader: true, //false by default
	}],
  ```
  
* Save your work and refresh the application. Select the **Grid** tab and expand any group. You should see the following screen.
  
  ![Grouping Grid](https://github.com/walkingtree/sample-projects/blob/master/Images/Allaboutforms/grouping.png)
  
* The `hideGroupedHeader:true` property allows to hide the grouped field column from the header menu.

* By default, the grouping direction is `ASC`. You can change it by setting the `groupDir: 'DESC'` property on store.

* If you have a need to show grouping, however, you don’t want to allow collapsing (i.e. standard grid with groups), then you will have
  to set `startCollapsed: false` and include `collapsible: false` inside your grouping feature.

* You can also change the text of grouping features in column header menu.

[For more Features refer API docs](http://docs.sencha.com/extjs/6.2.0/classic/Ext.enums.Feature.html). 

## Plugins
The `plugins` config introduced at the `Ext.Component` class provides custom functionality for a component. Amongst others, Ext JS comes with a few plugins designed for grids:

* **Ext.grid.plugin.CellEditing:** This plugin allows editing a grid cell one at a time. The `editor` config must be specified on a
  column that needs to be edited. The editor can be any form field component.

  <p data-height="265" data-theme-id="0" data-slug-hash="GrVmzV" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids20" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/GrVmzV/">GrVmzV</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.plugin.RowEditing:** It allows editing a record, one row at a time. Only columns with `editor` config are editable.

  <p data-height="265" data-theme-id="0" data-slug-hash="WRVOXE" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids21" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/WRVOXE/">WRVOXE</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

* **Ext.grid.plugin.Clipboard:** This plugin is used with the `spreadsheet` selection model.

  <p data-height="265" data-theme-id="0" data-slug-hash="ggVxMG" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids22" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/ggVxMG/">ggVxMG</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

* **Ext.grid.plugin.RowExpander:** This plugin adds a column to a grid for showing additional record information that doesn't fit well
  within a grid row. This column can be expanded and contracted.
 
  <p data-height="265" data-theme-id="0" data-slug-hash="mRNqme" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids23" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/mRNqme/">mRNqme</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
* **Ext.grid.plugin.RowWidget:** This plugin adds the ability to second row body in a grid which expands/contracts. The expansion row
  may contain a widget which has access to the record of the corresponding grid row. Its `defaultBindProperty` is set to record.
  
  This example uses this plugin to add a nested grid, showing the associated records, to each record in the main grid.
  
  <p data-height="265" data-theme-id="0" data-slug-hash="LWoOqr" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids24rowwidget" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/LWoOqr/">LWoOqr</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

* **Ext.grid.plugin.DragDrop:** This plugin provides drag and drop functionality for a GridView.

  <p data-height="265" data-theme-id="0" data-slug-hash="ggVwJB" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids20" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/ggVwJB/">ggVwJB</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>
  
## Lab 4: Add Additional Information to Each Record
We have the requirement to show the link to each article on Walkingtree blog, so that the user can read the whole article. We want this information to be available to the user on choice. We will use the `rowexpander` plugin for this.

* Open `app/view/posts/Grid.js` and add the following code after `features` config object.

  ```javascript
     plugins: [{
       ptype: 'rowexpander',
       //url is the Model field.
       rowBodyTpl: [
	 '<p style="font-size:18px;color:red;"><b>View this post on Walkingtree blog</b></p>',
	 '<a href="{url}" target="blank"><span style="font-size:15px;">{url}</span></a>'
       ],
       expandOnDblClick: false, //default is true
       //selectRowOnExpand: true, //Default is false
       //bodyBefore: true, //default is false
       //scrollIntoViewOnExpand: false //Default is true
     }]
  ```
  
* Save and refresh the appliation. Click on [+]/[-] icons to toggle row expansion.

* You can uncomment the other configs to see the difference.

## Lab 5: Edit the Grid Data 
We want to allow the user to edit the **Category** and **Pubish On** columns in the grid. We will use the `cellediting` plugin for this.

* Open `app/view/posts/Grid.js` and add the `cellediting` plugin to the `plugins` array.

  ```javascript
	plugins: [{
			ptype: 'rowexpander',
			rowBodyTpl: [
				'<p style="font-size:12px;color:black;"><b>View this post on Walkingtree blog</b></p>',
				'<a href="{url}" target="blank"><span style="font-size:12px;">{url}</span></a>'
			],
			expandOnDblClick: false, //default is true
			//selectRowOnExpand: true, //Default is false
			//bodyBefore: true, //default is false
			//scrollIntoViewOnExpand: false //Default is true
		}, {
			ptype: 'cellediting',
			clicksToEdit:  2 //This is default.
	}]
  ```
  
* Add `xtype: 'textfield'` as an editor to the **Category** column:

  ```javascript
      editor: {
            xtype: 'textfield'
      }
  ```

* Add `xtype: 'datefield'` as an editor to the **Publish On** column:

  ```javascript
	editor: {
		xtype: 'datefield',
		format: 'jS M,  Y'
	}
  ```

* Save your work and refresh the application. Try editing any of the two columns by double clicking. You will notice that the editor
  disappears quickly, not allowing you to edit. This is because in `selmodel`, you have set both `toggleOnClick` and `allowDeselect`
  to true. So the moment you double click, the second click deselects the row. 
  
  Comment out both the configs in `selmodel`. Save your work, refresh the app and try again. It should work.
  
* Notice the red mark in the edited cells. These mark the edited fields as dirty. You will have to sync the store with the backend to
  update the grid data.
  
* Notice that changes made to the grid data are reflected in the dataview as well as in the detail panel. You know the reason :-)

We used a plugin to add editors to the grid cells. What if we don't want to do editing in the grid itself! Rather, we want to show an edit form. Let's do it for editing the `title` and `excerpt` fields.

* Open `app/view/edit/Window.js` and notice that this class extends `Ext.window.Window`. Its child item is a form with two
  textarea fields. 
  
  The `value` property of these two form fields is bound to `post.title` and `post.excerpt`, where `post` is a property of the
  `MainModel`, bound to the selected record in the grid. 
  
  To make the `post` property available to the form, we will have to add its parent class, window, to the main view class hierarchy.
  
* Open `app/view/edit/Detail.js` and notice the configuration for the **Edit** button. It has a handler `onEditClick` for its `click`
  event.  
  
* Open `app/view/edit/DetailController.js` and notice the definition for `onEditClick` handler. It adds an instance of window to the
  detail panel. And as detail panel is in the main view hierarchy, through prototype chain, its view model i.e. `MainModel` will be
  accessible to the form also. 

* Also notice the handlers for the form **Save** and **Cancel** buttons.

* We don't have to write any extra code for editing these fields. Just refresh the application and select a grid row. This will update
  the `post` property of `MainModel`.

* Click on the **Edit** button. This will create an instance of the window, with form, and add it as a child to the detail panel. Now
  the `MainModel` will be available to the form and it will be loaded with the updated `post`. 

* Edit the fields and click on the **Save** button. You should see the changes in dataview, grid view and detail panel.

* Try the **Cancel** button. It should reject the changes.

## Grouped Header Grid
You can nest the columns. This example nests the **Salary** and **Bonus** columns, inside the **Remuneration** column, to provide grouped headers. 

<p data-height="265" data-theme-id="0" data-slug-hash="GWVMNo" data-default-tab="js,result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids13GroupedHeader" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/GWVMNo/">GWVMNo</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## Locking / Unlocking a grid column
A locking grid is processed in a special way. Two grids are created to be the locked (left) side grid and the normal (right) side grid, both arranged in an hbox layout, inside the grid panel, which now becomes a simple `Ext.container.Container`.

In this example, the **Name** column is locked and cannot be unlocked. You can select Lock/Unlock items from the header menu of other columns to bring them to the locked side of the grid.

<p data-height="265" data-theme-id="0" data-slug-hash="RpzVBp" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Gridslocked" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/RpzVBp/">RpzVBp</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

**Example: Lockable Grid with a plugin**

<p data-height="265" data-theme-id="0" data-slug-hash="qreOXR" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids13Locked WithPlugin" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/qreOXR/">qreOXR</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## Adding a Context Menu
This example shows a custom context menu when any grid item is right-clicked. You can have a context menu at:

* cell level - `cellcontextmenu` event

* row level - `rowcontextmenu` event

* etc.

<p data-height="265" data-theme-id="0" data-slug-hash="GWVXow" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids13ContextMenu" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/GWVXow/">GWVXow</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## Sorting and Filtering
#### Sorting
Grid columns are sortable via default `sortableColumns: true` property of the grid panel. You can configure it to false to disable column sorting via clicking the header or the sorting menu items. 

Or you can also disable a specific column sorting by setting `sortable: false` property on that column.

Sorting can be:

* local

* remote

For either type of sorting, we can specify:

* `sorters[]` either in the store configuration:
  
  ```javascript
      \\ In the view model
      stores: {
        users: {
          model: 'Ext.data.Model',
          autoLoad: true,
          sorters: [{
           property: 'age',
           direction: 'DESC'
          }, {
           property: 'firstName',
           direction: 'ASC'
          }]
      }
  ```  

*  Or call `sort()` function after the store has been instantiated:

   ```javascript
       store.sort('age'); // Sorting on single column. Toggles from ACS/DESC on subsequent calls.
   ```
   
   ```javascript
       store.sort('age', 'ASC');
   ```
   
   ```javascript
       store.sort({
        property: 'age', 
        direction: 'DESC'
      });
   ```
   
   ```javascript
       //Sorting on multiple columns
       store.sort([{
        property: 'firstName', 
        direction: 'ASC'
      }, {
        property: 'age', 
        direction: 'DESC'
      }]);
   ```

**Example: Using sorters[].** This grid is sorted by 'name' and 'age' fields as primary and secondary fields respectively.

<p data-height="265" data-theme-id="0" data-slug-hash="apELmz" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="DataPackageStores11" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/apELmz/">apELmz</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

**Example: Remote Sorting.** This grid is sorted by 'lastpost' field. If you sort any field dynamically, check network traffic to see the sorting parameters being sent to the server. 
<p data-height="265" data-theme-id="0" data-slug-hash="YZmvNz" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="DataPackageStores12RemoteSorting" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/YZmvNz/">YZmvNz</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

#### Filtering
Filtering can be:

* local - This is default.

* remote - For remote filtering, set the `remoteFilter:true` property on the store.

In this example, the grid records are locally filtered based on the filters set on the store.

<p data-height="265" data-theme-id="0" data-slug-hash="GrxRoQ" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="DataPackageStores14" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/GrxRoQ/">GrxRoQ</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

**Example: Filter Binding.** This example dynamically filters the records based on the filter value (i.e. sportsKit field) entered by the user.

<p data-height="265" data-theme-id="0" data-slug-hash="MJVaQw" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="DataPackageStores16" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/MJVaQw/">MJVaQw</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## Lab 6: Sort and Filter the Records
In this section, we will write code to sort the grid columns.

* Our users want to sort the grid columns but want the data view to remain in alphabetical order, regardless of how the grid columns are
  sorted. To do this, we need a chained store for the grid.

  As our grid is already bound to a chained store, we don't have to write any extra code for this. Refresh the application and sort any
  grid column. Notice the dataview unaffected.

In this section, we will filter the `Posts` store so that both the dataview and grid show posts belonging to a specific category.

* The combobox in the top filter panel shows different categories but does not allow selection. Currently, both the dataview and
  grid show all the posts. (These two views use the `Post` Model and the `Posts` Store. Refer the `Post` Model, which crrently loads
  all the records from `Posts.json`.)

* Let's handle the combobox selection first. Open `app/view/PostFilter.js` and uncomment the binding on `selection` property. 

  ```javascript
	bind: {
		store: '{feeds}',
		selection: '{feed}'
	}
  ```
  
  The `selection` property binds to the `feed` property of MainModel. This means that the `feed` property will always have reference to
  the latest category selected from the combo box.
  
* Open `app/view/main/MainModel.js` and uncomment the `filters` array.

  ```javascript
      filters: [{
	    category: '{feed.id}',
	    id: 'cat',
	    filterFn: function(rec) {
		if (this.category === 100) {
		    return true; // Treat 100 for all records
		}
		var c = rec.data.categories[0].id;
		if (c === this.category) {
		    return true;
		}
	    }
      }]
  ```
  
  In the statement `category: '{feed.id}'`, the local variable `category` gets the value of `feed.id`, which is the updated category id
  based on combo box selection. The `filterFn()` uses this variable to filter the records.
  
* Save and refresh the application. Select a category from combo box and see the filtered posts in both the views.

* Select a post from either of the two views and see its details in the detail panel. 

* But there is a problem. When you select a new category from the combo box, the detail panel does not collapse and shows the previously
  selected post. We need to correct this.
  
  We know that the detail panel's collapsed property is bound to the `post` property of MainModel.
  
  ```javascript
      {
        region: 'east',
        xtype: 'editdetail',
        width: 380,
        title: 'Details',
        bind: {
            data: {
                bindTo: '{post}',
                deep: true
            },
            collapsed: '{!post}'
        }
      }
  ```
    
  So if we set the `post` property to null on combo box selection, the problem will be solved.
  
  For this, open `app/view/main/MainController.js` and uncomment the statement that calls the `bind()` method on `feed` property.
  (Recall that the combo box selection is bound to the `feed` property.)
  
  ```javascript
	initViewModel: function(vm) {
		var me = this;
		vm.bind('{post}', this.setText, this);
		vm.bind('{feed}', this.clearPost, this);
	}
  ```

  Also uncomment the `clearPost()` method that sets the `post` property to null.
  
  ```javascript
	clearPost: function() {
		this.getViewModel().set('post', null);
	}
  ```
  
* Save your work and refresh the application. Select a category and then a post from either of the two views. See the details in the
  detail panel. Select a new category. The detail panel should be in a collapsed state.

## Pagination
Rendering large datasets in a grid can cause:

* more data transmission time

* more processing and memory for the store

* more processing and memory for the grid

The solution is to load and show one page of data at a time.

When we make a back-end request, three parameters - **page=1**, **start=0** and **limit=25** - are sent, which are, by default, ignored by the server. But while paging, the back-end reads these parameters and returns the required data.

Re-run the example and check the network traffic to see these parameters being sent to the server.

<p data-height="265" data-theme-id="0" data-slug-hash="xqKZLG" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids25" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/xqKZLG/">xqKZLG</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

**With grids, Ext JS offers two options for paging:**

* Use a Paging Toolbar

* Use `buffered` Store and `bufferedRenderer` plugin

**These automatically update the store's `page` and `start` parameters but,**

* we need to specify the page size for the store via the `pageSize` config

* we need to program the server to look for the `page`, `start` and `limit` parameters and respond accordingly

**The server must also return a structured response having the following properties:**

* `total`: the total number of records for all pages.  

* `data`: the records corresponding to the `page`, `start` and `limit` parameters

* Example: 

  ```JSON
      {
          "success" : true,
          "total" :  10000,
          "data" : [ {}, {} ]
      }
  ```

**Example: Using a `pagingtoolbar`.** Click on forward/backward buttons and check the network traffic to see the updated parameters being sent to the server.

<p data-height="265" data-theme-id="0" data-slug-hash="aJoyJo" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids26" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/aJoyJo/">aJoyJo</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

**Example: Using a `buffered` Store and `bufferedrenderer` Plugin**

A buffered store has `remoteSort: true` by default.

<p data-height="265" data-theme-id="0" data-slug-hash="RpwwBb" data-default-tab="result" data-user="walkingtree" data-embed-version="2" data-pen-title="Grids27" class="codepen">See the Pen <a href="http://codepen.io/walkingtree/pen/RpwwBb/">RpwwBb</a> by Walking Tree (<a href="http://codepen.io/walkingtree">@walkingtree</a>) on <a href="http://codepen.io">CodePen</a>.</p>

## Lab 7: Sync Grid with Chart
The user wants that when any post is selected either from the dataview or grid, its monthly hit count should be graphically represented as a bar chart.

The bar chart is defined in `app/view/posts/Chart.js` and added as a **Stats** tab to the tab panel.

This chart gets its data from the `hitCounts` store declared in MainModel, and this store has model of type `HitCount`.

```javascript
	hitCounts: {
		model: 'ArticleReader.model.HitCount',
		autoLoad: {
		url: "http://touchdemo.walkingtree.in/Training/?json=get_article_monthwisehits&id={post.id}"
		}
	}
```

Recall that the MainModel's `post` property holds reference to the selected record. The URL, in the above code, is suffixed with `post.id`, which helps to dynamically fetch data for the selected post.

We don't have to write any extra code for this. Save your work and refresh the application. 

Select a post from grid. Click on the **Stats** tab. See the monthly hit count for the selected post. 

Select a new category from the combo box. Watch the bar chart disappearing. Its because its `hidden` property is bound to `post` :-)

```javascript
	bind: {
		store: '{hitCounts}',
		hidden: '{!post}'
	}
```

## Recap
* An Ext JS data grid shows data in a tabular format, which can be easily sorted, filtered, grouped and edited. 

* The grid class is `Ext.grid.Panel` and xtype is `grid`.

* Grids are panels so they have all the functionality of an Ext JS panel, plus they also have a `store` and a `columns` array.

* Grid columns are by default sortable, resizable, draggable and hideable.

* Grids columns can render all types of data. The different column types are:

	* `gridcolumn` - it is the default renderer to render data as a string
	
	* `numbercolumn` - for rendering formatted numeric data

	* `datecolumn` - for rendering dates
	
	* `booleancolumn` - for formatted boolean values
	
	* `templatecolumn` - for formatted data via XTemplate
	
	* `actioncolumn` - for rendering clickable icons
	
	* `rownumberer` - for generating the row numbers
	
	* `checkcolumn` - for rendering a checkbox in each column
	
	* `widgetcolumn` - for rendering widgets/components in a grid column
	
* Grid columns also have a `renderer` function for rendering customized data.

* Grids have a selection model to keep track of the selected cells and rows. It is specified via the `selModel` config. Its types are:

	* `rowmodel` - selects an entire row
	
	* `cellmodel` - selects a cell
	
	* `checkboxmodel` -  allows selection via checkboxes
	
	* `spreadsheetmodel` -  allows spreadsheet type of selection
	
* The selection models fire the `select` and `selectionchange` events. These events are fired by the grid also.

* There are some specially designed features for Ext JS grids, specified via the `features` config. Some of the features are:

	* `summary` - to place a summary row at the bottom of the grid
	
	* `grouping` -  to group data by the specified `groupField` on the store.
	
	* `groupingsummary` -  to provide grouping with a summary row for each group.

* Ext JS comes with a few plugins designed for grids, which are specified via the `plugins` config. Some of the plugins are:

	* `cellediting` - to edit a grid cell
	
	* `rowediting` -  to edit a grid row
	
	* `clipboard` - for copying the selected text to the system clipboard. To be used with the spreadsheet selection model
	
	* `rowexpander` - to add a column, which expands/contracts, for show additional information that doesn't fit well within a grid row
	
	* `rowwidget` - to add a second row body in a grid which expands/contracts.
	
	* `gridviewdragdrop` - to provide drag and drop functionality for a grid view
	
* Grid columns can be nested to provide grouped headers. 

* Grid columns can be locked which creates two grids - the locked (left) side grid and the normal (right) side grid, both arranged in an hbox layout.

* Grids fire the `itemcontextmenu` event, which can be handled to show a custom context menu.

* Grid columns are sortable by default, which can be done by clicking the column header or the sorting menu items. 

* `sorters` can be configured either on the grid store or can be passed to the `sort()` method.

* Sorting can be local or remote. For remote sorting, the `remoteSort: true` property is set on the store. This sends sorting parameters to the backend.

* Grid data can be filtered by setting `filters` on its store or by calling the `filter()` method.  

* Filtering can be local or remote. For remote filtering, the `remoteFilter: true` property is configured on the store.

* Loading of large datasets in a grid store can be optimized by either:
	
	* using a paging toolbar
	
	* or using a buffered store 
	
* Rendering of large datasets in a grid can be optimized by using the `bufferedrenderer` plugin.

