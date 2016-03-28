// 创建附属物
/**
* @param{oParent} 父级对象即创建对象添加到的目标对象
* @param{elem} 创建附属物元素的json对象{name:'tagName',id:'id',className:'className'}
* @param{x} 附属物初始的横位置
* @param{y} 附属物初始的纵坐标
* @param{bgPos} 附属物的背景图位置数组，按L T R B排序
* @param{type} 附属物类型0：坦克 1：暂停 2：铁锹 3：炸弹 4：星星 5：铁帽
*/
function Annex(oParent,elem,x,y,bgPos,type){
	CreateObj.call(this,oParent,elem,x,y,bgPos);
	this.timing = 0;
	this.interval = 300;
	this.type = type;
}

Annex.prototype = new CreateObj;
/**
* 清除附属物
*/
Annex.prototype.clear = function(){
	if(this.isHit()){
		oGame.oMusic.playMusic(M_ANNEX);
		var oScore = new Score(this.oParent,{name:DIV,className:SCORE},this.obj.offsetLeft,this.obj.offsetTop,SCORE_BGPOS[3]);
		oGame.scores.push(oScore);
		oScore.init();
		this.oParent.removeChild(this.obj);
		oGame.annexs.length = 0;
		return ;
	}
	if(this.timing > this.interval){
		this.oParent.removeChild(this.obj);
		oGame.annexs.length = 0;
		this.timimg = 0;
	}	
	this.timing++;
	if(this.timing % 4 != 0){
		this.obj.style.visibility = 'visible';
	}else{
		this.obj.style.visibility = 'hidden';
	}
}
/**
* 是否被碰撞
*/
Annex.prototype.isHit = function(){
	for(var i = 0; i < oGame.tanks.length; i++){
		if(oGame.tanks[i].type == 1 && this.collide(oGame.tanks[i].obj)){
			this.hitType(oGame.tanks[i]);
			return true;
		}
	}	
	return false;
}
/**
* 附属物被碰撞时的类别
* @param{colliderObj} 碰撞物对象
*/
Annex.prototype.hitType = function(colliderObj){
	switch(this.type){
			case TANK_TYPE:         // 坦克，增加玩家生命数
				oGame.addLife(colliderObj);
				break;
			case PAUSE_TYPE:        // 暂停，停止敌方
				oGame.pause(true);
				break;
			case SHOVEL_TYPE:       // 铁锹，老巢周围被铁包围
				oGame.shovel(true);
				break;
			case BOMB_TYPE:         // 炸弹，炸掉所有屏幕中的敌方坦克
				oGame.bombAllEnemy();
				break;
			case STAR_TYPE:        // 星星，增加火力
				oGame.addFire(colliderObj);	
				break;
			case HAT_TYPE :         // 铁帽子，增加防弹罩
				oGame.addHoods(colliderObj);
				break;
			default:
				break;
		}
}


















