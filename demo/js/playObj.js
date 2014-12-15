var cx,cw,ch,cxt;
var drawMap=[]
var g=0.2;
function initCanvas(CanvasId){
	cx=document.getElementById(CanvasId);//画板
	
	cx.height=document.body.offsetHeight;
	cx.width=document.body.offsetWidth;
	cw=cx.width;ch=cx.height;cxt=cx.getContext("2d");
	cxt.fillStyle = "#006699";
}
/**
 * Obj 游戏对象
 *******************************
 * @param x 初始x坐标
 * @param y 初始y坐标
 * @param w 宽度
 * @param h 高度
 * @param xspeed 初始x速度
 * @param yspeed 初始y速度
 *******************************
 * @return Obj 游戏对象
 **/
 function Obj(x,y,w,h,xspeed,yspeed){
	/*
	console.log("call Obj");*/

	this.x=x?x:0;
	this.y=y?y:0;
	this.w=w?w:0;
	this.h=h?h:0;
	this.xspeed=xspeed?xspeed:0;
	this.yspeed=yspeed?yspeed:0;

	this.rect=function(){
		drawMap.push([this.x,this.y,this.w,this.h]);
	}
}


/**
 * playObj 玩家对象
 *******************************
 * @param x 初始x坐标
 * @param y 初始y坐标
 * @param w 宽度
 * @param h 高度
 * @param xspeed 初始x速度
 * @param yspeed 初始y速度
 *******************************
 * @return playObj 玩家对象
 **/
 function playObj(x,y,w,h,xspeed,yspeed){

 	Obj.call(this,x,y,w,h,xspeed,yspeed);//效果类似继承，再调用父类方法
 	this.direction=1;
 	this.moveX=0;
 	this.moveY=0;
 	this.yspeedUp;
 	this.xspeedUp;
 	this.is_ysup=false;
 	this.is_xsup=false;
 	this.hp=100;
 	this.setKeyDown=function(direction){
 		var o=this;
 		switch(direction){ 
 			case 3:if(o.is_xsup){break};o.is_xsup=true;o.xspeedUp=setInterval(function(){o.moveX+=g},15);break; 
 			case 2:if(o.is_ysup){break};o.is_ysup=true;o.yspeedUp=setInterval(function(){o.moveY-=g},15);break; 
 			case 1:if(o.is_xsup){break};o.is_xsup=true;o.xspeedUp=setInterval(function(){o.moveX-=g},15);break; 
 		}
 	}

 	this.setKeyUp=function(direction){
 		var o=this;
 		switch(direction){ 
 			case 3:clearInterval(o.xspeedUp);o.is_xsup=false;break; 
 			case 2:clearInterval(o.yspeedUp);o.is_ysup=false;break; 
 			case 1:clearInterval(o.xspeedUp);o.is_xsup=false;break; 
 		}
 	}
 	this.injure=function(){
 		hp-=10;
 		if(hp<=20){
 			alert("Lose");
 		}
 	}
 	this.run=function(){
 		var o=this;
 		o.yspeed+=o.moveY+g;
 		o.moveY=0;
 		o.xspeed+=o.moveX;
 		o.moveX=0;
 		o.y+=o.yspeed;

		//到达顶部
		if(o.y<0){
			o.yspeed=0;
			o.y=0;
		}else if(o.y>ch-o.h){
			
			o.yspeed=0;
			o.y=ch-o.h;
		}
		console.log(o.yspeed);
		o.xspeed+=(o.xspeed>0?-0.01:0.01);
		

	/*	//限制最高速度
		if(o.xspeed>=10){
			o.xspeed=10;
		}else if(o.xspeed<=-10){
			o.xspeed=-10;
		}
		*/
		o.x+=o.xspeed;

		if(o.x>=cw){
			o.xspeed=0;

			o.x=cw;
		}else if(o.x<-o.w){

			o.xspeed=0;
			o.x=0;
		}

		o.rect();
	};

}

/**
 * zaObj 障碍物对象
 *******************************
 * @param x 初始x坐标
 * @param y 初始y坐标
 * @param w 宽度
 * @param h 高度
 * @param xspeed 初始x速度
 * @param yspeed 初始y速度
 *******************************
 * @return zaObj 障碍物对象
 **/
 function zaObj(x,y,w,h,xspeed,yspeed){


	Obj.call(this,x,y,w,h,xspeed,yspeed);//效果类似继承，再调用父类方法

	this.check=function(playObj){

		var o=this;
		if(is_boom(o,playObj)){
			return 1;
		}
		o.x-=xspeed;
		if(o.x<-o.w){
			return 2;
		}
		o.rect();
		return 0;
	}


}

var za_top=true;

function getZA(){
	if(za_top=!za_top){
		return new zaObj(
			cw+Math.ceil(Math.random()*80),
			0,
			60,
			120+Math.ceil(Math.random()*20),
			2,
			0
			);
	}else{
		return new zaObj(
			cw+Math.ceil(Math.random()*80),
			ch-120,
			60,
			160,
			2,
			0
			);
	}
}

var zdMap=[];
function zdObj(m){

	
	Obj.call(this,m.x,m.y,4,4,0,0);//效果类似继承，再调用父类方法
	this.speed=10;
	this.dw=function(mx,my){
		my=my<100?100:my*1.2;
		var cx=mx-this.x;
		var cy=my-this.y;
		var cxy=Math.sqrt(cx*cx+cy*cy);
		this.xspeed=this.speed*cx/cxy;
		this.yspeed=this.speed*cy/cxy;
	}
	this.dw(aPlayer.x,aPlayer.y);

	this.check=function(){

		var o=this;
		if(is_boom(o)){
			return 1;
		}
		o.x+=o.xspeed;
		o.y+=o.yspeed;
		o.yspeed+=g/6;
		//console.log("zd"+this.y);

		if(o.x<-o.w||o.y<-o.h||o.x>cw||o.y>ch){
			//console.log("xspeed:"+o.xspeed+"x:"+o.x+";y:"+o.y+";w:"+o.w+";h:"+o.h+";cw:"+cw+";ch:"+ch);
			return 2;
		}else{
			o.rect();
			return 0;
		}
	}
}
function tankObj(){
	Obj.call(this,Math.ceil(Math.random()*2)*cw-cw,ch-20,40,20);//效果类似继承，再调用父类方法
	this.is_fire=false;
	this.run=function(){
		var o=this;
		if (o.is_fire) {

			o.rect();
			return;
		}
		if(o.x<-o.w){
			o.xspeed=Math.random()*5;
		}else if(o.x>cw){
			//console.log(o.x)
			o.xspeed=-Math.random()*5;
		}
		o.x+=o.xspeed;

		o.xspeed+=(o.xspeed>0?-0.01:0.01);
		if(Math.abs(o.xspeed)<=0.01){
			
			o.xspeed=5-Math.random()*10;
			
		}

		o.rect();
	}

	this.fire=function(){
		//console.log("fire");
		var o=this;

		setTimeout(function(){
			o.fire();
		},3100);
		zdMap.push(new zdObj(o));
		setTimeout(function(){
			zdMap.push(new zdObj(o));
		},50);
		setTimeout(function(){
			zdMap.push(new zdObj(o));
		},170);
		setTimeout(function(){
			zdMap.push(new zdObj(o));
		},150);
		setTimeout(function(){
			zdMap.push(new zdObj(o));
		},200);
	}
	this.fire();
	
}