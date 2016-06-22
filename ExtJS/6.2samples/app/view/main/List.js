/**
 * This view is an example list of people.
 */
 Ext.define('EA.view.main.List', {
 extend: 'Ext.grid.Panel',
 xtype: 'mainlist',

requires: [
 'EA.store.Personnel',
 'Ext.grid.plugin.RowWidget'
 ],

title: 'Personnel',

store: {
 type: 'personnel'
 },

columns: [
 { text: 'Name', dataIndex: 'name' },
 { text: 'Email', dataIndex: 'email', flex: 1 },
 { text: 'Phone', dataIndex: 'phone', flex: 1 }
 ],
 plugins:[
 {
 ptype: 'rowwidget',
 widget:{
 xtype:'grid',
 autoLoad: true,
 bind:{
  store:'{childgrid}'
  },
 plugins:[
 {
 ptype:'rowediting'
 }
 ],
 columns: [
 { text: 'Name', dataIndex: 'name',editor:{xtype:'textfield'} },
 { text: 'Email', dataIndex: 'email', flex: 1 ,editor:{xtype:'textfield'}},
 { text: 'Phone', dataIndex: 'phone', flex: 1,editor:{xtype:'textfield'} }
 ]
 }
 }
 ],
 listeners: {
 select: 'onItemSelected'
 }
 });
