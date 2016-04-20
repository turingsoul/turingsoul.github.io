
/*点击添加按钮操作*/
$("#outputPlus").on("click",function(){
	$("#addOutput").show(500);
	$("#output_add1").removeAttr("readonly");
	$("#otuput_add1").removeClass("text-get");
	/*聚焦操作*/
	$("#output_add1").focus();
})
/*取消操作*/
$("#btnOutputCancel").on("click",function(){
	/*隐藏弹出框*/
	$("#addOutput").hide(500);
	/*清空弹出框*/
	$("#output_add1").val("");
	$("#output_add2").val("");
	$("#outputTips").text("");
	/*恢复正常隐藏*/
	hideORshow1();
})
/*确定操作*/
$("#btnOutputSummit").on("click",function(){
	var nodeName = $("#output_add1").val();
	var nodeValue = $("#output_add2").val();
	var tag = $("#select_output").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	/*非空以及负数验证*/
	if(checkOutputData()){
		/*重复验证*/
		checkOutputRepeat(nodeName,nodeValue,tag,timeNow);
	}
})
/*验证填写数据的正确性
  正确返回1
  错误返回0
 * */
function checkOutputData(){
	var nodeName = $("#output_add1").val();
	var nodeValue = $("#output_add2").val();
	/*非空验证*/
	if(nodeName==""||nodeValue==""){
		$("#outputTips").text("内容不能为空");
		return 0;
	}
	else if(isNaN(nodeValue)==1){
		$("#outputTips").text("金额必须填写数字");
		return 0;
	}
	else if(nodeValue<0){
		$("#outputTips").text("金额必须是正数");
		return 0;
	}
	else{
		$("#outputTips").text("");
		return 1;
	}
}
/*添加操作*/
/*重复验证,无重复，则执行添加
                     有重复，则不执行添加
 * */
function checkOutputRepeat(nodeName,nodeValue,tag,timeNow){
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select OutputTag from OutputTable where OutputName = ?", [Base64.encode(nodeName)],function (ts, data) {
	    	       	if(data.rows.length!=0){
	    	       		$("#outputTips").text("名字重复");
	    	       	}
	    	       	else{
	    	       		/*添加数据进去*/
						/*初始化数据库输入表*/
						initOutputTable();
						var db = getCurrentDb();
						db.transaction(function (trans) {
					            trans.executeSql("insert into OutputTable(OutputName,OutputValue,OutputTag,CurrentTime) values(?,?,?,?) ", [Base64.encode(nodeName),Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow)], function (ts, data) {
				    	        $("#addOutput").hide(500);
				    	        $("#output_add1").val("");
				    	        $("#output_add2").val("");
				    	        showAllTheData();
					            }, function (ts, message) {console.log(message);});
				         });
	    	       	}
	            }, function (ts, message) {
	            });
	           
         });
}
/*删除一行*/
function deleteOutputTr(e){
			var $current = $(e);
			$current.parent().remove();
			/*获取这行的内容*/
			var toDeleteDate = $($current.parent().find("td").get(0)).text();
			/*数据库删除*/
			deleteOutputData(toDeleteDate);
}

/*打开更新数据弹出框*/
function outputUpdate(e){
	$("#output_add1").attr("readonly","readonly");
	
	$("#output_add1").addClass("text-get");
	/*$("#input_addinput").attr("readOnly","true");*/
	var $current = $(e);
	var nodeName = $($current.find("td").get(0)).text();
	var nodeValue = $($current.find("td").get(1)).text();
	var OutputTag = 0;  //tag
	var TagContent = ""; //tagcontent
	/*根据名称查询flag*/
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql("select OutputTag from OutputTable where OutputName = ?", [Base64.encode(nodeName)], function (ts, data) {
    	        OutputTag = Base64.decode(data.rows[0].OutputTag);
    	        TagContent = findOutputTagContent(OutputTag);
    	        showSelect1(OutputTag,TagContent);
    	        
	            }, function (ts, message) {console.log(message)});
         });
	$("#output_add1").val(nodeName);
	$("#output_add2").val(nodeValue);
	$("#addOutput").show(500);
	$("#btnOutputSummit").hide(0);
	$("#btnOutputUpdate").show(0);
	console.log(nodeName+nodeValue);
}
/*查询tag对应的内容*/
function findOutputTagContent(number){
	if(number ==1){
		return "衣服";
	}else if(number ==2 ){
		return "饮食";
	}else if(number ==3){
		return "住宿";
	}else if(number ==4){
		return "交通";
	}else if(number ==5){
		return "娱乐";
	}else if(number ==6){
		return "文化";
	}else if(number ==7){
		return "生活用品";
	}else if(number ==8){
		return "水电";
	}else if(number == 9 ){
		return "赡养";
	}
}
/*确认修改操作*/
$("#btnOutputUpdate").on("click",function(){
	var nodeName = $("#output_add1").val();
	var nodeValue = $("#output_add2").val();
	var tag = $("#select_output").find("input").get(0).value;//获得第一个input元素的value值
	var timeNow = currentTime();
	var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update OutputTable set OutputValue = ?,OutputTag = ?,CurrentTime=? where OutputName = ?", [Base64.encode(nodeValue),Base64.encode(tag),Base64.encode(timeNow),Base64.encode(nodeName)], function (ts, data) {
    	        $("#addOutput").hide(500);showAllTheData();
    	         $("#output_add1").val("");
    	        $("#output_add2").val("");
	            }, function (ts, message) {
	            	 $("#output_add1").val("");
    	        	 $("#output_add2").val("");
	            });
         });
	
})
/*显示支出总数*/
function showOutputSum(){
	var db = getCurrentDb();
	db.transaction(function (trans) {
            trans.executeSql("select * from OutputTable ", [], function (ts, data) {
            	console.log(data);
            	/*show items length*/
            	var a  = data.rows.length;
            	var OutputName  = new Array(data.rows.length);
            	var OutputValue  = new Array(data.rows.length);
            	/*get output sum*/
            	var outputResult = 0;
            	if (data){
                        for (var i = 0; i < a; i++) {
                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
                             OutputName[i] = data.rows.item(i).OutputName;
                             OutputValue[i] = data.rows.item(i).OutputValue;
                             console.log(Base64.decode(OutputName[i]),Base64.decode(OutputValue[i]));
                             outputResult= outputResult+parseFloat(Base64.decode(OutputValue[i]));
                        }
                        console.log("综合"+outputResult);
                        $("#outputSum").text(fmoney(outputResult, 2));
                        $("#outputSum").attr("result",outputResult);
                        var inputMoney = $("#inputSum").attr("result");
                        var outputMoney = $("#outputSum").attr("result");
                        var result = parseInt(inputMoney-outputMoney)
                       
                        var now = outputMoney/inputMoney;
                        var before = $("#fillgauge").attr("result");
                        if(before==undefined){
                        	before=0;
                        }
                        showCashFlowSum(result);
                         /*现金流添加到表格5中*/
                       $("#displaycashflow").text("现金流:"+result);    
                        if(now>0){
                        	$("#fillgauge").children().remove();
                        	drawPercentage(before*100,now*100);
                        	$("#fillgauge").attr("result",now);
                        }
                    }
            }, function (ts, message) {console.log(message)});
     });
	
}
