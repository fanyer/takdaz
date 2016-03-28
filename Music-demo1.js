/**
* 播放音乐的构造函数
* @param{oAudio} 音频存放的目标对象
*/
function Music(oAudio){
	this.oAudio = oAudio;
	this.annex = null;
	this.attack = null;
	this.bomb0 = null;
	this.bomb1 = null;
	this.over = null;
	this.start = null;
}
/**
* 初始化
*/
Music.prototype.init = function(){
	this.createAudio();	
}
/**
* 创建音频对象
*/
Music.prototype.createAudio = function(){
	this.annex = this.createElem(AUDIO,MUSIC_ANNEX,MUSIC_ANNEX);
	this.annex.src = MUSIC_ANNEX_SRC;
	this.attack = this.createElem(AUDIO,MUSIC_ATTACK,MUSIC_ATTACK);
	this.attack.src = MUSIC_ATTACK_SRC;
	this.bomb0 = this.createElem(AUDIO,MUSIC_BOBM0,MUSIC_BOBM0);
	this.bomb0.src = MUSIC_BOBM0_SRC;
	this.bomb1 = this.createElem(AUDIO,MUSIC_BOMB1,MUSIC_BOMB1);
	this.bomb1.src = MUSIC_BOMB1_SRC;
	this.over = this.createElem(AUDIO,MUSIC_OVER,MUSIC_OVER);
	this.over.src = MUSIC_OVER_SRC;
	this.start = this.createElem(AUDIO,MUSIC_START,MUSIC_START);
	this.start.src = MUSIC_START_SRC;
	var oFrag = document.createDocumentFragment();
	oFrag.appendChild(this.annex);
	oFrag.appendChild(this.attack);
	oFrag.appendChild(this.bomb0);
	oFrag.appendChild(this.bomb1);
	oFrag.appendChild(this.over);
	oFrag.appendChild(this.start);
	this.oAudio.appendChild(oFrag);	
}
/**
* 封装创建元素
* @param{sElem} 创建元素的tag名
* @param{sClass} 创建元素的class名
* @param{sId} 创建元素的id名
* return{oElem} 返回创建的对象
*/
Music.prototype.createElem = function(sElem,sClass,sId){ // 封装创建元素
	var oElem = document.createElement(sElem);
	if(sClass){
		oElem.className = sClass;
	}
	if(sId){
		oElem.id = sId;	
	}
	return oElem;
}
/**
* 播放音乐
* @param{type} 类型 0:start 1:attack 2: bomb0 3:bomb1 4:annex 5:over
*/
Music.prototype.playMusic = function(type){
	switch(type){
		case 0:
			this.start.play();
			break;
		case 1:
			this.attack.play();
			break;
		case 2:
			this.bomb0.play();
			break;
		case 3:
			this.bomb1.play();
			break;
		case 4:
			this.annex.play();
			break;
		case 5:
			this.over.play();
			break;
		default:
			break;
	}
}
