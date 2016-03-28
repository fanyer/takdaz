// JavaScript Document
/**
* 创建Tank构造函数
* @param{oParent} 父级对象即创建对象添加到的目标对象
* @param{elem} 创建坦克元素的json对象{name:'tagName',id:'id',className:'className'}
* @param{x} 坦克初始的横位置
* @param{y} 坦克初始的纵坐标
* @param{bgPos} 坦克的背景图位置数组，按L T R B排序
* @param{speed} 坦克移动的速度
* @param{dir} 坦克初始化方向
* @param{type} 坦克类型：敌方0，我方1
* @param{blood} 坦克血量，为零便死亡
* @param{interval} 坦克射击的时间间隔
* @param{name} 坦克名称，play:玩家一,play2:玩家二
*/
function MyTank(oParent,elem,x,y,bgPos,speed,dir,type,blood,interval,name){
	Tank.apply(this,arguments);
	this.hat = 0;               // 计算铁帽子，包裹防弹罩
	this.star = 0;              // 计算星星数，用以加强火力隔
	this.shotInterval = 80;
}
/**
* 继承Tank所有方法
*/
MyTank.prototype = new Tank();
/**
* 清空自动移动方法
*/
MyTank.prototype.moveFree = function(){
	
};
/**
* 重写射击方法
*/
MyTank.prototype.shoot = function(){
	if(!this.shot){
		this.shot = true;
		var oBullet = new Bullet(this.oParent,{name:DIV,className:BULLET},this.obj.offsetLeft,this.obj.offsetTop,BULLET_BGPOS,this.speed+2,this.type,this.dir,this.name);
		oBullet.init();
		oGame.bullets.push(oBullet);
		oGame.oMusic.playMusic(M_ATTACK);
	}		
}
/**
* 重写更新射击
*/
MyTank.prototype.updateShot = function(){
	if(this.overInterval()){
		this.shot = false;
		this.timing = 0;
		return ;
	};
	if(this.haveBullet()){
		this.shot = true;
	}else{
		this.shot = false;	
	}
}
/**
* 是否超出射击的时间间隔
*/
MyTank.prototype.overInterval = function(){
	if(this.shot){
		this.timing++;
		if(this.timing > this.shotInterval){
			return true;
		}	
	}	
}
/**
* 坦克射出的子弹是否存在
*/
MyTank.prototype.haveBullet = function(){
	for(var j = 0; j < oGame.bullets.length; j++){
		if(this.shot && this.name == oGame.bullets[j].name){           // 坦克射出的子弹还没消失
			return true;
		}
	}
	this.timing = 0;                                                // 没有 就清除射击时间
	return false;	
}
/**
* 重写坦克是否被击中
*/
MyTank.prototype.isHit = function(){
	for(var i = 0; i < oGame.bullets.length; i++){
		if(this.type != oGame.bullets[i].type){
			if(this.collide(oGame.bullets[i].obj)){
				oGame.bullets[i].die = true;
				
				if(!this.isFlick()){
					for(var j = 0; j < oGame.tanks.length; j++){
						if(oGame.tanks[j].obj == this.obj){	
							oGame.oMusic.playMusic(M_BOMB0);
							oGame.tanks.splice(j,1);
						}
					}
					var bomb = new Bomb(this.oParent,{name:DIV,className:BOMB},this.obj.offsetLeft - 16,this.obj.offsetTop - 16,BOMB_4,12);
					bomb.init();
					oGame.bombs.push(bomb);	
					oGame.updatePlayerLife(this.name);
					this.oParent.removeChild(this.obj);				
				}
			}
		}
	}	
}
/**
* 是否有闪烁即无敌
*/
MyTank.prototype.isFlick = function(){
	for(var cnt = 0; cnt < oGame.flicks.length; cnt++){
		if(oGame.flicks[cnt].name == this.name){
			return true;
		}	
	}	
	return false;
}









