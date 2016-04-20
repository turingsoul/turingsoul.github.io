function exportChart(){
//	$.ajax({
//				url: '/asd',
//				type:"post",
//				data:{a:1,b:2},
//				dataType:"JSON",
//				success:function(response){
//					
//				},
//				error:function(response){
//					console.log("wrong");
//					console.log(response);
//				}
//			});	
	$.post('/asd', {a:1,b:2}, function(res) {
		console.log("right");
		console.log(res);
	});
}

