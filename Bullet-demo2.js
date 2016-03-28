// JavaScript Document
/**
* 创建Bullet构造函数
* @param{oParent} 父级对象即创建对象添加到的目标对象
* @param{elem} 创建子弹元素的json对象{name:'tagName',id:'id',className:'className'}
* @param{x} 子弹初始的横位置
* @param{y} 子弹初始的纵坐标
* @param{bgPos} 子弹的背景图位置数组，按L T R B排序
* @param{speed} 子弹移动的速度
* @param{dir} 子弹初始化方向
* @param{type} 子弹类型：敌方0，我方1
* @param{name} 坦克名称，区别是敌方射出还是我方射出
*/
function Bullet(oParent,elem,x,y,bgPos,speed,type,dir,name){
	CreateObj.call(this,oParent,elem,x,y,bgPos,speed);
	this.type = type;
	this.dir = dir;
	this.name = name;
	this.hitTank = false;         // 是否击中坦克 true：是 false：否
	this.die = false;             // 子弹是否消失 true：是 false：否
	this.prevDir = '';
}
Bullet.prototype = new CreateObj;
/**
* 重写子弹初始化位置
*/
Bullet.prototype.initLocation = function(){
	switch(this.dir){
		case LEFT:
			this.obj.style.left = this.x + PX;
			this.obj.style.top = this.y + 13 + PX;
			if(this.prevDir == this.dir){
			}else{
				this.changeBgPos(this.bgPos[0][0],this.bgPos[0][1]);
			}
			this.prevDir = LEFT;
			break;
		case UP:
			this.obj.style.left = this.x + 13 + PX;
			this.obj.style.top = this.y + PX;
			if(this.prevDir == this.dir){
			}else{
				this.changeBgPos(this.bgPos[1][0],this.bgPos[1][1]);
			}
			this.prevDir = UP;
			break;
		case RIGHT:
			this.obj.style.left = this.x + 32 + PX;
			this.obj.style.top = this.y + 13 + PX;
			if(this.prevDir == this.dir){
			}else{
				this.changeBgPos(this.bgPos[2][0],this.bgPos[2][1]);
			}
			this.prevDir = RIGHT;
			break;
		case DOWN:
			this.obj.style.left = this.x + 13 + PX;
			this.obj.style.top = this.y + 32 + PX;
			if(this.prevDir == this.dir){
			}else{
				this.changeBgPos(this.bgPos[3][0],this.bgPos[3][1]);
			}
			this.prevDir = DOWN;
			break;
		default:
			break;
	}
}
/**
* 子弹射击在墙,墙消失，子弹也消失
* 子弹射击到铁上,子弹消失
* 子弹碰到子弹，都消失
*/
Bullet.prototype.shotHit = function(){
	this.hitObstacle();        // 子弹射击在障碍物上
	this.hitBullet();          // 子弹对碰
	//this.hitTanks();	
}
/**
* 子弹射击在墙,墙消失，子弹也消失
*/
Bullet.prototype.hitObstacle = function(){
	for(var i = 0; i < oGame.maps.obstacle.length; i++){
		if(this.collide(oGame.maps.obstacle[i])){
			if(oGame.maps.obstacle[i].className == WALL){
				this.oParent.removeChild(oGame.maps.obstacle[i]);
				oGame.maps.obstacle.splice(i,1);
			}
			this.die = true;
			break;      // 碰撞就退出，没必要再继续循环下去
		}
	}	
}
/**
* 子弹射击到铁上,子弹消失
*/
Bullet.prototype.hitBullet = function(){
	for(var i = 0; i < oGame.bullets.length; i++){
		if(this.index != oGame.bullets[i].index && this.type != oGame.bullets[i].type){       // index不同就不是自己，
			if(this.collide(oGame.bullets[i].obj)){
				this.die = true;
				oGame.bullets[i].die = true;
			}
		}
	}
}
/**
* 实现向左移动接口
*/
Bullet.prototype.moveLeft = function(){
	this.changeBgPos(this.bgPos[0][0],this.bgPos[0][1]);
	this.obj.style.left = this.obj.offsetLeft - this.speed + PX;
	this.shotHit();
	if(this.obj.offsetLeft <= 0){
		this.die = true;
	}	
}
/**
* 实现向上移动接口
*/
Bullet.prototype.moveTop = function(){
	this.changeBgPos(this.bgPos[1][0],this.bgPos[1][1]);
	this.obj.style.top = this.obj.offsetTop - this.speed + PX;
	this.shotHit();;
	if(this.obj.offsetTop <= 0){
		this.die = true;
	}
}
/**
* 实现向右移动接口
*/
Bullet.prototype.moveRight = function(){
	this.changeBgPos(this.bgPos[2][0],this.bgPos[2][1]);
	this.obj.style.left = this.obj.offsetLeft + this.speed + PX;
	this.shotHit();
	if(this.obj.offsetLeft >= this.oParent.offsetWidth - this.obj.offsetWidth){
		this.die = true;
	}
}
/**
* 实现向下移动接口
*/
Bullet.prototype.moveDown = function(){
	this.changeBgPos(this.bgPos[3][0],this.bgPos[3][1]);
	this.obj.style.top = this.obj.offsetTop + this.speed + PX;
	this.shotHit();
	if(this.obj.offsetTop >= this.oParent.offsetHeight - this.obj.offsetHeight){
		this.die = true;
	}
}
/**
* 清除
*/
Bullet.prototype.clear = function(){
	if(this.die){
		var bomb = null;
		bomb = new Bomb(this.oParent,{name:DIV,className:BOMB},this.obj.offsetLeft - 28,this.obj.offsetTop - 28,BOMB_2,12);
		bomb.init();	
		oGame.bombs.push(bomb);
		this.oParent.removeChild(this.obj);	
		for(var i = 0; i < oGame.bullets.length; i++){
			if(oGame.bullets[i].index == this.index){
				oGame.bullets.splice(i,1);
			}
		}
	}	
}








































