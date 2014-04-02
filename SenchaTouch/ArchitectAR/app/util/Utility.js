Ext.define('AR.util.Utility', {

    singleton: true,
	


 
	colors:['#729713','#16499a','#128023','#9a165a','#fa6800','#4390df','#9a1616','#C174C1','#79C0C9','#DFE43B'], 

	GetTreeCategories:'http://'+window.location.host+'/senchademo/artouch/resources/data/GetHirerchyCategories.php',
    
    
    /** Tab no for article list view.*/
	ARTICLELIST_TAB_NO				:	0,
	/** Tab no for Category List/IconView view.*/
	CATEGORY_TAB_NO					:	1,
	/** Tab no for Authors list view.*/
	AUTHORS_TAB_NO					:	2,
	/** Tab no for Saved Articles view.*/
	SAVEDARTICLES_TAB_NO				:	3,
    
    api: (function () {
 
       //   var baseUrl = 'http://192.168.1.153/Training/';
        var baseUrl = 'http://touchdemo.walkingtree.in/Training/';

          return {

                   baseUrl			: baseUrl,

                   allPosts:   baseUrl + '?json=get_posts',

                   singlePost       : baseUrl + '?json=get_post',

                   allcategories	: baseUrl + '?json=get_category_index',

                  allauthors		: baseUrl + '?json=get_author_index',
			
                  articlesbyauthors	: baseUrl + '?json=get_posts&author=',

                  articlesbycategory	: baseUrl + '?json=get_posts&cat='
		};
 })()

});

