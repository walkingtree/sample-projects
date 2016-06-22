var soap = require('soap');
var url ='http://localhost:8090/WebServices/services/WebService?wsdl';
var args={

 ModelCRUDRequest:{
   ModelCRUD:{
     serviceType:"CreateInterest",
     TableName:"WTC_EmployeeInterest",
     RecordID:0,
     Filter:"",
     Action:"Create",
           DataRow:{
               'field':[{
                   attributes:{column:"C_BPartner_ID"},
                   val:'1001047'
               },{
                 attributes:{column:"Interest"},
                 val:'Cooking'
               }]
           }
   },
   ADLoginRequest:{
     user:'WTCAdmin',pass:'adminuser',lang:'192',ClientID:11,RoleID:102,OrgID:103434001,WarehouseID:1234,stage:0
   }
  }
};



soap.createClient("http://localhost:8090/WebServices/services/ModelADService?wsdl",{
  ignoredNamespaces: {
    namespaces: ['adin'],
    override: true
  }
},function(err, client) {
  client.ModelADService.ModelADServiceHttpPort.createData(args,function(err, result,body) {
    console.log('============');
  console.log("create data :",body);
  });
},'http://localhost:8090/WebServices/services/ModelADService');
