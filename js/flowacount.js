/*设定分类*/
var dearflag=0;
/*增加消费*/
function addConsume(){
	dearflag=0;//设定为消费
	/*获取tag为1的资产项目名称*/
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select AssetName from AssetTable where AssetTag = ?", [Base64.encode("1")],function (ts, data) {
	    	       	    var a  = new Array(data.rows.length);
	                    if (data){
	                        for (var i = 0; i < data.rows.length; i++) {
	                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
	                             a[i] = Base64.decode(data.rows.item(i).AssetName);
	                             
	                        }
	                        /*将数据显示出来*/
	                       console.log("我要现实的数据");
	                       for(var i=0;i<data.rows.length;i++){
	                    		console.log(a[i]);   		
	                       }
	                       /*调用生成函数*/
	                       showSelectTag(a);
	                       /*getSum1();*/
	                    }
	            }, function (ts, message) {
	            });
	           
         });
}
/*展示现金项的下拉菜单*/
function showSelectTag(a){
	$("#addConsumeBoard").show(0);
	/*获取焦点*/
	$("#consume_add1").focus();
	var strLength = a.length;
	$("#consumeSelector").children().remove();
	for(var i=0;i<strLength;i++){
		$("#consumeSelector").append("<option>"+a[i]+"</option>");
	}
	/*初始化生成的select*/
	$('#consumeSelector').selectlist({
					zIndex: 11,
					width: 400,
					height: 30,
					showMaxHeight:250,
					triangleSize: 6,   //右侧小三角大小
           			triangleColor: '#cd992f'  //右侧小三角颜色
				});
}
/*监听取消按钮*/
$("#consumeCancel").on("click",function(){
	$("#addConsumeBoard").hide(500);
})
/*监听确定按钮*/
$("#consumeCheck").on("click",function(){
	if(checkConsumeData()){
		/*数字验证正确*/
		/*先执行增删操作*/
		excuteConsume();
		/*在执行数据库添加流水账操作*/
		excuteAddFlow();
	}
})
/*验证数据正确性*/
function checkConsumeData() {
	var nodeName = $("#consume_add1").val();
	var nodeValue = $("#consume_add2").val();
	/*非空验证*/
	if (nodeName == "" || nodeValue == "") {
		$("#consumeTips").text("内容不能为空");
		return 0;
	} else if (isNaN(nodeValue) == 1) {
		$("#consumeTips").text("金额必须填写数字");
		return 0;
	} else if (nodeValue < 0) {
		$("#consumeTips").text("金额必须是正数");
		return 0;
	} else {
		$("#consumeTips").text("");
		return 1;
	}
}
/*执行数据库增删操作*/
function excuteConsume(){
	/*获取数据*/
	var nodeName = $("#consume_add1").val();
	var nodeValue = $("#consume_add2").val(); 
	/*获取类别*/
	var nodeCatogery = $("#consumeSelector input.select-button").attr("value");
	/*将数据更新到数据库中*/
	var db = getCurrentDb();
	/*先将值查出来*/
	db.transaction(function (trans) {
				trans.executeSql("select * from AssetTable where AssetName = ?", [Base64.encode(nodeCatogery)],function (ts, data) {
						var resultValue = Base64.decode(data.rows.item(0).AssetValue);
	    	       	   console.log(resultValue);
		    	       	   db.transaction(function (trans) {
		    	       	   		if(dearflag==0){
				    	       	   			var tominus = resultValue-nodeValue;
				    	       	   			if(tominus>=0){
				    	       	   			trans.executeSql("update AssetTable set AssetValue = ? where AssetName = ?", [Base64.encode(tominus),Base64.encode(nodeCatogery)],function (ts, data) {
							    	       	    /*刷新*/
									    	    /*最后隐藏面板清空痕迹*/
												$("#addConsumeBoard").hide(500);
												/*填写内容归位*/
												$("#consume_add1").val("");
											    $("#consume_add2").val("");
											    showAssetSum();
											    showAllTheData();
								            }, function (ts, message) {
								            });
					    	       	   		}
					    	       	   		else{
					    	       	   			$("#consumeTips").text("小土豪，钱不够了");
					    	       	   		}
		    	       	   		}
		    	       	   		else{
				    	       	   			var tominus = parseFloat(resultValue)+parseFloat(nodeValue);
				    	       	   			trans.executeSql("update AssetTable set AssetValue = ? where AssetName = ?", [Base64.encode(tominus),Base64.encode(nodeCatogery)],function (ts, data) {
							    	       	    /*刷新*/
							    	       	  	showmyFlowAcount();
									    	    /*最后隐藏面板清空痕迹*/
												$("#addConsumeBoard").hide(500);
												/*填写内容归位*/
												$("#consume_add1").val("");
											    $("#consume_add2").val("");
											    showAssetSum();
											    showAllTheData();
								            }, function (ts, message) {
								            });
		    	       	   		}
		    	       	   		
		    	       	   		
								
					           
	      					});
	            }, function (ts, message) {
	            	
	            });
	           
         });
	
	
}
/*增加收入*/
function addMoney(){
	dearflag=1;//设定为收入
	/*获取tag为1的资产项目名称*/
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("select AssetName from AssetTable where AssetTag = ?", [Base64.encode("1")],function (ts, data) {
	    	       	    var a  = new Array(data.rows.length);
	                    if (data){
	                        for (var i = 0; i < data.rows.length; i++) {
	                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
	                             a[i] = Base64.decode(data.rows.item(i).AssetName);
	                             
	                        }
	                        /*将数据显示出来*/
	                       console.log("我要现实的数据");
	                       for(var i=0;i<data.rows.length;i++){
	                    		console.log(a[i]);   		
	                       }
	                       /*调用生成函数*/
	                       showSelectTag(a);
	                       /*getSum1();*/
	                    }
	            }, function (ts, message) {
	            });
	           
         });
}
/*添加数据到流水账表单里面*/
function excuteAddFlow(){
	/*初始化流水表*/
	initFlowAcount();
	/*获取数据*/
	var nodeName = $("#consume_add1").val();
	var nodeValue = $("#consume_add2").val(); 
	/*无条件添加到数据库中*/
	var db = getCurrentDb();
	db.transaction(function (trans) {
				trans.executeSql("insert into FlowTable(flowName,flowValue) values(?,?)", [nodeName,nodeValue],function (ts, data) {
	    	       	showmyFlowAcount();   
	            }, function (ts, message) {
	            });
	           
         });
}
/*添加流水账切换显示*/
$("#showTablePanel").slideToggle(5,function(){
		if($("#showTablePanel").is(":hidden")){
			$("#clickToggle").animate({top:"0px"},5);
		}else{
			$("#clickToggle").animate({top:"150px"},5);
		}
	});
