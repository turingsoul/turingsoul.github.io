/*显示现金流*/
function showCashFlowSum(a){
	var result = a.toFixed(2);
	var strLength = result.length;
	if(strLength>9){
		alert("恭喜你，已经成为土豪，请定制高版本CashFlow");
	}
	else if(strLength==9){
		$("#cashflow1").text(result.substring(0,1));
		$("#cashflow2").text(result.substring(1,2));
		$("#cashflow3").text(result.substring(2,3));
		$("#cashflow4").text(result.substring(3,4));
		$("#cashflow5").text(result.substring(4,5));
		$("#cashflow6").text(result.substring(5,6));
		$("#cashflow7").text(result.substring(7,8));
		$("#cashflow8").text(result.substring(8,9));
	}
	else if(strLength==8){
		$("#cashflow1").text(0);
		$("#cashflow2").text(result.substring(0,1));
		$("#cashflow3").text(result.substring(1,2));
		$("#cashflow4").text(result.substring(2,3));
		$("#cashflow5").text(result.substring(3,4));
		$("#cashflow6").text(result.substring(4,5));
		$("#cashflow7").text(result.substring(6,7));
		$("#cashflow8").text(result.substring(7,8));
	}
	else if(strLength==7){
		$("#cashflow1").text(0);
		$("#cashflow2").text(0);
		$("#cashflow3").text(result.substring(0,1));
		$("#cashflow4").text(result.substring(1,2));
		$("#cashflow5").text(result.substring(2,3));
		$("#cashflow6").text(result.substring(3,4));
		$("#cashflow7").text(result.substring(5,6));
		$("#cashflow8").text(result.substring(6,7));
	}
	else if(strLength==6){
		$("#cashflow1").text(0);
		$("#cashflow2").text(0);
		$("#cashflow3").text(0);
		$("#cashflow4").text(result.substring(0,1));
		$("#cashflow5").text(result.substring(1,2));
		$("#cashflow6").text(result.substring(2,3));
		$("#cashflow7").text(result.substring(4,5));
		$("#cashflow8").text(result.substring(5,6));
	}
	else if(strLength==5){
		$("#cashflow1").text(0);
		$("#cashflow2").text(0);
		$("#cashflow3").text(0);
		$("#cashflow4").text(0);
		$("#cashflow5").text(result.substring(0,1));
		$("#cashflow6").text(result.substring(1,2));
		$("#cashflow7").text(result.substring(3,4));
		$("#cashflow8").text(result.substring(4,5));
	}
	else if(strLength==4){
		$("#cashflow1").text(0);
		$("#cashflow2").text(0);
		$("#cashflow3").text(0);
		$("#cashflow4").text(0);
		$("#cashflow5").text(0);
		$("#cashflow6").text(result.substring(0,1));
		$("#cashflow7").text(result.substring(2,3));
		$("#cashflow8").text(result.substring(3,4));
	}
	else{
		alert("系统错误");
	}
	
}
/*计算总金额*/
function showCashSum(){
	
}
function showPassiveCash(){
	/*计算被动金额*/
	var one = Base64.encode("1");
	var two = Base64.encode("2");
	var three = Base64.encode("3");
	var four = Base64.encode("4");
	var five = Base64.encode("5");
	var six = Base64.encode("6");
	var seven = Base64.encode("7");
	var eight = Base64.encode("8");
	var nine = Base64.encode("9");
	var ten = Base64.encode("10");
	var eleven = Base64.encode("11");
	var twelve = Base64.encode("12");
	var assetResult = 0;
	var db = getCurrentDb();
	 db.transaction(function (trans) {
	        trans.executeSql("select * from InputTable where InputTag = ? or InputTag = ? or InputTag = ? or InputTag = ? or InputTag = ?", [two,three,nine,ten,eleven], function (ts, data) {
	        	
	        	var a  = data.rows.length;
	        	var InputName  = new Array(data.rows.length);
	        	var InputValue  = new Array(data.rows.length);
	        	
	        	if (data){
	                    for (var i = 0; i < a; i++) {
	                        /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
	                         InputName[i] = data.rows.item(i).InputName;
	                         InputValue[i] = data.rows.item(i).InputValue;
	                         assetResult= assetResult+parseFloat(Base64.decode(InputValue[i]));
	                    }
	                    console.log("存款3:"+assetResult);
	                    $("#passiveCash").text(fmoney(assetResult, 2));
	                  
	                }
	        }, function (ts, message) {console.log(message)});
	        
	 });
	
}

showPassiveCash();

/*数字与金额转换,四位隔开*/
function fmoney(s, n) //s:传入的float数字 ，n:希望返回小数点几位 
{ 
	 n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 4 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
} 
