var cx,cw,ch,cxt;


function initCanvas(CanvasId){
	cx=document.getElementById(CanvasId);//画板

	cw=cx.width;ch=cx.height;cxt=cx.getContext("2d");
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

 	console.log("call Obj");

 	this.x=x?x:0;
 	this.y=y?y:0;
 	this.w=w?w:0;
 	this.h=h?h:0;
 	this.xspeed=xspeed?xspeed:0;
 	this.yspeed=yspeed?yspeed:0;
 	this.clearRect=function(){
 		cxt.clearRect(this.x,this.y,this.w,this.h);
 	}
 	this.rect=function(){
 		var o=this;
 		cxt.fillStyle = "#006699";
 		cxt.strokeStyle = "#006699";
 		cxt.fillRect(o.x,o.y,o.w,o.h);
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
 	this.g=1;
 	this.setDirection=function(direction){
 		this.direction=direction;
 	}
 	this.jump=function(){
 		this.yspeed=12;
 	}

 	this.rect();
 	this.run=function(){
 		var o=this;
		//清除原来图像
		o.clearRect();
		o.y-=o.yspeed;

		//到达顶部
		if(o.y<=0){
			o.yspeed=0;
			o.y=0;
		}

		if(o.y<(ch-o.h)){
			o.yspeed-=o.g;
		}else{
			o.yspeed=0;
			o.y=ch-o.h;
		}

 		// /console.log(o.direction)
		if(o.x<=0){
			o.direction=2;
		}else if(o.x>=cw){
			o.direction=0;
		}
		//2 向右 0 左
		switch(o.direction){ 
			case 2:o.x+=o.xspeed;break; 
			case 0:o.x-=o.xspeed;break; 
		}
		if(o.xspeed<20){
			o.xspeed+=o.g;
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
		o.clearRect();
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