$(function(){
	var x=300,y=400,ow=20,oh=40;
	var cw=800,ch=400;
	var cxt=document.getElementById("myCanvas").getContext("2d");//初始化cxts
	var map = []; //记录障碍物

	cxt.fillStyle = "#006699";//内部填充颜色 
	cxt.strokeStyle = "#006699";//边框颜色 

	cxt.fillRect(x,y, ow, oh);//绘制矩形 

	var yspeed=0,g=1;
	var direction=1,xspeend=0;
	function is_boom(m,bx,by){
		return (bx>=m.x&&bx<=(m.x+m.rx)&& by>=m.y&& by<=(m.y+m.ry));
	}
	function bg_hz(){
		for(var i=0;i<map.length;i++){ 
			if(is_boom(map[i],x+ow,y)||is_boom(map[i],x+ow,y+oh)){ 
				alert("你挂了，继续努力吧！失败原因：撞到自己了.....");window.location.reload(); 
			}
			cxt.clearRect(map[i].x,map[i].y,map[i].rx,map[i].ry);
			console.log(map[i].y);
			map[i].x-=2;

			if(map[i].x<-map[i].rx){
				map.shift();
				continue;
			}
			cxt.fillStyle = "#006699";//内部填充颜色 
			cxt.strokeStyle = "#006699";//边框颜色 

			cxt.fillRect(map[i].x,map[i].y,map[i].rx,map[i].ry);//绘制矩形 

		}
	}
	var za_top=true;
	function rand_za(){
		
		if(za_top)
			map.push({'x':cw+Math.ceil(Math.random()*80),'y':0,'rx':60,'ry':120+Math.ceil(Math.random()*20)});
		else
			map.push({'x':cw+Math.ceil(Math.random()*80),'y':ch-120,'rx':60,'ry':160});

		za_top=!za_top;
	}
	function obj_jump(){
		cxt.clearRect(x,y, ow, oh);
		y-=yspeed;
		if(y<=0){
			yspeed=0;
			y=0;
		}
		if(y<ch){
			yspeed-=g;
		}else{
			yspeed=0;
			y=ch;
		}
		if(x<=0){
			direction=2;
		}else if(x>=cw){
			direction=0;
		}
		//2 向右 0 左
		switch(direction){ 
			case 2:x+=xspeend;break; 
			case 0:x-=xspeend;break; 
		}
		if(xspeend<20){
			xspeend+=g;
		}
		cxt.fillRect(x,y,ow,oh);//绘制矩形 
	}

	function jump(){
		bg_hz();
		obj_jump();
	}

	var intervalD = window.setInterval(jump,25);

	var intervalRZ = window.setInterval(rand_za,1400);
	document.onkeydown = function(e) { //改变蛇方向 

		if(e.keyCode==32){
			yspeed=12;
			return;
		}
		if(e.keyCode==37||e.keyCode==39){
			direction=e.keyCode - 37;
			return;
		}
	} 
})