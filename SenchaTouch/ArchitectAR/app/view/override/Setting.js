Ext.define('AR.view.override.Setting', {
    override: 'AR.view.Setting',
      alias: 'widget.settingsform',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Select',
        'Ext.Label',
        'Ext.form.Toggle'
    ],

    config: {
        menubtn: 'false',
        itemId: 'myformpanel',
        items: [
            {
                xtype: 'fieldset',
                title: AR.locale.Labels.APPLICATIONSETTINGS_LABEL,
                instructions : AR.locale.Labels.APPLICATIONSETTING_INSTRUCTIONS,
                items: [
                    {
                        xtype: 'selectfield',
                        id: 'languagefield',
                        itemId: 'languagefield',
                        label: AR.locale.Labels.FIELD_LANGUAGE_LABEL,
                        labelWidth: '50%',
                        displayField: 'langName',
                        valueField: 'langCode'
                    },
                    {
                        xtype: 'selectfield',
                        id: 'themefield',
                        label: AR.locale.Labels.FIELD_THEME_LABEL,
                        labelWidth: '50%',
                        displayField: 'themeName',
                        valueField: 'themeCode'
                    },
                    {
                        xtype: 'selectfield',
                        id: 'tabfield',
                        label: AR.locale.Labels.FIELd_TABVIEW_LABEL,
                        labelWidth: '50%',
                        displayField: 'tabName',
                        valueField: 'tabCode'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: AR.locale.Labels.ARTICLESETTINGS_LABEL,
                instructions:AR.locale.Labels.ARTICLESETTINGS_INSTRUCTIONS,
                items: [
                    {
                        xtype: 'label',
                        hidden: true,
                        html:AR.locale.Labels.FIELD_ICON_VIEW_LABEL,
                        id: 'togglelabel'
                    },
                    {
                        xtype: 'togglefield',
                        contentEl: 'togglelabel',
                        id: 'togglecom',
                        itemId: 'mytogglefield',
                        label: AR.locale.Labels.FIELD_CATEGORY_VIEW_LABEL
                    },
                    {
                        xtype: 'label',
                        hidden: true,
                        html: '10',
                        id: 'sliderval'
                    },
                    {
                        xtype: 'sliderfield',
                        contentEl: 'sliderval',
                        id: 'slidercom',
                        itemId: 'mysliderfield',
                        label: AR.locale.Labels.FIELD_NOOFRECORD_PAGE_LABEL,
                        value: [
                            10
                        ],
                        maxValue: 50
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'settingssavebtn',
                margin: '0% 1% 0% 1%',
                text: 'Apply Settings'
            }
        ],
        listeners: [
            {
                fn: 'onMytogglefieldChange',
                event: 'change',
                delegate: '#togglecom'
            },
            {
                fn: 'onMysliderfieldChange',
                event: 'change',
                delegate: '#slidercom'
            }
        ]
    },

    onMytogglefieldChange: function(togglefield, newValue, oldValue, eOpts) {



        if(newValue===0){

        Ext.getCmp('togglelabel').setHtml(AR.locale.Labels.FIELD_ICON_VIEW_LABEL);

        }else{

        Ext.getCmp('togglelabel').setHtml(AR.locale.Labels.FIELD_LIST_VIEW_LABEL);

        }
    },

    onMysliderfieldChange: function(me, sl, thumb, newValue, oldValue, eOpts) {

        Ext.getCmp('sliderval').setHtml(newValue);
    }

});