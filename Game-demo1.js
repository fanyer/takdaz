/**
* 游戏
* @param{oParent} 父级对象即游戏中所有元素添加到的目标对象
* @param{players} 玩家数目 
*/
function Game(oParent,oRight,players){
	this.oParent = oParent;
	this.oRight = oRight;
	this.maps = null;
	this.players = players;
	this.level = 1;                // 定义关数数
	this.enemyDieCnt = 0;            // 敌人死亡次数
	this.enemyShowTiming = 0;        // 计算敌人出现的时间
	this.enemyShowInterval = 50     // 敌人出现的时间间隔
	this.playersShowTiming = 0;           // 计算玩家出现的时间
	this.playersShowInterval = 70;       // 玩家出现的时间间隔
	this.annexsShowTiming = 0;       // 计算附属物出现的时间
	this.annexsShowInterval = 300;   // 附属物出现的时间间隔
	this.localNum = 0;               // 定义敌方坦克出现的位置 0：中间 1：左边 2：右边
	this.isOver = false;             // 游戏是否结束 true：是 false：否
	this.tanks = [];                 // 游戏中的坦克对象
	this.bullets = [];               // 游戏中的子弹对象
	this.bombs = [];                // 游戏中的爆炸对象
	this.flicks = [];               // 游戏中所有的闪烁对象
	this.annexs = [];               // 游戏中所有的附属物对象
	this.scores = [];               // 游戏中所有的分数对象
	this.key = {};                  // 键盘按键对象
	this.time = null;               // 定时器变量
	this.pauseTiming = 0;           // 计算敌人暂停的时间
	this.pauseTime = 200;           // 敌人暂停的总时间
	this.isFirmLair = false;          // 加固老巢 true：是 false：否;
	this.firmLairTiming = 0;            // 计算老巢被加固的时间
	this.firmLairTime = 300;            // 老巢被加固的总时间
	this.firmLairIronWall = 0;          // 计算老巢距离取消加固的时间
	this.playerDieCnt = 0;                   // 玩家二死亡的次数
	this.playerLifeCnt = 0;	        // 玩家二初始的生命数
	this.player2DieCnt = 0;                   // 玩家二死亡的次数
	this.player2LifeCnt = 0;	        // 玩家二初始的生命数
	this.overCnt = 0;                 // 调用gameOver的次数
	this.beginning = false;            // 是否已经初始化玩家生命数 true：是 false：否
	this.oMusic = null;
}
/**
* 游戏初始化
*/
Game.prototype.init = function(){
	this.initMap();
	this.gameInfo();
	this.initEnemy();
	this.initPlayersLife();
	this.initPlayers();
	this.oRight.style.backgroundColor = '#7f7f7f';
	this.oFlagLifeNum.style.backgroundPosition = NUM_BGPOS[this.level][0] + PX + ' ' + NUM_BGPOS[this.level][1] + PX;
	var This = this;
	clearInterval(this.time);
	this.time = setInterval(function(){
		This.updateGame();
	},32)
	
}
/**
* 游戏开始
*/
Game.prototype.startGame = function(bIsBegin){
	this.oMusic = new Music(oAudio);
	this.oMusic.init();
	this.oMusic.playMusic(M_START)
	var oLevel = $(GAMELEVEL);
	this.oRight.style.backgroundColor = '#000';
	oLevel.getElementsByTagName(SPAN)[0].innerHTML = this.level;
	var This = this;
	startMoveTime(oLevel,{width:496,height:216,paddingTop:200,left:0,top:0},2000,'linear',function(){
		startMoveTime(oLevel,{width:0,height:0,paddingTop:0,left:248,top:208},2000,'linear',function(){
			setTimeout(function(){
				This.init();
			},200);
		});
	});
	
}
/**
* 游戏中初始化地图初始化地图
*/
Game.prototype.initMap = function(){
	this.maps = new Map(this.oParent,this.oRight,this.level);
	this.maps.initMap();	
}
/**
* 游戏初始化玩家生命数
*/
Game.prototype.initPlayersLife = function(){
	if(!this.beginning){
		if(this.players == 1){
			this.playerLifeCnt = PLAY_LIFE;       // 初始化玩家一生命数
		}else if(this.players == 2){
			this.playerLifeCnt = PLAY_LIFE;
			this.player2LifeCnt = PLAY2_LIFE;      // 初始化玩家二生命数
		}	
		this.beginning = true;                   // 已经初始化过玩家生命数
	}
}
/**
* 游戏中初始化玩家
*/
Game.prototype.initPlayers = function(){
	if(this.players == 1){
		this.initPlayerOne();       // 初始化一个玩家即玩家一
	}else if(this.players == 2){
		this.initPlayerTwo();       // 初始化两个玩家即玩家一和玩家二
	}
}
/**
* 初始化一个玩家即玩家一
*/
Game.prototype.initPlayerOne = function(){
	var nowLife = this.playerLifeCnt - this.playerDieCnt;
	nowLife = nowLife < 0 ? 0 : nowLife;
	this.oPlayLifeNum.style.backgroundPosition = NUM_BGPOS[nowLife][0] + PX + ' ' + NUM_BGPOS[nowLife][1] + PX;
	this.updatePlayerOne();
}
/**
* 初始化两个玩家即玩家一和玩家二
*/
Game.prototype.initPlayerTwo = function(){
	this.initPlayerOne();
	var nowLife = this.player2LifeCnt - this.player2DieCnt;
	nowLife = nowLife < 0 ? 0 : nowLife;
	this.oPlay2LifeNum.style.backgroundPosition = NUM_BGPOS[nowLife][0] + PX + ' ' + NUM_BGPOS[nowLife][1] + PX;
	this.updatePlayerTwo();
}
/**
* 检测游戏中是否已经存在玩家一
*/
Game.prototype.isHavePlayer = function(){
	for(var cnt = 0; cnt < this.tanks.length; cnt++){
		if(this.tanks[cnt].name == PLAY){
			return true;
		}
	}	
	return false;	
}
/**
* 检测游戏中是否已经存在玩家二
*/
Game.prototype.isHavePlayer2 = function(){
	for(var cnt = 0; cnt < this.tanks.length; cnt++){
		if(this.tanks[cnt].name == PLAY2){
			return true;
		}
	}	
	return false;	
}
/**
* 更新一个玩家
*/
Game.prototype.updatePlayerOne = function(){
	if(!this.isHavePlayer() && this.playerDieCnt < this.playerLifeCnt){                  // 游戏中是否存在玩家	并且死亡次数小于生命数
		var o = new Flick(oParent,{name:DIV,className:PLAY_IMG},MY_INIT_LOCAL[0][0],MY_INIT_LOCAL[0][1],MY_IMG_BGPOS,false,PLAY,PLAY);
		o.init();
		this.flicks.push(o);	

		this.oPlay = new MyTank(oParent,{name:DIV,id:PLAY,className:PLAY},MY_INIT_LOCAL[0][0],MY_INIT_LOCAL[0][1],MY_ONE_BGPOS,PLAY_SPEED,UP,TYPE_PLAY,PLAY_BLOOD,SHOOT_INTERVAL,PLAY);
		this.tanks.push(this.oPlay);
		this.oPlay.init();
	}
}
/**
* 更新两个个玩家
*/
Game.prototype.updatePlayerTwo = function(){
	if(!this.isHavePlayer2() && this.player2DieCnt < this.player2LifeCnt){                  // 游戏中是否存在玩家	并且死亡次数小于生命数
		var o = new Flick(oParent,{name:DIV,className:PLAY_IMG},MY_INIT_LOCAL[1][0],MY_INIT_LOCAL[1][1],MY_IMG_BGPOS,false,PLAY2,PLAY2);
		o.init();
		this.flicks.push(o);
		
		this.oPlay2 = new MyTank(oParent,{name:DIV,id:PLAY2,className:PLAY2},MY_INIT_LOCAL[1][0],MY_INIT_LOCAL[1][1],MY_TWO_BGPOS,PLAY_SPEED,UP,TYPE_PLAY,PLAY_BLOOD,SHOOT_INTERVAL,PLAY2);
		this.tanks.push(this.oPlay2);
		this.oPlay2.init();
	}
}
/**
* 更新玩家生命数
*/
Game.prototype.updatePlayerLife = function(playerName){
	if(playerName == PLAY){                     // 玩家一
		this.playerDieCnt++;                      // 玩家一死亡次数加一次
		var nowLife = this.playerLifeCnt - this.playerDieCnt;
	}else if(playerName == PLAY2){              // 玩家二
		this.player2DieCnt++;                     // 玩家二死亡次数加一次
		var nowLife = this.player2LifeCnt - this.player2DieCnt;
	}
	var oPlayLife = $(playerName + LIFE_NUM);
	nowLife = nowLife < 0 ? 0 : nowLife;
	if(nowLife <= 9){
		oPlayLife.style.backgroundPosition = NUM_BGPOS[nowLife][0] + PX + ' ' + NUM_BGPOS[nowLife][1] + PX;
	}else{
		oPlayLife.style.backgroundPosition = NUM_BGPOS[9][0] + PX + ' ' + NUM_BGPOS[9][1] + PX;
	}
	if(this.playerLifeCnt - this.playerDieCnt == 0 && this.player2LifeCnt - this.player2DieCnt == 0){
		this.isOver = true;
	}
}
/**
* 初始化敌人
*/
Game.prototype.initEnemy = function(){
	var oEnemyCount = $(ENEMY_COUNT);
	var enemyIdArr = [ENEMY,FAST,BIG];
	var oEnemyCount = $(ENEMY_COUNT);
	var oEnemyCountLast = oEnemyCount.lastElementChild || oEnemyCount.lastChild;
	if(oEnemyCountLast){           // 仍然有坦克
		var lastType = oEnemyCountLast.type;
		var enemyCnt = 0;
		for(var cnt = 0; cnt < this.tanks.length; cnt++){
			if(this.tanks[cnt].type == 0){
				enemyCnt++;
			}
		}
		if(enemyCnt < 4 && oEnemyCount.children.length != 0){
			var o = new Flick(oParent,{name:DIV,className:ENEMY_IMG},ENEMY_INIT_LOCAL[this.localNum][0],ENEMY_INIT_LOCAL[this.localNum][1],ENEMY_IMG_BGPOS,true,enemyIdArr[lastType],enemyIdArr[lastType]);
			o.init();
			this.flicks.push(o);
			this.localNum++;
			if(this.localNum > 2){
				this.localNum = 0;	
			}
		}
	}	
}
/**
* 封装创建元素
* @param{sElem} 创建元素的tag名
* @param{sClass} 创建元素的class名
* @param{sId} 创建元素的id名
* return{oElem} 返回创建的对象
*/
Game.prototype.createElem = function(sElem,sClass,sId){ // 封装创建元素
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
* 游戏信息
*/
Game.prototype.gameInfo = function(){
	var oEnemyCount = this.createElem(DIV,ENEMY_COUNT,ENEMY_COUNT);
	var oFrag = document.createDocumentFragment();
	for(var i = 0; i < this.maps.mapEnemyType.length; i++){
		var oEnemy = this.createElem(DIV,ENEMY_LIFE_STR);
		oEnemy.type = this.maps.mapEnemyType[i];
		oFrag.appendChild(oEnemy);
	}
	oEnemyCount.appendChild(oFrag);
	
	var oPlayLife = this.createElem(DIV,PLAY_LIFE_STR);
	var oPlay2Life = this.createElem(DIV,PLAY2_LIFE_STR);
	var oFlag = this.createElem(DIV,FLAG);
	this.oPlayLifeNum = this.createElem(DIV,LIFE_NUM_STR,PLAY+LIFE_NUM);
	this.oPlay2LifeNum = this.createElem(DIV,LIFE_NUM_STR,PLAY2+LIFE_NUM);
	this.oFlagLifeNum = this.createElem(DIV,LIFE_NUM_STR,FLAG_NUM);
	oPlayLife.appendChild(this.oPlayLifeNum);
	oPlay2Life.appendChild(this.oPlay2LifeNum);
	oFlag.appendChild(this.oFlagLifeNum);
	
	this.oRight.appendChild(oEnemyCount);
	this.oRight.appendChild(oPlayLife);
	this.oRight.appendChild(oPlay2Life);
	this.oRight.appendChild(oFlag);
}
/**
* 初始化附属物
*/
Game.prototype.initAnnex = function(){
	var randomNum = Math.floor(Math.random()*6);
	var randomX = Math.floor(Math.random()*386);
	var randomY = Math.floor(Math.random()*386);
	var o = new Annex(oParent,{name:DIV,id:ANNEX,className:ANNEX},randomX,randomY,ANNEX_BGPOS[randomNum],ANNEX_TYPE[randomNum]);	
	o.init();
	this.annexs.push(o);	
}
/**
* 增加玩家的生命数
* @param{players} 增加生命数的玩家对象
*/
Game.prototype.addLife = function(players){
	if(players == this.oPlay){
		this.playerLifeCnt++;
	}else if(players == this.oPlay2){
		this.player2LifeCnt++;
	}
}
/**
* 游戏中暂停敌人
*/
Game.prototype.pause = function(){
	this.pauseTiming = 0;
	this.enemyPause = true;
}
/**
* 加固老巢
* @param{bFirm} 是否加固
*/
Game.prototype.shovel = function(bFirm){
	if(bFirm){
		this.firmLairTiming = 0;
		this.isFirmLair = true;
	}
}
/**
* 消灭出现的所有敌人
*/
Game.prototype.bombAllEnemy = function(){
	for(var cnt = 0; cnt < this.tanks.length; cnt++){
		if(this.tanks[cnt].type == TYPE_ENEMY){
			this.enemyDieCnt++;
			this.tanks[cnt].bomb(true);;
			cnt = 0;
		}	
	}	
}

/**
* 增加火力
* @param{players} 增加火力的对象
*/
Game.prototype.addFire = function(players){
	players.star++;
	if(players.star >= 3){
		players.shotInterval /= 2;
	}	
}
/**
* 增加防护罩
* @param{players} 增加防护罩的对象
*/
Game.prototype.addHoods = function(players){
	for(var cnt = 0; cnt < this.flicks.length; cnt++){                 // 如果players已经有防护罩 则删除防护罩后再添加
		if(this.flicks[cnt].name == players.name){
			this.oParent.removeChild(this.flicks[cnt].obj);
			this.flicks.splice(cnt,1);
		}
	}
	var o = new Flick(oParent,{name:DIV,className:PLAY_IMG},players.obj.offsetLeft,players.obj.offsetTop,MY_IMG_BGPOS,false,players.name,players.name);
	o.interval = 300;
	o.init();
	this.flicks.push(o);	
}
/**
* 游戏键盘按下事件
*/
Game.prototype.keyDown = function(){
	var This = this;
	document.onkeydown = function(ev){
		var ev = ev || window.event;
		if(ev.preventDefault){
			ev.preventDefault();	
		}
		This.key[ev.keyCode] = true;
		return false;
	}	
}
/**
* 游戏键盘起上事件
*/
Game.prototype.keyUp = function(){
	var This = this;
	document.onkeyup = function(ev){
		var ev = ev || window.event;
		if(ev.preventDefault){
			ev.preventDefault();	
		}
		This.key[ev.keyCode] = false;
	}	
}
/**
* 游戏控制玩家一
*/
Game.prototype.ctrlPlayer = function(){
	if(this.key[P_K_LEFT]){
		this.oPlay.move(LEFT);
	}else if(this.key[P_K_UP]){
		this.oPlay.move(UP);	
	}else if(this.key[P_K_RIGHT]){
		this.oPlay.move(RIGHT);
	}else if(this.key[P_K_DOWN]){
		this.oPlay.move(DOWN);
	}
	if(this.key[P_K_J]){
		this.oPlay.shoot();
	}	
}
/**
* 控制游戏玩家二
*/
Game.prototype.ctrlPlayer2 = function(){
	if(this.key[P__K_LEFT]){
		this.oPlay2.move(LEFT);
	}else if(this.key[P__K_UP]){
		this.oPlay2.move(UP);	
	}else if(this.key[P__K_RIGHT]){
		this.oPlay2.move(RIGHT);
	}else if(this.key[P__K_DOWN]){
		this.oPlay2.move(DOWN);
	}
	
	if(this.key[P__K_SPACE]){
		this.oPlay2.shoot();
	}	
}
/**
* 游戏玩家控制
*/
Game.prototype.ctrlPlayers = function(){
	this.keyDown();
	this.keyUp();
	if(this.players == 1){
		this.ctrlPlayer();
	}else if(this.players == 2){
		this.ctrlPlayer();
		this.ctrlPlayer2();
	}
}
/**
* 更新游戏中闪烁元素
*/
Game.prototype.updateFlicks = function(){
	for(var i = 0; i < this.flicks.length; i++){
		this.flicks[i].show();
	}	
}
/**
* 更新游戏中子弹元素
*/
Game.prototype.updateBullets = function(){
	for(var i = 0; i < this.bullets.length; i++){
		var oLair = $(LAIR);
		if( this.bullets[i].collide(oLair) ){
			oLair.style.backgroundPosition = '-288px 0';
			this.isOver = true;
		}
		this.bullets[i].move(this.bullets[i].dir);	
	}	
}
/**
* 更新游戏中坦克元素
*/
Game.prototype.updateTanks = function(){
	for(var i = 0; i < this.tanks.length; i++){
		this.tanks[i].updateShot();
		this.tanks[i].moveFree();
		this.tanks[i].isHit();
	}	
}
/**
* 更新游戏中爆炸元素
*/
Game.prototype.updateBombs = function(){
	for(var i = 0; i < this.bombs.length; i++){
		this.bombs[i].changeBgPos();
	}
}
/**
* 更新游戏中附属物元素
*/
Game.prototype.updateAnnexs = function(){
	for(var cnt = 0; cnt < this.annexs.length; cnt++){
		this.annexs[cnt].clear();
	}
}
/**
* 更新游戏中分数元素
*/
Game.prototype.updateScores = function(){
	for(var i = 0; i < this.scores.length; i++){
		this.scores[i].timing++;
		if(this.scores[i].timing > this.scores[i].interval){
			this.scores[i].oParent.removeChild(this.scores[i].obj);
			this.scores.splice(i,1);
		}	
	}	
}
/**
* 更新老巢被铁包围
*/
Game.prototype.updateShovel = function(){
	if(this.isFirmLair){
		this.firmLairTiming++;
		if(this.firmLairTiming == 1){                            // 加固开始，直到提醒时间到才改变老巢围墙
			this.firmLair(IRON);
		}
		if(this.firmLairTiming > 200){                           // 已被加固200
		
			if(this.firmLairTiming > this.firmLairTime){           // 被加固超出总加固时间
				this.isFirmLair = false;                             // 取消加固
				this.firmLairTiming = 0;
				this.firmLairIronWall = 0;
				return;
			}
			
			this.firmLairIronWall++;                               
			if(this.firmLairIronWall == 1){                        // 切换iron和wall作为提醒加固快被取消
				this.firmLair(WALL);
			}else if(this.firmLairIronWall == 5){
				this.firmLair(IRON);
			}
			if(this.firmLairIronWall > 8){
				this.firmLairIronWall = 0;
			}
			
		}
	}
}
/**
* 老巢被铁保护
*/
Game.prototype.firmLair = function(oIronClass){
	var oLair = $(LAIR);
	var L = oLair.offsetLeft;  // 384
	var T = oLair.offsetTop;   // 192
	var l = 0;
	var t = 0;
	for(var i = this.maps.obstacle.length - 1; i > 0; i--){
		if(this.maps.obstacle[i].material == 7){
			this.oParent.removeChild(this.maps.obstacle[i]);
			this.maps.obstacle.splice(i,1);
		}	
	}
	var lairEnclosure = this.maps.lairEnclosure;
	for(var i = 0 ; i < 8; i++){
		lairEnclosure[i].className = oIronClass;
		this.maps.obstacle.push(lairEnclosure[i]);
		this.oParent.appendChild(lairEnclosure[i]);
	}	
}
/**
* 更新暂停
*/
Game.prototype.updatePause = function(){
	if(this.enemyPause){
		this.pauseTiming++;
		for(var cnt = this.tanks.length - 1; cnt > 0; cnt--){
			if(this.pauseTiming > this.pauseTime){
				this.tanks[cnt].stop = false;
				this.pauseTiming = 0;
				this.enemyPause = false;
			}
			if(this.tanks[cnt].type == TYPE_ENEMY){
				this.tanks[cnt].stop = true;
			}
		}	
	}else{
		for(var cnt = this.tanks.length - 1; cnt > 0; cnt--){
			this.tanks[cnt].stop = false;	
		}	
	}
}
/**
* 更新游戏元素
*/
Game.prototype.updateGame = function(){
	this.enemyShowTiming++;
	this.playersShowTiming++;
	this.annexsShowTiming++;
	if(this.enemyShowTiming > this.enemyShowInterval){
		this.initEnemy();
		this.enemyShowTiming = - 50;
	}
	if(this.playersShowTiming > this.playersShowInterval){
		this.initPlayers();
		this.playersShowTiming = -100;
	}
	if(this.annexsShowTiming > this.annexsShowInterval){
		if(this.annexs.length == 0){
			this.initAnnex();
		}
		this.annexsShowTiming = 0;
	}
	this.ctrlPlayers();
	this.updateFlicks();
	this.updateBullets();
	this.updateTanks();
	this.updateBombs();
	this.updateAnnexs();
	this.updateShovel();
	this.updatePause();
	this.updateScores();
	this.nextLevel();
	if(this.isOver && this.overCnt == 0){
		this.gameOver();
		this.overCnt = 1;
	}
}
/**
* 清除所有敌人即进入下一关
*/
Game.prototype.clearAllEnemy = function(){
	if(this.enemyDieCnt >= ENEMY_LIFE){
		return true;
	}
	return false;
}
/**
* 清除游戏中所有对象
*/
Game.prototype.clearAllObj = function(){
	this.tanks.length = 0;                 // 游戏中的坦克对象
	this.bullets.length = 0;               // 游戏中的子弹对象
	this.bombs.length = 0;                // 游戏中的爆炸对象
	this.flicks.length = 0;               // 游戏中所有的闪烁对象
	this.annexs.length = 0;               // 游戏中所有的附属物对象
	this.scores.length = 0; 	
	this.maps = null;
}
/**
* 游戏下一关
*/
Game.prototype.nextLevel = function(){
	if(this.clearAllEnemy()){
		this.clearAllObj();
		clearInterval(this.time);
		this.enemyDieCnt = 0;
		this.localNum = 0;
		this.level++;
		this.oParent.innerHTML = '<div id="gameLevel">第&nbsp;&nbsp;<span>一</span>&nbsp;&nbsp;关</div>';
		this.oRight.innerHTML = '';
		this.startGame();
	}	
}
/**
* 游戏结束
*/
Game.prototype.gameOver = function(){
	document.onkeydown = null;
	this.oMusic.playMusic(M_OVER);
	this.keyDown = function(){};
	var oOver = this.createElem(DIV,OVER);
	this.oParent.appendChild(oOver);
	startMove(oOver,{top:176});
}























