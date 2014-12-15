/**
* is_boom 检查两个对象是否碰撞
*******************************
* @param obj m 被撞对象
* @param obj n 子弹对象
*******************************
* @return boolean 是否碰撞
**/
function is_boom(n,m){
	m=m?m:aPlayer;
	return (n.x>=m.x&&n.x<=(m.x+m.w)&& n.y>=m.y&& n.y<=(m.y+m.h));
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
}