$("#clickToggle").on("click",function(){
	$("#showTablePanel").slideToggle(5,function(){
		if($("#showTablePanel").is(":hidden")){
			$("#clickToggle").animate({top:"0px"},5);
		}else{
			$("#clickToggle").animate({top:"150px"},5);
			/*调用显示流水账的函数*/
			showmyFlowAcount();
		}
	});
})
	
function showmyFlowAcount(){
	
	var db = getCurrentDb();
	db.transaction(function (trans) {
        trans.executeSql("select * from FlowTable ", [], function (ts, data) {
        	var a  = new Array(data.rows.length);
        	var b = new Array(data.rows.length);
            if (data){
                for (var i = 0; i < data.rows.length; i++) {
                     a[i] = data.rows.item(i).flowName;
                     b[i] = data.rows.item(i).flowValue;
                }
                $("#flowTable").children().remove();
                var wolength = data.rows.length;
                if(wolength<=20){
                	wolength = data.rows.length;
                }else{
                	wolength = 20;
                }
                
               for(var i=data.rows.length-1,j=0;j<wolength;i--,j++){
               		$("#flowTable").append("<tr ><td>"+a[i]+"</td><td>"+b[i]+"</td></tr>");
               }
            }
            
        }, function(ts, message) {initFlowAcount();});
    });
}
