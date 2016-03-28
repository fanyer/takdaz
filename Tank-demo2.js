// 创建坦克
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
* @param{name} 坦克名称
* @param{score} 坦克分数，打死后所得积分
*/
function Tank(oParent,elem,x,y,bgPos,speed,dir,type,blood,interval,name,score){
	CreateObj.call(this,oParent,elem,x,y,bgPos,speed,dir);
	this.type = type;
	this.blood = blood;
	this.shotInterval = interval;  // 射击的时间间隔
	this.name = name;             
	this.timing = 0;           // 射出子弹的时间
	this.prevDir = DOWN;       // 初始化上次方向
	this.shot = false;         // 是否射击 true:是 false：否
	this.isBomb = false;      // 是否爆炸 true:是  false：否
	this.stop = false;        // 是否停止移动 true:是 false：否
	this.score = score;       // 积分
}
/**
* 继承CreateObj
*/
Tank.prototype = new CreateObj;
/**
* 初始化Tank
* @param {pos} 初始出现的位置数组
*/
Tank.prototype.init = function(){
	this.obj = this.create();
	this.oParent.appendChild(this.obj);
	this.initLocation();
	this.obj.index = this.index;
}
/**
* 移动时是否碰撞
*/
Tank.prototype.isCollide = function(dir,bgPosLeft,bgPosTop){
	this.changeBgPos(bgPosLeft,bgPosTop);
	this.dir = dir;
	this.setPosition();
	var aAll = this.collideElem();
	var iLen = aAll.length;
	for(var i = 0; i < iLen; i++){
		if(this.collide(aAll[i])){
			return true;
		}
	}
	return false;
}
/**
* 向左移动
*/
Tank.prototype.moveLeft = function(){
	if(this.obj.offsetLeft <= 0){ // 如果到达左边界，不能再向左移动
		this.obj.style.left = 0;
		return true;               // 不能移动就需要转变方向
	}else{
		this.obj.style.left = this.obj.offsetLeft - this.speed + PX;	
		if(this.isCollide(LEFT,this.bgPos[0][0],this.bgPos[0][1])){     // 如果碰撞就先回到原来的位置,并需要转变方向	
			this.obj.style.left = this.obj.offsetLeft + this.speed + PX;
			return true;
		}else{
			return false;          // 没有碰撞需要就不需要转向		
		}
	}
}
/**
* 向上移动
*/
Tank.prototype.moveTop = function(){
	if(this.obj.offsetTop <= 0){  // 如果到达上边界，不能再向上移动
		this.obj.style.top = 0;
		return true;                // 不能移动就需要转变方向
	}else{
		this.obj.style.top = this.obj.offsetTop - this.speed + PX;
		if(this.isCollide(UP,this.bgPos[1][0],this.bgPos[1][1])){       // 如果碰撞就先回到原来的位置,并需要转变方向	
			this.obj.style.top = this.obj.offsetTop + this.speed + PX;
			return true;
		}else{
			return false;	          // 没有碰撞需要就不需要转向	
		}
	}
}
/**
* 向右移动
*/
Tank.prototype.moveRight = function(){
	if(this.obj.offsetLeft >= this.oParent.offsetWidth - this.obj.offsetWidth){    // 如果到达右边界，不能再向右移动
		this.obj.style.left = this.oParent.offsetWidth - this.obj.offsetWidth + PX;
		return true;                // 不能移动就需要转变方向
	}else{
		this.obj.style.left = this.obj.offsetLeft + this.speed + PX;
		if(this.isCollide(RIGHT,this.bgPos[2][0],this.bgPos[2][1])){    // 如果碰撞就先回到原来的位置,并需要转变方向	
			this.obj.style.left = this.obj.offsetLeft - this.speed + PX;
			return true;
		}else{
			return false;	         // 没有碰撞需要就不需要转向	
		}
	}
}
/**
* 向下移动
*/
Tank.prototype.moveDown = function(){
	if(this.obj.offsetTop >= this.oParent.offsetHeight - this.obj.offsetHeight){   // 如果到达下边界，不能再向下移动
		this.obj.offsetTop = this.oParent.offsetHeight - this.obj.offsetHeight + PX;
		return true;            // 不能移动就需要转变方向
	}
	this.obj.style.top = this.obj.offsetTop + this.speed + PX;
	if(this.isCollide(DOWN,this.bgPos[3][0],this.bgPos[3][1])){      // 如果碰撞就先回到原来的位置,并需要转变方向	
		this.obj.style.top = this.obj.offsetTop - this.speed + PX;	
		return true;
	}else{
		return false;	                // 没有碰撞需要就不需要转向	
	}
}
/**
* 方向转变90度时，重新设置位置
*/
Tank.prototype.setPosition = function(){
	if( (this.dir % 2== 0 && this.prevDir % 2 == 1) || (this.dir % 2 == 1 && this.prevDir % 2 == 0) ){   // 方向由左右转到上下 ，或者由上或下转到左右
		if( this.dir == LEFT || this.dir == RIGHT){
			/*
				由左右转到上下的时候，改变left值保证它的left值是16的倍数，从而转向后可以上下自由，不会因为碰撞而停止移动
				比如转向后left是126, 它只有是128的时候才能正常向上向下移动. （126 + 8）/16 = 8.375 再取整得8
				8 * 16 == 128 正好是它能自由上下移动的值
			*/
			if(this.obj.offsetLeft % 16 != 0){
				var iTop = parseInt( (this.obj.offsetTop + 8) / 16 );
				iTop = iTop * 16;
				this.obj.style.top = iTop + 'px';
			}
			
		}else if( this.dir == UP || this.dir == DOWN ){
			if(this.obj.offsetTop % 16 != 0){
				var iLeft = parseInt( (this.obj.offsetLeft + 8) / 16 );
				iLeft = iLeft * 16;
				this.obj.style.left = iLeft + 'px';
			}
		}
	}
	this.prevDir = this.dir;
}
/**
* 获取所有可碰撞元素：class为wall iron的元素
* return {aAll} 所有可碰撞元素组成的数组
*/
Tank.prototype.collideElem = function(){
	/*var aAll = oGame.maps.obstacle;
	return aAll;*/
	var tanks = [];
	tanks.length = 0;
	for(var i = 0; i < oGame.tanks.length; i++){
		if(this.name != oGame.tanks[i].name){
			tanks.push(oGame.tanks[i].obj);
		}	
	}
	var aObsl= oGame.maps.obstacle;
	var aAll = tanks.concat(aObsl);
	return aAll;
}

