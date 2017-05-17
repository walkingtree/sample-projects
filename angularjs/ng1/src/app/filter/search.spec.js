describe('Employee Search', function() {

  beforeEach(module('designer'));

  var $filter;

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
  }));

  it('Is filter exist', function() {
    var SearchEmployee = $filter('Search');
    expect(SearchEmployee).toBeDefined();    
  });

  it('Is filter exist with data', function() {
    var SearchEmployee = $filter('Search');
    var data = [  
       {  
          "id":0,
          "Name":"Alexander",
          "Age" : 22
       },
       {  
          "id":1,
          "Name":"Mason",
          "Age" : 23
       }
    ];
    var filterData = SearchEmployee(data, 'Al')
    expect(filterData.length).toEqual(1);
    console.log(filterData.length); 
  });
});