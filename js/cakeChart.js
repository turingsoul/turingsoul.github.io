
function showCakeChart(){
	
	
	getAssetData();
    
}
function getAssetData(){
	var one = Base64.encode("1");
	var two = Base64.encode("2");
	var three = Base64.encode("3");
	var four = Base64.encode("4");
	var five = Base64.encode("5");
	var six = Base64.encode("6");
	var db = getCurrentDb();
	var assetResult = 0;
	var assetResult1 = 0;
	var assetResult2 = 0;
	db.transaction(function (trans) {
            trans.executeSql("select * from AssetTable where AssetTag = ?", [one], function (ts, data) {
            	
            	var a  = data.rows.length;
            	var AssetName  = new Array(data.rows.length);
            	var AssetValue  = new Array(data.rows.length);
            	
            	if (data){
                        for (var i = 0; i < a; i++) {
                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
                             AssetName[i] = data.rows.item(i).AssetName;
                             AssetValue[i] = data.rows.item(i).AssetValue;
                             assetResult= assetResult+parseFloat(Base64.decode(AssetValue[i]));
                        }
                            console.log("存款"+assetResult);
                        db.transaction(function (trans) {
					            trans.executeSql("select * from AssetTable where AssetTag = ? or AssetTag = ? or AssetTag = ?", [two,five,six], function (ts, data) {
					            	
					            	var a  = data.rows.length;
					            	var AssetName  = new Array(data.rows.length);
					            	var AssetValue  = new Array(data.rows.length);
					            	
					            	if (data){
					                        for (var i = 0; i < a; i++) {
					                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
					                             AssetName[i] = data.rows.item(i).AssetName;
					                             AssetValue[i] = data.rows.item(i).AssetValue;
					                             assetResult1= assetResult1+parseFloat(Base64.decode(AssetValue[i]));
					                        }
					                        console.log("存款2:"+assetResult1);
					                         db.transaction(function (trans) {
										            trans.executeSql("select * from AssetTable where AssetTag = ? or AssetTag = ?", [three,four], function (ts, data) {
										            	
										            	var a  = data.rows.length;
										            	var AssetName  = new Array(data.rows.length);
										            	var AssetValue  = new Array(data.rows.length);
										            	
										            	if (data){
										                        for (var i = 0; i < a; i++) {
										                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
										                             AssetName[i] = data.rows.item(i).AssetName;
										                             AssetValue[i] = data.rows.item(i).AssetValue;
										                             assetResult2= assetResult2+parseFloat(Base64.decode(AssetValue[i]));
										                        }
										                        console.log("存款3:"+assetResult2);
										                        
										                        drawCake(assetResult,assetResult1,assetResult2);
										                      
										                    }
										            }, function (ts, message) {console.log(message)});
										            
										     });
					                    }
					            }, function (ts, message) {console.log(message)});
					            
					     });
                        
                    }
            }, function (ts, message) {console.log(message)});
            
     });
}
var flag=0;
function drawCake(one,two,three){
	if(flag==0){
	}
	else{
		var foreone  = $("#assetSum").attr("assetResult");
		var foretwo  = $("#assetSum").attr("assetResult1");
		var forethree  = $("#assetSum").attr("assetResult2");
		var foreData=[
		{label:"基本存款", color:"#3366CC",value:foreone/100},
		{label:"风险投资", color:"#DC3912",value:foretwo/100},
		{label:"固定资产", color:"#FF9900",value:forethree/100}
	    ];
	}
	
	
    var nowData=[
	{label:"基本存款", color:"#3366CC",value:one},
	{label:"风险投资", color:"#DC3912",value:two},
	{label:"固定资产", color:"#FF9900",value:three}
    ];
    
	/*var svg = d3.select("#mybox").select("svg");*/
	 
	
	
	
	if(flag==0){
		Donut3D.draw("investPercent", getnowData(), 100,100,85,80, 20, 0.4);//最后参数为环形大小	
		flag=1;
	}
	else{
		Donut3D.draw("investPercent", getforeData(), 100,100,85,80, 20, 0.4);//最后参数为环形大小
	}
	
	Donut3D.transition("investPercent", getnowData(),85, 80, 15, 0.4);
	
	
	function getforeData(){
		return foreData.map(function(d){ 
			return {label:d.label, value:d.value, color:d.color};});
	}
	function getnowData(){
		return nowData.map(function(d){ 
			return {label:d.label, value:d.value, color:d.color};});
	}
	
}
