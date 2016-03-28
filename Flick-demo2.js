// JavaScript Document
/**
* 创建坦克出现时的闪烁对象
* @param{oParent} 父级对象
* @param{elem} 元素json对象{name:'tagName',id:'id',className:'className'}
* @param{x} 初始出现的横坐标
* @param{y} 初始出现的纵坐标
* @param{bgPos} 背景图
* @param{sync} true：先出闪烁图再出坦克即创建敌方坦克，false：闪烁图和坦克同时出现即创建我方坦克
* @param{id} 用以判断创建坦克的id
* @param{name} 闪烁图名称，用以判断是谁在闪烁
*/
function Flick(oParent,elem,x,y,bgPos,sync,id,name){
	CreateObj.call(this,oParent,elem,x,y,bgPos);
	this.timing = 0;
	this.interval = 60;
	this.sync = sync;
	this.id = id;
	this.name = name;
}

Flick.prototype = new CreateObj;
/**
* 显示在画面上
*/
Flick.prototype.show = function(){
	this.move();
	if(this.timing >= this.interval){
		this.oParent.removeChild(this.obj);
		this.timing = 0;
		for(var i = 0; i < oGame.flicks.length; i++){
			if(oGame.flicks[i].obj == this.obj){
				oGame.flicks.splice(i,1);
				if(this.sync){     // true:创建敌方坦克
					addTank(this.oParent,this.x,this.y,this.id);
				}
			}
		}
	}else{
		var cnt = this.timing % this.bgPos.length;
		this.changeBgPos(this.bgPos[cnt][0],this.bgPos[cnt][1]);	
	}
	this.timing++;
}
/**
* 移动闪烁图
*/
Flick.prototype.move = function(){
	if(!this.sync){
		for(var cnt = 0; cnt < oGame.tanks.length; cnt++){
			if(oGame.tanks[cnt].name == this.name){       // 跟随坦克移动
				this.obj.style.left = oGame.tanks[cnt].obj.offsetLeft + PX;
				this.obj.style.top = oGame.tanks[cnt].obj.offsetTop + PX;
			}
		}
	}
}


function addTank(oParent,x,y,id){
	var oTank = null;
	switch(id){
		case FAST: // oParent,elem,x,y,bgPos,speed,dir,type,blood,interval,name,score
			oTank = new Tank(oParent,{name:DIV,className:ENEMY_FAST},x,y,F_ENEMY_BGPOS,ENEMY_FAST_SPEED,DOWN,TYPE_ENEMY,ENEMY_FAST_BLOOD,ENEMY_FAST_SHOOT_INTERVAL,ENEMY,ENEMY_FAST_SCORE);
			oGame.tanks.push(oTank);
			oTank.init();
			var oEnemyCnt = $(ENEMY_COUNT);
			var lastNode = oEnemyCnt.lastElementChild || oEnemyCnt.lastChild;
			oEnemyCnt.removeChild(lastNode);
			break;
		case ENEMY:
			oTank = new Tank(oParent,{name:DIV,className:ENEMY},x,y,G_ENEMY_BGPOS,ENEMY_SPEED,DOWN,TYPE_ENEMY,ENEMY_BLOOD,ENEMY_SHOOT_INTERVAL,ENEMY,ENEMY_SCORE);
			oGame.tanks.push(oTank);
			oTank.init();
			var oEnemyCnt = $(ENEMY_COUNT);
			var lastNode = oEnemyCnt.lastElementChild || oEnemyCnt.lastChild;
			oEnemyCnt.removeChild(lastNode);
			break;
		case BIG:
			oTank = new Tank(oParent,{name:DIV,className:ENEMY_BIG},x,y,B_ENEMY_BGPOS_3,ENEMY_BIG_SPEED,DOWN,TYPE_ENEMY,ENEMY_BIG_BLOOD,ENEMY_BIG_SHOOT_INTERVAL,ENEMY,ENEMY_FAST_SCORE);
			oGame.tanks.push(oTank);
			oTank.init();
			var oEnemyCnt = $(ENEMY_COUNT);
			var lastNode = oEnemyCnt.lastElementChild || oEnemyCnt.lastChild;
			oEnemyCnt.removeChild(lastNode);
			break;
		default:
			break;
	}
	
}




















