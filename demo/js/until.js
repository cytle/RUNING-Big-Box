/**
 * is_boom 检查两个对象是否碰撞
 *******************************
 * @param obj m 被撞对象
 * @param obj n 另一个对象
 *******************************
 * @return boolean 是否碰撞
 **/
 function is_boom(m,n){
 	return (n.x>=m.x&&n.x<=(m.x+m.w)&& n.y>=m.y&& n.y<=(m.y+m.h));
 }