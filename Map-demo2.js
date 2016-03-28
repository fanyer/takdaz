// JavaScript Document
/**
* 定义地图数组 15 x 13
* 地图：eMap
* 0 : bare
* 1 ： wall
* 2 : iron
* 3 : flower
* 7 : iron-wall
* 9 : lair
*/
var eMap = {

		level_1 :{
							obstacles: [
												[0,0,0,0,0,0,2,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0],
												[0,0,0,0,0,0,2,2,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0],
												[0,0,1,1,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
												[0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0],
												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0],
												[3,3,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,1,1,3,3,1,1,2,2],
												[3,3,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,1,1,3,3,1,1,2,2],
												[3,3,3,3,0,0,0,0,0,0,1,1,0,0,0,0,2,2,0,0,3,3,0,0,0,0],
												[3,3,3,3,0,0,0,0,0,0,1,1,0,0,0,0,2,2,0,0,3,3,0,0,0,0],
												[0,0,1,1,1,1,1,1,3,3,3,3,3,3,2,2,0,0,0,0,3,3,1,1,0,0],
												[0,0,1,1,1,1,1,1,3,3,3,3,3,3,2,2,0,0,0,0,3,3,1,1,0,0],
												[0,0,0,0,0,0,2,2,3,3,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,0,0,0,0,2,2,3,3,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[2,2,1,1,0,0,2,2,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0],
												[2,2,1,1,0,0,2,2,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,2,2,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
												[0,0,0,0,0,0,0,0,0,0,0,7,7,7,7,0,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,0,7,9,0,7,0,0,0,1,1,1,1,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,0,7,0,0,7,0,0,0,1,1,1,1,1,1,0,0]
							],
							enemyType:[
												1,1,2,2,1,1,0,0,2,2,1,1,0,0,2,2,1,1,0,0
							]
		},
	level_2 :{
							obstacles: [
												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,2,2,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
												[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
												[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
												[1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1],
												[2,2,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2,2],
												[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
												[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0],
												[0,0,1,1,0,0,1,1,0,0,0,7,7,7,7,0,0,0,1,1,0,0,1,1,0,0],
												[0,0,0,0,0,0,0,0,0,0,0,7,9,0,7,0,0,0,0,0,0,0,0,0,0,0],
												[0,0,0,0,0,0,0,0,0,0,0,7,0,0,7,0,0,0,0,0,0,0,0,0,0,0]
							],
							enemyType:[
											0,1,2,2,1,1,0,2,2,2,1,0,0,1,2,2,1,0,1,0
							]
	},
	level_3 :{
							obstacles: [
											[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
											[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
											[0,0,3,3,3,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2],
											[0,0,3,3,3,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
											[1,1,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
											[1,1,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0],
											[3,3,3,3,3,3,3,3,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,0],
											[3,3,3,3,3,3,3,3,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,1,0,0],
											[3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,1,0,0],
											[3,3,3,3,3,3,3,3,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0],
											[3,3,3,3,3,3,3,3,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0],
											[3,3,3,3,3,3,3,3,0,0,0,0,2,2,2,2,2,2,0,0,0,0,3,3,0,0],
											[0,0,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,3,3,0,0],
											[0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3],
											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3],
											[0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3],
											[1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3],
											[1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,3,3,3,3,3,3,3,3],
											[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,3,3,3,3,3,3,3,3],
											[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,3,3,3,3,3,3,3,3],
											[1,1,0,0,0,0,2,0,0,0,0,0,0,0,1,1,1,1,3,3,3,3,3,3,0,0],
											[1,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,0,0],
											[1,1,1,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,0,0],
											[1,1,1,1,0,0,2,0,0,0,0,7,7,7,7,0,0,0,3,3,3,3,3,3,0,0],
											[2,2,1,1,1,1,0,0,0,0,0,7,9,0,7,0,0,0,1,1,0,0,0,0,0,0],
											[2,2,1,1,1,1,0,0,0,0,0,7,0,0,7,0,0,0,1,1,0,0,0,0,0,0]
							],
							enemyType:[
											2,0,1,2,1,2,0,0,2,2,1,1,2,0,1,2,2,2,0,1
							]
	}
	
};
/**
* 创建地图
* @param{oParent} 父级对象即创建的对象添加到的目标对象
* @param{level} 地图等级
*/
function Map(oParent,oRight,level){
	this.oParent = oParent;
	this.oRight = oRight;
	this.level = level;
	this.lairEnclosure = [];       // 缓存老巢围墙
	this.obstacle = [];            // 缓存所有障碍物
	this.eMapLevel = 0;
	this.iEMapLen = 0;
	this.mapEnemyType = [];
}
/**
* 初始化
*/
Map.prototype.initMap = function(){
	this.initLevel();
	this.initLeftMap();
	//this.initRightMap();
}
/**
* 创建地图左边内的具体物体
*/
Map.prototype.initLeftMap = function(){
	var oFrag = document.createDocumentFragment();
	for(var i = 0; i < this.iEMapLen; i++){
		for(var j = 0; j < this.eMapLevel[i].length; j++){
			switch(this.eMapLevel[i][j]){
				// 道
				case 0 :
						var oBare = this.createElem(DIV,BARE);
						oBare.material = 0;
						oFrag.appendChild(oBare);
						break;
				// 墙
				case 1 :
						var oWall = this.createElem(DIV,WALL);
						oWall.material = 1;
						oFrag.appendChild(oWall);
						break;
				// 铁
				case 2 :
						var oIron = this.createElem(DIV,IRON);
						oIron.material = 2
						oFrag.appendChild(oIron);
						break;
				// 花
				case 3 :
						var oFlower = this.createElem(DIV,FLOWER);
						oFlower.material = 3;
						oFrag.appendChild(oFlower);
						break;
				case 7 :
						var oWall = this.createElem(DIV,WALL);
						oWall.material = 7;
						oFrag.appendChild(oWall);
						break;
				// 老巢
				case 9 : 
						var oBare = this.createElem(DIV,BARE);
						oBare.material = 0;
						oFrag.appendChild(oBare);
						var oLair = this.createElem(DIV,LAIR,LAIR);
						oLair.style.position = POSITION;
						oLair.material = 9;
						oFrag.appendChild(oLair);
						break;
				default:
						break;
			}
		}
	}
	this.oParent.appendChild(oFrag);
	// 布局转换
	var oElem = this.oParent.getElementsByTagName(DIV);
	var iElemLen = oElem.length;
	var index = 0;
	for(var i = 0; i < iElemLen; i++){
		if(oElem[i].id != LAIR){
			oElem[i].style.top = oElem[i].offsetTop + PX;
			oElem[i].style.left = oElem[i].offsetLeft + PX;
		}
	}
	
	for(var i = 0; i < iElemLen; i++){
		if(oElem[i].id != LAIR){
			oElem[i].style.position = POSITION;
			if(oElem[i].material == 7){
				oElem[i].index = index++;
				this.lairEnclosure.push(oElem[i]);
				this.obstacle.push(oElem[i]);	
			}else if(oElem[i].material == 1 || oElem[i].material == 2){
				this.obstacle.push(oElem[i]);	
			}
		}
	}
	// 老巢定位
	var oLair = $(LAIR);
	oLair.style.top = oLair.previousSibling.offsetTop + PX;
	oLair.style.left = oLair.previousSibling.offsetLeft + PX;
	oLair.style.zIndex = 6;
}

/**
* 初始化地图关
*/
Map.prototype.initLevel = function(){
	switch(this.level){
		case 1 :
			this.eMapLevel = eMap.level_1.obstacles;
			this.iEMapLen = eMap.level_1.obstacles.length;
			this.mapEnemyType = eMap.level_1.enemyType;
			break;
		case 2 :
			this.eMapLevel = eMap.level_2.obstacles;
			this.iEMapLen = eMap.level_2.obstacles.length;
			this.mapEnemyType = eMap.level_2.enemyType;
			break;
		case 3 :
			this.eMapLevel = eMap.level_3.obstacles;
			this.iEMapLen = eMap.level_3.obstacles.length;
			this.mapEnemyType = eMap.level_3.enemyType;
			break;	
		default :
			this.eMapLevel = eMap.level_1.obstacles;
			this.iEMapLen = eMap.level_1.obstacles.length;
			this.mapEnemyType = eMap.level_1.enemyType;
			break;
	}
}
/**
* 封装创建元素
* @param{sElem} 创建元素的tag名
* @param{sClass} 创建元素的class名
* @param{sId} 创建元素的id名
* return{oElem} 返回创建的对象
*/
Map.prototype.createElem = function(sElem,sClass,sId){ // 封装创建元素
	var oElem = document.createElement(sElem);
	if(sClass){
		oElem.className = sClass;
	}
	if(sId){
		oElem.id = sId;	
	}
	return oElem;
}
































