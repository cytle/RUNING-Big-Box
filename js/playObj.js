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
	this.is_delete=false;
	this.rect=function(type){
		drawMap.push([this.x,this.y,this.w,this.h,type?type:0]);
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
 	this.moveX=0;
 	this.moveY=0;
 	this.yspeedUp;
 	this.xspeedUp;
 	this.is_ysup=false;
 	this.is_xsup=false;
 	this.hp=0;
 	this.setKeyDown=function(direction){
 		var o=this;
 		switch(direction){ 
 			case 3:if(o.is_xsup){break};o.is_xsup=true;o.xspeedUp=setInterval(function(){o.moveX+=g},8);break; 
 			case 2:if(o.is_ysup){break};o.is_ysup=true;o.yspeedUp=setInterval(function(){o.moveY-=g},8);break; 
 			case 1:if(o.is_xsup){break};o.is_xsup=true;o.xspeedUp=setInterval(function(){o.moveX-=g},8);console.log(1);break; 
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
 	this.injure=function(zd){
 		this.hp-=10;

 		if(this.hp<=0){
 			this.hp=0;
 			gameOver(false);
 		}

 		setHp(this.hp);
 		console.log("injure");
 		this.xspeed+=zd.xspeed*0.9;
 		this.yspeed+=zd.yspeed*0.9;
 	}
 	this.run=function(){
 		if(is_over) return;
 		if(this.hp<100){
 			this.hp+=1/runTime;
 			setHp(this.hp);
 		}else{
 			gameOver(true);
 		}
 		var o=this;
 		o.yspeed+=o.moveY+g;
 		o.moveY=0;
 		o.xspeed+=o.moveX;
 		o.moveX=0;
 		


 		o.xspeed+=(o.xspeed>0?-0.01:0.01);


	/*	//限制最高速度
		if(o.xspeed>=10){
			o.xspeed=10;
		}else if(o.xspeed<=-10){
			o.xspeed=-10;
		}
		*/


		//到达顶部
		if(o.y<10){
			o.yspeed*=(-0.3);
			o.y=10;
		}else if(o.y>ch-o.h){
			o.yspeed*=(-0.3);
			o.y=ch-o.h;
		}
		o.y+=o.yspeed;

		if(o.x>cw-o.w){
			o.xspeed*=(-0.3);
			o.x=cw-o.w;
		}else if(o.x<0){
			o.xspeed*=(-0.3);
			o.x=0;
		}
		o.x+=o.xspeed;

		

		o.rect();
	};

}

var zdMap=[];
function zdObj(m,timeout){

	this.timeout=timeout;
	this.speed=(m.type==1)?24:18;
	this.oo=m;
	Obj.call(this,m.x,m.y,4-m.type,4-m.type);//效果类似继承，再调用父类方法
	
	//子弹定位，mx，my目标位置
	this.dw=function(mx,my){
		var o=this;
		o.x=o.oo.x+0.5*o.oo.w;
		o.y=o.oo.y+0.5*o.oo.h;
		my=my>ch-60?ch-60:my;
		var cx=mx-o.x;
		var cy=(my-o.y)*(Math.random()*0.5+0.8);
		var cxy=Math.sqrt(cx*cx+cy*cy);
		this.xspeed=o.speed*cx/cxy;
		this.yspeed=o.speed*cy/cxy;
	}

	this.check=function(){

		var o=this;
		if(o.timeout>=0){
			o.timeout-=runTime;
			return 0;
		}
		if(o.xspeed==0&&o.yspeed==0){
			o.dw(aPlayer.x,aPlayer.y);
		}

		if(is_boom(o)){
			return 1;
		}
		o.x+=o.xspeed;
		o.y+=o.yspeed;
		o.yspeed+=g/5; //子弹重力
		//console.log("zd"+this.y);

		//边缘检测
		if(o.x<-o.w||o.y<-o.h||o.x>cw||o.y>ch){
			return 2;
		}else{
			o.rect();
			return 0;
		}
	}
}

function enemyObj(x,y,w,h,xspeed,yspeed){
	Obj.call(this,x,y,w,h,xspeed,yspeed);//效果类似继承，再调用父类方法
	
	//发射子弹
	this.fire=function(){
		//console.log("fire");
		if(is_over||this.is_delete) return;
		var o=this;
		
		setTimeout(function(){
			o.fire();
		},4000+Math.random()*1000-o.type*2000);
		zdMap.push(new zdObj(o,0));
		zdMap.push(new zdObj(o,100));
		zdMap.push(new zdObj(o,170));
		zdMap.push(new zdObj(o,220));
		zdMap.push(new zdObj(o,300));
	}
	
}
function tankObj(){
	enemyObj.call(this,Math.ceil(Math.random()*2)*cw-cw,ch-15,30,15);//效果类似继承，再调用父类方法
	this.type=0;
	this.run=function(){
		var o=this;
		//边界检测
		if(o.x<-o.w){
			o.xspeed=Math.random()*5;
		}else if(o.x>cw){
			//console.log(o.x)
			o.xspeed=-Math.random()*5;
		}

		//移动
		o.x+=o.xspeed;

		//阻力减速
		o.xspeed+=(o.xspeed>0?-0.01:0.01);
		if(Math.abs(o.xspeed)<=0.01){
			o.xspeed=5-Math.random()*10;
		}

		o.rect();
	}
	this.fire();
	
}
function planeObj(){
	this.type=1;
	var s=Math.ceil(Math.random()*2)-1;
	console.log(s);
	enemyObj.call(this,s*cw,Math.random()*ch/3+100,30,10,(1-s*2)*10);//效果类似继承，再调用父类方法

	this.run=function(){
		var o=this;

		//边界检测
		if(o.x<-o.w||o.x>cw){
			s=1-s;
			this.xspeed=(1-s*2)*10;
		}

		o.x+=o.xspeed;
		o.rect(s+1);
	}

	var o=this;

	setTimeout(function(){
		o.fire(1);
	},Math.random()*1000);
	
}