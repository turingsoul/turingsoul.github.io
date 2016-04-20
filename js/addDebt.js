
/*点击添加按钮操作*/
$("#debtPlus").on("click",function(){
	$("#addDebt").show(500);
	$("#debt_add1").removeAttr("readonly");
	$("#debt_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#debt_add1").focus();
})
/*取消操作*/
$("#btnDebtCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addDebt").hide(500);
	/*清空弹出框*/
	$("#debt_add1").val("");
	$("#debt_add2").val("");
	$("#debtTips").text("");
	/*恢复正常隐藏*/
	hideORshow3();
})

/*确定操作*/
$("#btnDebtSummit").on("click",function(){
	var nodeName = $("#debt_add1").val();
	var nodeValue = $("#debt_add2").val();
	var tag = $("#select_debt").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	if(checkDebtData()){
		/*重复验证*/
		checkDebtRepeat(nodeName,nodeValue,tag,timeNow);
	}
})
/*验证填写数据的正确性
  正确返回1
  错误返回0
 * */
function checkDebtData(){
	var nodeName = $("#debt_add1").val();
	var nodeValue = $("#debt_add2").val();
	/*非空验证*/
	if(nodeName==""||nodeValue==""){
		$("#debtTips").text("内容不能为空");
		return 0;
	}
	else if(isNaN(nodeValue)==1){
		$("#debtTips").text("金额必须填写数字");
		return 0;
	}
	else if(nodeValue<0){
		$("#debtTips").text("金额必须是正数");
		return 0;
	}
	else{
		$("#debtTips").text("");
		return 1;
	}
}
/*添加操作*/
/*重复验证,无重复，则执行添加
                     有重复，则不执行添加
 * */
function checkDebtRepeat(nodeName,nodeValue,tag,timeNow){
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select DebtTag from DebtTable where DebtName = ?", [Base64.encode(nodeName)],function (ts, data) {
	    	       	if(data.rows.length!=0){
	    	       		$("#debtTips").text("名字重复");
	    	       	}
	    	       	else{
	    	       		/*添加数据进去*/
						/*初始化数据库输入表*/
						initDebtTable();
						var db = getCurrentDb();
						db.transaction(function (trans) {
					            trans.executeSql("insert into DebtTable(DebtName,DebtValue,DebtTag,CurrentTime) values(?,?,?,?) ", [Base64.encode(nodeName),Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow)], function (ts, data) {
				    	        $("#addDebt").hide(500);
				    	        $("#debt_add1").val("");
				    	        $("#debt_add2").val("");
				    	        showAllTheData();
					            }, function (ts, message) {console.log(message);});
				         });
	    	       	}
	            }, function (ts, message) {
	            });
	           
         });
}
/*删除一行*/
function deleteDebtTr(e){
			var $current = $(e);
			$current.parent().remove();
			/*获取这行的内容*/
			var toDeleteDate = $($current.parent().find("td").get(0)).text();
			/*数据库删除*/
			deleteDebtData(toDeleteDate);
}
/*打开更新数据弹出框*/
function debtUpdate(e){
	$("#debt_add1").attr("readonly","readonly");
	$("#debt_add1").addClass("text-get");
	/*$("#input_addinput").attr("readOnly","true");*/
	var $current = $(e);
	var nodeName = $($current.find("td").get(0)).text();
	var nodeValue = $($current.find("td").get(1)).text();
	var DebtTag = 0;  //tag
	var TagContent = ""; //tagcontent
	/*根据名称查询flag*/
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql("select DebtTag from DebtTable where DebtName = ?", [Base64.encode(nodeName)], function (ts, data) {
    	        DebtTag = Base64.decode(data.rows[0].DebtTag);
    	        TagContent = findDebtTagContent(DebtTag);
    	        showSelect3(DebtTag,TagContent);
    	        
	            }, function (ts, message) {console.log(message)});
         });
	$("#debt_add1").val(nodeName);
	$("#debt_add2").val(nodeValue);
	$("#addDebt").show(500);
	$("#btnDebtSummit").hide(0);
	$("#btnDebtUpdate").show(0);
	console.log(nodeName+nodeValue);
}
/*查询tag对应的内容*/
function findDebtTagContent(number){
	if(number ==1){
		return "欠债";
	}else if(number ==2 ){
		return "贷款";
	}
}
/*确认修改操作*/
$("#btnDebtUpdate").on("click",function(){
	var nodeName = $("#debt_add1").val();
	var nodeValue = $("#debt_add2").val();
	var tag = $("#select_debt").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update DebtTable set DebtValue = ?,DebtTag = ?,CurrentTime=? where DebtName = ?", [Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow),Base64.encode(nodeName)], function (ts, data) {
    	        $("#addDebt").hide(500);showAllTheData();
    	         $("#debt_add1").val("");
    	        $("#debt_add2").val("");
	            }, function (ts, message) {
	            	 $("#debt_add1").val("");
    	        	 $("#debt_add2").val("");
	            });
         });
	
})
/*显示个人负债总数*/
function showDebtSum(){
	var db = getCurrentDb();
	db.transaction(function (trans) {
            trans.executeSql("select * from DebtTable ", [], function (ts, data) {
            	console.log(data);
            	/*show items length*/
            	var a  = data.rows.length;
            	var DebtName  = new Array(data.rows.length);
            	var DebtValue  = new Array(data.rows.length);
            	/*get output sum*/
            	var debtResult = 0;
            	if (data){
                        for (var i = 0; i < a; i++) {
                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
                             DebtName[i] = data.rows.item(i).DebtName;
                             DebtValue[i] = data.rows.item(i).DebtValue;
                             console.log(Base64.decode(DebtName[i]),Base64.decode(DebtValue[i]));
                             debtResult= debtResult+parseFloat(Base64.decode(DebtValue[i]));
                        }
                        console.log("综合"+debtResult);
                        $("#debtSum").text(fmoney(debtResult, 2));
                        $("#debtSum").attr("result",debtResult);
                        var assetMoney = $("#assetSum").attr("result");
					    var debtMoney = $("#debtSum").attr("result");
					    var result = assetMoney - debtMoney;
						$("#sumCash").text(fmoney(result, 2));
                      
                    }
            }, function (ts, message) {console.log(message)});
     });
	
}