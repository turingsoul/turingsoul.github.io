
/*点击添加按钮操作*/
$("#assetPlus").on("click",function(){
	$("#addAsset").show(500);
	$("#asset_add1").removeAttr("readonly");
	$("#asset_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#asset_add1").focus();
})
/*取消操作*/
$("#btnAssetCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addAsset").hide(500);
	/*清空弹出框*/
	$("#asset_add1").val("");
	$("#asset_add2").val("");
	$("#assetTips").text("");
	/*恢复正常隐藏*/
	hideORshow2();
})
/*确定操作*/
$("#btnAssetSummit").on("click",function(){
	var nodeName = $("#asset_add1").val();
	var nodeValue = $("#asset_add2").val();
	var tag = $("#select_asset").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	if(checkAssetData()){
		/*重复验证*/
		checkAssetRepeat(nodeName,nodeValue,tag,timeNow);
	}
})
/*验证填写数据的正确性
  正确返回1
  错误返回0
 * */
function checkAssetData(){
	var nodeName = $("#asset_add1").val();
	var nodeValue = $("#asset_add2").val();
	/*非空验证*/
	if(nodeName==""||nodeValue==""){
		$("#assetTips").text("内容不能为空");
		return 0;
	}
	else if(isNaN(nodeValue)==1){
		$("#assetTips").text("金额必须填写数字");
		return 0;
	}
	else if(nodeValue<0){
		$("#assetTips").text("金额必须是正数");
		return 0;
	}
	else{
		$("#assetTips").text("");
		return 1;
	}
}
/*添加操作*/
/*重复验证,无重复，则执行添加
                     有重复，则不执行添加
 * */
function checkAssetRepeat(nodeName,nodeValue,tag,timeNow){
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select AssetTag from AssetTable where AssetName = ?", [Base64.encode(nodeName)],function (ts, data) {
	    	       	if(data.rows.length!=0){
	    	       		$("#assetTips").text("名字重复");
	    	       	}
	    	       	else{
	    	       		/*添加数据进去*/
						/*初始化数据库输入表*/
						initAssetTable();
						var db = getCurrentDb();
						db.transaction(function (trans) {
					            trans.executeSql("insert into AssetTable(AssetName,AssetValue,AssetTag,CurrentTime) values(?,?,?,?) ", [Base64.encode(nodeName),Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow)], function (ts, data) {
				    	        $("#addAsset").hide(500);
				    	        $("#asset_add1").val("");
				    	        $("#asset_add2").val("");
				    	        showAllTheData();
					            }, function (ts, message) {console.log(message);});
				         });
	    	       	}
	            }, function (ts, message) {
	            });
	           
         });
}
/*删除一行*/
function deleteAssetTr(e){
			var $current = $(e);
			$current.parent().remove();
			/*获取这行的内容*/
			var toDeleteDate = $($current.parent().find("td").get(0)).text();
			/*数据库删除*/
			deleteAssetData(toDeleteDate);
}

/*打开更新数据弹出框*/
function assetUpdate(e){
	$("#asset_add1").attr("readonly","readonly");
	$("#asset_add1").addClass("text-get");
	/*$("#input_addinput").attr("readOnly","true");*/
	var $current = $(e);
	var nodeName = $($current.find("td").get(0)).text();
	var nodeValue = $($current.find("td").get(1)).text();
	var AssetTag = 0;  //tag
	var TagContent = ""; //tagcontent
	/*根据名称查询flag*/
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql("select AssetTag from AssetTable where AssetName = ?", [Base64.encode(nodeName)], function (ts, data) {
    	        AssetTag = Base64.decode(data.rows[0].AssetTag);
    	        TagContent = findAssetTagContent(AssetTag);
    	        showSelect2(AssetTag,TagContent);
    	        
	            }, function (ts, message) {console.log(message)});
         });
	$("#asset_add1").val(nodeName);
	$("#asset_add2").val(nodeValue);
	$("#addAsset").show(500);
	$("#btnAssetSummit").hide(0);
	$("#btnAssetUpdate").show(0);
	console.log(nodeName+nodeValue);
}
/*查询tag对应的内容*/
function findAssetTagContent(number){
	if(number ==1){
		return "存款";
	}else if(number ==2 ){
		return "股票";
	}else if(number ==3){
		return "房产";
	}else if(number ==4){
		return "汽车";
	}else if(number ==5){
		return "债券";
	}else if(number ==6){
		return "期权";
	}
}
/*确认修改操作*/
$("#btnAssetUpdate").on("click",function(){
	var nodeName = $("#asset_add1").val();
	var nodeValue = $("#asset_add2").val();
	var tag = $("#select_asset").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update AssetTable set AssetValue = ?,AssetTag = ?,CurrentTime=? where AssetName = ?", [Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow),Base64.encode(nodeName)], function (ts, data) {
    	        $("#addAsset").hide(500);showAllTheData();
    	         $("#asset_add1").val("");
    	        $("#asset_add2").val("");
	            }, function (ts, message) {
	            	 $("#asset_add1").val("");
    	        	 $("#asset_add2").val("");
	            });
         });
	
})
/*显示个人资产总数*/
function showAssetSum(){
	var db = getCurrentDb();
	db.transaction(function (trans) {
            trans.executeSql("select * from AssetTable ", [], function (ts, data) {
            	console.log(data);
            	/*show items length*/
            	var a  = data.rows.length;
            	var AssetName  = new Array(data.rows.length);
            	var AssetValue  = new Array(data.rows.length);
            	/*get output sum*/
            	var assetResult = 0;
            	if (data){
                        for (var i = 0; i < a; i++) {
                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
                             AssetName[i] = data.rows.item(i).AssetName;
                             AssetValue[i] = data.rows.item(i).AssetValue;
                             console.log(Base64.decode(AssetName[i]),Base64.decode(AssetValue[i]));
                             assetResult= assetResult+parseFloat(Base64.decode(AssetValue[i]));
                        }
                        console.log("综合zica"+assetResult);
                        $("#assetSum").text(fmoney(assetResult, 2));
                        $("#assetSum").attr("result",assetResult);
                        
                        
                      
                    }
            }, function (ts, message) {console.log(message)});
     });
	
}