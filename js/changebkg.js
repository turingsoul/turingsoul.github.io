var picNumber=1;  /*控制播放的图片*/
var dragFlag = true;  /*判断是否点击与松开*/
var gotIt = false;    /*判断是否拉到位*/
/*鼠标按下触发事件*/
$("#changbg").on("mousedown",function(e){
	dragFlag = true;
	console.log(e);
	$(document).on("mousemove",function(e){
		if(dragFlag){
			console.log("comming");
			if(e.clientY<=150){
				$("#changbg").animate({"top":(e.clientY-50)+"px"},0);	/*正常拖放*/
			}
			else{
				$("#changbg").animate({"top":(150+(e.clientY-150)/4+"px")},0);  /*减速拖放*/
				if(e.clientY>=450){
					gotIt=true;
				}
			}
			
		}
	});
})
/*鼠标离开触发事件*/
$(document).on("mouseup",function(e){
		dragFlag=false;
		if(!$("#changbg").is(":animated")){
			$("#changbg").animate({"top":0+"px"},700);
			if(picNumber<3){
				picNumber++;
				if(gotIt==true){
					$("body").css("background-image","url(../img/background"+picNumber+".jpg)");
					gotIt=false;
				}
			}
			else{
				picNumber=1;
				if(gotIt==true){
					$("body").css("background-image","url(../img/background"+picNumber+".jpg)");
					gotIt=false;
				}
			}
			
		}
})
/*填写计算结果*/
function writeNumber(a){
	
}