/**
* 自由移动 如果碰撞或者到达边界就需要改变方向
*/
Tank.prototype.moveFree = function(){
	if(!this.stop){
		this.shoot();
		this.obj.x = this.obj.offsetLeft;
		this.obj.y = this.obj.offsetTop;
		if(this.move(this.dir)){              // 既没有碰撞也没有到达边界
			var i = Math.floor( Math.random()*4 ); // 取0,1,2,3整数
			var dir = this.dir;
			if(dir == LEFT && i == RIGHT && Math.floor( Math.random()*4) != 3){
				this.dir = LEFT;
			}else if(dir == UP && i == DOWN && Math.floor( Math.random()*4 ) != 3){ 
				this.dir = UP;;
			}else if(dir == RIGHT && i == DOWN && Math.floor( Math.random()*4) != 3){
				this.dir = RIGHT;
			}else if(dir == DOWN && i == UP && Math.floor( Math.random()*4) != 3){
				this.dir = DOWN
			}else{
				this.dir = i;	
			}	
		}
	}
}
/**
* 射击 
*/
Tank.prototype.shoot = function(){
	if(!this.shot){
		this.shot = true;
		// 参数顺序oParent,elem,x,y,bgPos,speed,type,dir,name
		var oBullet = new Bullet(this.oParent,{name:DIV,className:BULLET},this.obj.offsetLeft,this.obj.offsetTop,BULLET_BGPOS,this.speed+2,this.type,this.dir,this.name,this.score);
		oBullet.init();
		oGame.bullets.push(oBullet);
	}	
}
/**
* 更新射击
*/
Tank.prototype.updateShot = function(){
	if(this.shot){
		this.timing++;
		if(this.timing >= this.shotInterval){
			this.timing = 0;
			this.shot = false;
		}
	}
}

/**
* 坦克是否被击中
*/
Tank.prototype.isHit = function(){
	for(var i = 0; i < oGame.bullets.length; i++){
		if(this.type != oGame.bullets[i].type){
			if(this.collide(oGame.bullets[i].obj)){
				oGame.bullets[i].die = true;
				this.blood--;
				if(this.blood <= 0){
					if(this.type == TYPE_ENEMY){
						oGame.oMusic.playMusic(M_BOMB0);
						oGame.enemyDieCnt++;
					}
					this.bomb(true);		
				}else if(this.blood == 2){
					this.bgPos = B_ENEMY_BGPOS_2
				}else if(this.blood == 1){
					this.bgPos = B_ENEMY_BGPOS_1;
				}
			}
		}
	}	
}
/**
* 坦克爆炸
*/
Tank.prototype.bomb = function(isBomb){
	if(isBomb){
		for(var j = 0; j < oGame.tanks.length; j++){
			if(oGame.tanks[j].obj == this.obj){
				oGame.oMusic.playMusic(M_BOMB0);
				oGame.tanks.splice(j,1);
			}
		}
		var bomb = new Bomb(this.oParent,{name:DIV,className:BOMB},this.obj.offsetLeft - 16,this.obj.offsetTop - 16,BOMB_4,12,this.score);
		bomb.init();
		oGame.bombs.push(bomb);	
		if(this.score != undefined){
			var oScore = new Score(this.oParent,{name:DIV,className:SCORE},this.obj.offsetLeft + 16,this.obj.offsetTop,SCORE_BGPOS[this.score]);
			oGame.scores.push(oScore);
			oScore.init();
		}
		this.oParent.removeChild(this.obj);
	}	
}






























