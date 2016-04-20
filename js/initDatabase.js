/*
	 * * * * *                               * * * * * * * * * * * * * 
	 * * * * *          *  *   *  *          * * * * * * * * * * * * * 
	 * * * * *           *       *           * * * * * * * ** * * * * 
	 * * * * *             * * *             * * * * * * * * ** * * * 
	 * 
	 * 初始化数据库  initdatabase*/ 
	function getCurrentDb() {
        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
        //如果数据库不存在那么创建之
        var db = openDatabase("richdad", "1.0", "现金流个人管理软件", 1024 * 1024);
        return db;
    }
	function getCurrentDb1() {
        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
        //如果数据库不存在那么创建之
        var db = openDatabase("richdad1", "1.0", "现金流个人管理软件", 1024 * 1024);
        return db;
    }
	/*初始化用户表 init usertable*/
	function initUserTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists UserTable(Nickname text null,Password text null)", [], function (trans, result) {
                }, function (trans, message) {//消息的回调函数alert(message);});
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化收入表*/
	function initInputTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists InputTable(InputName text null,InputValue text null,InputTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化支出表*/
	function initOutputTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists OutputTable(OutputName text null,OutputValue text null,OutputTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化支出表*/
	function initAssetTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists AssetTable(AssetName text null,AssetValue text null,AssetTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化支出表*/
	function initDebtTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists DebtTable(DebtName text null,DebtValue text null,DebtTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化流水账表*/
	/*初始化用户表 init usertable*/
	function initFlowAcount() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists FlowTable(flowName text null,flowValue text null)", [], function (trans, result) {
                }, function (trans, message) {//消息的回调函数alert(message);});
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*读取收入表*/
	/*
	 * 
	 * 读取数据库中的信息
	 */
	  function showAllTheData() {
	  		showAllTheSum();
	  		drawUrgent();
	  		showPassiveCash();
	  		
	  	    /*清空各个表格内的行元素*/
            $("#first tr").detach();
            $("#second tr").detach();
            $("#third tr").detach();
            $("#forth tr").detach();
            
            var db = getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("select * from InputTable ", [], function (ts, data) {
                	var a  = new Array(data.rows.length);
                	var b = new Array(data.rows.length);
                    if (data){
                        for (var i = 0; i < data.rows.length; i++) {
                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
                             a[i] = data.rows.item(i).InputName;
                             b[i] = data.rows.item(i).InputValue;
                        }
                        /*将数据显示出来*/
                       for(var i=0;i<data.rows.length;i++){
                       		$("#first").append("<tr ondblclick='inputUpdate(this)'><td>"+Base64.decode(a[i])+"</td><td>"+Base64.decode(b[i])+"</td><td class='delete' onclick='deleteInputTr(this)'>x</td></tr>");
                       }
                       /*getSum1();*/
                    }
                    
                    
                    /*第二层*/
				                     db.transaction(function (trans) {
				                trans.executeSql("select * from OutputTable ", [], function (ts, data) {
				                	var a  = new Array(data.rows.length);
				                	var b = new Array(data.rows.length);
				                    if (data){
				                        for (var i = 0; i < data.rows.length; i++) {
				                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
				                             a[i] = data.rows.item(i).OutputName;
				                             b[i] = data.rows.item(i).OutputValue;
				                        }
				                        /*将数据显示出来*/
				                       for(var i=0;i<data.rows.length;i++){
				                       		$("#second").append("<tr ondblclick='outputUpdate(this)'><td>"+Base64.decode(a[i])+"</td><td>"+Base64.decode(b[i])+"</td><td class='delete' onclick='deleteOutputTr(this)'>x</td></tr>");
				                       }
				                       /*getSum1();*/
				                    }
				                        /*第三层*/
											db.transaction(function (trans) {
							                trans.executeSql("select * from AssetTable ", [], function (ts, data) {
							                	var a  = new Array(data.rows.length);
							                	var b = new Array(data.rows.length);
							                    if (data){
							                        for (var i = 0; i < data.rows.length; i++) {
							                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
							                             a[i] = data.rows.item(i).AssetName;
							                             b[i] = data.rows.item(i).AssetValue;
							                        }
							                        /*将数据显示出来*/
							                       for(var i=0;i<data.rows.length;i++){
							                       		$("#third").append("<tr ondblclick='assetUpdate(this)'><td>"+Base64.decode(a[i])+"</td><td>"+Base64.decode(b[i])+"</td><td class='delete' onclick='deleteAssetTr(this)'>x</td></tr>");
							                       }
							                       /*getSum1();*/
							                    }
							                      /*第四层*/
														db.transaction(function (trans) {
										                trans.executeSql("select * from DebtTable ", [], function (ts, data) {
										                	var a  = new Array(data.rows.length);
										                	var b = new Array(data.rows.length);
										                    if (data){
										                        for (var i = 0; i < data.rows.length; i++) {
										                            /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
										                             a[i] = data.rows.item(i).DebtName;
										                             b[i] = data.rows.item(i).DebtValue;
										                        }
										                        /*将数据显示出来*/
										                       for(var i=0;i<data.rows.length;i++){
										                       		$("#forth").append("<tr ondblclick='debtUpdate(this)'><td>"+Base64.decode(a[i])+"</td><td>"+Base64.decode(b[i])+"</td><td class='delete' onclick='deleteDebtTr(this)'>x</td></tr>");
										                       }
										                       /*getSum1();*/
										                    }
										                    /*调用下载准备*/
										                     prepareDownload();
										                     /*显示饼图*/
										                     showCakeChart();
										                }, function(ts, message) {initDebtTable();});
										            });
							                }, function(ts, message) {initAssetTable();});
							            });
				                }, function(ts, message) {initOutputTable();});
				            });
                    
                }, function(ts, message) {initInputTable();});
            });
          
          
          
           	
        }
	  
	  /*删除收入表指定信息*/
	   function deleteInputData(e) {
            var db = getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("delete from InputTable where InputName = ?", [Base64.encode(e)], function (ts, data) {
                	/*删除完毕，刷新数据*/
                	showAllTheData();
                }, function(ts, message) {alert(message);var tst = message;});
            });
        }
	   /*删除支出表指定信息*/
	   function deleteOutputData(e) {
            var db = getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("delete from OutputTable where OutputName = ?", [Base64.encode(e)], function (ts, data) {
                	/*删除完毕，刷新数据*/
                	showAllTheData();
                }, function(ts, message) {alert(message);var tst = message;});
            });
        }
	   /*删除资产表指定信息*/
	   function deleteAssetData(e) {
            var db = getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("delete from AssetTable where AssetName = ?", [Base64.encode(e)], function (ts, data) {
                	/*删除完毕，刷新数据*/
                	showAllTheData();
                }, function(ts, message) {alert(message);var tst = message;});
            });
        }
	   /*删除债务表指定信息*/
	   function deleteDebtData(e) {
            var db = getCurrentDb();
            db.transaction(function (trans) {
                trans.executeSql("delete from DebtTable where DebtName = ?", [Base64.encode(e)], function (ts, data) {
                	/*删除完毕，刷新数据*/
                	showAllTheData();
                }, function(ts, message) {alert(message);var tst = message;});
            });
        }
	   /*根据名字查询flag*/
	  
	function currentTime(){
		 var d = new Date(),str = '';
		 str += d.getFullYear()+',';
		 str  += d.getMonth() + 1+',';
		 str  += d.getDate();
	     return str;
	}
	
	/*准备下载*/
	function prepareDownload(){
		
		$("#copyfirst").children().remove();
		var a = $("#first").children().clone();//添加表格一数据的同时复制dom元素
		$("#copyfirst").append(a);
		$("#copyfirst .delete").remove();
		
		$("#copysecond").children().remove();
		$("#copysecond").append($("#second").children().clone());
		$("#copysecond .delete").remove();
		
		$("#copythird").children().remove();
		$("#copythird").append($("#third").children().clone());
		$("#copythird .delete").remove();
		
		$("#copyfourth").children().remove();
		$("#copyfourth").append($("#forth").children().clone());
		$("#copyfourth .delete").remove();
		
		$("#displayone").text(" 固定月收入:"+$("#inputSum").text());
		$("#displaytwo").text(" 固定月支出:"+$("#outputSum").text());
		$("#displaythird").text(" 个人资产:"+$("#assetSum").text());
		$("#displayfourth").text(" 个人负债:"+$("#debtSum").text());
		
		$("#displaytotal").text("净资产:"+$("#sumCash").text());
		$("#displaypassive").text("被动收入:"+$("#passiveCash").text());
	}
	
	
