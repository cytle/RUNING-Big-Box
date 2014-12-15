/**
 * is_boom 检查两个对象是否碰撞
 *******************************
 * @param obj m 被撞对象
 * @param obj n 另一个对象
 *******************************
 * @return boolean 是否碰撞
 **/
 function is_boom(m){
 	return (aPlayer.x>=m.x&&aPlayer.x<=(m.x+m.w)&& aPlayer.y>=m.y&& aPlayer.y<=(m.y+m.h));
 }


 function drawC(){
 	cxt.fillStyle = "#000000";
	cxt.fillRect(0,0,cw,ch);
	cxt.fillStyle = "#FFFFFF";
 	var d;
 	while(d=drawMap.shift()){
 		cxt.fillRect(d[0],d[1],d[2],d[3]);
 	}
 }
