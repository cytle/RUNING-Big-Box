/**
* is_boom 检查两个对象是否碰撞
*******************************
* @param obj m 被撞对象
* @param obj n 子弹对象
*******************************
* @return boolean 是否碰撞
**/

/* 
* TODO 依照轨迹再判断
*/ 
function is_boom(n){
	return (n.x>=aPlayerX&&n.x<=aPlayerXW&& n.y>=aPlayerY&& n.y<=aPlayerYH);
}


/**
* drawC 画图
*******************************
* @return void
**/
function drawC(){
	cxt.fillStyle = "#006644";
	cxt.fillRect(0,0,cw,ch);
	cxt.fillStyle = "#FFFFFF";
	cxt.strokeStyle = "#FFFFFF"; 
	var d;
	while(d=drawMap.shift()){
		switch(d[4]){
			case 0:cxt.fillRect(d[0],d[1],d[2],d[3]);
			break;
			case 1:rectPlane1(d);
			break;
			case 2:rectPlane2(d);
			break;
			default:;
		}
	}
}
function rectPlane1(d){
	cxt.beginPath();
	cxt.moveTo(d[0],d[1]); // 设置路径起点，坐标为(20,20)
	cxt.lineTo(d[0]+0.35*d[2],d[1]+0.5*d[3]);

	cxt.lineTo(d[0],d[1]+d[3]);

	cxt.lineTo(d[0]+d[2],d[1]+0.5*d[3]); 
	cxt.lineTo(d[0],d[1]); 


	cxt.lineWidth = 1.0; // 设置线宽


	cxt.closePath();
	cxt.fill();
	cxt.stroke();

}
function rectPlane2(d){
	cxt.beginPath();
	cxt.moveTo(d[0],d[1]+0.5*d[3]); // 设置路径起点，坐标为(20,20)
	cxt.lineTo(d[0]+d[2],d[1]+d[3]);

	cxt.lineTo(d[0]+0.65*d[2],d[1]+0.5*d[3]);

	cxt.lineTo(d[0]+d[2],d[1]);

	cxt.lineTo(d[0],d[1]+0.5*d[3]); 


	cxt.lineWidth = 1.0; // 设置线宽


	cxt.closePath();
	cxt.fill();
	cxt.stroke();

}
function setHp(h){

	if(!hp)
		hp=document.getElementById('hp');

	hp.style.width=h+"%";
}
function setFps(){

	if(!fps)
		fps=document.getElementById('fps');

	fps.innerHTML="fps:"+fps_num;
	fps_num=0;
	setZdAmount();
}
function setHistory(){

	if(!history)
		history=document.getElementById('injure_history');

	//injure_history.innerHTML=injure_history.innerHTML+"<br>injure:x:"+aPlayerX+" y:"+aPlayerY;

}
function setZdAmount(){
	if(!zdAmount)
		zdAmount=document.getElementById('zdAmount');
	zdAmount.innerHTML="子弹数量:"+zdMap.length;
	//injure_history.innerHTML=injure_history.innerHTML+"<br>injure:x:"+aPlayerX+" y:"+aPlayerY;

}

