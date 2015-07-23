function canvasConsole(CanvasId){
	var cx=document.getElementById(CanvasId);	/*画布对象*/
	var height=document.body.offsetHeight;			/*画布宽度*/
	var width=document.body.offsetWidth;			/*画布高度*/
	var cxt=cx.getContext("2d");				/*画布*/
	cx.width=width;
	cx.height=height;
	cxt.fillStyle = "#006699";
	var drawMap=[];								/*需要画的内容集*/

	this.getWidth=function(){
		return width;
	}
	this.getHeight=function(){
		return height;
	}
	/*往画数组内添加元素*/
	this.draw=function(e){
		drawMap.push(e);
	}
	/**
	* drawC 画图
	*******************************
	* @return void
	*/
	this.drawC=function(){
		cxt.fillStyle = "#006644";
		cxt.fillRect(0,0,width,height);
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
	/*飞机 A面*/
	function rectPlane1(d){
		cxt.beginPath();
		cxt.moveTo(d[0],d[1]); /*设置路径起点，坐标为(20,20)*/
		cxt.lineTo(d[0]+0.35*d[2],d[1]+0.5*d[3]);

		cxt.lineTo(d[0],d[1]+d[3]);

		cxt.lineTo(d[0]+d[2],d[1]+0.5*d[3]); 
		cxt.lineTo(d[0],d[1]); 


		cxt.lineWidth = 1.0; /*设置线宽*/


		cxt.closePath();
		cxt.fill();
		cxt.stroke();

	}
	/*飞机 B面*/
	function rectPlane2(d){
		cxt.beginPath();
		cxt.moveTo(d[0],d[1]+0.5*d[3]); /*设置路径起点，坐标为(20,20)*/
		cxt.lineTo(d[0]+d[2],d[1]+d[3]);

		cxt.lineTo(d[0]+0.65*d[2],d[1]+0.5*d[3]);

		cxt.lineTo(d[0]+d[2],d[1]);

		cxt.lineTo(d[0],d[1]+0.5*d[3]); 


		cxt.lineWidth = 1.0; /*设置线宽*/


		cxt.closePath();
		cxt.fill();
		cxt.stroke();

	};

	/*测试方法，画出矩形的外六线*/
	this.drewSixLine=function(ax,ay,bx,by,w,h){

		cxt.fillStyle = "#006644";
		cxt.fillRect(0,0,width,height);
		
		cxt.fillStyle = "#FF6644";

		cxt.fillRect(ax,ay,4,4);
		cxt.fillRect(bx,by,4,4);

		cxt.fillStyle = "#FFFFFF";
		cxt.strokeStyle = "#FFFFFF"; 

		var lineR=getSixLine(ax,ay,bx,by,w,h);
		console.log(lineR);

		for (var i = lineR.length - 1; i >= 0; i--) {
			console.log(lineR[i].a.x,lineR[i].a.y,lineR[i].b.x,lineR[i].b.y);

			cxt.moveTo(lineR[i].a.x,lineR[i].a.y); /*设置路径起点，坐标为(20,20)*/
			cxt.lineTo(lineR[i].b.x,lineR[i].b.y);
		};

		cxt.lineWidth = 2.0; /*设置线宽*/
		cxt.stroke();

	}
	return this;
}