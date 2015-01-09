

	var map = []; //记录障碍物
	var enemyMap = []; //记录障碍物

	var intervalD ,intervalRZ ;//定时执行
	var aPlayer;
	var game_over,result_say,hp_line,hp,fps,zdAmount,history,fps_num=0;

	window.onload=function(){
		initCanvas("myCanvas");//初始画布

		game_over = document.getElementById("game_over");
		result_say = document.getElementById("result_say");

		hp_line = document.getElementById("hp_line");
		hp_line.style.left=(cx.width-hp_line.offsetWidth)/2+"px";



		var d=[40,40,50,15,1]
		//rectPlane(d);
		gameStart();

		window.setInterval(setFps,1000);
		document.onkeydown = function(e) { //改变方向 
			
			if(e.keyCode==37||e.keyCode==38||e.keyCode==39){
				aPlayer.setKeyDown(e.keyCode - 36);
				return;
			}
		}

		document.onkeyup = function(e) { //改变方向 
			
			if(e.keyCode==37||e.keyCode==38||e.keyCode==39){
				aPlayer.setKeyUp(e.keyCode - 36);
				return;
			}
			if(e.keyCode==82){
				gameStart();
			}
		}
	}



	function enemyRun(){

		var tempMap=enemyMap;
		enemyMap=[];
		var temp=null;

		while(temp=tempMap.shift()){
			temp.run();
			enemyMap.push(temp);
		}
		
	}
	function zdRun(){
		var tempMap=zdMap;
		zdMap=[];
		var temp=null;
		while(temp=tempMap.shift()){
			switch(temp.check()){
				case 0:zdMap.push(temp);break;
				case 1:aPlayer.injure(temp);temp=null;break;
				case 2:break;
			}
		}
	}
	
	function rand_tank(){
		enemyMap.push(new tankObj());
		if(enemyMap.length>5){
			clearInterval(intervalRZ);
			intervalRZ=window.setInterval(rand_plane,8000);
		}
	}
	function rand_plane(){
		enemyMap.push(new planeObj());
		if(enemyMap.length>8){
			clearInterval(intervalRZ);
		}
		
		
	}

	function gameRun(){
		aPlayer.run();
		enemyRun();
		zdRun();
		drawC();
		fps_num++;
		intervalD=setTimeout(gameRun,runTime);
	}

	var is_over=false;
	function gameStart(){
		var temp;
		while(temp=enemyMap.shift()){
			temp.is_delete=true;
			delete temp; 
		}

		zdMap=[];
		if(!aPlayer)
			aPlayer=new playObj((cw-10)/2,(ch-25)/2,10,25);
		else
			aPlayer.init();
		game_over.style.display="none";
		clearInterval(intervalD);
		clearInterval(intervalRZ);

		is_over=false;
		intervalD = setTimeout(gameRun,runTime);
		intervalRZ = window.setInterval(rand_tank,4000);

	}
	function gameOver(is_win){
		is_over=true;
		aPlayer.init();
		var temp;
		while(temp=zdMap.shift()){
			temp.is_delete=true;
			delete temp; 
		}

		game_over.style.display="block";
		

		result_say.innerHTML=is_win?"Win!":"Lose!";

	}

