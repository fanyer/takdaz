// 创建物体

/**
* @param{oParent} 父级对象即创建对象添加到的目标对象
* @param{elem} 创建物体元素的json对象{name:'tagName',id:'id',className:'className'}
* @param{x} 物体对象初始的横位置
* @param{y} 物体对象初始的纵坐标
* @param{bgPos} 物体对象的背景图位置数组，按L T R B排序
* @param{speed} 物体对象移动的速度
* @param{dir} 物体对象移动方向
*/
function CreateObj(oParent,elem,x,y,bgPos,speed,dir){
	this.oParent = oParent;
	this.elem = elem;
	this.obj = null;
	this.x = x;
	this.y = y;
	this.bgPos = bgPos;
	this.speed = speed;
	this.dir = dir;
	this.stop = false;
	this.index = (new Date()).getTime();
}
/**
* 初始化
*/
CreateObj.prototype.init = function(){
	this.obj = this.create();
	this.oParent.appendChild(this.obj);
	this.initLocation();
	this.changeBgPos(this.bgPos[0][0],this.bgPos[0][1]);
}
CreateObj.prototype.initLocation = function(){
	this.obj.style.left = this.x + PX;
	this.obj.style.top = this.y + PX;	
}
/**
* 创建元素
*/
CreateObj.prototype.create = function(){
	var o = document.createElement(this.elem.name);
	if(this.elem.id){
		o.id = this.elem.id
	}
	if(this.elem.className){
		o.className = this.elem.className;	
	}
	return o;
}
/**
* 切换方向背景图background-position
* @param {iLeft} 背景图左位置
* @param {iTop} 背景图上位置
*/
CreateObj.prototype.changeBgPos = function(iLeft,iTop){
	this.obj.style.backgroundPosition = iLeft + PX + ' ' + iTop + PX;
}
/**
* 碰撞检测
* @param {obj1} 碰撞对象obj1
* return true:碰撞 false:不碰撞
*/
CreateObj.prototype.collide = function(obj1){
	var L1 = obj1.offsetLeft;
	var T1 = obj1.offsetTop;
	var R1 = L1 + obj1.offsetWidth;
	var B1 = T1 + obj1.offsetHeight;
	
	var L2 = this.obj.offsetLeft;
	var T2 = this.obj.offsetTop;
	var R2 = L2 + this.obj.offsetWidth;
	var B2 = T2 + this.obj.offsetHeight;
	
	if(L1 >= R2 || T1 >= B2 || R1 <= L2 || B1 <= T2){
		return false;
	}
	return true;
}
/**
* 移动
* @param {dir} 移动方向
*/
CreateObj.prototype.move = function(dir){
	this.clear();
	if(!this.stop){
		this.hitAnnex();
		switch(dir){
			case LEFT:
				return this.moveLeft();
				break;
			case UP:
				return this.moveTop();
				break;
			case RIGHT:
				return this.moveRight();
				break;
			case DOWN:
				return this.moveDown();
				break;
			default:
				break;
		}
	}
}
/**
* 向左移动接口
*/
CreateObj.prototype.moveLeft = function(){

}
/**
* 向上移动接口
*/
CreateObj.prototype.moveTop = function(){

}
/**
* 向右移动接口
*/
CreateObj.prototype.moveRight = function(){
}
/**
* 向下移动接口
*/
CreateObj.prototype.moveDown = function(){

}

/**
* 碰撞附属物接口
*/
CreateObj.prototype.hitAnnex = function(){

}

/**
* 清除
*/
CreateObj.prototype.clear = function(){
	
}







