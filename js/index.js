$(function(){
	//左固定色块
	var arrl=["#f2756f","#f5bc6d","#53d6b7","#2074d4","#6b6fdb","#9dd653","#16c69f","#319ee1"];
			for(var i in arrl){
			$("#left-g li").eq(i).css("background",""+arrl[i]+"");
			$("#tj li").eq(i).css("background",""+arrl[i]+"");
			$("#left-g li .ss").eq(i).css({"border-top":"0.21rem solid "+arrl[i]+"","border-bottom":"0.21rem solid "+arrl[i]+""});
			$("#tj li .xss").eq(i).css({"border-left":"0.3rem solid "+arrl[i]+"","border-right":"0.3rem solid "+arrl[i]+""})
			}
	//添加文本页面出现
	$(".write").on("touchstart",function(){
		$("#tj").removeClass();
		$("#tj").addClass("run-l");
	})
//	添加文本页面返回
	$("#tj .header1 .l").on("touchend",function(){
		$("#tj").removeClass();
		$("#tj").addClass("run-r");
	})
	//左边固定
	var startpos;
	$(".zong").on("touchstart","#main",function(e){
		startpos=e.originalEvent.changedTouches[0].clientX;
	})
	$(".zong").on("touchend","#main",function(e){
		var endpos=e.originalEvent.changedTouches[0].clientX;
		if(startpos<80&&endpos-startpos>50){
			$("#left-g").removeClass().addClass("lg-r");
			$("#zong1").removeClass().addClass("lg-r-h");
			n=n+1;
		}
		
		if(endpos-startpos<-50){
			$("#left-g").removeClass().addClass("lg-l");
			$("#zong1").removeClass().addClass("lg-l-h");
			n=n+1;
		}
	})
	//向下滑动
	var startposY;
	$(".zong").on("touchstart","#main",function(e){
		startposY=e.originalEvent.changedTouches[0].clientY;
	})
	$(".zong").on("touchend","#main",function(e){
		var endposY=e.originalEvent.changedTouches[0].clientY;
		if(endposY-startposY>50){
			$("#wan").removeClass().addClass("wan").delay(100).queue(function(){
				$("#wan .ax").css("display","block");
				$(this).dequeue();
			})
		}
		
		if(endposY-startposY<-50){
			$("#wan .ax").css("display","none").delay(100).queue(function(){
				$("#wan").removeClass().addClass("wan1");
				$(this).dequeue();
			})
			
		}
	})
	//完成与未完成中三角形和字体
	$("#wan .san1").eq(0).css("display","block");
	$("#wan .ax").eq(0).css({"color":"#0CBB9E"});
	$("#wan ").on("click",".ax",function(){
		var index=$(this).index();
		$("#wan .san1").css("display","none").eq(index).css("display","block");
		$("#wan .ax").css({"color":"#4c5c5b"}).eq(index).css({"color":"#0CBB9E"});
	})
	//左边固定三角形
	$("#left-g li .ss").eq(0).css("display","block");
	$("#left-g").on("click","li",function(){
		var index=$(this).index();
		$("#left-g li .ss").css("display","none").eq(index).css("display","block");
	})
	//左固定上下滑动
	var sy;
	$("#left-g ul").on("touchstart",function(e){
		sy=e.originalEvent.changedTouches[0].clientY;
	})
	$("#left-g ul").on("touchmove",function(e){
		var mx=e.originalEvent.changedTouches[0].clientY-sy;
		$("#left-g ul").css({"marginTop":mx+"px"});
	})
	//添加页面左右滑动
	var sx;
	$(".main1 ul").on("touchstart",function(e){
		sx=e.originalEvent.changedTouches[0].clientX;
	})
	$(".main1 ul").on("touchmove",function(e){
		var mx=e.originalEvent.changedTouches[0].clientX-sx;
		$(".main1 ul").css({"marginLeft":mx+"px"});
	})
//	添加页面中固定
	//三角形
	$("#tj li .xss").eq(0).css("display","block");
	$("#tj li div:first-child").eq(0).addClass("div-d");
	$("#tj").on("click","li",function(){
		var index=$(this).index();
		$("#tj li .xss").css("display","none").eq(index).css("display","block");
		$("#tj li div:first-child").removeClass().eq(index).addClass("div-d");
	})

//添加信息
	var tj=$("#tj .header1 .r");
	var tex=$("input");
	var uln=$("#mn");
	var lin=$("#mn li");
	var todo=[];
	var stpos;
	var a;
	uln.on("touchstart"," li",function(e){
		stpos=e.originalEvent.changedTouches[0].clientX;
	})
	uln.on("touchend"," li",function(e){
		var enpos=e.originalEvent.changedTouches[0].clientX;
		if(enpos-stpos>50){
		 	var index=$(this).index();
		 	todo.splice(index,1);
			localStorage.todo=JSON.stringify(todo);
			$(this).addClass('del-r');
			$(this).delay(300).queue(function(){
				$(this).remove().dequeue();
			})
		}
		if(enpos-stpos<-50){
			var index=$(this).index();
		 	todo.splice(index,1);
			localStorage.todo=JSON.stringify(todo);
			$(this).addClass('del-l');
			$(this).delay(300).queue(function(){
				$(this).remove().dequeue();
			})
		}
	})
	if(localStorage.todo){
		todo=JSON.parse(localStorage.todo);
		render();
	}
	tj.on("touchend",function(){
		var v=$.trim(tex.val());
		if(!v){
			return;
		}
		var todon={
			name:v,
			state:0
		}
		todo.push(todon);
		localStorage.todo=JSON.stringify(todo);
		render();
		tex.val("");
		$("#tj").removeClass();
		$("#tj").addClass("run-r");
	})
	function render(){
		uln.empty();
		for(var i=0;i<todo.length;i++){
			var c=(todo[i].state)?'done':'';
			$("<li class='"+c+"'>"+todo[i].name+"<div class='co'></div></li>").appendTo(uln);
		}
	}

//主页左侧点击
		var n=0;
	$(".header .l").on("touchstart",function(){
		n=n+1;
		if(n%2!=0){
			$("#left-g").removeClass().addClass("lg-r");
			$("#zong1").removeClass().addClass("lg-r-h");
		}
		
		else if(n%2==0){
			$("#left-g").removeClass().addClass("lg-l");
			$("#zong1").removeClass().addClass("lg-l-h");
		}

		
	})
})






   