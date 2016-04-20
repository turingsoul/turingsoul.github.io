 function drawPercentage(before,now){
 	
 	var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.03;
    config4.circleColor = "#808015";
    config4.textColor = "#ffffff";
    config4.waveTextColor = "#123456";
    config4.waveColor = "#AAAA39";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 3;
    var gauge5 = loadLiquidFillGauge("fillgauge",before,config4);
    gauge5.update(now);
    
 }
 function drawUrgent(){
 	var now=0;
 	var one = Base64.encode("1");
 	var result = 0;
 	var db = getCurrentDb();
 	db.transaction(function (trans) {
	        trans.executeSql("select * from AssetTable where AssetTag = ? ", [one], function (ts, data) {
	        	var a  = data.rows.length;
            	var AssetName  = new Array(data.rows.length);
            	var AssetValue  = new Array(data.rows.length);
            	if (data){
                    for (var i = 0; i < a; i++) {
                        /*appendDataToTable(data.rows.item(i));//获取某行数据的json对象*/
                         AssetName[i] = data.rows.item(i).AssetName;
                         AssetValue[i] = data.rows.item(i).AssetValue;
                         result= result+parseFloat(Base64.decode(AssetValue[i]));
                    }
                    var father = $("#outputSum").attr("result");
                    var now = result/(father*6);
                    var before = $("#fillgauge6").attr("result");
                        if(before==undefined){
                        	before=0;
                        }
                    
                    if(now>0&&now<1000){
                    	$("#fillgauge6").children().remove();
	              		drawUrgentIndeed(before*100,now*100);     
	              		$("#fillgauge6").attr("result",now);	
                    }
                    
                }
	        }, function (ts, message) {console.log(message)});
	        
	 });
 	
 }
 function drawUrgentIndeed(before,now){
 	/*var config5 = liquidFillGaugeDefaultSettings();
    config5.circleThickness = 0.4;
    config5.circleColor = "#6DA398";
    config5.textColor = "#0E5144";
    config5.waveTextColor = "#6DA398";
    config5.waveColor = "#246D5F";
    config5.textVertPosition = 0.52;
    config5.waveAnimateTime = 1000;
    config5.waveHeight = 0;
    config5.waveAnimate = false;
    config5.waveCount = 9;
    config5.waveOffset = 0.25;
    config5.textSize = 0.8;
    config5.minValue =0;
    config5.maxValue = 100
    config5.displayPercent = false;*/
   var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.25;
    config4.circleColor = "#6DA398";
    config4.textColor = "#ffffff";
    config4.waveTextColor = "#000000";
    if(now<5){
    	config4.waveColor = "#ff0000";	
    }else if(now<10){
    	config4.waveColor = "#ff2200";
    }else if(now<15){
    	config4.waveColor = "#ff4400";
    }else if(now<20){
    	config4.waveColor = "#ee4400";
    }else if(now<25){
    	config4.waveColor = "#ee5500";
    }else if(now<30){
    	config4.waveColor = "#dd5500";
    }else if(now<35){
    	config4.waveColor = "#cc5500";
    }else if(now<40){
    	config4.waveColor = "#aa5500";
    }else if(now<45){
    	config4.waveColor = "#996600";
    }else if(now<50){
    	config4.waveColor = "#886600";
    }else if(now<55){
    	config4.waveColor = "#777700";
    }else if(now<60){
    	config4.waveColor = "#667700";
    }else if(now<65){
    	config4.waveColor = "#558800";
    }else if(now<70){
    	config4.waveColor = "#449900";
    }else if(now<75){
    	config4.waveColor = "#33aa00";
    }else if(now<80){
    	config4.waveColor = "#22bb00";
    }else if(now<85){
    	config4.waveColor = "#11cc00";
    }else if(now<90){
    	config4.waveColor = "#00dd00";
    }else if(now<95){
    	config4.waveColor = "#00ee00";
    }else{
    	config4.waveColor = "#00ff00";
    }
    
    
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 1;
    config4.displayPercent = false;
    var gauge6 = loadLiquidFillGauge("fillgauge6", before, config4);
    gauge6.update(now);
 }
 