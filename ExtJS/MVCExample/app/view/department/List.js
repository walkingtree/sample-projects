Ext.define('MVC.view.department.List' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.departmentlist',
	title : 'Departments',
	store: Ext.create('MVC.store.Departments',{autoLoad:true}),
	cls: 'departments-alt',
	columns: [
		{
		header: 'Name', 
		dataIndex: 'name', 
		flex: 1
		},
		{
		header: 'Location', 
		dataIndex: 'location', 
		flex: 1
		}
	]
});

