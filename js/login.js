/*读取是否第一次使用*/
    var ifSecond=0;  //标签：验证登录密码
    var ifDouble=0;  //标签：验证密码重复
    var ifNameEmpty=0; //标签：验证昵称是否为空
	function showAllTheData() {
            var db = getCurrentDb();//获取当前数据库
            db.transaction(function (trans) {
                trans.executeSql("select * from UserTable ", [], function (ts, data) {/*读取用户表*/
                	var rowLength  = data.rows.length;   //判断是否有数据
                    if(rowLength!=0){/*有数据*/
                    	/*读取数据库用户信息表*/
                    	getMaster();
                    	$("#showArea").append("<input / type='password' placeholder='密码' id='checkpassword'>");
                    	$("#showArea").append("<input type='button' id ='check' value='登录' onclick='checkInfo();'>");
                    	$("#showArea").append("<label id='passwordtips'></label>");
                    	$("#checkpassword").focus();
                    	/*绑定回车事件*/
                    	$("#checkpassword").on("keydown",function(e){
							if(e.which==13){
								checkInfo();
							}
							
                    	})
                    }
                      else{/*没数据*/
                      	console.log(rowLength);
                      	/*第一次使用，请求用户输入数据*/
                        $("#showArea").append("<h1>CashFlowManager</h1><br>")
                      	$("#showArea").append("<input / placeholder='设置昵称' id='nickname'><br>")
                    	$("#showArea").append("<input / placeholder='设置密码' id='password1' type='password'>");
                    	$("#showArea").append("<input / placeholder='确认密码' id='password2' type='password'>");
                    	$("#showArea").append("<input type='button' id ='submit' value='注册' onclick='initInfo();'>");
                    	$("#showArea").append("<label id='tips'></label>");
                    	$("#showArea").append("<label id='nicknametips'></label>");
                    	$("#nickname").focus();
                    	/*绑定回车监听*/
                    	$("#password2").on("keydown",function(e){
                    		if(e.which==13){
                    			initInfo();	
                    		}
						})
                      }
                    
                    
                    
                }, function(ts, message) {alert(message);var tst = message;});
            });
    }
	/*首次使用添加用户信息*/
	function initInfo(){
		if(check()){
			var nickname = $("#nickname").val();
			var password = md5($("#password1").val());
			console.log("nickname:"+nickname);
			/*新增用户*/
			var db = getCurrentDb();
			db.transaction(function (trans) {
		            trans.executeSql("insert into UserTable(Nickname,Password) values(?,?) ", [nickname,password], function (ts, data) {
	    	        window.location.reload(); 
		            }, function (ts, message) {alert(message);});
	         });
		}
		
         
	}
	/*获取用户信息*/
	function getMaster(){
		var result = [];
		var db = getCurrentDb();
        db.transaction(function (trans) {
	            trans.executeSql("select * from UserTable ", [], function (ts, data) {
            	var userName  = data.rows.item(0).Nickname;
            	var passWord = data.rows.item(0).Password;
        		result[0]=userName;
        		result[1]=passWord;
        		$("#showArea").prepend("<h1>"+result[0]+"</h1>");
            }, function(ts, message) {alert(message);var tst = message;});
        });
	}
	/*验证登录密码*/
	function checkInfo(){
		var result = [];
		var db = getCurrentDb();
        db.transaction(function (trans) {
	            trans.executeSql("select * from UserTable ", [], function (ts, data) {
            	var userName  = data.rows.item(0).Nickname;
            	var passWord = data.rows.item(0).Password;
        		result[0]=userName;
        		result[1]=passWord;
        		console.log(userName);
        		console.log(passWord);
        		var inputPassword = $("#checkpassword").val();
        		console.log(inputPassword);
        		var md5pass = md5(inputPassword);
        		console.log(md5pass);
        		if(md5pass==result[1]){
        			alert("登录成功");
        			window.location.href="html/vision.html";
        			
        		}
        		else{
        			
        			if(ifSecond==0){
        				$("#passwordtips").text("密码错误请重新输入");	
        				ifSecond=1;
        			}
        			/*设置改正监听*/
        			$("#checkpassword").on("focus",function(){
        				if(ifSecond==1){
        				$("#passwordtips").text("");
        				ifSecond=0;
        				}
        			})
        		}
            }, function(ts, message) {alert(message);var tst = message;});
        });
        
	}
	/*验证*/
	function check(){
		flag=1;
		var name = $("#nickname").val();
		var pass1 = $("#password1").val();
		var pass2 = $("#password2").val();
		/*检查密码一致*/
		if(pass1!=pass2){
			if(ifDouble==0){
				$("#tips").text("两次密码不一致");
				$("#password1").focus();
				flag=0;
				ifDouble=1;
			}
			
			
			$("#password1").on("focus",function(){
				if(ifDouble==1){
				$("#tips").text("");
				ifDouble=0;
				}
			})
			$("#password2").on("focus",function(){
				if(ifDouble==1){
				$("#tips").text("");
				ifDouble=0;
				}
			})
		}
		
		/*检查用户名不为空*/		
		if(name==""){
			if(ifNameEmpty==0){
			$("#nicknametips").text("用户名不能为空");
			flag=0;
			ifNameEmpty=1;
			}
			$("#nickname").on("focus",function(){
				if(ifNameEmpty==1){
					$("#nicknametips").text("");
					ifNameEmpty=0;
				}
				
			})
		}
		return flag;
	}
	
	
	
	 