# Mastering all your Form needs

## Overview
This CodeLab is all about forms. It will walk you through the fundamentals of Sencha Ext JS forms, the available form field components and various ways of structuring them inside a form. It will also look into loading, saving and validating the form data. 

### What you'll learn?
1. Introduction to forms in Ext JS.
2. What are the different form fields available? 
3. How do we set the field defaults?
4. How do we use the HTML 5 input types?
5. How do we validate form and report to the user?
6. What are the different specialized containers available for form fields?
7. What are the commonly used layouts for form fields?
8. How do we submit the form data?
10. How do we use a model with form?

2. #### What you'll need?
	* [Sencha Cmd 6.5x](https://www.sencha.com/products/sencha-cmd/download) 
	* Sencha Ext JS 6.5x SDK
	* [Google Chrome Browser](https://www.google.com/intl/en/chrome/)
	* Text Editor or IDE


## Environment Setup
1. #### Install Sencha Cmd
	* Install Sencha Cmd by downloading from https://www.sencha.com/products/extjs/cmd-download/. Choose the option that includes Java JRE.
	* After it has been installed, run this command from terminal window. It should show version 6.5x.

		```
		sencha which
		```
  
2. #### Extract Sencha Ext JS SDK
	* Create a folder **SenchaTraining** at your system root folder to hold your work.

		```
		Windows: C:\SenchaTraining
		```

		```
		Mac/UNIX: ~/SenchaTraining
		```

	* Get Ext JS from [Sencha Support portal](https://support.sencha.com/#login). Log in and choose the Ext JS 6.5x Download. Extract it in the **SenchaTraining** folder and rename it **ext-6**. It should be as follows:

		 ```
		 SenchaTraining
			ext-6
		 ```
		 	
3. #### Install Google Chrome
	* If you don't have Chrome then download and install it from https://www.google.com/intl/en/chrome/.
	   
4. #### Obtain Text Editor or IDE
	* You can choose text editor or IDE of your choice.

5. #### Start the Server
	* Open terminal window, navigate to SenchaTraining folder and type the following command:

		```
		sencha web start
		```

	* Server will start at port 1841 and screen will look like this:

  	  ![Jetty Server started](https://github.com/walkingtree/images/blob/master/sencha/codelabimages/ServerStarted.png)

	* Leave the terminal window open and running.
     
6. #### Verify Ext JS install

	* Test Ext JS install by running URL **localhost:1841** in the browser.
	* You should see the following page: 

  	  ![alt text](https://github.com/walkingtree/images/blob/master/sencha/codelabimages/ExtExtracted.png)

	* Now click on **ext-6**. It should show you the Ext JS examples page.

 	  ![alt text](https://github.com/walkingtree/images/blob/master/sencha/codelabimages/WelcometoExtxtJS.png)

**NOTE:** If it does not work then review the install instructions and ensure that the server is running.


## Get the Starter Project
In this section, you'll download and extract the starter project for your application.

1. #### Download the starter code
	* Download [allaboutforms](https://github.com/walkingtree/codelabs/blob/master/sencha/downloads/allaboutforms.zip?raw=true). Unzip it in **c:/SenchaTraining** folder.	
	* The extracted folder **allaboutforms** has the following folder structure. It contains starter code for **MyApp** application. 
   
		```javascript
		c:/
		   SenchaTraining
			ext-6
			allaboutforms
				app
				overrides
				resources
				sass
		``` 	

2. #### Generate the application
	* Open command line window and navigate to **c:/SenchaTraining/ext-6** folder.
	* Generate the classic **MyApp** application by copying and pasting the following command:

		```
		sencha generate app --classic -starter=false MyApp c:/allaboutforms
		```
  
	* The **-starter=false** parameter is given to not generate the starter code as you already provided one.
	* You have to initialize the microloader and create the CSS when an application is created for the first time. To do this, navigate to _c:/allaboutforms_ folder in the terminal window and run the command:

		```
		sencha app build development
		```

3. #### Run the application
	Run application in the browser with URL **localhost:1841/allaboutforms**. You should see the following screen:

	![Initial Form Screen](https://github.com/walkingtree/codelabs/blob/master/sencha/images/InitialFormScreen.png)
   
   
## Understand the Generated Files and Folders
* **app/view/forms/Profile.js** - Contains code for Profile Form to demonstrate form panel basics.

* **app/view/forms/Application.js** - Employment Application Form to be developed in the lab to demonstrate some field components.

* **app/view/forms/BugTracker.js** - Bug Tracker Form to be developed in the lab to demonstrate some more field components.

* **app/view/forms/RegistrationForm.js** - Registration Form to be developed in the lab to demonstrate use of HTML input types.

* **app/view/forms/ContactForm.js** - Contact Form to be developed in the lab to demonstrate form field validations and error         messages.

* **app/view/forms/CheckoutForm.js** - Checkout Form to be developed in the lab to demonstrate form layouts. 

* **app/view/main/List.js** - Grids to be used in the Grid Editing Form.

* **app/view/forms/FormLoadRecord.js** - Window with form to demonstrate loading and submitting of form data. 

* **app/view/forms/FormModelBinding.js** - Window to demonstrate using a model with form.

* **app/model/**- Folder containing model definitions used by different stores in the application.

* **resources** - Folder containing JSON files consumed by different stores.

* **app/view/main/MainModel.js** - Main Model to hold bindable data and stores for the main view and its child components.

* **app/view/main/MainController.js** - Main Controller to hold application logic.

* **app/view/main/Main.js** - Main View (Viewport) of the application which is a Tab Panel with different forms as tabs.

## Introduction to Forms
Form Panels are simple panels with additional form handling abilities. They are used when there is a need to collect data from the user. 

![Form UML](https://github.com/walkingtree/codelabs/blob/master/sencha/images/FormUML1.png)

Internally, form panels work in coordination with an associated object — **Ext.form.Basic** — that handles all of its input field management, validation, submission, and form loading services.

![Flow of control](https://github.com/walkingtree/codelabs/blob/master/sencha/images/FormUML2.png)

Have a look at the **Profile Form** in your application. 

* The UI is **Ext.form.Panel** instance. 
* Various form field components are added as **items**.
* Items are rendered in the form panel with default **anchor** layout.
* Each form field has a **fieldLabel** property which gives it a label.
* The **emptyText** property shows the default text in an empty field.
* Each form field component also has a **name** and a **value** property. These form the key and value pairs while sending field data
  over the server.
* Two buttons have been added using the **buttons** property.
* The "Send" button calls the form **submit()** method. The **Ext.form.Basic** object gathers data and sends it as a string of
  key-value pairs. (As there is no server side code for this fake URL, it gives 404 error and calls the failure() method.)
* The "Show Field Data" button handler shows all the fields as name-value pairs.

## Form Fields
* The name-value pair is provided by the **Ext.form.field.Field** mixin.
* The labeling properties are in the **Ext.form.field.Labelable** mixin.

  ![Form Fields Hierarchy](https://github.com/walkingtree/codelabs/blob/master/sencha/images/FormFieldHierarchy.png)

  #### Lab 1
  Currently the **Employee Application Form** tab shows some text only. In this lab, you'll add some fields to it as shown below:

  ![Application Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/ApplicationForm.png)

   1. ##### Add fields
	* Open **allaboutforms/app/view/forms/Application.js** file in editor and copy-paste the given code inside the class definition. It's a combo box for selecting position.
   
		```javascript
		items: [{
			xtype: 'combo', //Ext.form.field.Combo
			fieldLabel: 'Which position are you applying for?',
			labelAlign: 'top', //default is left
			labelStyle: 'font-weight: bold;',
			bind: {
			    store: '{positions}'
			},
			name: 'position',
			displayField: 'type',
			valueField: 'id',
			queryMode: 'local', // loads local data. Default is remote
			editable: false, //default is true
			typeAhead: false, //default is false
			forceSelection: true //default is false
		}]
		```

		* The **fieldLabel** property provides label for the field.
		* The **labelAlign** property aligns the label with respect to field component. Acceptable values are _left_, _top_ and _right_. 
		* The **labelStyle** is a css style string to style the fieldlabel.
		* As combo box is a store bound component, its store **positions** is pre-declared in _MyApp.view.main.MainModel_ view model. Its model is _MyApp.model.Position_ and the JSON data consumed by this store is in _resources/data/Position_ file.
		* The **queryMode** is the mode in which combo box uses the configured store. When **remote**, the ComboBox loads its store dynamically based upon user interaction. A parameter containing the typed string is sent in the load request. 

   2. ##### Add more fields
	*  Add more fields to the form by adding the following code inside the _items_ array.

		```javascript
		{
			xtype: 'tbtext', //Ext.toolbar.TextItem
			text: 'Are you willing to relaocate?',
			style: 'font-weight: bold'
		}, {
			xtype: 'radiofield', //Ext.form.field.Radio
			name: 'relocate',
			boxLabel: 'Yes',
			inputValue: 'Y',
			checked: true
		}, {
			xtype: 'radiofield',
			name: 'relocate',
			boxLabel: 'No',
			inputValue: 'N'
		}, {
			xtype: 'datefield',
			fieldLabel: 'When can you start?',
			labelAlign: 'top',
			labelStyle: 'font-weight: bold;',
			name: 'doj',
			// The value does not match the format, but does match an altFormat; will be parsed
			// using the altFormat and displayed using the format.
			format: 'm/d/Y',
			altFormats: 'm,d,Y|m.d.Y',
			value: '01.01.2016',
			maxValue: '01,28,2016', //must match format or altFormat
			disabledDays: [0, 6], //disable Sunday and Saturday
			disabledDates: ['01/12/2016'] //must match format
		}, {
			xtype: 'textfield', //Ext.form.field.Text
			name: 'salary',
			fieldLabel: 'Salary Requirements',
			labelAlign: 'top',
			labelStyle: 'font-weight: bold;',
			emptyText: '$',
		}
		```
   
		* The radio button value is sent as **on**. Use **inputValue** to change the submitted value.
		* Use **boxLabel** to specify label for the radio field.
		* Limit dates in a date field via **minValue**, **maxValue**, **disabledDates:[]** and **disableDays:[]**. Refer docs for variations.
		* Use **emptyText** to specify the placeholder value. Use **submitEmptyText:false** on the form submit method to prevent empty text values from being submitted.

   3. ##### Use the form
	* Open **allaboutforms/app/view/main/Main.js** file and replace the second child's **html:'application'** property with **xtype:'application'**.
	* Save your work and refresh the application. Click on the **Employment Application Form** tab in the tab panel. You should see the form with field components. 

   4. ##### Add some more fields
      Continue adding more items by copying and pasting the following code:

		```javascript
		{
			xtype: 'htmleditor', //Ext.form.field.HtmlEditor
			fieldLabel: 'Other Details',
			labelAlign: 'top',
			labelStyle: 'font-weight: bold;',
			name: 'details',
			anchor: '60% 40%',
			// All these properties default to true
			enableAlignments: true,
			enableColors: true,
			enableFont: true,
			enableFontSize: true,
			enableFormat: true,
			enableLinks: true,
			enableSourceEdit: true
		}, {
			xtype: 'tbtext',
			text: 'Your Contact Information',
			style: 'font-weight: bold'
		}, {
			xtype: 'textfield',
			fieldLabel: 'First Name',
			name: 'first'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Last Name',
			name: 'last'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Email Address',
			name: 'email',
			emptyText: 'me@somewhere.com'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Phone Number',
			name: 'phone',
			emptyText: 'xxx xxx xxxx'
		}, {
			xtype: 'textareafield', //Ext.form.field.TextArea
			fieldLabel:  'Additional Comments',
			labelAlign: 'top',
			labelStyle: 'font-weight: bold;',
			name: 'comments',
			width: 400,
			height: 100,
			grow: true,
			growMax: 100
		},{
			xtype: 'hidden',
			name: 'id',
			value: 'app1'
		}
		```

	* The default layout for form panel is _anchor_. The **anchor** property on fields specifies how their width and height
	should be anchored with respect to the container. 
	* The _textareafield_ grows in height to fit its content. Use **growMin** and **growMax** to set the minimum and maximum grow heights.
	* The _hidden_ field is for storing hidden values in form that need to be submitted.

   5. ##### Add Submit and Reset Buttons
      Handle form submission and form reset by pasting the following code after the _items_ array.

		```javascript
		buttons: [{
			text: 'Submit',
			handler: function(button) {
				button.up('form').submit({
					url: 'fake.php',
					success: function(form, action) {
						Ext.Msg.alert('Form Saved');
					},
					failure: function(form, action) {
						Ext.Msg.alert('Save Failed');
					}
				});
			}
		}, {
			text: 'Reset',
			handler: function(button) {
				button.up('form').reset();
			}
		}]   
		```
   
	* The **submit()** method takes **Ext.form.action.Submit** config. Typically, you specify the _url_, _success_ and _failure_
	callbacks. We will talk about it later.
	* The **reset()** method resets the form.

   6. ##### Test the form 
      Save your work and refresh the app. Enter data and click on the **Submit** button. Open Developers Tools and look at the Network   tab. Notice how form data is sent over the server. (It gives 404 error as there is no server side code for this fake url.)

  #### Lab 2
  In this lab, you'll work on the **Bug Tracker Form** which looks like the one shown below.  

  ![Bug Tracker Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/BugTrackerForm.png)

   1. ##### Add default properties
      You can configure some common properties for the fields so that you don't have to configure them on each field individually. To add this, open **allaboutforms/app/view/forms/BugTracker** file and add the following code:

		```javascript
		fieldDefaults: {
			labelSeparator: ': -', //default is :
			labelStyle: 'font-weight: bold;',
			labelWidth: 120 //default is 100
		}
		```	
   
	* The **fieldDefaults** config specifies the **Ext.form.Labelable** properties commonly to the child fields.
	* You can use the **defaults** config to apply default settings to all the child fields.
	* You can also use the **defaultType** config to specify the default **xtype** for all the child firlds.
	
   2. ##### Add fields 
      Add the first two fields - a combo box and an htmleditor - by pasting the following code. The combobox uses an inline store for  demonstration but you can declare it in the view model.

		```javascript
		items: [{
			xtype: 'combo',
			fieldLabel: 'Tracker',
			emptyText: 'Select',
			name: 'tracker',
			store: ['Bug', 'Feature', 'Development', 'TestCase']
		}, {
			xtype: 'htmleditor',
			fieldLabel: 'Description',
			name: 'desc',
			height: 150 //will occupy the complete width
		}]

		```
 
   3. ##### Add more fields 
      The next 6 fields have to be shown in two columns, so you can put them inside a container with column layout. To get this, add the following code inside the _items_ array.

		```javascript
			{
			xtype: 'container',
			layout: 'column',
			defaults: {
				columnWidth: 0.4, //check with 0.33
				padding: '5 30 10 0'
			},
			items: [{
					xtype: 'combo',
					fieldLabel: 'Status',
					emptyText: 'Select',
					name: 'status',
					store: ['New', 'In Progress', 'Completed', 'On Hold']
				}, {
					xtype: 'datefield',
					fieldLabel: 'Start Date',
					name: 'startdate',
					value: new Date() // defaults to today
				}, {
					xtype: 'tagfield', //Ext.form.field.Tag
					fieldLabel: 'Assignee',
					emptyText: 'Select',
					name: 'asgn',
					store: ['Abdul', 'Manish', 'Steven', 'Charu', 'Anil', 'Vikas'],
					growMax: 50
				}, {
					xtype: 'datefield',
					fieldLabel: 'Due Date',
					name: 'duedate'
				}, {
					xtype: 'radiogroup', //Ext.form.RadioGroup
					fieldLabel: 'Priority',
					items: [{
						boxLabel: 'Low',
						name: 'priority',
						inputValue: 1
					}, {
						boxLabel: 'Normal',
						name: 'priority',
						inputValue: 2,
						checked: true
					}, {
						boxLabel: 'High',
						name: 'priority',
						inputValue: 3
					}]
				}, {
					xtype: 'timefield', //Ext.form.field.Time
					fieldLabel: 'Time',
					//minValue: '9:00 AM',
					//maxValue: '8:00 PM',
					//increment: 15
					//format: 'H:i',
					msgTarget: 'title'
				}]
			}
		```   
   
	* There's a **container** with some **defaults**. 
	* Form fields are **items** of this container with **column** layout.
	* The **tagfield** allows users to easily add or remove tags from the display value area.
	* The **radiogroup** is a specialized container for arranging radio controls into columns, and provides convenience methods for
	getting, setting, and validating the group of radio buttons as a whole.
	* The **timefield** provides a time input field with a time dropdown and automatic time validation.
   
   4. ##### Continue adding more fields 
      Add more fields by adding this code:

		```javascript
		{
			xtype: 'slider', //Ext.slider.Single
			//xtype: 'multislider', 
			//constrainThumbs: true, //Default is true.
			fieldLabel: 'Done',
			name: 'done',
			width: 400,
			//vertical: true,
			//height: 200,
			minValue: 0,
			maxValue: 100,
			increment: 10,
			useTips: true, //default is true
			tipText: function(thumb) {
				return Ext.String.format('{0}% complete', thumb.value);
			}
		}, {
			xtype: 'filefield', //Ext.form.field.File
			fieldLabel: 'File',
			name: 'file',
			buttonText: 'Choose File'
		},{
			xtype: 'displayfield',
			value: '(Maximum size: 5 MB)',
			margin: '0 0 0 120'
		},{
			xtype: 'checkboxgroup', //Ext.form.CheckboxGroup
			fieldLabel: 'Watchers',
			columns: 2,
			vertical: true, // true = start with columns, false = start with rows
			items: [{
				boxLabel: 'Alok Ranjan',
				name: 'watcher',
				inputValue: 'AR'
			}, {
				boxLabel: 'Ajit Kumar',
				name: 'watcher',
				inputValue: 'AK'
			}, {
				boxLabel: 'Phani Kiran',
				name: 'watcher',
				inputValue: 'PK'
			}, {
				boxLabel: 'Ranjit Battlewad',
				name: 'watcher',
				inputValue: 'RB'
			}]
		},{
			xtype: 'button',
			text: 'Create'
		}
		```
   
	* The **vertical:true** property on **slider** renders it vertically. The **useTips** and **tipText** properties render custom tips for the slider values. 
	* The  **multislider** is a slider with multiple thumbs. The **constrainThumbs:false** property disallows thumbs from overlapping each other. 
	* The **filefield** uploads are not performed using normal Ajax techniques; see its description in [Ext.form.Basic.hasUpload](https://docs.sencha.com/extjs/6.5.3/classic/Ext.form.Basic.html#method-hasUpload).
	* The **displayfield** is neither validated nor submitted. It may be useful when you want to display a value from the form's loaded      data but don't want the user to edit or submit that value.
	* The **checkboxgroup** has a specialized layout for arranging checkboxes into columns, and provides convenience methods for
	getting, setting, and validating the group of checkboxes as a whole.

   5. ##### Use the form
      Open **allaboutforms/app/view/main/Main.js** and replace the third child's **html:'bugtracker'** property with **xtype:'bugtracker'**.
   
   6. ##### Test the form
      Save your work and refresh the application. Click on the **Bug Tracker Form** tab in the tab panel. You should see the form with configured field components. 

## HTML5 Input Types
The **inputType** sets type attribute in the underlying HTML input tag. The extended types supported by HTML5 inputs (url, email, etc.) may also be used.

For example, as there is no separate Ext JS component for password, you may use the _password_ inputType for text fields used for entering passwords.

**On tablets, the input type determines the keyboard shown to the user.**

Following screenshot shows different HTML 5 Input Field Types. For tablet support, you may like to use `email`, `tel` or `url`. The others are rarely used.

![HTML5 Input Field Types](https://github.com/walkingtree/codelabs/blob/master/sencha/images/HTML5InputTypes.png)

**Note:** Use these HTML5 input field types judiciously as some types will use the browser's built-in widget.

#### Lab
In this lab, you will create a **Registration Form** using the HTML 5 input types. The form would like this:

![Registration Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/RegistrationForm.png)

   * Open class **MyApp.view.forms.Registration** and add the following code:
   
	   ```javascript
		defaults: {
			xtype: 'textfield',
			anchor:'50%',
			labelWidth: 130
		},
		items: [{
			fieldLabel: 'User Name',
			name: 'username',
			emptyText: 'required',
			allowBlank: false,
			minLength: 6,
			maxLength: 12
		},{
			fieldLabel: 'Email Address',
			name: 'email',
			emptyText: 'me@somewhere.com',
			inputType: 'email',
			allowBlank: false
		},{
			fieldLabel: 'Password',
			emptyText: 'required',
			name: 'pwd1',
			inputType: 'password',
			allowBlank: false,
			minLength: 8,
			maxLength: 12
		},{
			name: 'pwd2',
			fieldLabel: 'Repeat Password',
			inputType: 'password',
			allowBlank: false,
		},{
			xtype: 'checkbox',
			boxLabel: 'I accept the Terms of Use',
			name: 'acceptTerms'
		}],
		buttons: [{
			text: 'Register',
			handler: function() {
				var form = this.up('form');
				form.submit({
					url: 'register.php',
					success: function(form, action) {
						//...
					},
					failure: function(form, action) {
						//...
					}
				});
			}    
		}]
	   ``` 
 
   * Save your work and refresh the application. Enter details. You'll see fields getting validated according to the configured validations. The password will be masked due to _inputType_. 
   
## Form Validation
By default, fields are validated as their value changes or they lose focus due to the following two field properties which are true by default:

* **validateOnChange** 
* **validateOnBlur**
 
#### Text Field Validation
1. ##### Available validations
	* Validation: `allowBlank`, `minLength`, `maxLength`, `regex`, `vtype`
	* Validation text: `blankText`, `minLengthText`, `maxLengthText`, `regexText`, `vtypeText`

   ##### Lab 
   In this lab, you'll add some validations and custom error messages to the **Registration Form**. For this,

	* Open class **MyApp.view.forms.Registration** and replace the **User Name** field object with the following code:
   
		```javascript
		{
			fieldLabel: 'User Name',
			name: 'username',
			emptyText: 'required',
			allowBlank: false,
			blankText: 'Please type something', //Default: This field is required
			minLength: 6,
			minLengthText: 'Too short', // Default: The minimum length for this field is {0}
			maxLength: 12,
			maxLengthText: 'Too long', // Default: The maximum length for this field is {0}  
			regex: /[a-zA-Z]$/,
			regexText: 'Must be alphabetic' // Defaults to ''         
		}
		```
  
		* The **allowBlank: false** config makes the field mandatory and **blankText** sets the corresponding custom message.
		* The **minLength** and **maxLength** configs set the required field length and **minLengthText** and **manLengthText** set the custom messages.
		* The **regex** validation restricts the user to enter specific characters and the **regexText** shows the custom error message.
		* Since **validateOnBlur** and **validateOnChange** are true by default, any change in field value or loss of focus,  validates the field.
		* Save your work and refresh the application. Try the configured validations.  
  
2. ##### Default Vtype
   The **Ext.form.field.VTypes** singleton has four predefined validation rules - alpha, alphanum, email, url - accessed via **vtype** config. 

   ##### Lab 
   In this lab, you'll add default and custom Vtypes to _email_ and _password_ fields respectively. 

	* Open class **MyApp.view.forms.Registration** and replace the **Email Address** field object with the following code:

		```javascript
		{
			fieldLabel: 'Email Address',
			name: 'email',
			emptyText: 'me@somewhere.com',
			inputType: 'email',
			allowBlank: false,
			vtype: 'email',
			vtypeText: 'Please enter your email address'
		}
		```
	* Save and refresh the application. Test the validation on _Email Address_ field.

3. ##### Custom Vtype
   To create custom VTypes, you can override **Ext.form.field.VTypes** class and add your custom VType function. 

   ##### Lab 
	* Open file **allaboutforms/app/overrides/VTypes.js** and notice the custom function **password**. The argument **value** passed to this function is the field value that is being validated. This function returns true or false based on the validity of this argument.   
	 
	  The **passwordText** is the error message to be displayed in case of invalid field. 

	* Configure this **password** vtype on the **Repeat Password** field as shown below:

		```javascript
		{
			name: 'pwd2',
			fieldLabel: 'Repeat Password',
			inputType: 'password',
			allowBlank: false,
			vtype: 'password' //custom 
		}
		```	
	* Save your file and refresh the app. Test both the password fields.

##### Validator
Text fields can have a custom validator function also. If specified, this function will be called first, allowing the developer to override the default validation process.

###### Lab 4
Let us add a validator function here.

1. Replace the **Repeat Password** field wih the following code. We have written a custom vaildator to check whether the passwords
   match or not. It returns true if `value` is true, otherwise returns the error message.

   ```javascript
	{
          name: 'pwd2',
          fieldLabel: 'Repeat Password',
          inputType: 'password',
          allowBlank: false,
          //vtype: 'password'
          validator: function(value) {
            var prev = this.previousSibling('[name=pwd1]');
            return (value === prev.getValue()) ? true : 'Passwords do not match.'
          }
	}
   ```

2. Save your work and refresh the app. Test the password fields.

2. ### Number Field Validation
	Following validations are available for number fields:

	* Validation: `maxValue`, `minValue`
	* Validation text: `minText`, `maxText`, `negativeText`, `nanText`

	For example,

	```javascript
		items: [{
			xtype: 'numberfield',
			fieldLabel: 'numberfield',

			value: 11,

			maxValue: 10,
			maxText: 'Too high', // Default: The maximum value for this field is {0}

			minValue: 1,
			minText: 'Too low', // This is only used if minValue:0

			negativeText: 'No', // Default: The value cannot be negative

			nanText: 'It is not a number!' // Default: {0} is not a valid number  
		}]
	```

3. ###  Binding Components to Form State
	You can bind form field to the validity state of form with **formBind:true** property. Let's do this in this lab.

	#### Lab
	* Open **MyApp/app/view/forms/Registration** file in editor and add **formBind: true** to the **checkbox** field and **Register** button.
	* Save your work and refresh the application. Both these components will be in a disabled state till the form is invalid.
	
4. ### Handling Errors Programatically
	There are few methods that can be called to handle form validation programatically.

	* The **form.isValid()** method returns true or false and as a side effect, shows field error messages. You can also run  _isValid()_ on an individual field.
	* The **form.hasInvalidField()** method returns true or false but does not invoke field error messages.
	* The **getErrors()** method validates value according to the field's validation rules and returns an array of errors for any failing validations.
	* The **clearInvalid()** method clears all invalid field messages rendered on the form. It can be called on a form field also.

	#### Lab 
	* Open **MyApp/app/view/forms/Contact** file in editor and notice the validations configured on each field.
	* Notice that the handler for **Send** button calls the **isValid()** method. If it is false, it calls the **getErrors()** method on  each field and creates an object with field label and error message.
	* Refresh the application and test validations configured on this form.

5. ### Changing the Error Message Location
	The **msgTarget** property specifies the location for error message. It can be any one of the following: 

	* **qtip** - Displays quick tip containing the message when user hovers over the field. This is the default.
	* **title** -  Uses html title attribute.
	* **under** -  Shows error message beneath the field.
	* **side** -   Adds an error icon to the right of the field, displaying the message in a popup when user hovers over it.
	* **none** -  Does not display any error message. This might be useful if you are implementing custom error display.
	* **[element id]** - Adds error message directly to the innerHTML of the specified element.

	#### Lab
	![Contact Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/ContactForm.png)

	* Open class **MyApp.view.forms.Contact** and notice the **msgTarget** property configured on each field.
	* Refresh the application and test location of error messages.

## Specialized Form Field Containers
Though the form fields can be placed inside any container with any configured layout but there are some specialized containers available.

* `fieldcontainer`: It is a simple container that includes the `Ext.form.Labelable` mixin and is commonly used for grouping a set of
                    related fields under a single label in a form.

* `fieldset`: A container for grouping sets of fields but may contain any type of components in their items, including other nested
              containers. The default layout for the FieldSet's items is 'anchor', but it can be configured to use any other layout type.

* `radiogroup`: It has a specialized layout for arranging Radio Buttons into columns, and provides convenience methods for getting,
                setting, and validating the group of radio buttons as a whole.

* `checkboxgroup`: It has a specialized layout for arranging Checkboxes into columns, and provides convenience methods for getting,
                   setting, and validating the group of checkboxes as a whole.


## Form Layouts
Forms tend to have complex layouts and nestings. Following are some of the commonly-used layouts:

* `anchor layout`: This is the default form panel layout. In it, the child items are sized relative to the container's dimensions. If
                   the container is resized, all anchored items are automatically re-rendered according to their anchor rules. 

* `form layout`: In it, the items stretch to fill the container width. Also, the labels are automatically sized to match the widest
                 label
* `column layout`: This is another common layout used when creating forms. This layout enables to place fields into two or more
                   columns.

* `hbox layout`: This is also another layout which may be used in form panels or containers within form panels to arrange items
                 horizontally.

* `vbox layout`: Another layout which may be used in form panels is vbox - to arrange items vertically.
 
##### Lab 1
In this section, we will inspect the **Checkout Form** code and see how the items have been arranged inside the form panel.

![Checkout Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/CheckoutForm1.png)

1. Click on the **Checkout Form** tab in the tab panel and have a look at the two fieldsets with titles **Contact Information** and **Mailing Address**. Observe how the fields have been arranged inside them. 
2. Open class `MyApp.view.forms.Checkout` and look at the code. The default layout for the form panel is `anchor`.
3. The `anchor: '100%'` property specifies the width that the item should take up within the container.
4. It has two `fieldset` as items.
5. Some `fieldDefaults` have been configured which apply on both the fieldsets.
6. The `title` config renders as the fieldset's legend.
7. The first `fieldset` with title **Contact Information** has `column` layout which renders items in columns. The number of columns
   depends upon the configured `columnWidth`.
8. The `collapsible` property on the `fieldset` results in a collapse button being rendered next to the legend title.
9. The second `fieldset` with title **Mailing Address** has `form` layout. It stretches items to fill the container width. It also
   sizes the labels match the widest label.
10. The `checkboxToggle` property on `fieldset` renders a checkbox next to title. The `fieldset` will be expanded when the checkbox
    is checked.
11. This `fieldset` has three items - `textfield`, `fieldcontainer` and `combobox`.
12. This nested container `fieldcontainer` has its own `hbox` layout and renders related fields under a single label **City, State,   PIN**.

##### Lab 2
In this section, let us complete this form by adding details for **Billing Address** as shown below. 

Here, we want that if the **Billing Address** is same as **Mailing Address**, then the **Billing Address** fields should be disabled. For this, we have added a `checkbox` which is `checked: true` initially.

The fields get enabled or diabled due to their `disabled` property, which is bound to the `checked` property of the checkbox.

![Checkout Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/CheckoutForm2.png)

1. Open class `MyApp.view.forms.Checkout` and add the following code as third child to the `items` array.

   ```javascript
   	{
		xtype: 'fieldset',
		title: 'Billing Address',
		layout: 'anchor',
		items: [{
			xtype: 'checkbox',
			reference: 'sameAsMail',
			name: 'sameAsMail',
			boxLabel: 'Same as Mailing Address?',
			checked: true,
			margin: '0 0 10 0',
		}, {
			xtype: 'textfield',
			fieldLabel: 'Street Address',
			name: 'streetAdd',
		        bind:{
				disabled: '{sameAsMail.checked}'
			},	
			allowBlank: false,
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'City, State, PIN',
			bind:{
				disabled: '{sameAsMail.checked}'
			},
			defaults: {
				xtype: 'textfield',
				margin: '0 10 0 0'
			},
			layout: 'hbox',
			items: [{
				name: 'mailCity',
				emptyText: 'city',
				width: 200,
				allowBlank: false
			}, {
				name: 'mailState',
				emptyText: 'state',
				width: 155,
				allowBlank: false
			}, {
				name: 'mailCode',
				emptyText: 'pin',
				width: 160,
				maskRe: /[\d\-]/,
				regex: /^\d{5}(\-\d{4})?$/,
				regexText: 'Must be in the format xxxxx or xxxxx-xxxx',
				allowBlank: false
			}]
		}, {
			xtype: 'combobox',
			fieldLabel: 'Country',
			name: 'mailCountry',
			maxWidth: 350,
			bind: {
				store: '{countries}',
				disabled: '{sameAsMail.checked}'
			},
			forceSelection: true,
			displayField: 'cntry',
			valueField: 'id',
			typeAhead: true,
			queryMode: 'local',
			allowBlank: false
		}]
	}
   ```
 
2. Save your work and refresh the app to see the complete **Checkout Form**.
  
## Loading and Submitting Form Data

### Submitting by calling the Form submit() method
The `Ext.form.Panel.submit` method sends form data to the back end.

The `submit()` method takes a `Ext.form.action.Submit` config. Typically, you specify `url`, and `success` and `failure` callbacks. The server should respond with a JSON (or XML) packet stating whether the form was successfully processed or not, and any other information you'd like to send to the client.

* Successful Response

  ```javascript
	{
	    success : true, //Boolean - required
	    message : 'Data updated.'
	}
  ```
 
* Success Response with Data

  ```javascript
  	{
	    success : true, //Boolean - required
	    message : 'Data updated.',
	    users: [
	        { "name": "Jean Luc", "email": "jeanluc.picard@enterprise.com", "phone": "555-111-1111" },
	        { "name": "Worf", "email": "worf.moghsson@enterprise.com", "phone": "555-222-2222" },
	        { "name": "Deanna", "email": "deanna.troi@enterprise.com", "phone": "555-333-3333" },
	        { "name": "Data", "email": "mr.data@enterprise.com", "phone": "555-444-4444" }
	   ]
	}
  ```
   
* Failure Response
 
  ```javascript
   	{
	    success : false,
	    message : 'Invalid Operation'
	}
  ```
  
### Loading and Submitting Form Data using a Model
Sometimes you may choose to use a record for validation and data submission. The `Ext.form.Panel` has the following methods which allow to load, update and get the record associated with the form.

* `form.loadRecord(record)` -  loads the form with fields from the record.
* `form.updateRecord()` -  updates the loaded record with form fields. It only updates fields explicitly defined in a record's
                           fields:[].
* `form.getRecord()` - returns the last `Ext.data.Model` instance that was loaded via `loadRecord`.
 
##### Lab 1
In this section, first we will see how we can load a Model into Form, validate it and finally save it using the Model's `save()` method.

Later, we will also see how we can validate a Form and submit it using the Form's `submit()` method.

For this, click on the tab **Grid Editing Form** which shows the following screen:

![Grid Edititng Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/GridEditingForm.png)

1. It shows two grids but we will work on the **Users** grid in this lab. When user selects a record and clicks the **Update** button, it opens a pop-up Window with Form. Our requirement is that the Form should be loaded with the selected record as shown below:

![Grid Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/GridForm1.png)

2. The **Users** grid consumes data from the `users` Store, declared in `MyApp.view.main.MainModel`. This Store holds Models of type
   `MyApp.model.User`. 
   
    ```javascript
        // In 'MyApp.view.main.MainModel'
    	users: {
            model: 'MyApp.model.User',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'resources/data/Users.json'
            }
        }
   ```
   
   This Model has the following configured validations:
   
   ```javascript
	// In 'MyApp.model.User'
	fields: [{
		name: 'name', 
		type: 'string',
		validators: [{
			type: 'presence',
			message: 'Name is a mandatory field'
		}]
	},{
		name: 'email', 
		type: 'string',
		validators:[{
			type: 'presence',
			message: 'Email is a mandatory field'
		},{
			type: 'email',
			message: 'Email address is not in a valid format'
		}]
	},{
		name: 'phone',
		type: 'string',
		validators:[{
			type: 'format',
			matcher: /^\d{3}-\d{3}-\d{4}$/,
			message: 'Phone Number contains invalid characters'
		}]
	}]
   ```    
   
3. The class `MyApp.view.forms.FormLoadRecord` defines the required Form. On click of the **Update** button in grid, the `onUpdate`
   handler in the `MyApp.view.main.MainController` gets called, which creates an instance of this Window class. 

   ```javascript
	// In 'MyApp.view.main.MainController'
	onUpdate: function(button) {
		var win = Ext.create("MyApp.view.forms.FormLoadRecord", {
			title: 'Edit Form',
			autoShow: true
		});
	}
   ```
   
   This Window class has Form as a child which is added by the following code:
   
   ```javascript
        // In 'MyApp.view.forms.FormLoadRecord'
   	items: [{
		xtype: 'form',
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Name',
			name: 'name',
			allowBlank: false
		}, {
			xtype: 'textfield',
			fieldLabel: 'Email',
			name: 'email',
			allowBlank: false,
			vtype: 'email'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Phone',
			name: 'phone',
			allowBlank: false,
			regex: /^\d{3}-\d{3}-\d{4}$/
		}],
		buttons: [{
			text: 'Model Save',
			handler: 'onModelSave'
		},{
			text: 'Form Submit',
			handler: 'onFormSubmit'
		}]
	}]
   ```   

4. Now, we have to load the selected record (Model) from the grid onto this form. For this, we can call the form's `loadRecord()`
   method. So, replace the `onUpdate` handler definition with the following code:

	```javascript
		onUpdate: function(button) {
			var win = Ext.create("MyApp.view.forms.FormLoadRecord", {
				title: 'Edit Form',
			});
			var users = this.lookupReference('userslist');
			var rec = users.getSelection()[0];
			win.down('form').loadRecord(rec);
			win.show();
		}
	```
  
  It gets a reference to the **Users** grid, accesses it selected record and loads it into the form.

5. Save your work and refresh the app. Select a record and click the **Update** button. It should load the selected record into the
   form.
6. Next, we want that on click of the form's **Save Model** button, the edited record should first be validated. If valid, it should
   be saved, otherwise it should display some relevant message. This button has the `onModelSave` handler configured. Let's define it by copying and pasting the following code in MainController. 

  ```javascript
	onModelSave: function(button) {
		var form = button.up('form');
		form.updateRecord(); // Only updates what's in the record's fields:[]
		var record = form.getRecord();
		if (record.isValid()) {
			Ext.Msg.alert('Validity', 'The record is valid. Look at network traffic to see what was sent.');
			record.save(); 
		} else {
			Ext.Msg.alert('Validity', 'The record isn\'t valid.');
		}
		button.up('window').close();
	}
  ```
   
   It calls the form's `updateRecord()` method, which updates the Model loaded via `loadRecord()`. 
   
   It then gets this updated record through `getRecord()` method and validates it according to the Model's configured validations, by calling the Model's `isValid()` method. 
   
   If valid, it saves it by calling Model's `save()` method, otherwise prompts the User about Invalid record.

7. Next, we have to handle the form's **Form Submit** button, which is expected to validate a form and submit it. The configured
   handler for this button is `onFormSubmit`. Copy and paste this code in the MainController.

   ```javascript
   	onFormSubmit: function(button) {
		var form = button.up('form');
		if(form.isValid()) {       
			form.submit({
        			url: 'fake.html', //Generates 404 Error but its okay
        			success: function(form, action) {
	                		console.log(action.response);
	                        	button.up('window').close(); 
                		},
	               		failure: function(form, action){
		                        console.log(action.response);
		                        button.up('window').close();
	                	}
			});	
		} else {
        		Ext.Msg.alert('Validity','The record isn\'t valid.');
        	}        	
	}
   ```	

   As this form's fields have some validations configured, the statement `form.isValid()` would validate the form according to those validations. 
   
   If valid, it would call the form's `submit()` method to submit it at the specified `url`. The `success` or `failure` functions would be called based on the received response.	If invalid, it prompts the user about it.
   
   The object passed to the `submit()` method is of `Ext.form.action.Action` type. 
   
8. Save your work and refresh the app. Test the **Form Submit** button.

##### Lab 2
In this lab, we will load the selected record from **Personnel** grid onto the form via Data Binding. We will also validate and save the loaded record. 

Select a record from this grid. It shows a pop-up Window with Form loaded with the selected record, as shown in the screenshot below:

![Grid Form](https://github.com/walkingtree/codelabs/blob/master/sencha/images/GridForm2.png)

1. The **Personnel** grid consumes data from the `people` Store, declared in `MyApp.view.main.MainModel`. This Store holds Models of
   type `MyApp.model.User`. 

   ```javascript
	// In 'MyApp.view.main.MainModel'
	people: {
		model: 'MyApp.model.User',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'resources/data/People.json'
		}
	}
   ```
   
   The `MyApp.model.User` has the following fields and validators:
   
   ```javascript
   	// In 'MyApp.model.User'
   	fields: [{
	        name: 'name', 
	        type: 'string',
	        validators: [{
	           type: 'presence',
	           message: 'Name is a mandatory field'
	        }]
	},{
	        name: 'email', 
	        type: 'string',
	        validators:[{
	            type: 'presence',
	            message: 'Email is a mandatory field'
	        },{
	            type: 'email',
	            message: 'Email address is not in a valid format'
	        }]
	},{
	        name: 'phone',
	        type: 'string',
	        validators:[{
	            type: 'format',
	            matcher: /^\d{3}-\d{3}-\d{4}$/,
	            message: 'Phone Number contains invalid characters'
	        }]
	 }]
   ```    

2. The grid handles the `select` event through `onItemSelected` handler configured in `MyApp.view.main.MainController`. This handler
   creates an instance of `MyApp.view.forms.FormModelBinding`. While creating its instance, it also passes an inline ViewModel with `editDetails` property which is a reference to the selected record from grid.

   ```javascript
   	// In 'MyApp.view.main.MainController'
	onItemSelected: function(sender, record) {
		Ext.create("MyApp.view.forms.FormModelBinding", {
			viewModel: {
				data: {
					editDetails: record
				}
			},
			title: 'Edit Form',
			autoShow: true
		});
	}
   ```

3. The following code of `MyApp.view.forms.FormModelBinding` class adds Form as a child of Window. Since the `editDetails` property
   of Window's ViewModel (shown above), would be available to Form down the hierarchy, the `bind` property has been used to bind the fields' value to the Model fields. This would automatically load the form fields with the selected Model.

   ```javascript
   	// In 'MyApp.view.forms.FormModelBinding'
	items: [{
		xtype: 'form',
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Name',
			bind: {
				value: '{editDetails.name}'
			}
		}, {
			xtype: 'textfield',
			fieldLabel: 'Email',
			bind: {
				value: '{editDetails.email}'
			}
		}, {
			xtype: 'textfield',
			fieldLabel: 'Phone',
			bind: {
				value: '{editDetails.phone}'
			}

		}],
		buttons: [{
			text: 'Save',
			handler: 'onSave'
		}, {
			text: 'Cancel',
			handler: 'onCancel'
		}]
	}]
   ```

4. Now, let us configure the `modelValidation: true` property on the form panel. This would automatically validate the form fields
   according to Model field validators. For this, open class `MyApp.view.forms.FormModelBinding` and add `modelValidation: true` property to the form object.

5. Let us also bind the **Save** button to the form's state so that it remains disabled till the form is invalid. For this,
   configure `formBind: true` on the **Save** button config object.
 
   ```javascript
   	buttons: [{
		text: 'Save',
		formBind: true,
		handler: 'onSave'
	}, {
		text: 'Cancel',
		handler: 'onCancel'
	}]
   ```
   
6. Save your work and refresh the app. Select a record from **Personnel** grid. Make the **Name** field empty. See that the **Save**
   button gets disabled as the **Name** field has `presence` validator.

7. Next, let's handle the **Save** button which is expected to save the selected Model. In class `MyApp.view.main.MainController`,
   add the following handler:

   ```javascript
   	onSave: function(button) {
		var win = button.up('window');
		var rec = win.getViewModel().get('editDetails');
		rec.commit();
		//rec.save(); There is no back-end code the process the request
		win.close();
	}
   ```
   
   It gets the bound Model `editDetails` and commits it via Model `commit()` method. This would commit all changes made to the bound Model instance. 

8. Let's handle the **Cancel** button which is expected to reject changes made to the selected Model. In class 
   `MyApp.view.main.MainController`, add the following handler:

   ```javascript
	onCancel: function(button) {
		var win = button.up('window');
		win.getViewModel().get('editDetails').reject();
		win.close();
	}
   ```
   
   It gets the bound Model `editDetails` and rejects the changes, by calling the Model's `reject()` method. 

9. Save your work and refresh the app. Test the **Save** and **Cancel** buttons.

## Recap
* Form Panels are simple panels with additional form handling abilities. They are used in an Ext JS application when there is a need to collect data from the user.

* Internally, Form Panels work in coordination with an associated object — `Ext.form.Basic` — that handles all of its input field management, validation, submission, and form loading services.

* Ext JS provides a number of form field components right from basic Textfield to a grid like MultiSelector.

* Each form field component also has a `name` and a `value` property. These form the key and value pairs while sending field data
  over the server.

* The name-value pair is provided by the `Ext.form.field.Field` mixin.

* The labeling properties are in the `Ext.form.field.Labelable` mixin.

* The defaults for fields can be set by:
	 * `defaults` -  to apply default settings to all child items.
	 * `defaultType` - to specify a default `xtype` for the child items.
	 * `fieldDefaults` - to specify `Ext.form.Labelable` properties to child fields.
	 
* Any field may specify `inputType`, which sets the `type` property in the underlying HTML input tag. The extended types supported by HTML5 inputs (url, email, etc.) may also be used.

* By default, fields are validated as their value changes or they lose focus. 

* For text fields, the validations are - 

	* Validation: `allowBlank`, `minLength`, `maxLength`, `regex`, `vtype`
	* Validation text: `blankText`, `minLengthText`, `maxLengthText`, `regexText`, `vtypeText`
	* validator function.

* Number fields have the following validations:

	* Validation: `maxValue`, `minValue`
	* Validation text: `minText`, `maxText`, `negativeText`, `nanText`
	
* Any form component can be enabled or disabled automatically, depending on whether the form is valid or inavalid, by setting the  `formBind:true` property.  

* There are few methods that can be called to handle form validation programatically.

	* The `form.isValid()` method returns true or false and shows field error messages. You can also run 
	  `isValid()` on an individual field.
	* The `form.hasInvalidField()` method returns true or false, but does not invoke field error messages.
	* The `clearInvalid()` method clears all invalid field messages in this form. It can be called on a form field also.
	* The `reset()` method resets the form fields' values. 

* The location to display the error messages can be changed by setting the `msgTarget` property. It can have ony of the following values:

	* `qtip` - Displays a quick tip containing the message when the user hovers over the field. This is the default.
	* `title` -  Uses html title attribute.
	* `under` -  Shows error message beneath the field.
	* `side` -   Adds an error icon to the right of the field, displaying the message in a popup on hover.
	* `none` -  Don't display any error message. This might be useful if you are implementing custom error display.
	* `[element id]` - Add the error message directly to the innerHTML of the specified element.

* There are some specialized containers for form fields - `fieldcontainer`, `fieldset`, `radiogroup` and `checkboxgroup`.

* Some commonly-used layouts for forms are: `anchor` (default), `form`, `column`, `hbox` and `vbox`.

* The form data can be loaded or submitted by any of the following ways:
	
	* Form's submit() method:
	
		* It sends form data to the back end.
		* It takes a `Ext.form.action.Submit` config and the server should respond with a JSON (or XML) packet stating whether the form was successfully processed or not, and any other information you'd like to send to the client.
	
			* Successful Response
				
				```javascript
					{
						success : true, //Boolean - required
						message : 'Data updated.'
					}
				```
				 
			* Success Response with Data
			
				  ```javascript
				  	{
						 success : true, //Boolean - required
						 message : 'Data updated.',
						 users: [
						         { "name": "Jean Luc" },
						         { "name": "Worf" },
						         { "name": "Deanna"},
						         { "name": "Data" }
						 ]
					}
				  ```
			   
			* Failure Response
			 
				  ```javascript
				   	{
					    success : false,
					    message : 'Invalid Operation'
					}
				  ```
  
	* Loading and Submitting using a Model
		* Sometimes you may choose to use a Model (record) for validation and data submission. The `Ext.form.Panel` has following methods which allow to load, update and get the record associated with form.
		
		* `form.loadRecord(record)` -  loads the form with fields from the record.
		* `form.updateRecord()` -  updates the loaded record with form fields. It only updates fields explicitly defined in the
		model's `fields` config.
		* `form.getRecord()` - returns the last `Ext.data.Model` instance that was loaded via `loadRecord`.




 
  
  
