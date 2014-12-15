

	var map = []; //记录障碍物
	var enemyMap = []; //记录障碍物

	var intervalD ,intervalRZ ;//定时执行
	var aPlayer;
	
	window.onload=function(){
		initCanvas("myCanvas");//初始画布

		
		gameStart();

		document.onkeydown = function(e) { //改变蛇方向 
			
			if(e.keyCode==37||e.keyCode==38||e.keyCode==39){
				aPlayer.setKeyDown(e.keyCode - 36);
				return;
			}
		}

		document.onkeyup = function(e) { //改变蛇方向 
			
			if(e.keyCode==37||e.keyCode==38||e.keyCode==39){
				aPlayer.setKeyUp(e.keyCode - 36);
				return;
			}
		}
	}



	function enemyRun(){
		for(var i=0;i<enemyMap.length;i++){ 
			enemyMap[i].run();
		}
		for(var i=0;i<zdMap.length;i++){ 
			switch(zdMap[i].check()){
				case 0:break;
				case 1:aPlayer.injure();break;
				case 2:console.log(2);zdMap.shift();break;
			}
		}
	}
	
	function rand_tank(){
		enemyMap.push(new tankObj());
		if(enemyMap.length>5){
			clearInterval(intervalRZ);
		}
	}
	function gameRun(){
		enemyRun();
		aPlayer.run();
		drawC();
	}
	function gameStart(){

		aPlayer=new playObj(300,400,7,16);

		intervalD = window.setInterval(gameRun,25);
		intervalRZ = window.setInterval(rand_tank,4000);
	}


/*

		function bg_hz(){
		for(var i=0;i<map.length;i++){ 
			//0正常 1撞到 2障碍到边界
			switch(map[i].check(aPlayer)){
				case 0:break;
				case 1:alert("撞到！");clearInterval(intervalD);clearInterval(intervalRZ);break;
				case 2:map.shift();break;
			}
			
		}
	}
	function rand_za(){
		map.push(getZA());
	}*/