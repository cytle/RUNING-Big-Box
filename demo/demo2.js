$(function(){

	var map = []; //记录障碍物

	initCanvas("myCanvas");//初始画布


	var aPlayer=new playObj(300,400,30,80,0,0);


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
	}

	function gameRun(){
		bg_hz();
		aPlayer.run();
	}

	var intervalD = window.setInterval(gameRun,25);
	var intervalRZ = window.setInterval(rand_za,1400);
	document.onkeydown = function(e) { //改变蛇方向 

		if(e.keyCode==32){
			aPlayer.jump();
			return;
		}
		if(e.keyCode==37||e.keyCode==39){
			aPlayer.setDirection(e.keyCode - 37);
			return;
		}
	} 
})