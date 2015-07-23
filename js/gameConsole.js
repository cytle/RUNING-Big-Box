function gameConsole(){

	var o=this;
	var enemyMap = []; 		//敌人集
	var zdMap = []; 		//敌人集

	var intervalD ;			//执行游戏运行的定时器
	var intervalRZ ;		//定时执行产生敌人的定时器
	var fireZD=0;
	var boomZD=0;
	var is_over=false;
	o.gameCanvas;		/*初始画布*/
	o.cw=0;
	o.ch=0;
	var aPlayer;	//玩家对象
	var fireworks;		/*初始烟花管理*/

	var fps_num=0;
	
	o.init=function(){
		
		/*var d=[40,40,50,15,1];	*/
		o.gameCanvas=new canvasConsole("myCanvas"); 
		o.cw=o.gameCanvas.getWidth();
		o.ch=o.gameCanvas.getHeight();
		aPlayer=new playObj();
		fireworks=new fireworksConsole(); 
		window.setInterval(setInfo,1000); 			//显示帧数定时器

		//改变方向 
		document.onkeydown = function(e) { 
			if(e.keyCode==37||e.keyCode==38||e.keyCode==39){
				aPlayer.setKeyDown(e.keyCode - 36);
				return;
			}
		}
		
		//改变方向 
		document.onkeyup = function(e) { 
			
			if(e.keyCode==37||e.keyCode==38||e.keyCode==39){
				aPlayer.setKeyUp(e.keyCode - 36);
				return;
			}
			if(e.keyCode==82){
				o.start();
			}
		}
		return o;
	}
	/*游戏开始*/
	o.start=function(){
		var temp;
		while(temp=enemyMap.shift()){
			temp.is_delete=true;
			delete temp; 
		}

		aPlayer.init();
		zdMap=[];
		game_over.style.display="none";
		clearInterval(intervalD);
		clearInterval(intervalRZ);

		is_over=false;
		intervalD = setTimeout(gameRun,runTime);
		intervalRZ = window.setInterval(rand_tank,4000);

	};
	o.addZd=function(enemy){
		fireZD+=5;
		zdMap.push(new zdObj(enemy,0));
		zdMap.push(new zdObj(enemy,100));
		zdMap.push(new zdObj(enemy,170));
		zdMap.push(new zdObj(enemy,220));
		zdMap.push(new zdObj(enemy,300));
	}
	o.isOver=function(){
		return is_over;
	}
	o.getPlayer=function(){
		return aPlayer;
	}
	/*游戏进行一帧*/
	function gameRun(){
		aPlayer.run();
		enemyRun();
		if(!is_over) 
			zdRun();
		else
			fireworks.run();
		o.gameCanvas.drawC();
		fps_num++;
		intervalD=setTimeout(gameRun,runTime);
		/*敌人运动*/
		function enemyRun(){
			var tempMap=enemyMap;
			enemyMap=[];
			var temp=null;

			while(temp=tempMap.shift()){
				temp.run();
				enemyMap.push(temp);
			}

		};
		/*子弹运动*/
		function zdRun(){
			var tempMap=zdMap;
			zdMap=[];
			var temp=null;
			while(temp=tempMap.shift()){
				switch(temp.check()){
					case 0:zdMap.push(temp);break;
					case 1:aPlayer.injure(temp);temp=null;boomZD+=1;break;
					case 2:break;
				}
			}
		};
	};
	/*在网页上显示游戏运行信息*/
	function setInfo(){
		fps.innerHTML="fps:"+fps_num;
		fps_num=0;
		zdAmount.innerHTML="子弹数量:"+zdMap.length+"|"+boomZD+"/"+fireZD;
	};

	/*增加坦克*/
	function rand_tank(){
		enemyMap.push(new tankObj());
		if(enemyMap.length>5){
			clearInterval(intervalRZ);
			intervalRZ=window.setInterval(rand_plane,8000);
		}
	};
	/*增加飞机*/
	function rand_plane(){
		enemyMap.push(new planeObj());
		if(enemyMap.length>8){
			clearInterval(intervalRZ);
		}
	};
	/*游戏结束*/
	o.over=function(is_win){
		is_over=true;
		aPlayer.init();
		fireworks.init();
		fireworks.fire(200,20,6,6,200);
		fireworks.fire(300,20,6,6,300);
		fireworks.fire(400,20,6,6,400);
		var temp;
		while(temp=zdMap.shift()){
			temp.is_delete=true;
			delete temp; 
		};

		game_over.style.display="block";
		game_over.innerHTML='<div id="result"><span id="result_say">'+(is_win?"Win!":"Lose!")+'</span> <small>按R键重新开始</small></div>';
	};
	o.getGameCanvas=function(){
		return o.gameCanvas;
	}
	/*游戏帮助*/
	this.help=function(){
		is_over=true;
		aPlayer.init();
		var temp;
		while(temp=zdMap.shift()){
			temp.is_delete=true;
			delete temp; 
		};

		game_over.style.display="block";
		//game_over.innerHTML='<div id="result"><span id="result_say">'+(is_win?"Win!":"Lose!")+'</span> <small>按R键重新开始</small></div>';
	};


	this.draw=function(e){
		o.gameCanvas.draw(e);
	};
	
};

