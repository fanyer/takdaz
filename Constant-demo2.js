// JavaScript Document
// 定义元素常量
var DIV = 'div';
var SPAN = 'span';
var IRON = 'iron';
var BARE = 'bare';
var FLOWER = 'flower'
var WALL = 'wall';
var LAIR = 'lair';
var POSITION = 'absolute';
var PX = 'px'
var BULLET = 'bullet';
var PLAY_IMG = 'play-img';
var ENEMY_IMG = 'enemy-img';
var ENEMY_FAST = 'enemy-fast';
var ENEMY_BIG = 'enemy-big';
var ANNEX = 'annex';
var SCORE = 'score';
var BOMB = 'bomb';
var PLAY_IMG = 'play-img';
var LIFE_NUM = '-life-num';
var OVER = 'over';
var ENEMY_LIFE_STR = 'enemy-life';
var LIFE_NUM_STR = 'life-num';
var FLAG_NUM = 'flag-num';
var ENEMY_COUNT = 'enemy-count';
var PLAY_LIFE_STR = 'play-life';
var PLAY2_LIFE_STR = 'play2-life';
var FLAG = 'flag';
var GAMELEVEL = 'gameLevel';
// 定义左，上，右，下方向的常量
var TIME = 0;
var LEFT = 0;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;

// 定义键盘控制方向的常量
var P_K_LEFT = 65;  // A
var P_K_UP = 87;    // W
var P_K_RIGHT = 68; // D
var P_K_DOWN = 83;  // S

var P__K_LEFT = 37; // ←
var P__K_UP = 38;   // ↑
var P__K_RIGHT = 39; // →
var P__K_DOWN = 40;  // ↓
// 定义玩家一初始生命数
var PLAY_LIFE = 3;
// 定义玩家二初始生命条数
var PLAY2_LIFE = 3;
// 定义敌人总数
var ENEMY_LIFE = 20;
// 定义控制发射子弹的常量
var P_K_J = 74;
var P__K_SPACE = 32;
// 定义敌方，我方坦克初始位置
var ENEMY_INIT_LOCAL = [[0,0],[192,0],[384,0]];
var MY_INIT_LOCAL = [[128,384],[256,384]];
// 定义敌方，我方坦克转向背景图的位置 L T R B 顺序排列
var G_ENEMY_BGPOS = [[-64,-32],[0,-32],[-96,-32],[-32,-32]];
var F_ENEMY_BGPOS = [[-192,-32],[-128,-32],[-224,-32],[-160,-32]];
var B_ENEMY_BGPOS_3 = [[-64,-64],[0,-64],[-96,-64],[-32,-64]];
var B_ENEMY_BGPOS_2 = [[-192,-64],[-128,-64],[-224,-64],[-160,-64]];
var B_ENEMY_BGPOS_1 = [[-320,-64],[-256,-64],[-352,-64],[-288,-64]];
var MY_ONE_BGPOS = [[-64,0],[0,0],[-96,0],[-32,0]];
var MY_TWO_BGPOS = [[-192,0],[-128,0],[-224,0],[-160,0]];
var BULLET_BGPOS = [[-92,-96],[-80,-96],[-98,-96],[-86,-96]];
var BOMB_4 = [[0,-162],[-66,-162],[-132,-162],[-198,-162]];
var BOMB_2 = [[0,-162],[-66,-162]];
var SCORE_BGPOS = [[[-192,-96]],[[-192,-110]],[[-192,-124]],[[-192,-138]]];
// 定义敌方出现前闪烁图背景位置
var ENEMY_IMG_BGPOS = [[-288,-32],[-320,-32],[-352,-32],[-384,-32],[-416,-32],[-448,-32],[-256,-32]];
// 定义我方无敌时图片位置
var MY_IMG_BGPOS = [[-160,-128],[-160,-96]]
var NUM_BGPOS = [[-256,-96],[-270,-96],[-284,-96],[-298,-96],[-312,-96],[-326,-96],[-340,-96],[-354,-96],[-368,-96],[-382,-96]];
// 定义障碍物
var OBSTACLE = ['wall','iron'];
// 定义敌我坦克的id,class
var ENEMY = 'enemy';
var FAST = 'enemy-fast';
var BIG  = 'enemy-big';
var PLAY = 'play';
var PLAY2 = 'play2';
// 定义玩家速度
var PLAY_SPEED = 2;
// 定义敌方坦克速度
var ENEMY_SPEED = 3;
var ENEMY_FAST_SPEED = 4;
var ENEMY_BIG_SPEED = 2;
// 定义坦克类型
var TYPE_ENEMY = 0;
var TYPE_PLAY = 1;
// 定义坦克血量
var PLAY_BLOOD = 1;
var ENEMY_BLOOD = 1;
var ENEMY_FAST_BLOOD = 1;
var ENEMY_BIG_BLOOD = 3;
// 定义坦克射击的时间间隔
var SHOOT_INTERVAL = 70;
var ENEMY_SHOOT_INTERVAL = 70;
var ENEMY_FAST_SHOOT_INTERVAL = 70;
var ENEMY_BIG_SHOOT_INTERVAL = 70;
// 定义敌方坦克所带的分数
var ENEMY_SCORE = 0;
var ENEMY_FAST_SCORE = 1;
var ENEMY_BIG_SCORE = 2;
// 定义附属物背景图位置
var ANNEX_BGPOS = [[[-256, -110]],[[-286, -110]],[[-316, -110]],[[-346, -110]],[[-376, -110]],[[-406, -110]]];
// 定义附属物类型
var TANK_TYPE = 0;
var PAUSE_TYPE = 1;
var SHOVEL_TYPE = 2;
var BOMB_TYPE = 3
var STAR_TYPE = 4;
var HAT_TYPE = 5;
var ANNEX_TYPE = [TANK_TYPE,PAUSE_TYPE,SHOVEL_TYPE,BOMB_TYPE,STAR_TYPE,HAT_TYPE]

// 定义音乐类型
var M_START = 0;
var M_ATTACK = 1;
var M_BOMB0 = 2;
var M_BOMB1 = 3;
var M_ANNEX = 4;
var M_OVER = 5;
var AUDIO = 'audio';
var MUSIC_ANNEX = 'music-annex';
var MUSIC_ATTACK = 'music-attack'
var MUSIC_BOBM0 = 'music-bomb0';
var MUSIC_BOMB1 = 'music-bomb1';
var MUSIC_OVER = 'music-over';
var MUSIC_START = 'music-start';
var MUSIC_ANNEX_SRC = 'music/annex.mp3';
var MUSIC_ATTACK_SRC = 'music/attack.mp3';
var MUSIC_BOBM0_SRC = 'music/bomb0.mp3';
var MUSIC_BOMB1_SRC = 'music/bomb1.mp3';
var MUSIC_OVER_SRC = 'music/over.mp3';
var MUSIC_START_SRC = 'music/start.mp3';

var beginTime = (new Date()).getTime();




























