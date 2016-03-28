// 创建爆炸
/**
* 创建Bomb构造函数
* @param{oParent} 父级对象即创建对象添加到的目标对象
* @param{elem} 创建爆炸元素的json对象{name:'tagName',id:'id',className:'className'}
* @param{x} 爆炸对象初始的横位置
* @param{y} 爆炸对象初始的纵坐标
* @param{bgPos} 爆炸的背景图位置数组，按L T R B排序
* @param{interval} 爆炸的时间间隔分
*/
function Bomb(oParent,elem,x,y,bgPos,interval){
	CreateObj.call(this,oParent,elem,x,y,bgPos);
	this.timing = 0;
	this.interval = interval;
}
Bomb.prototype = new CreateObj;
/**
* 重写切换背景位置方法
*/
Bomb.prototype.changeBgPos = function(){
	if(this.bgPos.length == 2){
		if(this.timing == 0){
			this.obj.style.backgroundPosition = this.bgPos[0][0] + PX + ' ' + this.bgPos[0][1] + PX;
		}else if(this.timing == 3){
			this.obj.style.backgroundPosition = this.bgPos[1][0] + PX + ' ' + this.bgPos[1][1] + PX;
			for(var i = 0; i < oGame.bombs.length; i++){
				if(this.index == oGame.bombs[i].index){
					oGame.bombs.splice(i,1);
				}
			}
			this.oParent.removeChild(this.obj);
		}
	}else{
		if(this.timing == 0){
			this.obj.style.backgroundPosition = this.bgPos[0][0] + PX + ' ' + this.bgPos[0][1] + PX;
		}else if(this.timing == 3){
			this.obj.style.backgroundPosition = this.bgPos[1][0] + PX + ' ' + this.bgPos[1][1] + PX;
		}else if(this.timing == 6){
			this.obj.style.backgroundPosition = this.bgPos[2][0] + PX + ' ' + this.bgPos[2][1] + PX;
		}else if(this.timing == 9){
			this.obj.style.backgroundPosition = this.bgPos[3][0] + PX + ' ' + this.bgPos[3][1] + PX;
		}else if(this.timing == 12){
			for(var i = 0; i < oGame.bombs.length; i++){
				if(this.index == oGame.bombs[i].index){
					oGame.bombs.splice(i,1);
				}
			}
			this.oParent.removeChild(this.obj);
		}
	}
	this.timing++;
}



























