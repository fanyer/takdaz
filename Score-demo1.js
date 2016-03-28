// 创建分数

/**
* @param{oParent} 父级对象即创建对象添加到的目标对象
* @param{elem} 创建积分json对象{name:'tagName',id:'id',className:'className'}
* @param{x} 积分对象初始的横位置
* @param{y} 积分对象初始的纵坐标
* @param{bgPos} 积分对象的背景图位置数组，按L T R B排序
*/
function Score(oParent,elem,x,y,bgPos){
	CreateObj.call(this,oParent,elem,x,y,bgPos);
	this.timing = 0;       // 统计再现的时间
	this.interval = 40;     // 能再现的总时间，如果再现时间超过此值对象便销毁
}
// 继承CreateObj
Score.prototype = new CreateObj;


