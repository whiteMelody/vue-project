cc.Class({
  extends: cc.Component,

  properties: {
    // hero对象，包含勇者各种属性
    heroPro: {
      default: null,
    },
    // game对象,包含游戏进度，游戏参数等
    gamePro: {
      default: null,
    },
    // 游戏音效数组
    gameAudios : [cc.AudioClip],
    // 游戏精灵数组
    gameSprites: [cc.SpriteFrame],
    // 游戏道具数组
    equipments: [cc.SpriteFrame],
    // hero 预设对象
    heroPrefab: cc.Prefab,
    // 公主 预设对象
    princessPreFab: cc.Prefab,
    // 恶龙 预设对象
    dragonPreFab: cc.Prefab,
    // 敌人 预设对象
    skullPrefabs: [cc.Prefab],
    // 护甲（盾） 预设对象
    shieldPrefabs: [cc.Prefab],
    // 武器（剑） 预设对象
    swordPrefabs: [cc.Prefab],
    // 药剂 预设对象
    pheaPrefabs: [cc.Prefab],
    // 其他道具 预设对象
    propPrefabs:  [cc.Prefab],
    // bg
    bg: cc.Sprite,
    // game 大背景
    gameBg: cc.Sprite,
    // 碰撞伤害值1
    hpLable1: cc.Node,
    // 碰撞伤害值2
    hpLable2: cc.Node,
    // 碰撞伤害值3
    hpLable3: cc.Node,
    // 时间图标
    dayBg: cc.Node,
    // 时间充能背景
    dayState: cc.Node,
    // 计分板
    scoreBg: cc.Node,
    // 分数充能背景
    scoreState: cc.Node,
    // 底部导航栏
    tabBars: [cc.Node],
    // 对话框
    msgBox: cc.Node,
    // 游戏结束/暂停菜单
    gameOverMenu: cc.Node,
    // 重新开始游戏按钮
    restartBtn: cc.Node,
    // 战斗统计按钮
    statisticsBtn: cc.Node,
    // 分享重生按钮
    shareBtn: cc.Node,
    // 游戏结果
    scoreResult: cc.Node,
    // 对话框对象，包含人物名、头像、对话、计时器
    msgInfo:{
      default: null,
    },
    // 监听移动 （防止动画生效前重复移动）
    moving: false,
    // 锁定移动（用于处理暂停游戏或者其他情况）
    lockMove: true,
    // 教程进度 （已弃用)
    course: 0,
    // 移动强制开启次数
    moveMissCount: 0,
    // 事件薄
    eventBook: cc.Node,
    // 事件薄详情
    eventDetail: cc.Node,
    // 阅读事件按钮
    eventBtn: cc.Node,
    // 事件薄返回按钮
    backBtn: cc.Node,
    // 事件薄详情返回按钮
    detailBackBtn: cc.Node,
    // CG界面
    cgView: cc.Node,
    // CG图片
    cgImage: cc.Sprite,
    // CG内容
    cgContent: cc.Node,
    // CG跳过按钮
    cgBtn: cc.Node,
    // CG分享按钮
    cgShareBtn: cc.Node,
    // 提示窗
    tipsView: cc.Node,
    // 关闭提示窗按钮
    tipsCloseBtn: cc.Node,
    // 不再显示提示窗按钮
    tipsOffBtn: cc.Node,
    // 提示窗内容
    tipsViewContent: cc.Node,
    // 系统教程1
    tutorialView1: cc.Node,
    // 系统教程1 下一步按钮
    tutorial1NextBtn: cc.Node,
    // 系统教程1 不再显示提示窗按钮
    tutorial1OffBtn: cc.Node,
    // 系统教程2
    tutorialView2: cc.Node,
    // 系统教程2 下一步按钮
    tutorial2NextBtn: cc.Node,
    // 系统教程2 不再显示提示窗按钮
    tutorial2OffBtn: cc.Node,
    // 统计面板
    statistics: cc.Node,
    // 统计面板 返回按钮
    statisticsBackBtn: cc.Node,
    // 统计面板 分数
    statisticsScore: cc.Node,
    // 统计面板 成就
    statisticsAchievement: cc.Node,
    // 统计面板 线索
    statisticsClue: cc.Node,
    // 统计面板 list
    statisticsList: cc.Node,
    // 事件列表
    events: cc.Node,
    // tips数据，包含教程、tips、彩蛋
    tutorialData:{
      default: null,
    },
    // 事件薄数据
    eventBookData: {
      default: null,
    },
    // 登录页
    loginView: cc.Node,
    loginContent: cc.Node,
    calLoginBtn: cc.Node,
    //微信开放域
    rankView: cc.Node,
    rankBg: cc.Node,
    // userName: cc.Label,
    // userIcon: cc.Sprite,

    tmp: cc.Node,

  },

  // use this for initialization
  onLoad() {

    this.bindBtnEvents()

    this.creatEventBook()

    this.creatTutorials()

    for(let i=0; i<this.events.childrenCount; i++){
      this.events.children[i].on(cc.Node.EventType.TOUCH_END, function (event) {
        this.readEvent(i)
      }, this);
    }

    this.loadSource()

    //初始化棋盘
    this.creatBgBlocks();

    //监听棋牌移动
    this.addTouchEvents();

    //初始化数据
    this.princesss = [];
    this.dragons = [];
    this.skulls = [];
    this.lockMove = true;
    this.msgInfo ={
      index: 0,
      content: [],
      timerID: 0,
      timer: {}
    };

    // 播放背景音乐
    // this.playBgSound()

    this.maxSocre = 0           //记录当前最高分数

    this.gamePro = {
      turns: 0,                   // 回合数
      kill: 0,                    // 击杀数
      type: 'day',                // day | night
      course: false,             // 启用教程
      pause: false,              // 暂停
      recover: false,             // 每局一次复活机会
      count: 0,                   // 怪物波数
      next: 11,                   // 下一个出现的回合数
      line: 0,                    // 0 - 12
      princessLine: false,        //公主支线
      princessState: 0,           //公主线当前进度       0 未营救  1 第一章营救《公主回归》 2 第二章营救《浪迹天涯》 3 第三章营救《无尽模式》
      dragonLine: false,         //巨龙支线
      dragonState: 0,             //巨龙线当前进度       0 未击杀 1 第一章《屠龙者》 2 第二章 《恶龙之怒》 3 第三章《莱科》 4 《无尽模式》
      end: {
        text: '',           // 结局
        url: '',            // cg图片
      },
      data:{
        atk2: 0,
        atk4: 0,
        atk8: 0,
        atk16: 0,
        def2: 0,
        def4: 0,
        def8: 0,
        def16: 0,
        hp2: 0,
        hp4: 0,
        hp8: 0,
        hp16: 0,
        skull2: 0,
        skull4: 0,
        skull8: 0,
        skull16: 0,
        princesss: 0,
        dragon: 0,
        fire: 0,
      }
    }

    this.initData();

    // this.gameover('pause')

    //启用教程
    this.showTutorial(1)

    // this.gamePro.line = 1;
    // this.gamePro.dragonLine = true;
    // this.addDragon()

    // this.addDragon2()

    // this.playCG('save_princess_success_2', 'gameover')

    // this.gameover('save_princess_success')

    // this.showStatistics()

  },

  start() {

    //加载本地教程进度

    //加载本地用户

    //加载本地事件解锁条目

    // this.gameOverMenu.getComponent('GameOverMenu').init(this);

    wx.getSystemInfo({
      success: (res) => {

        this.loginBtn1 = wx.createUserInfoButton({
          type: 'text',
          text: '立即登录',
          style: {
            left: (res.windowWidth - 200) / 2,
            top: res.windowHeight / 2,
            width: 200,
            height: 40,
            lineHeight: 40,
            backgroundColor: '#4e84e5',
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 16,
            borderRadius: 4
          }
        })

        this.loginBtn1.hide()

        this.loginBtn1.onTap((res) => {
          this.userInfo = res.userInfo
          //登录
          this.hideLogin()
          this.showRank()
          wx.setStorage({
            key: 'user',
            data: JSON.stringify(res.userInfo)
          })
        })
      }
    })

  },

  showLogin(type){
    this.loginView.x = 320
    this.loginView.y = 568

    let content = ''

    if(type == 'showRank'){
      content = '您需要登录后才能查看好友排行榜'

    }else{
      //获取本地用户数据
      content = '您需要登录后才能提交成绩到好友排行榜'
      this.hideLogin()
      this.submitScore()
    }

    this.loginContent.getComponent(cc.Label).string = content
    this.loginBtn1.show()

  },

  hideLogin(){
    this.loginView.x = -2640
    this.loginView.y = -1000
    this.loginBtn1.hide()
  },

  login(){

  },

  showRank() {
    this.rankView.x = 320
    this.rankView.y = 568

    //判断是否有最高分

    if(this.maxSocre !=0){
      wx.postMessage({
        nickName: this.userInfo.nickName,
        avatarUrl: this.userInfo.avatarUrl,
        score: this.maxSocre,
      });
    }else{
      wx.postMessage({
        nickName: this.userInfo.nickName,
        avatarUrl: this.userInfo.avatarUrl,
      });
    }

  },

  hideRank(){
    this.rankView.x = 1320
    this.rankView.y = -1000
  },

  submitScore(){

  },

  /**
   * 绑定按钮点击
   */
  bindBtnEvents(){
    this.restartBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.restart()
    }, this);

    this.gameOverMenu.getChildByName("warpper").on(cc.Node.EventType.TOUCH_END, (event)=> {
      if(this.gamePro.pause){
        this.gamePro.pause = false
        this.lockMove = false
        this.gameOverMenu.x = -1320
      }
    }, this);

    this.backBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.hideEventBook()
    }, this);

    this.detailBackBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.hideEventDetail()
    }, this);

    this.statisticsBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.showStatistics()
    }, this);

    this.statisticsBackBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.hideStatistics()
    }, this);

    this.tipsCloseBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      //关闭教程
      this.hideTipsView()
    }, this);

    this.tipsOffBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.readTutorial('all')
    }, this);

    this.tutorial1NextBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.hideTutorial(1)
      this.readTutorial(1)
      this.showTutorial(2)
    }, this);

    //-2018年9月17日11:17:50
    //-暂时关闭
    // this.tutorial1OffBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
    //     //关闭教程
    //     this.readTutorial('all')
    // }, this);

    this.tutorial2NextBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.hideTutorial(1)
      this.hideTutorial(2)
      this.readTutorial(2)
      this.lockMove = false
    }, this);

    //-2018年9月17日11:17:50
    //-暂时关闭
    // this.tutorial2OffBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
    //     //关闭教程
    //     this.readTutorial('all')
    // }, this);

    this.cgBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      //关闭CG
      this.hideCgView()
    }, this);

    // 事件薄
    this.tabBars[0].on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.showEventBook()

    }, this);

    //暂停/菜单
    this.tabBars[1].on(cc.Node.EventType.TOUCH_END, (event)=> {
      this.gameover('pause')
      this.()
    }, this);


    //排行榜
    this.tabBars[2].on(cc.Node.EventType.TOUCH_END, (event)=> {

      let user = wx.getStorageSync('user')

      if(this.isNull(user)){
        //弹出登录窗口
        this.showLogin('showRank')
      }else{
        //打开排行榜
        this.userInfo = JSON.parse(user)
        this.showRank()
      }

    }, this);

    this.calLoginBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      //关闭LoginView
      this.hideLogin()
    }, this);

    this.rankBg.on(cc.Node.EventType.TOUCH_END, (event)=> {
      //关闭LoginView
      this.hideRank()
    }, this);

    //分享复活
    this.shareBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      console.log('测试手动分享')
      this.onShareBtn()
    }, this);

    //分享结局
    this.cgShareBtn.on(cc.Node.EventType.TOUCH_END, (event)=> {
      console.log('测试分享结局')
      this.onShareBtn(true)
    }, this);

    // wx.showShareMenu();
    // //监听右上角的分享调用
    // cc.loader.load("https://album.31un.com/assets/cgs/CG3.jpg", (err, data)=> {
    //     wx.onShareAppMessage(function(res){
    //         return {
    //             title: "监听分享",
    //             imageUrl: data.url,
    //             success(res){
    //                 console.log("转发成功!!!")
    //                 // common.diamond += 20;
    //             },
    //             fail(res){
    //                 console.log("转发失败!!!")
    //             }
    //         }
    //     })
    // });

    //微信开启群分享
    wx.updateShareMenu({
      withShareTicket: true
    })

    //login

  },

  onShareBtn(type){ //分享按钮

    var self = this;
    //主动拉起分享接口
    if(type){
      cc.loader.load(this.gamePro.url, (err, data)=> {
        wx.shareAppMessage({
          title: this.gamePro.end.text + '章节完成',
          imageUrl: data.url,
          success(res){
            console.log("转发成功!!!")
          },
          fail(res){
            console.log("转发失败!!!")
          }
        })
      });
    }else{
      cc.loader.load('https://album.31un.com/assets/cgs/share_cg19.jpg', (err, data)=> {
        wx.shareAppMessage({
          title: "手动分享",
          imageUrl: data.url,
          success(res){
            console.log("转发成功!!!")
            self.recover()
          },
          fail(res){
            console.log("转发失败!!!")
          }
        })
      });
    }

  },

  onSeekHelpBtnClicked() { //加心界面求助好友群按钮
    var self = this;
    cc.loader.load("https://album.31un.com/assets/cgs/CG3.jpg", (err, data)=> {
      wx.shareAppMessage({
        title: "分享到群",
        imageUrl: data.url,
        success(res){
          console.log("转发成功!!!");

          console.log(res.shareTickets)

          if (res.shareTickets == null || res.shareTickets == undefined || res.shareTickets == "") { //没有群信息，说明分享的是个人
            console.log("res.shareTickets is null");
            console.log("请分享到群里");
          } else { //有群信息
            console.log("res.shareTickets is not null");
            if (res.shareTickets.length > 0) {
              console.log("分享群里成功!!!");
              //满状态复活
              self.recover()
            }
          }
        },
        fail(res){
          console.log("转发失败!!!");
        }
      })
    });
  },

  /**
   * 加载远程资源
   */
  loadSource(){
    // 加载远程资源

    cc.loader.load("http://album.31un.com/assets/images/bg-sunset.jpg", (err, texture)=> {
      let bg_sunset = new cc.SpriteFrame(texture);
      this.equipments[0] = bg_sunset
      this.gameBg.spriteFrame = bg_sunset
    });
    cc.loader.load("http://album.31un.com/assets/images/bg-night.jpg", (err, texture)=> {
      this.equipments[1] = new cc.SpriteFrame(texture);
    });

    // this.gameSprites = [
    //     knight_sunset,          //骑士 白天
    //     knight_night,           //骑士 夜晚
    //     princess_sunset,        //公主 白天
    //     princess_night,         //公主 夜晚
    //     slime2_sunset,          //年幼史莱姆 白天
    //     slime2_night,           //年幼史莱姆 夜晚
    //     slime4_sunset,          //普通史莱姆 白天
    //     slime4_night,           //普通史莱姆 夜晚
    //     slime8_sunset,          //史莱姆战士 白天
    //     slime8_night,           //史莱姆战士 夜晚
    //     slime16_sunset,         //史莱姆长老 白天
    //     slime16_night,          //史莱姆长老 夜晚
    //     dragon,                 //恶龙
    //     atk2,                   //武器2
    //     atk4,                   //武器4
    //     atk8,                   //武器8
    //     atk16,                  //武器16
    //     def2,                   //防具2
    //     def4,                   //防具4
    //     def8,                   //防具8
    //     def16,                  //防具16
    //     hp2,                    //药剂2
    //     hp4,                    //药剂4
    //     hp8,                    //药剂8
    //     hp16,                   //药剂16
    //     panel_atk,              //攻击力图标
    //     panel_def,              //防御力图标
    //     panel_hp,               //生命值图标
    //     block,                  //空block图标
    //     block2,                 //空block图标2
    //     block3,                 //空block图标3
    //     head_hero,              //hero头像
    //     head_princess,          //公主头像
    //     head_dragon,            //恶龙头像
    //     empty_cg,               //空贴图
    //     fire,                   //火焰
    // ]

  },

  /**
   * 创建教程
   */
  creatTutorials(){


    this.tutorialData = {
      data: [
        {
          index: 1,
          id: 1,
          isRead: false,
          content: '',
          type: 'sys',        //sys | msg | egg
        }, {
          index: 2,
          id: 2,
          isRead: false,
          content: '',
          type: 'sys',
        }, {
          index: 3,
          id: 3,
          isRead: false,
          content: '时间流逝\n 注意，每次移动时间会+1，左上角时间和右上角计分板会充能+1，每次滑动会在棋盘刷新一个道具',
          type: 'msg',
        }, {
          index: 4,
          id: 4,
          isRead: false,
          content: '药剂\n 拾取药剂可以恢复你的生命值',
          type: 'msg',
        }, {
          index: 5,
          id: 5,
          isRead: false,
          content: '装备\n 拾取装备可以提高你的攻击力/护甲',
          type: 'msg',
        }, {
          index: 6,
          id: 6,
          isRead: false,
          content: '丢弃的物品\n 如果你拿起的武器或盾牌比你现在的更弱，人物的攻击力和防御值不会增加',
          type: 'msg',
        }, {
          index: 7,
          id: 7,
          isRead: false,
          content: '敌人\n 敌人会在计分板充满后出现，如果棋盘已满会移除左下角的道具\n 请注意，敌人也会拾取道具',
          type: 'msg',
        }, {
          index: 8,
          id: 8,
          isRead: false,
          content: '先攻\n 先攻者会先进行伤害，如果目标死亡则不会反击',
          type: 'msg',
        }, {
          index: 9,
          id: 9,
          isRead: false,
          content: '耐久\n 当你攻击你的对手时，首先会被盾牌抵挡，然后才会受到伤害。请注意，你的武器每次攻击也会磨损，攻击-1\n 盾牌格挡伤害后耐久会降低',
          type: 'msg',
        }, {
          index: 10,
          id: 10,
          isRead: false,
          content: '击杀\n 击杀敌人分数+1，摧毁尽可能多的敌人，并使你的得分达到一个记录',
          type: 'msg',
        }, {
          index: 11,
          id: 11,
          isRead: false,
          content: '夜晚\n 夜晚敌人无法攻击，利用这个机会，制作最好的物品为白天的战斗做准备（夜晚计分板充能速度大幅度降低）',
          type: 'msg',
        }, {
          index: 12,
          id: 12,
          isRead: false,
          content: '合成\n 将两种相同类型的物品组合在一起，就可以制作出更强大的物品，物品最高可以合成为16',
          type: 'msg',
        }, {
          index: 13,
          id: 13,
          isRead: false,
          content: '太阳升起\n 请注意，在夜晚中网格充满后太阳会升起，立即进入白天',
          type: 'msg',
        }, {
          index: 14,
          id: 3,
          isRead: false,
          content: '教程结束\n 恭喜您已经完成了所有教程，请在游戏中探索更多内容吧',
          type: 'msg',
        }, {
          index: 15,
          id: 15,
          isRead: false,
          content: '恶龙\n 恶龙登场时，会烧毁一切道具，烧毁的史莱姆变为火焰',
          type: 'egg',
        }, {
          index: 16,
          id: 16,
          isRead: false,
          content: '火焰\n 恶龙衍生物，吞噬一切道具（包括火焰），可以对玩家造成4点真实伤害',
          type: 'egg',
        }, {
          index: 17,
          id: 17,
          isRead: false,
          content: '公主\n 公主登场时，会被史莱姆包围，营救公主获得游戏胜利，公主阵亡游戏失败',
          type: 'egg',
        }, {
          index: 18,
          id: 18,
          isRead: false,
          content: '彩蛋\n 有时候游戏失败也会获得某些成就哦',
          type: 'egg',
        }, {
          index: 19,
          id: 19,
          isRead: false,
          content: '石柱\n 石柱无法移动，无法被破坏，五回合后消失',
          type: 'egg',
        }
      ]
    }
  },

  /**
   * 阅读教程
   * @param i
   */
  readTutorial(index){

    let _arr = this.tutorialData.data

    if(index == 'all'){
      for(let i=0; i<_arr.length; i++){
        _arr[i].isRead = true
      }
      //强制结束教程
      this.lockMove = false
      this.hideTipsView()
      this.hideTutorial(1)
      this.hideTutorial(2)
    }else{
      _arr[index - 1].isRead = true
    }

    this.tutorialData.data = _arr

  },

  /**
   * 解锁线索
   * @param count
   */
  lockEvent(i, indexs){
    if(indexs){
      for(let index = 0; index < this.eventBookData.events.length; index ++){
        this.eventBookData.events[index].lock = false
      }
    }else{
      this.eventBookData.events[i].lock = false
    }
    this.whiteEvent()

    wx.setStorage({
      key: 'events',
      data: JSON.stringify(this.eventBookData.events)
    })

  },

  /**
   * 重写线索
   */
  whiteEvent(){
    for(let i=0; i<this.events.childrenCount; i++){
      let _item = this.events.children[i]

      if(this.eventBookData.events[i]){
        if(this.eventBookData.events[i].lock == false){
          _item.getComponent(cc.Label).string = this.eventBookData.events[i].index +'.'+ this.eventBookData.events[i].name
        }
      }
    }
  },

  /**
   * 创建事件薄
   */
  creatEventBook(){

    let events = wx.getStorageSync('events')

    if(this.isNull(events)){
      events = [
        {
          index: 1,
          name: '血红吉列托德之歌',
          date: '',
          content: '听啊，我要说一个故事 \n' +
          '主角是一位英明的领主，勇敢的战士，子民之友，嫉恶如仇。 \n' +
          '他的勇敢有如坚固船只，永远没有缺漏。 \n' +
          '欧文家族的领主啊，如此英勇。 \n' +
          ' \n' +
          '如此伟大之人，财宝缺不多。 \n' +
          '他带领众人死守最后一刻。 \n' +
          '但是大保加勒亚丝毫不懂得荣耀 \n' +
          '带来了投石器想攻入领主的城堡 \n' +
          '城墙倒下，勇士葬身其中。 \n' +
          ' \n' +
          '瓦砾之海吞噬勇士们 \n' +
          '这里只能列出几个名称： \n' +
          '驻军队长卡尔·史提阁，沉睡者西格尔，还有最忠实的护卫罗格。 \n' +
          ' \n' +
          '[其他部分无法识别]',
          role: '卡尔·史提阁',
          tagName: '故事',
          lock: true,
        },
        {
          index: 2,
          name: '莉莉的信',
          date: '',
          content: '最亲爱的罗烈福： \n' +
          '...在夏日第一天来到了...，在那里停留了一会，和领主的儿子共进午餐。很快两人变成了好朋友。后来有一天莱科来找我，要我和他偷偷跑到山上去打猎，带我看看这里的美景。还好有惊无险，我敢说我这一生从没见过他这样的勇士，一点都不夸张。他像松鼠一样灵活，像熊一样强壮有力！当灰熊攻击我们时，我连反应的时间都没有，他就像一座小山一样挡在面前。只有一把小匕首和十字弓，我从没见过这样的武器——单手十字弓。后来得知他是亚人的时候我一点也不惊讶，过一会他就累得睡着了，背后满是伤痕，直到傍晚才醒来。 \n' +
          ' \n' +
          '[无法识别的片段]...我们终于走出了山林，夕阳很美，虽然很辛苦，但想到他在身边我就很安心，感觉一切都会变好。',
          role: '加勒亚·莱科',
          tagName: '信件',
          lock: true,
        },
        {
          index: 3,
          name: '九只猫酒馆',
          date: '',
          content: '在本地享有盛名的酒馆“九只猫”里，这时候正是高朋满座，人生喧哗。不管是远道而来的客人，还是本地的居民，只要看看他们的行为举止，就可以知道他们是从什么地方来的，并且从事什么职业。严肃的商人为了商品的价格和贷款的利率和矮人争的面红耳赤，而那些本地的愚人偏偏要装出一副见多识广的样子。马夫和渔夫喝的昏天黑地，仿佛明天就会颁布禁酒令一样。水手们唱着歌，颂扬汹涌的海潮，勇敢的船长，还有未知的财宝。 \n' +
          '最显眼的应该属衣着各异的“冒险者”，他们有的喝酒有的低头谈论接下来的工作，有的则吵得面红耳赤。 \n' +
          '公告板：一整面墙上密密麻麻贴着任务悬赏，各位冒险者们可以按照等级要求任意领取（需要在负责人处登记），但只有最早完成任务的人才能获得奖励。一旦任务完成，悬赏将直接被撤裁。 \n' +
          '交易：冒险者们私下可自行商议交易（酒馆并不为此负责）',
          role: '酒馆',
          tagName: '名词',
          lock: true,
        },
        {
          index: 4,
          name: '贝尔的信',
          date: '',
          content: '亲爱的朋友： \n' +
          '过去几年来未向你嘘寒问暖，请你原谅我。我的时间不多。 \n' +
          '我有很重要的消息，必须亲自告诉你，越快越好。快来王城附近的九只猫，记得骑匹好马，别让我期盼等待太久。 \n' +
          '你的挚友， \n' +
          '贝尔·佩恩尼斯 \n' +
          'PS. 我还把独角兽带着',
          role: '贝尔·佩恩尼斯',
          tagName: '信件',
          lock: true,
        },
        {
          index: 5,
          name: '亚斯克里',
          date: '',
          content: '走廊上传来了一连串咯咯的笑声和鲁特琴的琴声，接着，穿着有蕾丝袖口的淡紫色背心、歪呆着帽子的亚斯克里就出现在公会门口。看到了贝尔，呤游诗人夸张的鞠了一躬，帽子上的鹭羽都垂到了地上。“你好啊，这位美丽的小姐” \n' +
          '贝尔打量着这位看上去神气得不得了的呤游诗人和他的鲁特琴。 \n' +
          '“我打算找点我能做的工作...” \n' +
          '“最近工作不太好做，不过我想我们可以作伴，我的意思是我们可以组个队。到这边来吧，我对这里很熟。” \n' +
          '诗人嘬了一口酒，咪起眼，重重的叹了一口气。“世界在改变，太阳西沉，杯中物尽。你是从来哪的，来公会做什么呢？” \n' +
          '“我是为了找一个人...”',
          role: '亚斯克里',
          tagName: '友人、公会成员',
          lock: true,
        },
        {
          index: 6,
          name: '神秘的信',
          date: '',
          content: '一切准备就绪，就等你抵达。我将你的决心与热诚转告指挥官，他马上就同意欢迎你加入我们的行列。首先，你必须接受基本训练，但你已经会骑马、耍剑，所以其实必要的技巧都没问题了，其他的不会花上太多时间。只要你一穿上我们的制服，我们就会出发寻找你的母亲。我答应你，我们一定会找到她，就算搜遍米德考普斯的每一寸土地也在所不惜。',
          role: '卡尔·伽蓝',
          tagName: '信件',
          lock: true,
        },
        {
          index: 7,
          name: '失踪商人的信',
          date: '',
          content: '塞雷： \n' +
          '老朋友，我们这下挖到宝了。不只把存货卖光，还卖到三倍的加钱！我们的顾客把它们全都买了，潘普洛达的烈酒、熏牛肉、辣椒、丁香...我告诉你老朋友，他们全包了! \n' +
          '不过他有个条件，我们要把货物送到普威尔士的米德考普斯。我知道现在那儿在开战，很危险...但你想想我们可以赚到多少啊！我已经拿到了卡塔尔河的通行证，接着只要走点路就到得了了。没问题的！ \n' +
          '克劳德上 \n' +
          'PS.利润我们五五分账。',
          role: '战火蔓延',
          tagName: '背景篇',
          lock: true,
        },
        {
          index: 8,
          name: '烈焰蔷薇公会',
          date: '',
          content: '我们就像一家人，互相支持，协助彼此撑过难关，忘却过去。我们每个人都有过去，别担心其他会打听。我们有条规则，如果不是当事人自己提起，就绝对不能探听别人的私事。我们不注重过去，只在乎未来，我们要一同对抗邪恶，不管对方是谁。\n' +
          '——贝尔.烈焰蔷薇会长',
          role: '贝尔·佩恩尼斯',
          tagName: '公告',
          lock: true,
        },
        {
          index: 9,
          name: '给贝尔的信',
          date: '',
          content: '亲爱的朋友，贝尔： \n' +
          '谢谢你的来信，请原谅我当年的不辞而别。我很高兴你也在冒险者公会找到了个职位，希望你能早日独当一面。得知父亲安好让我放了心。或许在这种情形下我们可以做些什么，比如办个佣兵团？ \n' +
          ' \n' +
          '有关你的第一个问题，我可以很确定的告诉你，这个国家现在很混乱，就连冒险者公会也不能保证安全。不过相信我，这种日子很快就会过去的。 \n' +
          ' \n' +
          '我已经很久没有练习过克里斯了，我只知道他参加了骑士团，现在混的还不错。他之前提到战争结束后要来九只猫一起干一番大事业，但就目前局势来看，恐怕那只是天方夜谭了。 \n' +
          ' \n' +
          '希望我能尽快去九只猫和你碰面，不过，我必须先去睡个饱觉了。 \n' +
          '卡尔上',
          role: '卡尔·伽蓝',
          tagName: '信件',
          lock: true,
        },
        {
          index: 10,
          name: '警惕叛军',
          date: '',
          content: '注意！ \n' +
          '最近有人在卡塔尔河左岸看到了叛军。上述叛军据闻集结了各种不法分子。这可能是大保加勒亚的声东击西战略。 \n' +
          ' \n' +
          '建议民众避免进入此区域，也不要试图和叛军交谈，直到陛下的军队解决问题为止。 \n' +
          ' \n' +
          '若需要过卡塔尔河，最好的办法就是绕过桦树林，往东走一公里。 \n' +
          ' \n' +
          '——驻军队长',
          role: '公告',
          tagName: '公告',
          lock: true,
        },
        {
          index: 11,
          name: '逮捕令',
          date: '',
          content: '通缉：三名叛军，手上持有魔法武器。该物品极为危险，务必小心。 \n' +
          '卡尔，躲在费普拉村的桥边。 \n' +
          '克里斯，最近在沼泽湿地附近的大道上发现行踪。 \n' +
          '汉克，躲着瞭望塔旁的树屋上。 \n' +
          ' \n' +
          '三名叛军务必逮捕，若有抗拒情事，得当场毙命。 \n' +
          '——讣告',
          role: '公告',
          tagName: '公告',
          lock: true,
        },
        {
          index: 12,
          name: '汉克的日记',
          date: '',
          content: '我也不该惊讶，王城的大师打造护甲的价格这么高，世界上没有其他工匠能于这里匹敌。我告诉老爹来这里他给我的钱连打造一把好剑都不够。从偏远的山村来到这里，我到底是为了什么呢？好吧，该找点工作干了。 \n' +
          '后来我加入了冒险者公会，这里有很多工作机会，只要干得好的话。 \n' +
          '今天卡尔介绍了一个考古的工作[略],不过最后我们还是谈成了。 \n' +
          '检查了一下附近区域，实付还算平静，不过我的魔法探测器在遗迹附近还是有震动，所有我叫他们扎营离入坑远一点，谁知道里面住着什么。附近的村民有提到过诅咒的传说，所有我猜想大概有鬼魂之类的。可恶，当时该多要一点报酬的。 \n' +
          '+ \n' +
          '明天就要开始探索遗迹了。',
          role: '汉克，姓氏不详',
          tagName: '挚友',
          lock: true,
        },
        {
          index: 13,
          name: '莱科的研究地图',
          date: '',
          content: '我受到夜鸦的邀请加入她们的研究团队，于是开始研究古龙的起源。我的研究基地在王城最左的一个塔楼地底下的矿洞。教授表示这里也曾是“龙之子”的长眠之地，希望能找到进入的途径，自从国王禁止开矿以后这里荒废了不少。我很快发现了许多可以深究的地点，每一个都有着特殊的徽记，和古文记录了徽记很相似。这些地点我会在本地图上标出。 \n' +
          '——莱科',
          role: '莱科，姓氏不详',
          tagName: '日记',
          lock: true,
        },
        {
          index: 14,
          name: '试练',
          date: '',
          content: '我的故乡是费罗格的一个修道院，与其说是修道院不如说是打着“慈善”的孤儿院，那里曾经培养了很多像我这样的人[亚人]......我就在那里经历了本质的突变，他们称为“试练”，接着是各种药草，激素，病毒感染等之类的。终于，我挺过来的，他们达到了目的。我的表现出乎意外的好，他们认定我是个生命力顽强的小鬼。在那群被选中的孩子中，我是唯一存活下来的。然后他们开始给我一连串的训练，这花了很长的时间。后来我被王都的一个伯爵带走了，伯爵表面上是要领养我，实际则是想让我做他的政治工具，不过谁在乎呢，我不知道我的父母是谁，伯爵对我很好，这里吃得不差，住的温暖，伯爵就是我的父亲。 \n' +
          '—— 莱科',
          role: '莱科，姓氏不详',
          tagName: '日记',
          lock: true,
        },
        {
          index: 15,
          name: '莱科的日记',
          date: '',
          content: '芒种3日 \n' +
          '炎热的夏日今年来得早。柏兰特越来越讨厌了，我每次陪挤牛奶的姑娘一起到河边他就生气。他说我不该跟仆人交朋友，可是他最生气的是我和夜鸦讲话。他说高贵的伯爵儿子不应该与阶级低级的人讲话，说这样会削弱他们对这些人的威严。也许天气凉下来他就不会这么讨人厌了。 \n' +
          '+ \n' +
          '芒种20日 \n' +
          '我感到越来越无聊，我很喜欢我的妹妹，可是她去乡下的姑姑家避暑了。可是有时候我会做些白日梦，梦想其他人住进来会是什么感觉...... \n' +
          ' \n' +
          '夏至17日 \n' +
          '我们家来了一个客人，听说是邻国的一位贵族的女儿，随行的还有几个骑士，来这里周游，想来借助，太好了！终于有新鲜事发生了！ \n' +
          ' \n' +
          '小暑2日 \n' +
          '今天我打算带我的新朋友去山林里打猎，并没有告诉讨厌的柏兰特，我们偷偷跑了出来。在一条小道上被马摔了下来，莉莉并没有受伤，气氛很怪，应该说是安静得可怕。和眼前的庞然大物搏斗可把我累的够呛，出门的时候只带了弓箭，我用了全身力气绕道熊的背后将它窒息而亡，莉莉吓得不轻，我也伤的很重，我们在附近的一个斜坡下休息。我告诉了莉莉我的秘密，我并不全是人类，有着惊人的恢复力，后来傍晚我才回复力气回到了家。 \n' +
          ' \n' +
          '小暑14日 \n' +
          '我不得不承认，我爱上了莉莉，我觉得她也爱我，希望柏兰特会高兴！ \n' +
          ' \n' +
          '小暑20日 \n' +
          '莉莉回国了，她答应我来年会再来玩。',
          role: '莱科，姓氏不详',
          tagName: '日记',
          lock: true,
        },
        {
          index: 16,
          name: '晚宴',
          date: '',
          content: '“您知不知道到底发生了什么事？我是说，为了什么事请我来？” \n' +
          '“这与我无关。”赫米克用眼角瞄着仆人们说：“我的任务是替您更衣，然后把您带到晚宴上，带到公主面前。贝尔小姐，请穿这件礼服。” \n' +
          '“我的匕首本来放这里的。” \n' +
          '“匕首放在安全的地方，和您的所有行李放在一起，您待会要去的地方禁止携带武器。” \n' +
          '贝尔耸耸肩，换上了那套华丽的礼服。 \n' +
          '“这是什么？”她指着衣服上的刺绣问。 \n' +
          '“啊”，赫米克说：“我差点忘了，在晚宴上您的名字是来自弗内斯里里的尤拉大人。身为晚宴的贵宾，您会坐在公主的右手边，她是这么希望的。” \n' +
          '“我再问您一件事，这个晚宴是为了什么而举办的？” \n' +
          '“为了公主即将到来的成人礼，根据习俗，想要迎娶工作的贵族都会在这一天到来。国王想把她嫁给潘普洛达的人，和矮人联姻对我们来说非常重要。” \n' +
          '“为什么一定要和他们？” \n' +
          '“如果有联姻，潘普洛达会出兵帮助我们，扭转当前的局势” \n' +
          '“很充分的理由” \n' +
          '“好了，我们走吧”',
          role: '贝尔·佩恩尼斯',
          tagName: '故事篇',
          lock: true,
        },
        {
          index: 17,
          name: '晚宴Ⅱ',
          date: '',
          content: '莉莉整理了一下戴在头上的金冠和梳发圈的金发，微微转向贝尔。贝尔这个时候正在努力肢解一只巨大的红色龙虾。\n' +
          '“好啦，贝尔。”莉莉说：“旁边的噪声听起来已经够大了，现在我们可以说几句悄悄话。我们还是先客套一下吧——很高兴能够认识你。”\n' +
          '“公主，我也深感荣幸。”\n' +
          '“客套完了，现在该说正经的了。我有件工作想委托你完成。”\n' +
          '“我猜到了，不过我们团并不想介入政治。”\n' +
          '“贝尔”，莉莉用手指把玩她的祖母绿项链，其中最小的宝石也有金龟子那么大。“你觉得一般人会请你们佣兵做什么样的工作？嗯？”\n' +
          '“佣兵可以做很多工作，但没有一项需要变装，还得穿上纹有其他国家纹章的礼服。你把我的专业和职业杀手搞混了，我从来不曾为钱杀人，不管是坏事还是好事。”\n' +
          '“看来命运真是要惩罚我，送给我一个这么愚蠢的佣兵。”莉莉微微一笑，但是她的眼睛却眯起来，闪着愤怒的光芒。“这个佣兵不知道什么叫尊重和礼貌，贝尔，这种错不要再犯第二次。对手中握有权利的人，你不该这样说话，他们之中很多人不会忘记你说过的话，而你也知道，他们有的是手段。”\n' +
          '公主把她白皙、窄小的双手交叠，支撑着下颚。她的沉默很有压迫感，贝尔没有打断她。“过几天，我会去潘普洛达，我希望你搞砸这个联姻”\n' +
          '“不明不白的委托”贝尔冷冷的说。\n' +
          '“对我来说，结果才是最重要的，除此之外我一概不关心。而要如何达到我要的结果，就是你的工作。”\n' +
          '贝尔抬起头，刚好瞧见赫米克正在用黑色的眼睛锐利的盯着他，一边好像在沉思的剥着手中的面包，面包屑掉落在桌子上。面包屑像蚂蚁一样飞快地移动，行成了字母。这些字母接着行成了文字，虽然只有短短的一瞬间。\n' +
          '赫米克依然盯着贝尔，静静等待着。贝尔微微点了点头，她的动作细微得几乎看不到。赫米克垂下眼睑，面无表情地把面包屑扫落桌下。',
          role: '贝尔·佩恩尼斯',
          tagName: '故事篇',
          lock: true,
        },
        {
          index: 18,
          name: '高文的日记',
          date: '',
          content: '夏至6日\n' +
          '我听到谣言有龙，于是马上前往普威尔士的米德考普斯。没想到，我的工作被米德考普斯的警卫打断，他们要我前去担任专家证明，解开一系列船难的谜题，本来以为这些船难是海妖造成的。哼，看来在乡间造成破坏的龙，重要性还不及贸易航路的阻断。幸好我很快就解决了灯塔之谜，继续追猎那条龙。\n' +
          '夏至15日\n' +
          '我得知被破坏的村庄村名，躲进了温达莫湖底的洞穴中。十分聪明。\n' +
          '夏至16日\n' +
          '据闻这条龙已经离开村庄，朝着王都的方向，我得加快步伐了。\n' +
          '证人表示：黑色鳞甲，展翅长度约5M，臀部高2M，肺部温度可持续超过一刻钟。结论：是条黑龙。\n' +
          '\n' +
          '开始追捕。',
          role: '高文.皇家骑士',
          tagName: '日记',
          lock: true,
        },
        {
          index: 19,
          name: '米德考普斯',
          date: '',
          content: '山丘后方是一片平坦的田野，种满各种作物的农田多彩缤纷，并列在一起就像一副拼贴画。农田中间有三个像玻璃一样闪亮，又像三叶草的叶片一样圆润的湖泊，湖边围绕着带状、深色的赤杨灌木丛。在地平线那一端可以看到雾气层叠、蓝灰色的山脉棱线，下面则是一片黑色、形状不规则的茂密森林。\n' +
          '小径沿着河堤一直延伸到湖边。从被赤杨林包围的湖边传来一阵阵水鸟的叫声，有绿头鸭、白眉鸭、鹭等。在一片人为的农田旁，这一带丰富的鸟类生态看起来很不可思议。河堤明显有在维护，靠近水边的地方堆满柴捆，湖边的水位调节器一点都没有腐朽，水正从里面纤纤留下。湖边的芦苇从里可以看到独木舟和小堤，湖里则插着木棍，上面架设着用来捕鱼的网。\n' +
          '——地貌篇.米德考普斯.卡尔和贝尔的故乡',
          role: '米德考普斯',
          tagName: '地貌篇',
          lock: true,
        },
        {
          index: 20,
          name: '酒店老板的日记',
          date: '',
          content: '...那是在黄昏之前，有一位猎人出现，浑身脏兮兮的，胡子没刮，鞋子也是破的。他要一个房间、一桶水让他洗一洗。我一开始不想让他进来，因为他拿着一包沾着血迹的东西，可是后来听到他是和贝尔约在这里的——贝尔的朋友就是我的朋友...[无法识别]\n' +
          '\                  n' +
          '贝尔来的时候太阳已经下山了，猎人把那包东西交给他，我终于知道这玩意为什么这么臭了——那包东西原来是哥布林的头。贝尔他们原来接了个哥布林的委托。一开始猎人还很矜持，说他还要去解决其他问题，但后来他也拒接不了——矮人的烈酒，这可是上等货，没人可以拒接，随后他们就在一起喝酒、打闹、分享他们一路的冒险经历。\n' +
          '\n' +
          '那天赚了好多钱，因为太阳都出来了，还没有人回家。猎人和贝尔他们都喝醉了，还打起了牌......\n' +
          '[无法识别]',
          role: '贝尔·佩恩尼斯',
          tagName: '挚友',
          lock: true,
        },
        {
          index: 21,
          name: '精致的信',
          date: '',
          content: '给最伟大、正直的卡尔.珈蓝驻军队长，先生：\n' +
          '您问过我能找几个弟兄为自由而战，这是我的回答。\n' +
          '首先，先生要知道，只要你说一声，我就能在米德考普斯抓到那些人，但是这些人都是次等品，都是些古怪的小滑头。但如果您认为这些人也可以用的话，就派个使者来，一星期就会收到一车的好家伙。\n' +
          '我也跟曾经前线的士兵聊了几句，现在的局势大家都不想继续下去了，他们宁愿辞职回乡，或是消极作战。他们扎了两个营区，一个就在城堡旁，另一个在卡塔尔河岸附近，我相信聪明的您肯定猜到了，他们也渴望自由。如果高尚的阁下可以给我们几枚金币作为定金，我们很快就会快马加鞭，把全军营外的全部士兵集结起来。一百个、两百个，您想要多少就有多少。\n' +
          '您最忠实的部下',
          role: '卡尔·伽蓝',
          tagName: '信件',
          lock: true,
        },
        {
          index: 22,
          name: '揉烂的信',
          date: '',
          content: '费恩：\n' +
          '我求求你，回来吧。现在每一天都比前一天危险。屋子外面有陌生男子徘徊，看着我，手上还拿着武器。我好担心他们知道我们的贵重物品放在哪里，等着机会就要偷我们的东西。\n' +
          '[残缺不清]\n' +
          '我记得你之前写给我的信，里面说你现在还不能离开职位，因为他们还欠你薪水，你如果不等那笔钱可能就没了。现在给你两个选择，你宁愿当贫穷的丈夫，还是有钱的鳏夫？\n' +
          '你的卡莲',
          role: '战火蔓延',
          tagName: '描述篇',
          lock: true,
        },
        {
          index: 23,
          name: '宫廷舞者',
          date: '',
          content: '高峰会进行的期间，我人就在塞隆[威尔士王城]。我和我的伙伴之所以回去那儿，是因为我们知道会有许多权势者会在那里会面。这种大人物喷头讨论利益的时候，我们这种表演者肯定有赚头，毕竟他们嘴巴都说累了，需要欣赏些简单的娱乐，大笑几声放松一下。这是我从我老爸身上学来的，他以前常拉着我在大陆各地的宫廷和会议地点表演。我现在已舞蹈为生，于是，我一听见塞隆即将举办会议，就马上告诉伙伴，前往这里。\n' +
          '\n' +
          '我不喜欢政治，但这次我忍不住偷听几句。现在战火仍在蔓延，这次的高峰会将会决定我们的未来，就连国王的护卫长马库特大人也参加了会议。拉多韦德也在场，他当时还是个小伙子，不过现在已经变成英气的骑士了。\n' +
          '\n' +
          '会议的大部分时间都很沉闷，谈论着如何镇压叛党，如何才能击溃敌军...\n' +
          '“快看那是什么？一团黑云？”天边出现了一团黑色的，天啦，至少有5M那么大，我发誓从没见过这种生物，长着獠牙和巨爪，我的眼睛完全被这个庞然大物给怔住了。\n' +
          '人群变的惊慌了起来，会议也被打断了，来了很多国王军。到处都是身着铠甲的步兵，手上还拿着尖锐的武器，拉多韦德甚至还带来了白蔷薇骑士团。黑龙盘旋着不肯离去，士兵们拿他毫无办法，后来国王也出现了。传闻每条龙都是神的使者，维护着世界的平衡，只会在灾祸降临前出现。\n' +
          '“交出公主，平息战争，给你三天时间，威尔士。”',
          role: '威尔士·莉莉、加勒亚·莱科',
          tagName: '故事篇',
          lock: true,
        },
        {
          index: 24,
          name: '泛黄的信',
          date: '',
          content: '弗莱彻，拜托你，别再这样胡闹下去了。你可能不太清楚，拿走死去士兵的物品可是会让人留下深刻印象。干嘛不像我一样做个情报员呢，这里我们熟得很。我已经在“叛军”这边一个月了，没人敢瞧不起我，而且赚的钱可多了！你这辈子都不用再偷东西了，如何？如果你回心转意，我就帮你跟士官长说话。\n' +
          '下次联络再见，\n' +
          '路易斯\n' +
          'PS. 读完这封信记得烧掉，没问题吧？\n' +
          'PPS. 我知道啦，我太偏执了，但就配合我一下把信烧掉吧。\n' +
          'PPPS. 如果下次我来找你的时候看到这封信，你就要请我喝啤酒。',
          role: '故事篇',
          tagName: '信件',
          lock: true,
        },
        {
          index: 25,
          name: '前驻军队长卡尔·珈蓝',
          date: '',
          content: '卡尔·伽蓝（意为白杨） ，本作主人公，爱好冒险，性格直率，在父亲离去后打击很大，变成了能独当一面的战士。出生于普威尔士公国平原上的一个村落，平民。与贝尔是青梅竹马，从小和父亲学习剑术，立志成为冒险者，父亲却想让他参加驻守边境，边境战争发生后回到了家乡，不忍看着自己的家乡变成牺牲品，后成立反叛军“涅米尔”。在成年时离开家乡，到达了普威尔士首都开始了冒险生活。\n' +
          '英勇善战，刚毅不拔，无论面对多少敌人从不退缩，挥舞着大剑击退敌人。由于战功显赫后晋升为驻军队长。\n' +
          '引领士兵进行了“反叛”，在故土上创建了新的国家，后来加入了寻找公主的旅途。而此时的卡尔并不知道公主其实是自己的青梅竹马。\n' +
          '“我做到了，父亲”\n' +
          '24岁（十二月9日） 188cm',
          role: '卡尔·珈蓝',
          tagName: '人物篇',
          lock: true,
        },
        {
          index: 26,
          name: '贝尔·佩恩尼斯',
          date: '1076年',
          content: '贝尔·佩恩尼斯（意为雏菊），本作女主之一，天真烂漫，喜欢一切浪漫的事物，想要环游世界。出生于华之谷，和卡尔的家乡只有一山之隔，也是两国的边界。在战乱后被迫于卡尔分别，后来前往普威尔士寻找卡尔。\n' +
          '年幼时认识了卡尔珈蓝后迷上了他所说的冒险生活，想着有朝一日一起冒险。\n' +
          '性格机灵并充满元气，不管对谁都很友善、随和且不陌生。\n' +
          '实际上心思细腻，需要做一些不属于自己的事情时非常小心翼翼，但贝尔喜欢故作开朗来掩饰内心的不安。\n' +
          '在冒险者公会逐渐转变成一位干练的冒险家，曾和卡尔一起创办了“烈焰蔷薇”，卡尔离开后，冒险者公会随战争关闭，创立了佣兵团。\n' +
          '执行任务时沉默寡欲几乎不会露出自己的真实情感，总是很冷漠的看待工作，周围的人很难看清她的心情。\n' +
          '在任务中认识了莉莉公主，卷入了政治，随后被绑上代替公主交给了恶龙。\n' +
          '“卡尔，我想你了”\n' +
          '23岁 （10月29日） 165 cm',
          role: '贝尔·佩恩尼斯',
          tagName: '人物篇',
          lock: true,
        },
        {
          index: 27,
          name: '加勒亚·莱科',
          date: '',
          content: '加勒亚·莱科（意为彼岸花），身世不详，性格不详，年幼时被一个伯爵收养，伯爵隶属“古神教”，处理着帝国的脏事。在年幼的时候认识了普威尔士公国的公主威尔士·莉莉，对她一见钟情，战乱后再也没有见过莉莉。随着伯爵的年纪增长，代替伯爵进行了古神教的“净化”工作。\n' +
          '最信任的部下是古神教的夜鸦，真名不详，伯爵的情报员，三重身份，随伯爵来修道院时看中了莱科，后成为了莱科的导师。\n' +
          '“我并不是一件道具，这是最后一次，我要为自己而活”\n' +
          '22岁 （7月7日） 人形态 180cm 龙形态 宽3M 高2M ',
          role: '加勒亚·莱科',
          tagName: '人物篇',
          lock: true,
        },
        {
          index: 28,
          name: '威尔士·莉莉',
          date: '',
          content: '威尔士·莉莉（意为百合花），普威尔士公国的公主，年幼时曾与邻国的莱科私定终身，战乱后再没有见过莱科。有着纯正的皇室血脉，作为大陆最大的国家，经常出席各国会议，父亲死后，国家由皇叔代为管理，于成人礼时将会接管王位。\n' +
          '普威尔士的公主，温柔善良、聪明伶俐、优雅又惹人爱。自幼在王城内被保护着长大，因此涉世未深，很喜欢外界的事物。做事喜欢理想主义，将国事想得过于简单，天真的相信着任何人。\n' +
          '特别重视人与人之间的感情，所以在关键时刻容易优柔寡断，不想做出伤害任何人的决策，在成年后肩负了王国的使命。\n' +
          '结识了烈焰蔷薇后，逐渐改变，毁掉婚事，后于恶龙来袭时，贝尔代替她被绑给了恶龙。\n' +
          '“我不想任何人再受到伤害了”\n' +
          '17岁 （3月14日） 156 cm',
          role: '威尔士·莉莉',
          tagName: '人物篇',
          lock: true,
        },
      ]
    }else{
      events = JSON.parse(events)
    }

    this.eventBookData = {
      events: events,
      lockedCount: 0
    }

  },

  /**
   * 阅读线索
   * @param i
   */
  readEvent(i){

    if(this.eventBookData.events[i].lock){
      this.showMsg('谜之声','未解锁该条线索，完成游戏即可解锁', ()=>{
        setTimeout(()=>{
          this.hideMsg()
        },3000)
      })
      return
    }

    this.showEventDetail()

    this.eventDetail.getChildByName('eventBg').getChildByName("title").getComponent(cc.Label).string = this.eventBookData.events[i].name
    this.eventDetail.getChildByName('eventBg').getChildByName("content").getComponent(cc.Label).string = this.eventBookData.events[i].content

  },

  /**
   * 显示统计面板
   */
  showStatistics(){

    //更新统计面板数据

    this.statisticsScore.getComponent(cc.Label).string = '游戏分数:'+ this.gamePro.kill

    this.statisticsAchievement.getComponent(cc.Label).string = '获得成就:'

    this.statisticsClue.getComponent(cc.Label).string = '获得线索:'


    for(let i=0; i<this.statisticsList.childrenCount; i++){
      let _item = this.statisticsList.children[i]

      if(i == 0)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.skull2
      if(i == 1)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.skull4
      if(i == 2)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.skull8
      if(i == 3)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.skull16
      if(i == 4)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.atk2
      if(i == 5)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.atk4
      if(i == 6)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.atk8
      if(i == 7)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.atk16
      if(i == 8)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.def2
      if(i == 9)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.def4
      if(i == 10)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.def8
      if(i == 11)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.def16
      if(i == 12)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.hp2
      if(i == 13)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.hp4
      if(i == 14)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.hp8
      if(i == 15)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.hp16
      if(i == 16)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.princesss
      if(i == 17)  _item.getChildByName('count').getComponent(cc.Label).string = this.gamePro.data.dragon

    }


    this.statistics.x = 320;
    this.statistics.y = 568;
  },

  /**
   * 隐藏统计面板
   */
  hideStatistics(){
    this.statistics.x = -1640;
    this.statistics.y = -1000;
  },

  /**
   * 显示事件薄
   */
  showEventBook(){
    this.eventBook.x = 320;
  },

  /**
   * 隐藏事件薄
   */
  hideEventBook(){
    this.eventBook.x = 1320;
  },

  /**
   * 隐藏事件薄详细
   */
  hideEventDetail(){
    this.eventDetail.x = 2320;
  },

  /**
   * 显示事件薄详细
   */
  showEventDetail(){
    this.eventDetail.x = 320;
  },

  /**
   * 显示CG
   */
  showCgView(){
    this.cgView.x = 320;
  },

  /**
   * 隐藏CG
   */
  hideCgView(){
    this.cgView.x = -640;
  },

  /**
   * 显示tips
   * @param content
   * @param callback
   */
  showTipsView(content, index, callback){
    this.tipsView.x = 320;
    this.tipsViewContent.getComponent(cc.Label).string = content
    this.readTutorial(index)
    this.lockMove = true
  },

  /**
   * 隐藏tips
   */
  hideTipsView(){
    this.tipsView.x = -2320;
    this.lockMove = false
  },

  /**
   * 显示教程
   * @param i
   */
  showTutorial(i){
    if(i == 1){
      this.tutorialView1.x = 320
      this.tutorialView1.y = 568
    }else{
      this.tutorialView2.x = 320
      this.tutorialView2.y = 568
    }
  },

  /**
   * 隐藏教程
   * @param i
   */
  hideTutorial(i){
    if(i == 1){
      this.tutorialView1.x = 320
      this.tutorialView1.y = -1000
    }else{
      this.tutorialView2.x = -640
      this.tutorialView2.y = -1000
    }
  },

  /**
   * 游戏结束弹窗
   * @param type
   */
  gameover(type){
    //弹出游戏结束菜单
    this.lockMove = true;

    //提交当前成绩

    this.gameOverMenu.x = 320

    let _cupe = ''
    let index = -1

    if(type){
      if(type == 'save_princess_success'){

        //依次解锁 1 15 3 4 5 7 8 19
        if(this.eventBookData.events[1].lock){
          this.eventBookData.events[1].lock = false
          _cupe = '获得《莉莉的信》'
          index = 1
        }else if(this.eventBookData.events[15].lock){
          this.eventBookData.events[15].lock = false
          _cupe = '获得《晚宴》'
          index = 15
        }else if(this.eventBookData.events[4].lock){
          this.eventBookData.events[4].lock = false
          _cupe = '获得《亚理克斯》'
          index = 4
        }else if(this.eventBookData.events[5].lock){
          this.eventBookData.events[5].lock = false
          _cupe = '获得《神秘的信》'
          index = 5
        }else if(this.eventBookData.events[7].lock){
          this.eventBookData.events[7].lock = false
          _cupe = '获得《烈焰蔷薇公会》'
          index = 7
        }else if(this.eventBookData.events[8].lock){
          this.eventBookData.events[8].lock = false
          _cupe = '获得《给贝尔的信》'
          index = 8
        }

        this.gamePro.kill += 100

        if(index != -1){
          //解锁事件
          this.lockEvent(index)
          this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill + '\n ' + _cupe;

        }else{
          this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill;
        }

        if(this.eventBookData.events[15].lock){
          this.playCG('save_princess_success', 'gameover')
        }else{
          this.playCG('save_princess_success2', 'gameover')
        }


      }else if(type == 'save_princess_fall'){

        //依次解锁 18 19 3
        if(this.eventBookData.events[18].lock){
          this.eventBookData.events[18].lock = false
          _cupe = '获得《米德考普斯》'
          index = 18
        }else if(this.eventBookData.events[19].lock){
          this.eventBookData.events[19].lock = false
          _cupe = '获得《酒店老板的日记》'
          index = 19
        }else if(this.eventBookData.events[3].lock){
          this.eventBookData.events[3].lock = false
          _cupe = '获得《贝尔的信》'
          index = 3
        }

        this.gamePro.kill += 50

        if(index != -1){
          //解锁事件
          this.lockEvent(index)
          this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill + '\n ' + _cupe;

        }else{
          this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill;
        }


        this.playCG('save_princess_fall', 'gameover')

      }else if(type == 'kill_dragon'){

        //依次解锁 9 10 11 12 13 14 20
        if(this.eventBookData.events[9].lock){
          this.eventBookData.events[9].lock = false
          _cupe = '获得《警惕叛军》'
          index = 9
        }else if(this.eventBookData.events[10].lock){
          this.eventBookData.events[10].lock = false
          _cupe = '获得《逮捕令》'
          index = 10
        }else if(this.eventBookData.events[11].lock){
          this.eventBookData.events[11].lock = false
          _cupe = '获得《汉克的日记》'
          index = 11
        }else if(this.eventBookData.events[12].lock){
          this.eventBookData.events[12].lock = false
          _cupe = '获得《莱科的研究地图》'
          index = 12
        }else if(this.eventBookData.events[13].lock){
          this.eventBookData.events[13].lock = false
          _cupe = '获得《试练》'
          index = 13
        }else if(this.eventBookData.events[15].lock){
          this.eventBookData.events[15].lock = false
          _cupe = '获得《莱科的日记》'
          index = 14
        }else if(this.eventBookData.events[20].lock){
          this.eventBookData.events[20].lock = false
          _cupe = '获得《精致的信》'
          index = 20
        }

        this.gamePro.kill += 200

        if(index != -1){
          //解锁事件
          this.lockEvent(index)
          this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill + '\n ' + _cupe;

        }else{
          this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill;
        }

        if(this.eventBookData.events[11].lock){
          this.playCG('kill_dragon_1', 'gameover')
        }else{
          this.playCG('kill_dragon_2', 'gameover')
        }

      }else if(type == 'dragon_kill'){

        this.gamePro.kill += 80

        this.playCG('dragon_kill', 'gameover')

        this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill

      }else if(type == 'pause'){
        this.shareBtn.opacity = 0
        this.gamePro.pause = true
        this.scoreResult.getComponent(cc.Label).string = '目前得分：'+this.gamePro.kill;
      }
    }else{

      if(!this.gamePro.recover)
        this.shareBtn.opacity = 255

      //如果分数超过5，会随机解锁一条线索
      if(this.gamePro.kill >= 5 && this.gamePro.kill <= 100){
        // 依次解锁 0 2 6 17 22
        if(this.eventBookData.events[0].lock){
          this.eventBookData.events[0].lock = false
          _cupe = '获得《血红吉列托德之歌》'
          index = 0
        }else if(this.eventBookData.events[2].lock){
          this.eventBookData.events[2].lock = false
          _cupe = '获得《九只猫酒馆》'
          index = 2
        }else if(this.eventBookData.events[6].lock){
          this.eventBookData.events[6].lock = false
          _cupe = '获得《亚理克斯》'
          index = 6
        }else if(this.eventBookData.events[17].lock){
          this.eventBookData.events[17].lock = false
          _cupe = '获得《高文的日记》'
          index = 17
        }else if(this.eventBookData.events[22].lock){
          this.eventBookData.events[22].lock = false
          _cupe = '获得《宫廷舞者》'
          index = 22
        }
      }

      if(index != -1){
        //解锁事件
        this.lockEvent(index)
        this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill + '\n ' + _cupe;

      }else{
        this.scoreResult.getComponent(cc.Label).string = '最终得分：'+ this.gamePro.kill;
      }

    }

    //如果登录过 自动提交成绩
    let user = wx.getStorageSync('user')
    if(this.isNull(user)){
      //保存最高分
      if(this.gamePro.kill > this.maxSocre)
        this.maxSocre = this.gamePro.kill
    }else{
      this.userInfo = JSON.parse(user)
      wx.postMessage({
        nickName: this.userInfo.nickName,
        avatarUrl: this.userInfo.avatarUrl,
        score: this.gamePro.kill
      });
    }

  },

  /**
   * 播放CG
   * @param type
   * @param mode
   */
  playCG(type, mode){

    let msg = ''

    this.showCgView()

    if(type == 'save_princess_success'){
      //第一章 成功营救公主 公主回归CG

      this.gamePro.end = {
        text: '公主回归',           // 结局
        url: 'https://album.31un.com/assets/cgs/share_cg3.jpg',            // cg图片
      }

      cc.loader.load("https://album.31un.com/assets/cgs/CG3.jpg", (err, texture)=> {
        let img = new cc.SpriteFrame(texture);
        this.cgImage.width = 640
        this.cgImage.height = 361
        this.cgImage.spriteFrame = img
      });

      //加载剧情
      //播放CG文字
      msg = '...王国举行盛大了迎接仪式...\n ' +
        '\n' +
        '“公主回来了”\n ' +
        '...随后“涅米尔”成为了附属国，战乱也停止了...\n ' +
        '\n' +
        'The end \n' +
        '\n' +
        '恭喜您完成了公主回归章节'

      this.cgContent.height = 600
      this.cgContent.getChildByName('content').height = 600

    }else if(type == 'save_princess_fall'){
      //全章节 公主被击杀

      this.gamePro.end = {
        text: '遗失的公主',           // 结局
        url: 'https://album.31un.com/assets/cgs/share_cg19.jpg',            // cg图片
      }

      cc.loader.load("https://album.31un.com/assets/cgs/CG19.jpg", (err, texture)=> {
        let img = new cc.SpriteFrame(texture);
        this.cgImage.width = 640
        this.cgImage.height = 344
        this.cgImage.spriteFrame = img
      });
      msg = '... \n ' +
        // '公主被恶龙带走后... \n '  +
        // '[怒吼] \n ' +
        // '“你不是莉莉，谎言，我最痛恨谎言，告诉你是谁，人类。” \n ' +
        // '... \n' +
        // '“贝尔·佩恩尼斯，战乱后流离失所到了塞隆(威尔士王都)当了佣兵...” \n'  +
        // '“你长得很像莉莉，但你不是，你走吧，别再回来了，不许告诉任何人这里的事情。” \n'  +
        // '... \n'  +
        '[几日后，回到了马斯特里赫特，我的故乡...] \n'  +
        ' \n' +
        'The end'
      '恭喜您完成了遗失的公主章节'

      this.cgContent.height = 600
      this.cgContent.getChildByName('content').height = 600

    }else if(type == 'kill_dragon_1'){
      //第一章击杀恶龙结局  和公主结婚CG

      this.gamePro.end = {
        text: '屠龙者',           // 结局
        url: 'https://album.31un.com/assets/cgs/share_cg2.jpg',            // cg图片
      }

      cc.loader.load("https://album.31un.com/assets/cgs/CG2.jpg", (err, texture)=> {
        let img = new cc.SpriteFrame(texture);
        this.cgImage.width = 640
        this.cgImage.height = 344
        this.cgImage.spriteFrame = img
      });
      msg = '恶龙被击杀后，王国举行了婚礼，从此两人过上了幸福的生活...... \n ' +
        '\n'  +
        'o(*￣▽￣*)o \n ' +
        '\n ' +
        'The end \n' +
        '\n'  +
        '恭喜您完成了屠龙者章节'

      this.cgContent.height = 600
      this.cgContent.getChildByName('content').height = 600

    }else if(type == 'kill_dragon_2'){
      //第二章 击杀恶龙结局后找到了莱科的实验室  莱科的实验室CG

      this.gamePro.end = {
        text: '加勒亚·莱科',           // 结局
        url: 'https://album.31un.com/assets/cgs/share_cg7.jpg',            // cg图片
      }

      cc.loader.load("https://album.31un.com/assets/cgs/CG7.jpg", (err, texture)=> {
        let img = new cc.SpriteFrame(texture);
        this.cgImage.width = 640
        this.cgImage.height = 351
        this.cgImage.spriteFrame = img
      });
      msg = '巨龙的高塔并没有找到公主，桌上留下了一个日记？\n ' +
        '[内容如下] \n' +
        ' \n' +
        '芒种3日 \n' +
        '炎热的夏日今年来得早。柏兰特越来越讨厌了，我每次陪挤牛奶的姑娘一起到河边他就生气。他说我不该跟仆人交朋友，可是他最生气的是我和夜鸦讲话。他说高贵的伯爵儿子不应该与阶级低级的人讲话，说这样会削弱他们对这些人的威严。也许天气凉下来他就不会这么讨人厌了。 \n' +
        ' \n' +
        '芒种20日 \n' +
        '我感到越来越无聊，我很喜欢我的妹妹，可是她去乡下的姑姑家避暑了。可是有时候我会做些白日梦，梦想其他人住进来会是什么感觉...... \n' +
        ' \n' +
        '夏至17日 \n' +
        '我们家来了一个客人，听说是邻国的一位贵族的女儿，随行的还有几个骑士，来这里周游，想来借助，太好了！终于有新鲜事发生了！ \n' +
        ' \n' +
        '小暑2日 \n' +
        '今天我打算带我的新朋友去山林里打猎，并没有告诉讨厌的柏兰特，我们偷偷跑了出来。在一条小道上被马摔了下来，莉莉并没有受伤，气氛很怪，应该说是安静得可怕。和眼前的庞然大物搏斗可把我累的够呛，出门的时候只带了弓箭，我用了全身力气绕道熊的背后将它窒息而亡，莉莉吓得不轻，我也伤的很重，我们在附近的一个斜坡下休息。我告诉了莉莉我的秘密，我并不全是人类，有着惊人的恢复力，后来傍晚我才回复力气回到了家。 \n' +
        ' \n' +
        '小暑14日 \n' +
        '我不得不承认，我爱上了莉莉，我觉得她也爱我，希望柏兰特会高兴！ \n' +
        ' \n' +
        '小暑20日 \n' +
        '莉莉回国了，她答应我来年会再来玩。'
      'The end \n' +
      '\n'  +
      '恭喜您完成了加勒亚·莱科章节'

      this.cgContent.height = 1600
      this.cgContent.getChildByName('content').height = 1600

    }else if(type == 'dragon_kill'){
      //全章节 被恶龙击杀 巨龙之怒CG

      this.gamePro.end = {
        text: '巨龙之怒',           // 结局
        url: 'https://album.31un.com/assets/cgs/share_cg5.jpg',            // cg图片
      }

      cc.loader.load("https://album.31un.com/assets/cgs/CG5.jpg", (err, texture)=> {
        let img = new cc.SpriteFrame(texture);
        this.cgImage.width = 640
        this.cgImage.height = 351
        this.cgImage.spriteFrame = img
      });
      msg = '“复仇？我告诉你什么才叫复仇，愚蠢的人类！”\n ' +
        '[怒吼] \n' +
        ' \n' +
        '... \n' +
        '眼前只剩下火海 \n' +
        '曾经的米德考普斯和马斯特里赫特变成了火海... \n' +
        '... \n' +
        '... \n' +
        '... \n' +
        ' \n' +
        'The end \n' +
        '请再接再厉'

      this.cgContent.height = 600
      this.cgContent.getChildByName('content').height = 600

    }else if(type == 'save_princess_success_2'){
      //第二章 成功营救贝尔 浪迹天涯CG

      this.gamePro.end = {
        text: '贝尔·佩恩尼斯',           // 结局
        url: 'https://album.31un.com/assets/cgs/share_cg18.jpg',            // cg图片
      }

      cc.loader.load("https://album.31un.com/assets/cgs/CG18.jpg", (err, texture)=> {
        let img = new cc.SpriteFrame(texture);
        this.cgImage.width = 640
        this.cgImage.height = 344
        this.cgImage.spriteFrame = img
      });
      msg = '恶龙被击杀后，在高塔发现了公主。 \n ' +
        '“贝尔·佩恩尼斯？”\n'  +
        '“卡尔”欣喜若狂的贝尔扑向了卡尔，“我还以为再也见不到你了。” \n ' +
        // '“一切都结束了，恶龙已经死了，你为何会穿着公主的礼服，你代替公主来这里了吗？我不会放过普威尔士...”\n ' +
        '“卡尔，我们离开这里吧，去一个新的地方生活，就当我们俩都死了...”\n' +
        '[几年后] \n'  +
        '\n'  +
        '“海边的日出！” \n' +
        '\n'  +
        'The end \n' +
        '\n'  +
        '恭喜您完成了贝尔·佩恩尼斯章节'

      this.cgContent.height = 800
      this.cgContent.getChildByName('content').height = 800

    }else if(type == 'kaer'){
      //人物 卡尔
    }else if(type == 'beier'){
      //人物 贝尔
    }else if(type == 'laike'){
      //人物 莱科
    }else if(type == 'lily'){
      //人物 莉莉
    }

    let index = 0

    let content = msg.split('');

    let timerID = setInterval(()=>{

      this.cgContent.getChildByName('content').getComponent(cc.Label).string += content[index];
      index++;
      if(index >= content.length){
        clearInterval(timerID)
      }
    },120)

  },

  /**
   * 播放背景音乐
   */
  playBgSound(){
    // cc.audioEngine.playEffect(this.gameAudios[1], true);
  },

  /**
   * 用户分享满状态复活
   */
  recover(){

    let _x = 0;
    let _y = 0;

    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] == 'Hero') {
          _x = i
          _y = j
          break
        }
      }
    }

    let _item = this.blocks[_x][_y]
    this.heroPro.atk = this.heroPro.maxAtk
    this.heroPro.def = this.heroPro.maxDef
    this.heroPro.hp = this.heroPro.maxHp

    //显示武器和护盾
    _item.getChildByName("panel-atk").opacity = 255
    _item.getChildByName("panel-def").opacity = 255

    //基础数值
    _item.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.hp
    _item.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.atk
    _item.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.def

    //隐藏gameover窗口
    this.gameOverMenu.x = -1320
    //满状态复活
    this.lockMove = false;

    //已复活过一次
    this.gamePro.recover = true;

    this.shareBtn.opacity = 0

    console.log('满状态复活')

  },

  /**
   * 重新开始游戏
   */
  restart() {

    this.gameOverMenu.x = -1320
    this.princesss = [];
    this.dragons = [];
    this.skulls = [];
    this.lockMove = false;
    this.msgInfo ={
      index: 0,
      content: [],
      timerID: 0,
      timer: {}
    };
    this.gamePro = {
      turns: 0,           // 回合数
      kill: 0,            // 击杀数
      type: 'day',        // day | night
      pause: false,       // 暂停
      recover: false,     // 每局一次复活机会
      course: false,       // 启用教程
      count: 0,           // 怪物波数
      next: 11,           // 下一个出现的回合数
      line: 0,            // 0 - 12
      princessLine: false,    //公主支线
      princessState: 0,       //公主线当前进度
      dragonLine: false,      //巨龙支线
      dragonState: 0,       //巨龙线当前进度
      end: {
        text: '',           // 结局
        url: '',            // cg图片
      },
      data:{
        atk2: 0,
        atk4: 0,
        atk8: 0,
        atk16: 0,
        def2: 0,
        def4: 0,
        def8: 0,
        def16: 0,
        hp2: 0,
        hp4: 0,
        hp8: 0,
        hp16: 0,
        skull2: 0,
        skull4: 0,
        skull8: 0,
        skull16: 0,
        princesss: 0,
        dragon: 0,
        fire: 0,
      }
    }

    this.dayState.height = 0;
    this.scoreState.height = 0;

    this.scoreBg.getChildByName("val").getComponent(cc.Label).string = '' + this.gamePro.kill

    this.initData();
  },

  /**
   * 初始化block 4*4的格子
   */
  creatBgBlocks() {

    //- 2018年9月7日14:05:40 棋盘坐标偏移了-10，-10

    let matrix = [
      [cc.v2(100,100), cc.v2(240,100), cc.v2(380,100), cc.v2(520,100)],
      [cc.v2(100,240), cc.v2(240,240), cc.v2(380,240), cc.v2(520,240)],
      [cc.v2(100,380), cc.v2(240,380), cc.v2(380,380), cc.v2(520,380)],
      [cc.v2(100,520), cc.v2(240,520), cc.v2(380,520), cc.v2(520,520)],
    ]
    this.positions = matrix
  },

  /**
   * 初始化游戏数据
   */
  initData() {
    if (this.blocks) {
      for (let i = 0; i < this.blocks.length; i++) {
        for (let j = 0; j < this.blocks[i].length; j++) {
          if (this.blocks[i][j]) {
            this.blocks[i][j].destroy();
          }
        }
      }
    }
    this.data = [];
    this.blocks = [];
    for (let i = 0; i < 4; i++) {
      this.data.push([0,0,0,0]);
      this.blocks.push([null, null, null, null]);
    }


    this.creatHero(3, 0)
    // this.gamePro.line = 1
    // this.gamePro.dragonLine = true
    // this.addDragon()

    // this.addPrincess()

  },

  /**
   * 随机数 传数字区间
   * @param smin		最小值
   * @param smax		最大值
   * @returns {*}	随机值
   */
  random_num(smin, smax) {
    const Range = smax - smin;
    const Rand = Math.random();
    return smin + Math.round(Rand * Range);
  },

  /**
   * 判断是否为空
   * @param obj
   * @returns {boolean}
   */
  isNull(obj) {
    if (obj == undefined || obj == 'undefined' || obj == null || obj == 'null' || obj == "" || obj.length == 0 || obj == 0) return true; else return false;
  },

  /**
   * 判断当前坐标是否为role
   * @param x
   * @param y
   * @returns {*}
   */
  isRole(x, y){

    let n = this.data[x][y]

    if(n.includes('Skull')){
      //史莱姆
      return 'Skull'
    }else if(n.includes('Princess')){
      //公主
      return 'Princess'
    }else if(n.includes('Dragon')){
      //恶龙
      return 'Dragon'
    }else if(n.includes('Hero')){
      //勇者
      return 'Hero'
    }else if(n.includes('Fire')){
      //火焰陷阱
      return 'Fire'
    }else{
      //道具
      return 'prop'
    }

  },

  /**
   * 判断当前坐标是否存在
   * @param x
   * @param y
   * @returns {boolean}
   */
  isHasBlock(x, y){

    let _t = []

    if(this.data[x]){
      _t = this.data[x]

      if(_t[y]){

      }else{
        return false
      }

    }else{
      return false
    }

    return true

  },

  /**
   * 判断网格已满
   * @returns {boolean}
   */
  isFull() {

    if(this.gamePro.type == 'day')
      return false

    let _flag = true

    //判断全满
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if(this.isNull(this.data[x][y]))    _flag = false
      }
    }

    if(_flag){
      //格子全满，判断是否可以继续消除
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          let n = this.data[x][y];

          if(n.includes('Skull')){
            // //史莱姆
            // if(this.isHasBlock(x-1, y)){
            //     if(n.split(',')[0] == this.data[x - 1][y].split(',')[0])    _flag = false
            // }if(this.isHasBlock(x+1, y)){
            //     if(n.split(',')[0] == this.data[x + 1][y].split(',')[0])    _flag = false
            // }if(this.isHasBlock(x, y-1)){
            //     if(n.split(',')[0] == this.data[x][y - 1].split(',')[0])    _flag = false
            // }if(this.isHasBlock(x, y+1)){
            //     if(n.split(',')[0] == this.data[x][y + 1].split(',')[0])    _flag = false
            // }
          }else if(n.includes('Princess')){
            //公主
            //触发黑夜营救
            if(this.isHasBlock(x-1, y)){
              if(this.data[x - 1][y] == 'Hero')    _flag = false
            }if(this.isHasBlock(x+1, y)){
              if(this.data[x + 1][y] == 'Hero')    _flag = false
            }if(this.isHasBlock(x, y-1)){
              if(this.data[x][y - 1] == 'Hero')    _flag = false
            }if(this.isHasBlock(x, y+1)){
              if(this.data[x][y + 1] == 'Hero')    _flag = false
            }
          }else if(n.includes('Dragon')){
            //恶龙
            //龙不会休息
          }else{
            //其他
            if(this.isHasBlock(x-1, y)){
              if(this.data[x - 1][y] == n){
                if(!n.includes('Skull16') && !n.includes('Phea16') && !n.includes('Shield16') && !n.includes('Sword16')){
                  _flag = false
                }
              }
            }if(this.isHasBlock(x+1, y)){
              if(this.data[x + 1][y] == n){
                if(!n.includes('Skull16') && !n.includes('Phea16') && !n.includes('Shield16') && !n.includes('Sword16')){
                  _flag = false
                }
              }
            }if(this.isHasBlock(x, y-1)){
              if(this.data[x][y - 1] == n){
                if(!n.includes('Skull16') && !n.includes('Phea16') && !n.includes('Shield16') && !n.includes('Sword16')){
                  _flag = false
                }
              }
            }if(this.isHasBlock(x, y+1)){
              if(this.data[x][y + 1] == n){
                if(!n.includes('Skull16') && !n.includes('Phea16') && !n.includes('Shield16') && !n.includes('Sword16')){
                  _flag = false
                }
              }
            }
          }

        }
      }
    }

    if(_flag){
      //判断是否进行过教程
      if(!this.tutorialData.data[12].isRead){
        this.showTipsView(this.tutorialData.data[12].content, 13)
      }
    }

    // true 已满  false 未满或可消除
    return _flag;
  },

  /**
   * 显示对话框
   * @param name
   * @param msg
   * @param callback
   */
  showMsg(name, msg, callback){

    let _img = {}
    let _name = ''

    if(name == 'Hero'){
      _img = this.gameSprites[31]
      _name = '卡尔·伽蓝'
    }
    if(name == 'Princess'){
      _img = this.gameSprites[32]
      _name = '威尔士·莉莉'
    }
    if(name == 'Dragon'){
      _img = this.gameSprites[33]
      _name = '加勒亚·莱科'
    }
    else{
      _img = this.gameSprites[34]
      _name = '谜之声'
    }

    this.msgBox.opacity = 255;

    this.msgBox.getChildByName("msgBox").getChildByName("name").getComponent(cc.Label).string = _name;
    this.msgBox.getChildByName("msgBox").getChildByName("headImg").getComponent(cc.Sprite).spriteFrame = _img

    this.msgInfo.index = 0;
    this.msgInfo.content = msg.split('');

    this.msgBox.getChildByName("msgBox").getChildByName("content").getComponent(cc.Label).string = '';

    window.clearInterval(this.msgInfo.timerID)

    this.msgInfo.timerID = setInterval(()=>{
      this.msgBox.getChildByName("msgBox").getChildByName("content").getComponent(cc.Label).string += this.msgInfo.content[this.msgInfo.index];
      this.msgInfo.index++;
      if(this.msgInfo.index >= this.msgInfo.content.length){
        clearInterval(this.msgInfo.timerID)
      }
    },60)

    if(callback)
      callback()

  },

  /**
   * 关闭对话框
   */
  hideMsg(){
    this.msgBox.opacity = 0
  },

  /**
   * 生成一个UUID
   * @returns {string}
   */
  getUuid() {
    const len = 32; //32长度
    let radix = 16; //16进制
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;if (len) {
      for (i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
      }
    } else {
      let r;uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';uuid[14] = '4';for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },

  /**
   * copy
   * @param obj
   * @returns {{}}
   */
  copy(obj){
    let newobj = {};
    for ( let attr in obj) {
      newobj[attr] = obj[attr];
    }
    return newobj;
  },

  /**
   * 创建hero
   */
  creatHero(pox, poy){
    let x = 3
    let y = 0
    if(pox) x = pox
    if(poy) y = poy

    if(pox == 0) x = 0
    if(poy == 0) y = 0

    let b = cc.instantiate(this.heroPrefab);
    b.attr({
      width: this.blockSize,
      height: this.blockSize,
      info:{
        name: 'Hero',
        hp: 15,             //生命值
        atk: 1,             //攻击力
        def: 0,             //护甲值
        maxHp: 15,          //生命值上限
        maxAtk: 16,         //攻击力上限
        maxDef: 16,         //防御力上限
      }
    });
    this.bg.node.addChild(b);
    this.blocks[x][y] = b;
    b.setPosition(this.positions[x][y]);

    b.scaleX = 0;
    b.scaleY = 0;
    b.runAction(cc.scaleTo(0.3, 1, 1));

    this.data[x][y] = 'Hero'
    this.heroPro = {
      name: 'Hero',
      hp: 15,             //生命值
      atk: 1,             //攻击力
      def: 0,             //护甲值
      minHp: 15,          //生命值下限
      minAtk: 0,          //攻击力下限
      minDef: 0,          //防御力下限
      maxHp: 15,          //生命值上限
      maxAtk: 16,         //攻击力上限
      maxDef: 16,         //防御力上限
      node: b,            //node
    }

    //显示武器和护盾
    b.getChildByName("panel-atk").opacity = 255
    b.getChildByName("panel-def").opacity = 255

    //基础数值
    b.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.hp
    b.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.atk
    b.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.def

  },

  /**
   * 获取hero
   * @returns {*}
   */
  getHero(){
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] == 'Hero') {
          return this.blocks[i][j]
        }
      }
    }
  },

  /**
   * 获取skulls
   * @returns {Array}
   */
  getSkulls(){
    let skulls = [];
    for (let i = 0; i < this.data.length; i++){
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j].val == 'Skull' || this.data[i][j].val == 'Skull2' || this.data[i][j].val == 'Skull4' || this.data[i][j].val == 'Skull8' || this.data[i][j].val == 'Skull16') {
          skulls.push(this.data[i][j])
        }
      }
    }
    return skulls;
  },

  /**
   * 根据skullID获取skull
   * @param id
   */
  getSkullByID(id){
    let _tmp = this.skulls;
    let _result = _tmp.filter( (item)=>{
      return item.id == id
    })
    return _result[0]
  },
  /**
   * 根据dragonID获取dragon
   * @param id
   */
  getDragonByID(id){
    let _tmp = this.dragons;
    let _result = _tmp.filter( (item)=>{
      return item.id == id
    })
    return _result[0]
  },
  /**
   * 根据princessID获取princess
   * @param id
   */
  getPrincessByID(id){
    let _tmp = this.princesss;
    let _result = _tmp.filter( (item)=>{
      return item.id == id
    })
    return _result[0]
  },
  /**
   * 获取空位
   * @returns {Array}
   */
  getEmptyLocations() {
    // 空闲的位置
    let emptyLocations = [];
    for (let i = 0; i < this.data.length; i++){
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j] == 0) {
          emptyLocations.push(i * 4 + j);
        }
      }
    }
    return emptyLocations;
  },

  /**
   * 获取所有block
   * @returns {Array}
   */
  getBlocks(){
    let blocks = [];
    for (let i = 0; i < this.data.length; i++){
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j] != 0) {
          blocks.push(this.blocks[i][j]);
        }
      }
    }
    return blocks;
  },

  /**
   * 添加一个道具
   * @param moveDirection     移动方向
   * @param prop              道具索引
   * @param pox               x坐标
   * @param poy               y坐标
   * @returns {boolean}
   */
  addBlock(moveDirection, prop, pox, poy) {

    // 空闲的位置
    let emptyLocations = this.getEmptyLocations();
    // cc.log(emptyLocations);
    /// 没有空位了
    if (emptyLocations.length == 0) {
      return false;
    }
    let p1 = Math.floor(Math.random() * emptyLocations.length);
    p1 = emptyLocations[p1];
    let x = Math.floor(p1/4);
    let y = Math.floor(p1%4);
    let _name = ''

    if(pox) x = pox
    if(poy) y = poy

    if(pox == 0) x = 0
    if(poy == 0) y = 0

    // let numbers = ['Shield2', 'Shield4', 'Sword2', 'Sword4', 'Phea2', 'Phea4'];
    let numbers = ['Phea2', 'Sword2', 'Shield2'];
    // let numbers = ['Phea2', 'Phea4'];
    // let numbers = ['Sword2'];
    let n = Math.floor(Math.random() * numbers.length);

    if(prop) _name = prop
    else _name = numbers[n]

    //暂时冻结moveing
    this.lockMove = true;

    let b = cc.instantiate(this.getPrev(_name).cur);
    b.attr({
      width: this.blockSize,
      height: this.blockSize,
    });
    // b.setColor(this.colors[numbers[n]]);
    b.setPosition(this.positions[x][y]);
    // b.getChildByName('label').getComponent(cc.Label).string = numbers[n];

    //- 2018年8月22日18:25:27
    //优化道具刷新事件，现在会额外触发一次移动

    this.bg.node.addChild(b);
    this.blocks[x][y] = b;
    b.scaleX = 0;
    b.scaleY = 0;
    let show = cc.scaleTo(0.1, 1, 1);
    b.runAction(show);

    this.data[x][y] = _name

    if(moveDirection != 'none'){
      this.checkEmpty(moveDirection, x, y, ()=>{
        this.lockMove = false;
      })
    }else{
      this.lockMove = false;
    }

    return true;
  },

  /**
   * 检测是否有空位
   * @param moveDirection
   * @param x
   * @param y
   * @param callback
   * @returns {boolean}
   */
  checkEmpty(moveDirection, x, y, callback){

    if(moveDirection == 'Left'){
      if(y == 0){
        if(callback){
          callback()
        }
        return true
      }else{
        //move to 0
        if(this.data[x][y-1]){
          //判断和前一位是否相同
          if(this.data[x][y] == this.data[x][y-1]){
            //合并
            this.data[x][y-1] = this.getPrev(this.data[x][y]).nextName
            this.data[x][y] = 0;
            let b2 = this.blocks[x][y-1];
            let b1 = this.blocks[x][y];
            let p = this.positions[x][y-1];
            this.blocks[x][y] = null;
            this.moveAction(b1, p, ()=> {
              this.mergeAction(b1, b2, this.data[x][y-1], ()=>{
                this.checkEmpty(moveDirection, x, y-1, callback)
              });
            });
          }else{
            //不相同
            if(callback){
              callback()
            }
            return true
          }
        }else{
          this.data[x][y-1] = this.data[x][y];
          this.data[x][y] = 0;
          let b = this.blocks[x][y];
          let p = this.positions[x][y-1];
          this.blocks[x][y-1] = b;
          this.blocks[x][y] = null;

          this.moveAction(b, p, ()=>{
            this.checkEmpty(moveDirection, x, y-1, callback)
            // move(x, y-1, callback);
          });

        }
      }
    }else if(moveDirection == 'Right'){
      if(y == 3){
        if(callback){
          callback()
        }
        return true
      }else{
        //move to 0
        if(this.data[x][y+1]){
          //判断和前一位是否相同
          if(this.data[x][y] == this.data[x][y+1]){
            //合并
            this.data[x][y+1] = this.getPrev(this.data[x][y]).nextName
            this.data[x][y] = 0;
            let b2 = this.blocks[x][y+1];
            let b1 = this.blocks[x][y];
            let p = this.positions[x][y+1];
            this.blocks[x][y] = null;
            this.moveAction(b1, p, ()=> {
              this.mergeAction(b1, b2, this.data[x][y+1], ()=>{
                this.checkEmpty(moveDirection, x, y+1, callback)
              });
            });
          }else{
            //不相同
            if(callback){
              callback()
            }
            return true
          }

        }else{
          this.data[x][y+1] = this.data[x][y];
          this.data[x][y] = 0;
          let b = this.blocks[x][y];
          let p = this.positions[x][y+1];
          this.blocks[x][y+1] = b;
          this.blocks[x][y] = null;

          this.moveAction(b, p, ()=>{
            this.checkEmpty(moveDirection, x, y+1, callback)
            // move(x, y-1, callback);
          });

        }
      }
    }else if(moveDirection == 'Up'){
      if(x == 3){
        if(callback){
          callback()
        }
        return true
      }else{
        //move to 0
        if(this.data[x+1][y]){
          //判断和前一位是否相同
          if(this.data[x][y] == this.data[x+1][y]){
            //合并
            this.data[x+1][y] = this.getPrev(this.data[x][y]).nextName
            this.data[x][y] = 0;
            let b2 = this.blocks[x+1][y];
            let b1 = this.blocks[x][y];
            let p = this.positions[x+1][y];
            this.blocks[x][y] = null;
            this.moveAction(b1, p, ()=> {
              this.mergeAction(b1, b2, this.data[x+1][y], ()=>{
                this.checkEmpty(moveDirection, x+1, y, callback)
              });
            });
          }else{
            //不相同
            if(callback){
              callback()
            }
            return true
          }

        }else{
          this.data[x+1][y] = this.data[x][y];
          this.data[x][y] = 0;
          let b = this.blocks[x][y];
          let p = this.positions[x+1][y];
          this.blocks[x+1][y] = b;
          this.blocks[x][y] = null;

          this.moveAction(b, p, ()=>{
            this.checkEmpty(moveDirection, x+1, y, callback)
            // move(x, y-1, callback);
          });

        }
      }

    }else if(moveDirection == 'Down'){
      if(x == 0){
        if(callback){
          callback()
        }
        return true
      }else{
        //move to 0
        if(this.data[x-1][y]){
          //判断和前一位是否相同
          if(this.data[x][y] == this.data[x-1][y]){
            //合并
            this.data[x-1][y] = this.getPrev(this.data[x][y]).nextName
            this.data[x][y] = 0;
            let b2 = this.blocks[x-1][y];
            let b1 = this.blocks[x][y];
            let p = this.positions[x-1][y];
            this.blocks[x][y] = null;
            this.moveAction(b1, p, ()=> {
              this.mergeAction(b1, b2, this.data[x-1][y], ()=>{
                this.checkEmpty(moveDirection, x-1, y, callback)
              });
            });
          }else{
            //不相同
            if(callback){
              callback()
            }
            return true
          }

        }else{
          this.data[x-1][y] = this.data[x][y];
          this.data[x][y] = 0;
          let b = this.blocks[x][y];
          let p = this.positions[x-1][y];
          this.blocks[x-1][y] = b;
          this.blocks[x][y] = null;

          this.moveAction(b, p, ()=>{
            this.checkEmpty(moveDirection, x-1, y, callback)
            // move(x, y-1, callback);
          });

        }
      }
    }
  },

  /**
   * 创建一条恶龙
   * @param pox
   * @param poy
   */
  addDragon(pox, poy){

    //判断是否进行过教程
    if(!this.tutorialData.data[14].isRead){
      this.showTipsView(this.tutorialData.data[14].content, 15)
    }

    let _id = this.getUuid()

    let x = 0
    let y = 0

    let _x = 0
    let _y = 0

    //崭新的出场方式
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] == 'Hero') {
          _x = i
          _y = j
          break
        }
      }
    }

    if(this.isHasBlock(_x+2, _y+2)){
      x = _x + 2
      y = _y + 2
    }else if(this.isHasBlock(_x-2, _y-2)){
      x = _x - 2
      y = _y - 2
    }else if(this.isHasBlock(_x-2, _y+2)){
      x = _x - 2
      y = _y + 2
    }else if(this.isHasBlock(_x+2, _y-2)){
      x = _x + 2
      y = _y - 2
    }

    // //摧毁周围所有单位
    // //左
    // if(this.isHasBlock(x-1,y)){
    //     this.blocks[x-1][y].destroy()
    //     this.data[x-1][y] = 0
    // }
    // //右
    // if(this.isHasBlock(x+1,y)){
    //     this.blocks[x+1][y].destroy()
    //     this.data[x+1][y+1] = 0
    // }
    // //上
    // if(this.isHasBlock(x,y+1)){
    //     this.blocks[x][y+1].destroy()
    //     this.data[x][y+1] = 0
    // }
    // //下
    // if(this.isHasBlock(x,y-1)){
    //     this.blocks[x][y-1].destroy()
    //     this.data[x][y-1] = 0
    // }
    // //左上
    // if(this.isHasBlock(x+1,y-1)){
    //     this.blocks[x+1][y-1].destroy()
    //     this.data[x+1][y-1] = 0
    //     this.addBlock('none','Fire')
    // }
    // //左下
    // if(this.isHasBlock(x-1,y-1)){
    //     this.blocks[x-1][y-1].destroy()
    //     this.data[x-1][y-1] = 0
    //     this.addBlock('none','Fire')
    // }
    // //右上
    // if(this.isHasBlock(x+1,y+1)){
    //     this.blocks[x+1][y+1].destroy()
    //     this.data[x+1][y+1] = 0
    //     this.addBlock('none','Fire')
    // }
    // //右下
    // if(this.isHasBlock(x-1,y+1)){
    //     this.blocks[x-1][y+1].destroy()
    //     this.data[x-1][y+1] = 0
    //     this.addBlock('none','Fire')
    // }

    //销毁所有史莱姆 转为火焰

    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++) {
        if(this.data[i][j]){
          if (this.data[i][j].includes('Skull')) {
            //将史莱姆转为火焰
            this.blocks[i][j].destroy()
            this.data[i][j] = 0
            this.addBlock('none', 'Fire', i, j)
          }
        }
      }
    }

    if(this.data[x][y]){
      this.blocks[x][y].destroy()
      this.data[x][y] = 0
    }

    //崭新的出场方式
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++) {
        if(i == _x && j == _y){
          //hero
        }else if(i == x && j == y){
          //dragon
        }else if(this.data[i][j] == 'Fire'){
          //fire
        }else{
          //烧毁其他单位
          if(this.data[i][j]){
            this.blocks[i][j].destroy()
            this.data[i][j] = 0
          }
        }
      }
    }

    if(pox) x = pox
    if(poy) y = poy

    if(pox == 0) x = 0
    if(poy == 0) y = 0

    let b = cc.instantiate(this.dragonPreFab);

    b.attr({
      id: _id,
      width: this.blockSize,
      height: this.blockSize,
    });
    b.setPosition(this.positions[x][y]);
    this.bg.node.addChild(b);
    this.blocks[x][y] = b;
    b.scaleX = 0;
    b.scaleY = 0;
    b.runAction(cc.scaleTo(0.3, 1, 1));
    this.data[x][y] = 'Dragon,' + _id

    this.dragons.push({
      id: _id,
      name: 'Dragon',
      x,
      y,
      node: b,
      hp: 99,             //生命值
      atk: 8,             //攻击力
      def: 8,             //护甲值
      maxHp: 999,           //最大生命值
      maxAtk: 16,          //最大攻击力
      maxDef: 16,          //最大防御力
    })

    //显示武器和护盾
    b.getChildByName("panel-atk").opacity = 255
    b.getChildByName("panel-def").opacity = 255

    //基础数值
    b.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = 99
    b.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = 8
    b.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = 8

  },

  /**
   * 创建恶龙怒吼
   * @param pox
   * @param poy
   */
  addDragon2(pox, poy){

    let _id = this.getUuid()

    let x = 0
    let y = 0

    // 空闲的位置
    let emptyLocations = this.getEmptyLocations();
    if (emptyLocations.length == 0) {
      //销毁道具后出现
      for (let i = 0; i < 4; i++){
        if(x || y) break
        for (let j = 0; j < 4; j++) {
          if(x || y) break
          if(this.data[i][j]){
            if(this.data[i][j].includes('Dragon')){
              //dragon
            }else if(this.data[i][j].includes('Skull')){
              //Skull
            }else if(this.data[i][j].includes('Princess')){
              //Princess
            }else if(this.data[i][j].includes('Hero')){
              //Hero
            }else if(this.data[i][j].includes('Fire')){
              //Fire
            }else{
              //销毁一个道具
              if(this.data[i][j]){
                x = i
                y = j
                this.blocks[i][j].destroy()
                this.data[i][j] = 0
              }
            }
          }
        }
      }

    }else{
      let p1 = Math.floor(Math.random() * emptyLocations.length);
      p1 = emptyLocations[p1];
      x = Math.floor(p1/4);
      y = Math.floor(p1%4);
    }

    if(pox) x = pox
    if(poy) y = poy

    if(pox == 0) x = 0
    if(poy == 0) y = 0

    let b = cc.instantiate(this.dragonPreFab);

    b.attr({
      id: _id,
      width: this.blockSize,
      height: this.blockSize,
    });
    b.setPosition(this.positions[x][y]);
    this.bg.node.addChild(b);
    this.blocks[x][y] = b;
    b.scaleX = 0;
    b.scaleY = 0;
    b.runAction(cc.scaleTo(0.3, 1, 1));
    this.data[x][y] = 'Dragon,' + _id

    this.dragons.push({
      id: _id,
      name: 'Dragon',
      x,
      y,
      node: b,
      hp: 200,             //生命值
      atk: 8,             //攻击力
      def: 8,             //护甲值
      maxHp: 999,           //最大生命值
      maxAtk: 16,          //最大攻击力
      maxDef: 16,          //最大防御力
    })

    //显示武器和护盾
    b.getChildByName("panel-atk").opacity = 255
    b.getChildByName("panel-def").opacity = 255

    //基础数值
    b.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = 200
    b.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = 8
    b.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = 8

    this.addBlock('none','Fire')
    this.addBlock('none','Fire')
    this.addBlock('none','Fire')
    this.addBlock('none','Fire')

  },

  /**
   * 创建公主
   * @param pox
   * @param poy
   */
  addPrincess(pox, poy){

    //判断是否进行过教程
    if(!this.tutorialData.data[16].isRead){
      this.showTipsView(this.tutorialData.data[16].content, 17)
    }

    let _id = this.getUuid()

    let x = 0
    let y = 0

    //判断hero的位置

    let _heroX = 0
    let _heroY = 0

    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++) {
        if (this.data[i][j] == 'Hero') {
          _heroX = i
          _heroY = j
        }
      }
    }

    if(_heroX == 0 || _heroX == 1){

      if(this.data[2][0]){
        if(this.isRole(2,0) == 'prop'){
          this.data[2][0] = 0
          this.blocks[2][0].destroy()
          this.addSkull(4, 2, 0)
        }
      }else{
        this.addSkull(4, 2, 0)
      }
      if(this.data[2][1]){
        if(this.isRole(2,1) == 'prop'){
          this.data[2][1] = 0
          this.blocks[2][1].destroy()
          this.addSkull(3, 2, 1)
        }
      }else{
        this.addSkull(3, 2, 1)
      }
      if(this.data[2][2]){
        if(this.isRole(2,2) == 'prop'){
          this.data[2][2] = 0
          this.blocks[2][2].destroy()
          this.addSkull(2, 2, 2)
        }
      }else{
        this.addSkull(2, 2, 2)
      }
      if(this.data[2][3]){
        if(this.isRole(2,3) == 'prop'){
          this.data[2][3] = 0
          this.blocks[2][3].destroy()
          this.addSkull(1, 2, 3)
        }
      }else{
        this.addSkull(1, 2, 3)
      }
      if(this.data[3][1]) {
        this.data[3][1] = 0
        this.blocks[3][1].destroy()
      }
      x = 3
      y = 1

    }else{

      if(this.data[1][0]){
        if(this.isRole(1,0) == 'prop'){
          this.data[1][0] = 0
          this.blocks[1][0].destroy()
          this.addSkull(4, 1, 0)
        }
      }else{
        this.addSkull(4, 1, 0)
      }
      if(this.data[1][1]){
        if(this.isRole(1,1) == 'prop'){
          this.data[1][1] = 0
          this.blocks[1][1].destroy()
          this.addSkull(3, 1, 1)
        }
      }else{
        this.addSkull(3, 1, 1)
      }
      if(this.data[1][2]){
        if(this.isRole(1,2) == 'prop'){
          this.data[1][2] = 0
          this.blocks[1][2].destroy()
          this.addSkull(2, 1, 2)
        }
      }else{
        this.addSkull(2, 1, 2)
      }
      if(this.data[1][3]){
        if(this.isRole(1,3) == 'prop'){
          this.data[1][3] = 0
          this.blocks[1][3].destroy()
          this.addSkull(1, 1, 3)
        }
      }else{
        this.addSkull(1, 1, 3)
      }

      if(this.data[0][1]){
        this.data[0][1] = 0
        this.blocks[0][1].destroy()
      }
      x = 0
      y = 1

    }

    let b = cc.instantiate(this.princessPreFab);

    b.attr({
      id: _id,
      width: this.blockSize,
      height: this.blockSize,
    });
    b.setPosition(this.positions[x][y]);
    this.bg.node.addChild(b);
    this.blocks[x][y] = b;
    b.scaleX = 0;
    b.scaleY = 0;
    b.runAction(cc.scaleTo(0.3, 1, 1));
    this.data[x][y] = 'Princess,' + _id

    this.princesss.push({
      id: _id,
      name: 'Princess',
      x,
      y,
      node: b,
      hp: 20,             //生命值
      atk: 0,             //攻击力
      def: 0,             //护甲值
      maxHp: 0,           //最大生命值
      maxAtk: 0,          //最大攻击力
      maxDef: 0,          //最大防御力
    })

    //判断白昼、黑夜
    if(this.gamePro.type == 'day') {
      b.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev('Princess').imgSource.spriteIndex]
      b.getChildByName("nightBg").opacity = 0
    }else{
      b.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev('Princess').imgSource.nightSpriteIndex]
      b.getChildByName("nightBg").opacity = 255
    }

    //隐藏武器和护盾
    b.getChildByName("panel-atk").opacity = 0
    b.getChildByName("panel-def").opacity = 0

    //基础数值
    b.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = 20
    b.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = 0
    b.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = 0

  },

  /**
   * 创建史莱姆
   * @param lv
   * @param pox
   * @param poy
   */
  addSkull(lv, pox, poy){

    //启用教程
    if(!this.tutorialData.data[6].isRead){
      this.showTipsView(this.tutorialData.data[6].content, 7)
    }

    let _id = this.getUuid()

    let x = 0
    let y = 0

    // 空闲的位置
    let emptyLocations = this.getEmptyLocations();
    if (emptyLocations.length == 0) {
      //销毁道具后出现
      for (let i = 0; i < 4; i++){
        if(x || y) break
        for (let j = 0; j < 4; j++) {
          if(x || y) break
          if(this.data[i][j]){
            if(this.data[i][j].includes('Dragon')){
              //dragon
            }else if(this.data[i][j].includes('Skull')){
              //Skull
            }else if(this.data[i][j].includes('Princess')){
              //Princess
            }else if(this.data[i][j].includes('Hero')){
              //Hero
            }else if(this.data[i][j].includes('Fire')){
              //Fire
            }else{
              //销毁一个道具
              if(this.data[i][j]){
                x = i
                y = j
                this.blocks[i][j].destroy()
                this.data[i][j] = 0
              }
            }
          }
        }
      }

    }else{
      let p1 = Math.floor(Math.random() * emptyLocations.length);
      p1 = emptyLocations[p1];
      x = Math.floor(p1/4);
      y = Math.floor(p1%4);
    }

    if(pox) x = pox
    if(poy) y = poy

    if(pox == 0) x = 0
    if(poy == 0) y = 0

    let skullInfo = {  }

    if(lv){
      if(lv == 1){
        skullInfo = {
          name: 'Skull2',
          id: _id,
          lv: 1,  //1-4
          hp: 10,
          atk: 1,
          def: 0,
          maxHp: 10,
          maxAtk: 16,
          maxDef: 16,
        }
      }else if(lv == 2){
        skullInfo = {
          name: 'Skull4',
          id: _id,
          lv: 2,  //1-4
          hp: 15,
          atk: 2, //自带短剑
          def: 0, //
          maxHp: 15,
          maxAtk: 16,
          maxDef: 16,
        }
      }else if(lv == 3){
        skullInfo = {
          name: 'Skull8',
          id: _id,
          lv: 3,  //1-4
          hp: 30,
          atk: 2, //自带长剑
          def: 2, //自带圆盾
          maxHp: 30,
          maxAtk: 16,
          maxDef: 16,
        }
      }else if(lv == 4){
        skullInfo = {
          name: 'Skull16',
          id: _id,
          lv: 4,  //1-4
          hp: 50,
          atk: 4, //自带长剑
          def: 4, //自带大盾
          maxHp: 50,
          maxAtk: 16,
          maxDef: 16,
        }
      }
    }


    let b = cc.instantiate(this.skullPrefabs[lv - 1]);

    b.attr({
      id: _id,
      width: this.blockSize,
      height: this.blockSize,
      info: skullInfo,
    });
    b.setPosition(this.positions[x][y]);
    this.bg.node.addChild(b);
    this.blocks[x][y] = b;
    b.scaleX = 0;
    b.scaleY = 0;
    b.runAction(cc.scaleTo(0.3, 1, 1));
    this.data[x][y] = skullInfo.name + ',' + _id

    this.skulls.push({
      id: _id,
      name: skullInfo.name,
      x,
      y,
      node: b,
      hp: skullInfo.hp,               //生命值
      atk: skullInfo.atk,             //攻击力
      def: skullInfo.def,             //护甲值
      maxHp: skullInfo.maxHp,         //最大生命值
      maxAtk: skullInfo.maxAtk,       //最大攻击力
      maxDef: skullInfo.maxDef,       //最大防御力
    })

    //判断白昼、黑夜
    if(this.gamePro.type == 'day') {
      b.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev(skullInfo.name).imgSource.spriteIndex]
      b.getChildByName("nightBg").opacity = 0
    }else{
      b.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev(skullInfo.name).imgSource.nightSpriteIndex]
      b.getChildByName("nightBg").opacity = 255
    }

    //显示武器和护盾
    b.getChildByName("panel-atk").opacity = 255
    b.getChildByName("panel-def").opacity = 255

    //基础数值
    b.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + skullInfo.hp
    b.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + skullInfo.atk
    b.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + skullInfo.def

  },

  /**
   * 完成移动后的操作
   */
  afterMove(moved, moveBlocks, moveDirection) {
    // cc.log('afterMove');
    if (moved) {
      //- 2018年5月9日16:58:03
      //暂时去掉回弹事件
      moveBlocks  = false

      if(moveBlocks){
        //带有回弹事件

        let blocks = this.getBlocks();

        for(let i=0; i<blocks.length; i++){
          for(let j=0; j<moveBlocks.length; j++){
            if(blocks[i].uuid == moveBlocks[j].id && (blocks[i].x != moveBlocks[j].x || blocks[i].y != moveBlocks[j].y)){

              let _x = blocks[i].x
              let _y = blocks[i].y

              if(moveDirection == 'Left'){
                blocks[i].runAction(cc.sequence(
                  cc.moveTo(0.08, _x - 50, _y),
                  cc.moveTo(0.08, _x + 20, _y),
                  cc.moveTo(0.08, _x,_y)));
              }else if(moveDirection == 'Right'){
                blocks[i].runAction(cc.sequence(
                  cc.moveTo(0.08, _x + 50, _y),
                  cc.moveTo(0.08, _x - 20, _y),
                  cc.moveTo(0.08, _x,_y)));
              }else if(moveDirection == 'Up'){
                blocks[i].runAction(cc.sequence(
                  cc.moveTo(0.08, _x, _y - 50),
                  cc.moveTo(0.08, _x, _y + 20),
                  cc.moveTo(0.08, _x,_y)));
              }else if(moveDirection == 'Down'){
                blocks[i].runAction(cc.sequence(
                  cc.moveTo(0.08, _x, _y + 50),
                  cc.moveTo(0.08, _x, _y - 20),
                  cc.moveTo(0.08, _x,_y)));
              }
            }
          }
        }

      }

      this.addBlock(moveDirection);

      //天数计时
      this.dayState.height += 128 / 20

      if(this.gamePro.type == 'day'){
        this.scoreState.height += 128 / this.gamePro.next
      }else{
        this.scoreState.height += 128 / this.gamePro.next / 2
      }

      if(this.dayState.height >= 128){
        //切换白昼/黑夜
        this.dayState.height = 0;
        if(this.gamePro.type == 'day'){
          this.gamePro.type = 'night'
          this.changeType('night')

          //判断是否进行过教程
          if(!this.tutorialData.data[10].isRead){
            this.showTipsView(this.tutorialData.data[10].content, 11)
          }

        }else{
          this.gamePro.type = 'day'
          this.changeType('day')

        }

      }

      if(this.gamePro.line == 0){
        //常规模式
        if(this.scoreState.height >= 128){
          this.scoreState.height = 0;
          //
          //判断Score
          if(this.gamePro.count <=3){
            //最开始出现3个辣鸡史莱姆
            this.addSkull(1);
          }else if(this.gamePro.count > 4 && this.gamePro.count <= 10){
            //停留一回合
            // 5-10交替出现辣鸡史莱姆和普通史莱姆
            if(this.gamePro.count %2 == 0)  this.addSkull(2);
            else    this.addSkull(1);
          }else if(this.gamePro.count > 11 && this.gamePro.count <= 18){
            //停留一回合
            // 12-18交替出现辣鸡史莱姆和普通史莱姆和高级史莱姆
            if(this.gamePro.count %3 == 0)  this.addSkull(1);
            else if(this.gamePro.count %3 == 1)  this.addSkull(2);
            else    this.addSkull(3);
          }else if( this.gamePro.count >= 20){
            //停留一回合
            // 20后每10个史莱姆会出现一个史莱姆长老
            if(this.gamePro.count % 10 == 0){
              this.addSkull(4);
            }else{
              //随机出现1-3的史莱姆
              this.addSkull(this.random_num(1,3))
            }
          }

          //改变next和count
          this.gamePro.next = this.random_num(10,18)
          this.gamePro.count ++

        }


      }else if(this.gamePro.line == 1){
        //恶龙之怒
        if(this.gamePro.dragonLine){
          if(this.scoreState.height >= 128){
            this.scoreState.height = 0;

            //火焰特殊计时器启动
            this.addBlock('none', 'Fire')

            //改变next和count
            this.gamePro.next = this.random_num(5,10)
            this.gamePro.count ++

          }
        }
      }else if(this.gamePro.line == 2){
        //公主回归
        if(this.scoreState.height >= 128){
          this.scoreState.height = 0;
          //
          //判断Score
          if(this.gamePro.count <=3){
            //最开始出现3个辣鸡史莱姆
            this.addSkull(1);
          }else if(this.gamePro.count > 4 && this.gamePro.count <= 10){
            // 4-10交替出现辣鸡史莱姆和普通史莱姆
            if(this.gamePro.count %2 == 0)  this.addSkull(2);
            else    this.addSkull(1);
          }else if(this.gamePro.count > 11 && this.gamePro.count <= 19){
            // 11-19交替出现辣鸡史莱姆和普通史莱姆和高级史莱姆
            if(this.gamePro.count %3 == 0)  this.addSkull(1);
            else if(this.gamePro.count %3 == 1)  this.addSkull(2);
            else    this.addSkull(3);
          }else if( this.gamePro.count > 20){
            // 20后每10个史莱姆会出现一个史莱姆长老
            if(this.gamePro.count % 10 == 0){
              this.addSkull(4);
            }else{
              //随机出现1-3的史莱姆
              this.addSkull(this.random_num(1,3))
            }
          }

          //改变next和count
          this.gamePro.next = this.random_num(8,15)
          this.gamePro.count ++

        }
      }

      // console.log(this.dayState)

    }

    if (this.isFull()) {
      //判断没有可以移动的位置

      if(this.gamePro.type == 'night'){
        //切换至白昼
        this.gamePro.type = 'day'
        this.changeType('day')
        this.dayState.height = 0
      }
      // console.log('已满')
    }else{
      // console.log(false)
      //播放move音效
      cc.audioEngine.playEffect(this.gameAudios[0], false);
    }

    this.moving = false;

    //判断是否进行过教程
    if(!this.tutorialData.data[2].isRead){
      this.showTipsView(this.tutorialData.data[2].content, 3)
    }

  },

  /**
   * 切换白天/黑夜
   * @param type
   */
  changeType(type){

    if(type == 'day'){
      cc.audioEngine.playEffect(this.gameAudios[1], false);
      this.gameBg.spriteFrame = this.equipments[0]
      this.dayBg.spriteFrame = this.equipments[2]
    }else{
      cc.audioEngine.playEffect(this.gameAudios[2], false);
      this.gameBg.spriteFrame = this.equipments[1]
      this.dayBg.spriteFrame = this.equipments[3]
    }

    for(let i=0; i<4; i++){
      for(let j=0; j<4; j++){
        let _block = this.blocks[i][j]

        if(_block){
          if(_block.name == 'Hero' || _block.name.includes('Princess') || _block.name.includes('Skull') || _block.name.includes('Dragon')) {
            if(type == 'day') {
              _block.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev(_block.name).imgSource.spriteIndex]
              _block.getChildByName("nightBg").opacity = 0
            }else{

              // console.log(this.getPrev(_block.name));
              _block.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev(_block.name).imgSource.nightSpriteIndex]
              _block.getChildByName("nightBg").opacity = 255
            }
          }
        }
      }
    }

  },

  /**
   * 添加手势控制
   */
  addTouchEvents() {

    this.node.on('touchstart', (event)=> {
      this.touchStartTime = Date.now();
      this.touchStartPoint = event.getLocation();
      return true;
    });

    this.node.on('touchmove', (event)=> {
    });

    this.node.on('touchend', (event)=> {
      this.touchEndTime = Date.now();
      this.touchEndPoint = event.getLocation();
      let vec = cc.v2(this.touchEndPoint.x - this.touchStartPoint.x, this.touchEndPoint.y - this.touchStartPoint.y);
      let duration = this.touchEndTime - this.touchStartTime;
      /// 少于200ms才判断上下左右滑动

      if(this.lockMove){
        return
      }

      if (duration < 400) {
        if (this.moving) {
          this.moveMissCount ++
          //判断连续超过3次恢复
          if(this.moveMissCount < 3)  return;
        }
        // x比y大，左右滑动
        let startMoveDis = 50;
        if (Math.abs(vec.x) > Math.abs(vec.y)) {
          if (vec.x > startMoveDis){
            // cc.log("右滑");
            this.moveMissCount = 0
            this.moving = true;
            this.moveRight();
          } else if (vec.x < -startMoveDis){
            // cc.log("左滑");
            this.moveMissCount = 0
            this.moving = true;
            this.moveLeft();
          }
        } else { // 上下滑动
          if(vec.y > startMoveDis){
            // cc.log("上滑");
            this.moveMissCount = 0
            this.moving = true;
            this.moveUp();
          } else if (vec.y < -startMoveDis){
            // cc.log("下滑");
            this.moveMissCount = 0
            this.moving = true;
            this.moveDown();
          }
        }
      }

    });
  },

  /**
   * 移动操作
   */
  moveAction(block, pos, callback) {
    block.runAction(cc.sequence(cc.moveTo(0.08, pos), cc.callFunc(()=> {
        callback();
      })
    ));
  },

  /**
   * 合并操作
   */
  mergeAction(b1, b2, name, callback) {

    //判断是否进行过教程
    if (b1.name == b2.name){
      if (!this.tutorialData.data[11].isRead) {
        this.showTipsView(this.tutorialData.data[11].content, 12)
      }
    }

    b1.destroy(); // 合并后销毁
    let scale1 = cc.scaleTo(0.1,1.1);
    let scale2 = cc.scaleTo(0.1, 1);

    // console.log(b1)
    // //
    // console.log(b2)
    //
    // console.log(name)

    // console.log(this.getPrev(name))

    //
    // console.log(b1.getChildByName("img"))
    // console.log(b1.getChildByName("img"))
    // console.log(b1.getChildByName("img").getComponent(cc.Sprite))
    //
    // console.log(this.gameSprites[this.getPrev(name).spriteIndex])
    //
    // b1.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev(name).spriteIndex]

    // return false;

    let mid = cc.callFunc(()=> {
      if(name != 0){

        //节省性能，只销毁1个block，改变另一个block的属性
        let _props = this.getPrev(name)
        //改变贴图
        b2.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[_props.imgSource.spriteIndex]
        //改变贴图size
        b2.getChildByName("img").width = _props.imgSource.width
        b2.getChildByName("img").height = _props.imgSource.height
        //改变数值
        b2.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + _props.initData.val
        //改变name
        b2.name = _props.curName
        // console.log(b2)
      }
    });
    let finished = cc.callFunc(()=> {
      callback();
    });
    b2.runAction(cc.sequence(scale1, mid, scale2, finished));
  },

  /**
   * 史莱姆合并升级
   * @param b1
   * @param b2
   * @param name
   * @param callback
   */
  mergeSkull(b1, b2, name, pos, skull1, skull2, callback){

    //判断b2的LV
    let lv = 1

    if(skull1.includes('Skull2')){
      lv = 1
    }else if(skull1.includes('Skull4')){
      lv = 2
    }if(skull1.includes('Skull8')){
      lv = 3
    }if(skull1.includes('Skull16')){
      lv = 4
      return
    }
    lv ++

    if(lv >= 4)
      lv = 4

    //合并属性
    let skullInfo = {}

    let s1 = this.getSkullByID(skull1.split(",")[1])
    let s2 = this.getSkullByID(skull2.split(",")[1])

    if(lv == 1){
      skullInfo = {
        name: 'Skull2,' + s2.id,
        id: s2.id,
        lv: 1,  //1-4
        hp: 10,
        atk: 1,
        def: 0,
        maxHp: 10,
        maxAtk: 16,
        maxDef: 16,
      }
    }else if(lv == 2){
      skullInfo = {
        name: 'Skull4,' + s2.id,
        id: s2.id,
        lv: 2,  //1-4
        hp: 20,
        atk: 0, //
        def: 2, //自带圆盾
        maxHp: 20,
        maxAtk: 16,
        maxDef: 16,
      }
    }else if(lv == 3){
      skullInfo = {
        name: 'Skull8,' + s2.id,
        id: s2.id,
        lv: 3,  //1-4
        hp: 30,
        atk: 2, //自带长剑
        def: 2,
        maxHp: 30,
        maxAtk: 16,
        maxDef: 16,
      }
    }else if(lv == 4){
      skullInfo = {
        name: 'Skull16,' + s2.id,
        id: s2.id,
        lv: 4,  //1-4
        hp: 50,
        atk: 4, //自带长剑
        def: 4, //自带圆盾
        maxHp: 99,
        maxAtk: 16,
        maxDef: 16,
      }
    }

    //合并武器防具
    if(s1.atk > s2.atk){
      skullInfo.atk = s1.atk
    }if(s1.def > s2.def){
      skullInfo.def = s1.def
    }

    //覆盖b2
    for(let i=0; i< this.skulls.length; i++){
      //销毁b1
      if(this.skulls[i].id == s1.id){
        this.skulls.splice(i, 1)
      }
    }

    for(let i=0; i< this.skulls.length; i++){
      //覆盖b2
      if(this.skulls[i].id == s2.id){
        this.skulls[i].name = skullInfo.name;
        this.skulls[i].hp = skullInfo.hp;
        this.skulls[i].atk = skullInfo.atk;
        this.skulls[i].def = skullInfo.def;
        this.skulls[i].maxHp = skullInfo.maxHp;
        this.skulls[i].maxAtk = skullInfo.maxAtk;
        this.skulls[i].maxDef = skullInfo.maxDef;
      }
    }

    b1.destroy(); // 合并后销毁

    let scale1 = cc.scaleTo(0.1,1.1);
    let scale2 = cc.scaleTo(0.1, 1);
    let mid = cc.callFunc(()=> {

      if(name != 0){

        //节省性能，只销毁1个block，改变另一个block的属性
        let _props = this.getPrev(skullInfo.name)
        //改变贴图
        b2.getChildByName("img").getComponent(cc.Sprite).spriteFrame = this.gameSprites[_props.imgSource.spriteIndex]
        //改变贴图size
        b2.getChildByName("img").width = _props.imgSource.width
        b2.getChildByName("img").height = _props.imgSource.height
        //改变数值
        b2.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + skullInfo.hp
        b2.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + skullInfo.atk
        b2.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + skullInfo.def
        //改变name
        b2.name = skullInfo.name

      }

      // b2.getComponent(cc.Sprite).spriteFrame = this.gameSprites[this.getPrev(name).spriteIndex]
      //
      // //更新b2属性
      // b2.getChildByName("hp_label").getComponent(cc.Label).string = '' + skullInfo.hp
      // b2.getChildByName("atk_label").getComponent(cc.Label).string = '' + skullInfo.atk
      // b2.getChildByName("def_label").getComponent(cc.Label).string = '' + skullInfo.def

    });
    let finished = cc.callFunc(()=> {
      callback();
    });
    b2.runAction(cc.sequence(scale1, mid, scale2, finished));
  },

  /**
   * 战斗
   * @param role1
   * @param role2
   * @param moveDirection
   * @param callback
   */
  fight(role1, role2, moveDirection, callback){

    //判断是否进行过教程
    if(!this.tutorialData.data[7].isRead){
      this.showTipsView(this.tutorialData.data[7].content, 8)
    }else if(!this.tutorialData.data[8].isRead){
      this.showTipsView(this.tutorialData.data[8].content, 9)
    }

    let _x = role1.node.x
    let _y = role1.node.y
    let _x2 = role2.node.x
    let _y2 = role2.node.y
    let role1Fall = false
    let role2Fall = false

    this.hpLable2.x = _x2 - 20
    this.hpLable2.y = _y2 + 20
    this.hpLable2.zIndex = 10
    this.hpLable2.active = true
    this.hpLable2.getChildByName("label_hp").getComponent(cc.Label).string = '-'+ role1.obj.atk
    this.hpLable2.runAction(cc.sequence(cc.moveTo(1, _x2-20, _y2 + 80), cc.callFunc(()=> {
        this.hpLable2.active = false
      })
    ));

    role2.obj.def -= role1.obj.atk

    if(role2.obj.def <= 0 ){
      role2.obj.hp += role2.obj.def
      role2.obj.def = 0
      //播放攻击音效
      // cc.audioEngine.playEffect(this.gameAudios[5], false);
    }else{
      //播放攻击音效
      // cc.audioEngine.playEffect(this.gameAudios[3], false);
    }
    //武器耐久-1
    if(role1.obj.atk > 1){
      role1.obj.atk --
    }

    if(role2.obj.hp <= 0){
      //击杀目标
      if(!this.tutorialData.data[9].isRead){
        this.showTipsView(this.tutorialData.data[9].content, 10)
      }

      if(role2.obj.name == 'Hero'){
        // game over
        if(this.gamePro.dragonLine){
          this.gameover('dragon_kill')
        }else{
          this.gameover()
        }
      } else{
        //销毁敌方对象
        if(role2.obj.name == 'Princess'){
          //营救失败
          this.gameover('save_princess_fall')
        }else if(role2.obj.name == 'Dragon'){
          this.gameover('kill_dragon')
          this.gamePro.data.dragon ++
        }else{
          for(let i=0; i< this.skulls.length; i++){
            if(this.skulls[i].id == role2.obj.id){
              if(this.skulls[i].name.includes('Skull2')){
                this.gamePro.data.skull2 ++
                this.gamePro.kill++
              }else if(this.skulls[i].name.includes('Skull4')){
                this.gamePro.data.skull4 ++
                this.gamePro.kill+=2
              }else if(this.skulls[i].name.includes('Skull8')){
                this.gamePro.data.skull8 ++
                this.gamePro.kill+=3
              }else if(this.skulls[i].name.includes('Skull16')){
                this.gamePro.data.skull16 ++
                this.gamePro.kill+=4
              }
              this.skulls.splice(i, 1)
            }
          }
          this.scoreBg.getChildByName("val").getComponent(cc.Label).string = '' + this.gamePro.kill
        }

      }

      this.data[role2.pos.x][role2.pos.y] = 0
      this.blocks[role2.pos.x][role2.pos.y] = null;
      role2.node.destroy()
      role2Fall = true

      //更新role1数据
      if(!role1Fall){
        role1.node.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + role1.obj.hp
        role1.node.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + role1.obj.atk
        role1.node.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + role1.obj.def
      }

      // callback()
      // return
    }

    //显示伤害值
    let mid = cc.callFunc(()=> {

      if(role2Fall){
        callback()
        return
      }

      this.hpLable1.x = _x - 20
      this.hpLable1.y = _y + 20
      this.hpLable1.zIndex = 10
      this.hpLable1.active = true
      this.hpLable1.getChildByName("label_hp").getComponent(cc.Label).string = '-'+ role2.obj.atk
      this.hpLable1.runAction(cc.sequence(cc.moveTo(1, _x-20, _y + 80), cc.callFunc(()=> {
          this.hpLable1.active = false
        })
      ));

      role1.obj.def -= role2.obj.atk
      if(role1.obj.def <= 0 ){
        role1.obj.hp += role1.obj.def
        role1.obj.def = 0
        // cc.audioEngine.playEffect(this.gameAudios[1], false);
      }else{
        //播放攻击音效
        // cc.audioEngine.playEffect(this.gameAudios[3], false);
      }
      //武器耐久-1
      if(role2.obj.atk > 1){
        role2.obj.atk --
      }

      //更新数据
      if(role1.obj.hp <= 0){
        //击杀目标

        if(role1.obj.name == 'Hero'){
          // game over
          if(this.gamePro.dragonLine){
            this.gameover('dragon_kill')
          }else{
            this.gameover()
          }
        } else{
          //销毁敌方对象
          if(role1.obj.name == 'Princess'){
            //营救失败
            this.gameover('save_princess_fall')
          }else if(role1.obj.name == 'Dragon'){
            this.gameover('kill_dragon')
            this.gamePro.data.dragon ++
          }else{
            //销毁敌方对象
            for(let i=0; i< this.skulls.length; i++){
              if(this.skulls[i].id == role1.obj.id){
                if(this.skulls[i].name.includes('Skull2')){
                  this.gamePro.data.skull2 ++
                  this.gamePro.kill++
                }else if(this.skulls[i].name.includes('Skull4')){
                  this.gamePro.data.skull4 ++
                  this.gamePro.kill+=2
                }else if(this.skulls[i].name.includes('Skull8')){
                  this.gamePro.data.skull8 ++
                  this.gamePro.kill+=3
                }else if(this.skulls[i].name.includes('Skull16')){
                  this.gamePro.data.skull16 ++
                  this.gamePro.kill+=4
                }
                this.skulls.splice(i, 1)
              }
            }
            this.scoreBg.getChildByName("val").getComponent(cc.Label).string = '' + this.gamePro.kill
          }

        }

        this.data[role1.pos.x][role1.pos.y] = 0
        this.blocks[role1.pos.x][role1.pos.y] = null;
        role1.node.destroy()
        role1Fall = true

        //更新role2数据
        if(!role2Fall){
          role2.node.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + role2.obj.hp
          role2.node.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + role2.obj.atk
          role2.node.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + role2.obj.def
        }

        // callback()

        // return

      }else{

        //更新数据
        if(!role1Fall){
          role1.node.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + role1.obj.hp
          role1.node.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + role1.obj.atk
          role1.node.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + role1.obj.def
        }
        if(!role2Fall){
          role2.node.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + role2.obj.hp
          role2.node.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + role2.obj.atk
          role2.node.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + role2.obj.def
        }

        // callback()
      }

      //更新role1、role2原始数据

      if(!role2Fall){

        if(moveDirection == 'Left'){
          role2.node.runAction(cc.sequence(
            cc.moveTo(0.08, _x2 - 25, _y2),
            cc.moveTo(0.08, _x2 + 100, _y2),
            cc.moveTo(0.08, _x2 - 50, _y2),
            cc.moveTo(0.08, _x2, _y2),
            cc.callFunc(()=> {
              if(callback){
                callback()
              }
            })
          ))
        }else if(moveDirection == 'Right'){
          role2.node.runAction(cc.sequence(
            cc.moveTo(0.08, _x2 + 25, _y2),
            cc.moveTo(0.08, _x2 - 100, _y2),
            cc.moveTo(0.08, _x2 + 50, _y2),
            cc.moveTo(0.08, _x2, _y2),
            cc.callFunc(()=> {
              if(callback){
                callback()
              }
            })
          ))
        }else if(moveDirection == 'Up'){
          role2.node.runAction(cc.sequence(
            cc.moveTo(0.08, _x2, _y2 - 25),
            cc.moveTo(0.08, _x2, _y2 + 100),
            cc.moveTo(0.08, _x2, _y2 - 50),
            cc.moveTo(0.08, _x2, _y2),
            cc.callFunc(()=> {
              if(callback){
                callback()
              }
            })
          ))
        }else if(moveDirection == 'Down'){
          role2.node.runAction(cc.sequence(
            cc.moveTo(0.08, _x2, _y2 + 25),
            cc.moveTo(0.08, _x2, _y2 - 100),
            cc.moveTo(0.08, _x2, _y2 + 50),
            cc.moveTo(0.08, _x2, _y2),
            cc.callFunc(()=> {
              if(callback){
                callback()
              }
            })
          ))
        }
      }
    });

    if(!role1Fall){
      if (moveDirection == 'Left') {
        role1.node.runAction(cc.sequence(
          cc.moveTo(0.08, _x - 100, _y),
          cc.moveTo(0.08, _x + 50, _y),
          cc.moveTo(0.08, _x, _y),
          mid));
      } else if (moveDirection == 'Right') {
        role1.node.runAction(cc.sequence(
          cc.moveTo(0.08, _x + 100, _y),
          cc.moveTo(0.08, _x - 50, _y),
          cc.moveTo(0.08, _x, _y),
          mid));
      } else if (moveDirection == 'Up') {
        role1.node.runAction(cc.sequence(
          cc.moveTo(0.08, _x, _y - 100),
          cc.moveTo(0.08, _x, _y + 50),
          cc.moveTo(0.08, _x, _y),
          mid));
      } else if (moveDirection == 'Down') {
        role1.node.runAction(cc.sequence(
          cc.moveTo(0.08, _x, _y + 100),
          cc.moveTo(0.08, _x, _y - 50),
          cc.moveTo(0.08, _x, _y),
          mid));
      }
    }
  },

  /**
   * 营救公主
   * @param name
   * @param pos
   */

  rescuePrincess(name, pos){
    let _item = this.blocks[pos.x][pos.y]

    let val = this.data[pos.x][pos.y]

    //显示武器和护盾
    _item.getChildByName("panel-atk").opacity = 255
    _item.getChildByName("panel-def").opacity = 255

    //基础数值
    _item.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.hp
    _item.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.atk
    _item.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.def

    //销毁公主
    for(let i=0; i< this.princesss.length; i++){
      if(this.princesss[i].id == name.split(',')[1]){
        this.princesss.splice(i, 1)
      }
    }

    this.gamePro.data.princesss ++

    this.gameover('save_princess_success')

  },

  /**
   * 拾取道具
   * @param name
   * @param pos
   * @param moveDirection
   */
  pickUp(name, pos, moveDirection){

    let _item = this.blocks[pos.x][pos.y]

    let val = this.data[pos.x][pos.y]

    let _atk = 0
    let _def = 0
    let _hp = 0

    if (name == 'Shield2') _def = 2
    if (name == 'Shield4') _def = 4
    if (name == 'Shield8') _def = 8
    if (name == 'Shield16') _def = 16

    if (name == 'Sword2') _atk = 2
    if (name == 'Sword4') _atk = 4
    if (name == 'Sword8') _atk = 8
    if (name == 'Sword16') _atk = 16

    if (name == 'Phea2') _hp = 2
    if (name == 'Phea4') _hp = 4
    if (name == 'Phea8') _hp = 8
    if (name == 'Phea16') _hp = 999


    if(val.includes('Skull')){
      //Skull拾取道具

      let _skull = this.getSkullByID(val.split(",")[1])

      //Hero拾取道具
      if(_atk!= 0 && _skull.atk < _atk){
        _skull.atk = _atk
        if(_atk > _skull.maxAtk)
          _skull.atk = _skull.maxAtk
      } if(_def!= 0 && _skull.def < _def){
        _skull.def = _def
        if(_def > _skull.maxDef)
          _skull.def = _skull.maxDef
      } if(_hp!= 0){
        _skull.hp += _hp
        if(_skull.hp > _skull.maxHp)
          _skull.hp = _skull.maxHp
      }

      //显示武器和护盾
      _item.getChildByName("panel-atk").opacity = 255
      _item.getChildByName("panel-def").opacity = 255

      //基础数值
      _item.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + _skull.hp
      _item.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + _skull.atk
      _item.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + _skull.def

      if(this.gamePro.course){
        this.showMsg('谜之声', '敌人也可以拾取道具，拾取道具后会使你的战斗更加艰难')
      }

    }else if(val.includes('Dragon')){
      //Dragon拾取道具

      let _dragon = this.getDragonByID(val.split(",")[1])

      //拾取道具
      if(_atk!= 0 && _dragon.atk < _atk){
        _dragon.atk = _atk
        if(_atk > _dragon.maxAtk)
          _dragon.atk = _dragon.maxAtk
      } if(_def!= 0 && _dragon.def < _def){
        _dragon.def = _def
        if(_def > _dragon.maxDef)
          _dragon.def = _dragon.maxDef
      } if(_hp!= 0){
        _dragon.hp += _hp
        if(_dragon.hp > _dragon.maxHp)
          _dragon.hp = _dragon.maxHp
      }

      //显示武器和护盾
      _item.getChildByName("panel-atk").opacity = 255
      _item.getChildByName("panel-def").opacity = 255

      _item.getChildByName("panel-hp").width = 50
      _item.getChildByName("panel-hp").height = 50
      _item.getChildByName("panel-hp").getChildByName("val").width = 50
      _item.getChildByName("panel-hp").getChildByName("val").height = 50

      //基础数值
      _item.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + _dragon.hp
      _item.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + _dragon.atk
      _item.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + _dragon.def

    }else if(val.includes('Fire')){
      //Fire烧毁道具
      _item.getChildByName("img").width = 78
      _item.getChildByName("img").height = 100
    }else{

      if(name == 'Fire'){
        //火焰陷阱

        //获取hero的坐标

        let _x2 = _item.x
        let _y2 = _item.y

        this.hpLable2.x = _x2 - 20
        this.hpLable2.y = _y2 + 20
        this.hpLable2.zIndex = 10
        this.hpLable2.active = true
        this.hpLable2.getChildByName("label_hp").getComponent(cc.Label).string = '-4'
        this.hpLable2.runAction(cc.sequence(cc.moveTo(1, _x2-20, _y2 + 80), cc.callFunc(()=> {
            this.hpLable2.active = false

          })
        ));

        this.heroPro.hp -= 4

        //显示武器和护盾
        _item.getChildByName("panel-atk").opacity = 255
        _item.getChildByName("panel-def").opacity = 255

        //基础数值
        _item.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.hp
        _item.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.atk
        _item.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.def

        if(this.heroPro.hp <=0){
          this.gameover()
        }

        return
      }

      // console.log( '拾取'+ name)

      if (name == 'Shield16' && this.gamePro.line == 0){

        this.heroPro.minDef ++

        if(this.heroPro.minDef == 1){
          this.showMsg('谜之声', '盾徽上端有一只红舌金爪的白隼和一只白齿红舌金爪的龙',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }else if(this.heroPro.minDef == 2){
          this.showMsg('谜之声', '左侧是一头黑牛,右侧站着一位身披斗篷的白衣老人',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }else if(this.heroPro.minDef == 3){
          this.showMsg('谜之声', '隼、龙、牛和老人都是传说中的守护神，盾徽下端的石块代表冰岛多岩石的漫长海岸。',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }else if(this.heroPro.minDef == 4){
          this.showMsg('谜之声', '远处看见了一个史莱姆的营地，看来将会有场恶战',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }

        // 5次圣盾后开启公主支线
        //- 2018年8月24日13:30:23
        //- 支线剧情待补充
        if(this.heroPro.minDef == 5){
          this.gamePro.line = 2;
          this.gamePro.princessLine = true
          this.addPrincess()

          //公主回归
          //台词待补充
          this.showMsg('Princess', '我必须离开这里，太阳会指引我', ()=>{
            setTimeout(()=>{
              this.showMsg('Hero', '公主不是被恶龙抓走了吗？为什么会在这种地方？', ()=>{
                setTimeout(()=>{
                  this.showMsg('谜之声', '营救公主获得游戏胜利，公主阵亡游戏结束', ()=>{
                    setTimeout(()=>{
                      this.hideMsg()
                    }, 6000)
                  })
                }, 6000)
              })
            }, 6000)
          })

        }

      }else if (name == 'Sword16' && this.gamePro.line == 0){

        this.heroPro.minAtk ++

        if(this.heroPro.minAtk == 1){
          this.showMsg('谜之声', '剑柄装饰得很漂亮，乌黑发亮的剑鞘上布满一排排卢恩字母和符号',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }else if(this.heroPro.minAtk == 2){
          this.showMsg('谜之声', '剑身闪着镜子般的光芒，是用纯银打造的',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }else if(this.heroPro.minAtk == 3){
          this.showMsg('谜之声', '剑上刻着：Narsil essenya, macil meletya.Telchar carnéron Návarotesse.',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }else if(this.heroPro.minAtk == 4){
          this.showMsg('谜之声', '远处传来了龙的怒吼，魔法探测器震动得厉害',()=>{
            setTimeout(()=>{
              this.hideMsg()
            },5000)
          })
        }
        // 5次圣剑后开启恶龙支线
        else if(this.heroPro.minAtk == 5){
          this.gamePro.line = 1;
          this.gamePro.dragonLine = true;
          this.addDragon()
          //巨龙之怒
          //台词待补充
          this.showMsg('Dragon', '居然敢骗我，我会将一切化为灰烬...', ()=>{
            setTimeout(()=>{
              this.showMsg('Dragon', '你挡不住我的，凡人（咆哮着）', ()=>{
                setTimeout(()=>{
                  this.showMsg('谜之声', '击败恶龙获得游戏胜利', ()=>{
                    setTimeout(()=>{
                      this.hideMsg()
                    }, 6000)
                  })
                }, 6000)
              })
            }, 6000)
          })
        }

      }else if (name == 'Phea16'){
        this.showMsg('谜之声', '喝下药剂，感觉迎来了第二次生命，你的最大生命值提高了',()=>{
          setTimeout(()=>{
            this.hideMsg()
          },4000)
        })
        this.heroPro.maxHp += 2
      }


      if(name == 'Phea2' || name == 'Phea4' || name == 'Phea8' || name == 'Phea16'){
        //拾取药剂
        if(!this.tutorialData.data[3].isRead){
          this.showTipsView(this.tutorialData.data[3].content, 4)
        }
      }else if(name == 'Sword2' || name == 'Sword4' || name == 'Sword8' || name == 'Sword16' || name == 'Shield2' || name == 'Shield4' || name == 'Shield8' || name == 'Shield16'){
        //拾取武器/防具
        if(!this.tutorialData.data[4].isRead){
          this.showTipsView(this.tutorialData.data[4].content, 5)
        }if(!this.tutorialData.data[5].isRead){
          if( this.heroPro.atk >= 4 || this.heroPro.def >= 4){
            if(this.heroPro.atk >= _atk || this.heroPro.def >= _def) {
              this.showTipsView(this.tutorialData.data[5].content, 6)
            }
          }
        }
      }

      //Hero拾取道具
      if(_atk!= 0 && this.heroPro.atk < _atk){
        this.heroPro.atk = _atk
        if(_atk > this.heroPro.maxAtk)
          this.heroPro.atk = this.heroPro.maxAtk
      } if(_def!= 0 && this.heroPro.def < _def){
        this.heroPro.def = _def
        if(_atk > this.heroPro.maxDef)
          this.heroPro.def = this.heroPro.maxDef
      } if(_hp!= 0){
        this.heroPro.hp += _hp
        if(this.heroPro.hp > this.heroPro.maxHp)
          this.heroPro.hp = this.heroPro.maxHp
      }

      //统计拾取数据
      if(name == 'Sword2')    this.gamePro.data.atk2 ++
      else if(name == 'Sword4')    this.gamePro.data.atk4 ++
      else if(name == 'Sword8')    this.gamePro.data.atk8 ++
      else if(name == 'Sword16')    this.gamePro.data.atk16 ++
      else if(name == 'Shield2')    this.gamePro.data.def2 ++
      else if(name == 'Shield4')    this.gamePro.data.def4 ++
      else if(name == 'Shield8')    this.gamePro.data.def8 ++
      else if(name == 'Shield16')    this.gamePro.data.def16 ++
      else if(name == 'Phea2')    this.gamePro.data.hp2 ++
      else if(name == 'Phea4')    this.gamePro.data.hp4 ++
      else if(name == 'Phea8')    this.gamePro.data.hp8 ++
      else if(name == 'Phea16')    this.gamePro.data.hp16 ++

      //显示武器和护盾
      _item.getChildByName("panel-atk").opacity = 255
      _item.getChildByName("panel-def").opacity = 255

      //数值变为绿色
      // if(this.heroPro.minHp >= 0)

      // b.getChildByName("panel-hp").getChildByName("val").setColor(cc.color(0,205,0,255));
      // b.getChildByName("panel-atk").getChildByName("val").setColor(cc.color(0,205,0,255));
      //     b.getChildByName("panel-def").getChildByName("val").setColor(cc.color(0,205,0,255));

      //基础数值
      _item.getChildByName("panel-hp").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.hp
      _item.getChildByName("panel-atk").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.atk
      _item.getChildByName("panel-def").getChildByName("val").getComponent(cc.Label).string = '' + this.heroPro.def


    }

    //播放pickUp音效
    // cc.audioEngine.playEffect(this.gameAudios[4], false);

  },

  /**
   * 获取道具/人物详细信息
   * @param val
   * @returns {*}
   */
  getPrev(val){

    let _id = ''
    let name = ''

    let _tmp = null

    if(val.includes('Skull') || val.includes('Dragon') || val.includes('Princess')){
      _id = val.split(",")[1]
      name = val.split(",")[0]
    }else{
      name = val
    }

    // 主角
    if(name == 'Hero' || name == 'knight'){
      _tmp = {
        cur: this.heroPrefab,
        next: this.heroPrefab,
        curName: 'Hero',
        nextName: 'Hero',
        imgSource: {
          spriteIndex: 0,
          nightSpriteIndex: 1,
          width: 75,
          height: 120,
        },
        initData: {
          hp: 15,             //生命值
          atk: 1,             //攻击力
          def: 0,             //护甲值
          maxHp: 15,          //生命值上限
          maxAtk: 16,         //攻击力上限
          maxDef: 16,         //防御力上限
        }
      }
    }
    //公主
    else if(name == 'Princess'){
      _tmp = {
        cur: this.princessPrefab,
        next: this.princessPrefab,
        curName: 'Princess' + ',' +  _id,
        nextName: 'Princess' + ',' +  _id,
        imgSource: {
          spriteIndex: 2,
          nightSpriteIndex: 3,
          width: 109,
          height: 130,
        },
        initData: {
          hp: 30,             //生命值
          atk: 0,             //攻击力
          def: 0,             //护甲值
          maxHp: 0,          //生命值上限
          maxAtk: 0,         //攻击力上限
          maxDef: 0,         //防御力上限
        }
      }
    }
    // 幼年史莱姆
    else if(name == 'Skull2'){
      _tmp = {
        cur: this.skullPrefabs[0],
        next: this.skullPrefabs[1],
        curName: 'Skull2' + ',' +  _id,
        nextName: 'Skull4' + ',' +  _id,
        imgSource: {
          spriteIndex: 4,
          nightSpriteIndex: 5,
          width: 100,
          height: 84,
        },
        initData: {
          hp: 10,             //生命值
          atk: 1,             //攻击力
          def: 0,             //护甲值
          maxHp: 10,          //生命值上限
          maxAtk: 16,         //攻击力上限
          maxDef: 16,         //防御力上限
        }
      }
    }
    // 普通史莱姆
    else if(name == 'Skull4'){
      _tmp = {
        cur: this.skullPrefabs[1],
        next: this.skullPrefabs[2],
        curName: 'Skull4' + ',' +  _id,
        nextName: 'Skull8' + ',' +  _id,
        imgSource: {
          spriteIndex: 6,
          nightSpriteIndex: 7,
          width: 100,
          height: 89,
        },
        initData: {
          hp: 15,             //生命值
          atk: 2,             //攻击力
          def: 0,             //护甲值
          maxHp: 15,          //生命值上限
          maxAtk: 16,         //攻击力上限
          maxDef: 16,         //防御力上限
        }
      }
    }
    // 史莱姆战士
    else if(name == 'Skull8'){
      _tmp = {
        cur: this.skullPrefabs[2],
        next: this.skullPrefabs[3],
        curName: 'Skull8' + ',' +  _id,
        nextName: 'Skull16' + ',' +  _id,
        imgSource: {
          spriteIndex: 8,
          nightSpriteIndex: 9,
          width: 130,
          height: 90,
        },
        initData: {
          hp: 30,             //生命值
          atk: 2,             //攻击力
          def: 2,             //护甲值
          maxHp: 30,          //生命值上限
          maxAtk: 16,         //攻击力上限
          maxDef: 16,         //防御力上限
        }
      }
    }

    // 史莱姆长老
    else if(name == 'Skull16'){
      _tmp = {
        cur: this.skullPrefabs[3],
        next: this.skullPrefabs[3],
        curName: 'Skull16' + ',' +  _id,
        nextName: 'Skull16' + ',' +  _id,
        imgSource: {
          spriteIndex: 10,
          nightSpriteIndex: 11,
          width: 120,
          height: 88,
        },
        initData: {
          hp: 50,             //生命值
          atk: 4,             //攻击力
          def: 4,             //护甲值
          maxHp: 50,          //生命值上限
          maxAtk: 16,         //攻击力上限
          maxDef: 16,         //防御力上限
        }
      }
    }


    // 恶龙
    else if(name == 'Dragon'){
      _tmp = {
        cur: this.dragonPrefab,
        next: this.dragonPrefab,
        curName: 'Dragon' + ',' +  _id,
        nextName: 'Dragon' + ',' +  _id,
        imgSource: {
          spriteIndex: 12,
          nightSpriteIndex: 12,
          width: 112,
          height: 130,
        },
        initData: {
          hp: 500,            //生命值
          atk: 8,             //攻击力
          def: 8,             //护甲值
          maxHp: 500,         //生命值上限
          maxAtk: 16,         //攻击力上限
          maxDef: 16,         //防御力上限
        }
      }
    }

    //火焰陷阱 恶龙衍生物
    else if(name == 'Fire'){
      _tmp = {
        cur: this.propPrefabs[0],
        next: this.propPrefabs[1],
        curName: 'Fire',
        nextName: 'Fire',
        imgSource: {
          spriteIndex: 35,
          width: 128,
          height: 128,
        },
        initData: {
          val: 4,             //当前属性值
          nextVal: 16,         //下一级属性值
        }
      }
    }

    // 武器2
    else if(name == 'Sword2'){
      _tmp = {
        cur: this.swordPrefabs[0],
        next: this.swordPrefabs[1],
        curName: 'Sword2',
        nextName: 'Sword4',
        imgSource: {
          spriteIndex: 13,
          width: 100,
          height: 99,
        },
        initData: {
          val: 2,             //当前属性值
          nextVal: 4,         //下一级属性值
        }
      }
    }
    // 武器4
    else if(name == 'Sword4'){
      _tmp = {
        cur: this.swordPrefabs[1],
        next: this.swordPrefabs[2],
        curName: 'Sword4',
        nextName: 'Sword8',
        imgSource: {
          spriteIndex: 14,
          width: 100,
          height: 98,
        },
        initData: {
          val: 4,             //当前属性值
          nextVal: 8,         //下一级属性值
        }
      }
    }
    // 武器8
    else if(name == 'Sword8'){
      _tmp = {
        cur: this.swordPrefabs[2],
        next: this.swordPrefabs[3],
        curName: 'Sword8',
        nextName: 'Sword16',
        imgSource: {
          spriteIndex: 15,
          width: 100,
          height: 97,
        },
        initData: {
          val: 8,             //当前属性值
          nextVal: 16,         //下一级属性值
        }
      }
    }
    // 武器16
    else if(name == 'Sword16'){
      _tmp = {
        cur: this.swordPrefabs[3],
        next: this.swordPrefabs[3],
        curName: 'Sword16',
        nextName: 'Sword16',
        imgSource: {
          spriteIndex: 16,
          width: 98,
          height: 100,
        },
        initData: {
          val: 16,             //当前属性值
          nextVal: 16,         //下一级属性值
        }
      }
    }
    // 防具2
    else if(name == 'Shield2'){
      _tmp = {
        cur: this.shieldPrefabs[0],
        next: this.shieldPrefabs[1],
        curName: 'Shield2',
        nextName: 'Shield4',
        imgSource: {
          spriteIndex: 17,
          width: 71,
          height: 100,
        },
        initData: {
          val: 2,             //当前属性值
          nextVal: 4,         //下一级属性值
        }
      }
    }
    // 防具4
    else if(name == 'Shield4'){
      _tmp = {
        cur: this.shieldPrefabs[1],
        next: this.shieldPrefabs[2],
        curName: 'Shield4',
        nextName: 'Shield8',
        imgSource: {
          spriteIndex: 18,
          width: 58,
          height: 100,
        },
        initData: {
          val: 4,             //当前属性值
          nextVal: 8,         //下一级属性值
        }
      }
    }
    // 防具8
    else if(name == 'Shield8'){
      _tmp = {
        cur: this.shieldPrefabs[2],
        next: this.shieldPrefabs[3],
        curName: 'Shield8',
        nextName: 'Shield16',
        imgSource: {
          spriteIndex: 19,
          width: 72,
          height: 100,
        },
        initData: {
          val: 8,             //当前属性值
          nextVal: 16,         //下一级属性值
        }
      }
    }
    // 防具16
    else if(name == 'Shield16'){
      _tmp = {
        cur: this.shieldPrefabs[3],
        next: this.shieldPrefabs[3],
        curName: 'Shield16',
        nextName: 'Shield16',
        imgSource: {
          spriteIndex: 20,
          width: 66,
          height: 100,
        },
        initData: {
          val: 16,             //当前属性值
          nextVal: 16,         //下一级属性值
        }
      }
    }
    // 药剂2
    else if(name == 'Phea2'){
      _tmp = {
        cur: this.pheaPrefabs[0],
        next: this.pheaPrefabs[1],
        curName: 'Phea2',
        nextName: 'Phea4',
        imgSource: {
          spriteIndex: 21,
          width: 28,
          height: 100,
        },
        initData: {
          val: 2,             //当前属性值
          nextVal: 4,         //下一级属性值
        }
      }
    }
    // 药剂4
    else if(name == 'Phea4'){
      _tmp = {
        cur: this.pheaPrefabs[1],
        next: this.pheaPrefabs[2],
        curName: 'Phea4',
        nextName: 'Phea8',
        imgSource: {
          spriteIndex: 22,
          width: 70,
          height: 100,
        },
        initData: {
          val: 4,             //当前属性值
          nextVal: 8,         //下一级属性值
        }
      }
    }
    // 药剂8
    else if(name == 'Phea8'){
      _tmp = {
        cur: this.pheaPrefabs[2],
        next: this.pheaPrefabs[3],
        curName: 'Phea8',
        nextName: 'Phea16',
        imgSource: {
          spriteIndex: 23,
          width: 52,
          height: 100,
        },
        initData: {
          val: 8,             //当前属性值
          nextVal: 16,         //下一级属性值
        }
      }
    }
    // 药剂16
    else if(name == 'Phea16'){
      _tmp = {
        cur: this.pheaPrefabs[3],
        next: this.pheaPrefabs[3],
        curName: 'Phea16',
        nextName: 'Phea16',
        imgSource: {
          spriteIndex: 24,
          width: 100,
          height: 88,
        },
        initData: {
          val: 16,             //当前属性值
          nextVal: 16,         //下一级属性值
        }
      }
    }

    return _tmp

  },

  /**
   * 向左移动
   */
  moveLeft() {
    // 递归移动操作
    let isMoved = false;
    let merged = [];            //记录合并状态
    let moved = [];             //记录移动状态

    for (let i = 0; i < 4; i++) {
      merged.push([0,0,0,0]);
    }
    let move = (x, y, callback)=> {
      if (y == 0) {
        if (callback) {
          isMoved = true;
          callback();
        }
        return;
      }
      else if (this.data[x][y-1] != 0 && this.data[x][y-1] != this.data[x][y]) {
        let _r1 = this.isRole(x, y)
        let _r2 = this.isRole(x, y-1)
        if(_r1 != 'prop'){
          if(this.gamePro.type == 'night') {
            if(_r1 == 'Fire'){

              if(_r2 == 'prop'){
                if(merged[x][y-1]!=2){
                  merged[x][y-1] = 2;
                  let __name = this.data[x][y-1]
                  //拾取道具
                  this.data[x][y-1] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y-1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y-1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y-1], ()=>{
                      this.pickUp(__name, { x, y: y-1 }, 'Left')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }

            }else{
              if (callback) {
                isMoved = true;
                callback();
              }
              return;
            }
          }
          //角色
          if(_r2 == 'prop'){
            //拾取道具
            if(_r1 == 'Princess'){
              //公主无法拾取道具
              if (callback) {
                isMoved = true;
                callback();
              }
            }else{
              //拾取
              if(merged[x][y-1]!=2){
                merged[x][y-1] = 2;
                let __name = this.data[x][y-1]
                //拾取道具
                this.data[x][y-1] = this.getPrev(this.data[x][y]).curName
                this.data[x][y] = 0;
                let b2 = this.blocks[x][y-1];
                let b1 = this.blocks[x][y];
                let p = this.positions[x][y-1];
                this.blocks[x][y] = null;
                this.moveAction(b1, p, ()=> {
                  this.mergeAction(b1, b2, this.data[x][y-1], ()=>{
                    this.pickUp(__name, { x, y: y-1 }, 'Left')
                    isMoved = true;
                    callback();
                  });
                });
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }
            }
          }else{
            //其他角色
            if(_r1 == 'Hero'){
              //Hero先行动
              if(_r2 == 'Princess'){
                //营救公主
                if(merged[x][y-1]!=2){
                  merged[x][y-1] = 2;
                  let __name = this.data[x][y-1]
                  //拾取道具
                  this.data[x][y-1] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y-1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y-1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y-1], ()=>{
                      this.rescuePrincess(__name, { x, y: y-1 })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else if(_r2 == 'Fire'){
                //火焰陷阱
                if(merged[x][y-1]!=2){
                  merged[x][y-1] = 2;
                  let __name = this.data[x][y-1]
                  //拾取道具
                  this.data[x][y-1] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y-1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y-1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y-1], ()=>{
                      this.pickUp(__name, { x, y: y-1 }, 'Left')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                //Hero 先攻模式
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x][y-1].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x][y-1].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: this.heroPro
                }, {
                  node: this.blocks[x][y-1],
                  pos: {x, y: y-1},
                  obj: enemy
                }, 'Left', ()=>{
                  isMoved = true;
                  callback();
                })
              }
            }else if(_r1 == 'Princess'){
              if(_r2 == 'Dragon' || _r2 == 'Skull'){
                //公主先攻
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x][y-1].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x][y-1].split(',')[1])
                let _princess = this.getPrincessByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _princess
                }, {
                  node: this.blocks[x][y-1],
                  pos: {x, y: y-1},
                  obj: enemy
                }, 'Left', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Hero'){
                //营救公主
                if(merged[x][y-1]!=2){
                  merged[x][y-1] = 2;
                  let __name = this.data[x][y]
                  //拾取道具
                  this.data[x][y-1] = 'Hero'
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y-1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y-1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y-1], ()=>{
                      this.rescuePrincess(__name, { x, y: y-1 })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Fire'){
              //火焰陷阱不会主动触发
              if (callback) {
                isMoved = true;
                callback();
              }
            }else if(_r1 == 'Dragon'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //恶龙先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x][y-1].split(',')[1])
                let _dragon = this.getDragonByID(this.data[x][y].split(',')[1])

                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _dragon
                }, {
                  node: this.blocks[x][y-1],
                  pos: {x, y: y-1},
                  obj: enemy
                }, 'Left', ()=>{
                  isMoved = true;
                  callback();
                })
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Skull'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //史莱姆先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x][y-1].split(',')[1])
                let _skull = this.getSkullByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _skull
                }, {
                  node: this.blocks[x][y-1],
                  pos: {x, y: y-1},
                  obj: enemy
                }, 'Left', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Skull'){
                //合并史莱姆升级
                let skull1 = this.data[x][y]
                let skull2 = this.data[x][y-1]
                let name1 = skull1.split(',')[0]
                let name2 = skull2.split(',')[0]
                if(name1 == name2){
                  //相同属性
                  if(name1 == 'Skull16' || name2 == 'Skull16'){
                    console.log('不进行升级')
                    //已达到最高等级
                    isMoved = true;
                    callback();
                  }else{
                    //合并升级
                    let _next = ''
                    if(name1 == 'Skull2')  _next = 'Skull4'
                    if(name1 == 'Skull4')  _next = 'Skull8'
                    if(name1 == 'Skull8')  _next = 'Skull16'
                    merged[x][y-1] = 2;
                    this.data[x][y-1] = _next + ',' + skull2.split(',')[1]
                    this.data[x][y] = 0;
                    let b2 = this.blocks[x][y-1];
                    let b1 = this.blocks[x][y];
                    let p = this.positions[x][y-1];
                    this.blocks[x][y] = null;
                    this.moveAction(b1, p, ()=> {
                      this.mergeSkull(b1, b2, this.data[x][y-1], {x, y: y-1}, skull1, skull2, ()=>{
                        isMoved = true;
                        callback();
                      });
                    });
                  }
                }else{
                  //不同属性
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                }
              }else{
                //不会攻击恶龙
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }
          }
        }else{
          if (callback) {
            isMoved = true;
            callback();
          }
          return;
        }
      }
      else if (this.data[x][y-1] == this.data[x][y] && !merged[x][y-1]) {

        //判断最高等级
        if(this.data[x][y]){
          if(this.data[x][y].includes('Skull16') || this.data[x][y].includes('Princess') || this.data[x][y].includes('Dragon') || this.data[x][y].includes('Phea16') || this.data[x][y].includes('Shield16') || this.data[x][y].includes('Sword16')){
            isMoved = true;
            callback();
            return
          }
        }

        merged[x][y-1] = 1;
        this.data[x][y-1] = this.getPrev(this.data[x][y]).nextName
        this.data[x][y] = 0;
        let b2 = this.blocks[x][y-1];
        let b1 = this.blocks[x][y];
        let p = this.positions[x][y-1];
        this.blocks[x][y] = null;
        this.moveAction(b1, p, ()=> {
          this.mergeAction(b1, b2, this.data[x][y-1], ()=>{
            isMoved = true;
            callback()
          });
        });
      }
      else if (this.data[x][y-1] == 0) {

        this.data[x][y-1] = this.data[x][y];
        this.data[x][y] = 0;
        let b = this.blocks[x][y];
        let p = this.positions[x][y-1];
        this.blocks[x][y-1] = b;
        this.blocks[x][y] = null;

        this.moveAction(b, p, ()=>{
          isMoved = true;
          move(x, y-1, callback);
        });
      } else {
        isMoved = true;
        callback();
      }

    };

    let total = 0;
    let counter = 0;
    let willMove = [];
    let willMoveNodes = []
    for (let y = 1; y < 4; y++) {
      for (let x = 0; x < 4; x++){
        let n = this.data[x][y];
        if (n != 0){
          total += 1;
          willMove.push({x: x, y: y});
          let _tmp = this.copy(this.blocks[x][y])
          willMoveNodes.push({
            id: _tmp.uuid,
            x: _tmp.x,
            y: _tmp.y,
          })
        }
      }
    }

    for (let i = 0; i < willMove.length; i++) {
      let x = willMove[i].x;
      let y = willMove[i].y;
      move(x, y, ()=> {
        counter += 1;
        if (counter == total) {
          // cc.log('counter: ' + counter + " total: " + total);
          //处理回弹事件
          this.afterMove(isMoved, willMoveNodes, 'Left');
        }
      });
    }

    if(willMove.length == 0){
      //处理未移动块
      this.afterMove(true, willMoveNodes, 'Left');
    }

  },

  /**
   * 向右移动
   */
  moveRight() {
    // 递归移动操作
    let isMoved = false;
    let merged = [];
    for (let i = 0; i < 4; i++) {
      merged.push([0,0,0,0]);
    }
    let move = (x, y, callback)=> {
      if (y == 3) {
        if (callback) {
          isMoved = true;
          callback();
        }
        return;
      }
      else if (this.data[x][y+1] != 0 && this.data[x][y+1] != this.data[x][y]) {

        let _r1 = this.isRole(x, y)
        let _r2 = this.isRole(x, y+1)
        if(_r1 != 'prop'){
          if(this.gamePro.type == 'night') {

            if(_r1 == 'Fire'){

              if(_r2 == 'prop'){
                if(merged[x][y+1]!=2){
                  merged[x][y+1] = 2;
                  let __name = this.data[x][y+1]
                  //拾取道具
                  this.data[x][y+1] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y+1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y+1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y+1], ()=>{
                      this.pickUp(__name, { x, y: y+1 }, 'Right')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }

            }else{
              if (callback) {
                isMoved = true;
                callback();
              }
              return;
            }

          }
          //角色
          if(_r2 == 'prop'){
            //拾取道具
            if(_r1 == 'Princess'){
              //公主无法拾取道具
              if (callback) {
                isMoved = true;
                callback();
              }
            }else{
              //拾取
              if(merged[x][y+1]!=2){
                merged[x][y+1] = 2;
                let __name = this.data[x][y+1]
                //拾取道具
                this.data[x][y+1] = this.getPrev(this.data[x][y]).curName
                this.data[x][y] = 0;
                let b2 = this.blocks[x][y+1];
                let b1 = this.blocks[x][y];
                let p = this.positions[x][y+1];
                this.blocks[x][y] = null;
                this.moveAction(b1, p, ()=> {
                  this.mergeAction(b1, b2, this.data[x][y+1], ()=>{
                    this.pickUp(__name, { x, y: y+1 }, 'Right')
                    isMoved = true;
                    callback();
                  });
                });
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }
            }
          }else{
            //角色
            if(_r1 == 'Hero'){
              //Hero先行动
              if(_r2 == 'Princess'){
                //营救公主
                if(merged[x][y+1]!=2){
                  merged[x][y+1] = 2;
                  let __name = this.data[x][y+1]
                  //拾取道具
                  this.data[x][y+1] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y+1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y+1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y+1], ()=>{
                      this.rescuePrincess(__name, { x, y: y+1 })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else if(_r2 == 'Fire'){
                //火焰陷阱
                if(merged[x][y+1]!=2){
                  merged[x][y+1] = 2;
                  let __name = this.data[x][y+1]
                  //拾取道具
                  this.data[x][y+1] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y+1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y+1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y+1], ()=>{
                      this.pickUp(__name, { x, y: y+1 }, 'Right')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                //Hero 先攻模式
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x][y+1].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x][y+1].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: this.heroPro
                }, {
                  node: this.blocks[x][y+1],
                  pos: {x, y: y+1},
                  obj: enemy
                }, 'Right', ()=>{
                  isMoved = true;
                  callback();
                })
              }
            }else if(_r1 == 'Princess'){
              if(_r2 == 'Dragon' || _r2 == 'Skull'){
                //公主先攻
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x][y+1].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x][y+1].split(',')[1])
                let _princess = this.getPrincessByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _princess
                }, {
                  node: this.blocks[x][y+1],
                  pos: {x, y: y+1},
                  obj: enemy
                }, 'Right', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Hero'){
                //营救公主
                if(merged[x][y+1]!=2){
                  merged[x][y+1] = 2;
                  let __name = this.data[x][y]
                  //拾取道具
                  this.data[x][y+1] = 'Hero'
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x][y+1];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x][y+1];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x][y+1], ()=>{
                      this.rescuePrincess(__name, { x, y: y+1 })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Fire'){
              //火焰陷阱不会主动触发
              if (callback) {
                isMoved = true;
                callback();
              }
            }else if(_r1 == 'Dragon'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //恶龙先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x][y+1].split(',')[1])
                let _dragon = this.getDragonByID(this.data[x][y].split(',')[1])

                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _dragon
                }, {
                  node: this.blocks[x][y+1],
                  pos: {x, y: y+1},
                  obj: enemy
                }, 'Right', ()=>{
                  isMoved = true;
                  callback();
                })
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Skull'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //史莱姆先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x][y+1].split(',')[1])
                let _skull = this.getSkullByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _skull
                }, {
                  node: this.blocks[x][y+1],
                  pos: {x, y: y+1},
                  obj: enemy
                }, 'Right', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Skull'){
                //合并史莱姆升级
                let skull1 = this.data[x][y]
                let skull2 = this.data[x][y+1]
                let name1 = skull1.split(',')[0]
                let name2 = skull2.split(',')[0]
                if(name1 == name2){
                  //相同属性
                  if(name1 == 'Skull16' || name2 == 'Skull16'){
                    console.log('不进行升级')
                    //已达到最高等级
                    isMoved = true;
                    callback();
                  }else{
                    //合并升级
                    let _next = ''
                    if(name1 == 'Skull2')  _next = 'Skull4'
                    if(name1 == 'Skull4')  _next = 'Skull8'
                    if(name1 == 'Skull8')  _next = 'Skull16'
                    merged[x][y+1] = 2;
                    this.data[x][y+1] = _next + ',' + skull2.split(',')[1]
                    this.data[x][y] = 0;
                    let b2 = this.blocks[x][y+1];
                    let b1 = this.blocks[x][y];
                    let p = this.positions[x][y+1];
                    this.blocks[x][y] = null;
                    this.moveAction(b1, p, ()=> {
                      this.mergeSkull(b1, b2, this.data[x][y+1], {x, y: y+1}, skull1, skull2, ()=>{
                        isMoved = true;
                        callback();
                      })
                    });
                  }
                }else{
                  //不同属性
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                }
              }else{
                //不会攻击恶龙
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }
          }
        }else{
          if (callback) {
            isMoved = true;
            callback();
          }
          return;
        }
      }
      else if (this.data[x][y+1] == this.data[x][y] && !merged[x][y+1]) {

        //判断最高等级
        if(this.data[x][y]){
          if(this.data[x][y].includes('Skull16') || this.data[x][y].includes('Princess') || this.data[x][y].includes('Dragon') || this.data[x][y].includes('Phea16') || this.data[x][y].includes('Shield16') || this.data[x][y].includes('Sword16')){
            isMoved = true;
            callback();
            return
          }
        }

        merged[x][y+1] = 1;
        this.data[x][y+1] = this.getPrev(this.data[x][y]).nextName;
        this.data[x][y] = 0;
        let b1 = this.blocks[x][y+1];
        let b = this.blocks[x][y];
        let p = this.positions[x][y+1];
        this.blocks[x][y] = null;

        this.moveAction(b, p, ()=> {
          this.mergeAction(b, b1, this.data[x][y+1], ()=>{
            isMoved = true;
            callback();
          })
        });
      }
      else if (this.data[x][y+1] == 0) {
        this.data[x][y+1] = this.data[x][y];
        this.data[x][y] = 0;
        let b = this.blocks[x][y];
        let p = this.positions[x][y+1];
        this.blocks[x][y+1] = b;
        this.blocks[x][y] = null;

        this.moveAction(b, p, ()=>{
          move(x, y+1, ()=>{
            isMoved = true;
            callback();
          });
        });
      } else {
        isMoved = true;
        callback();
      }

    };

    let total = 0;
    let counter = 0;
    let willMove = [];
    let willMoveNodes = []
    for (let y = 2; y >=0; y--) {
      for (let x = 0; x < 4; x++){
        let n = this.data[x][y];
        if (n != 0){
          total += 1;
          willMove.push({x: x, y: y});
          let _tmp = this.copy(this.blocks[x][y])
          willMoveNodes.push({
            id: _tmp.uuid,
            x: _tmp.x,
            y: _tmp.y,
          })
        }
      }
    }
    for (let i = 0; i < willMove.length; i++) {
      let x = willMove[i].x;
      let y = willMove[i].y;
      move(x, y, ()=> {
        counter += 1;
        if (counter == total) {
          // cc.log('counter: ' + counter + " total: " + total);
          this.afterMove(isMoved, willMoveNodes, 'Right');
        }
      });
    }

    if(willMove.length == 0){
      //处理未移动块
      this.afterMove(true, willMoveNodes, 'Right');
    }

  },

  /**
   * 向上移动
   */
  moveUp() {
    // 递归移动操作
    let isMoved = false;
    let merged = [];
    for (let i = 0; i < 4; i++) {
      merged.push([0,0,0,0]);
    }
    let move = (x, y, callback)=> {
      if (x == 3) {
        if (callback) {
          isMoved = true;
          callback();
        }
        return;
      }
      else if (this.data[x+1][y] != 0 && this.data[x+1][y] != this.data[x][y]) {

        let _r1 = this.isRole(x, y)
        let _r2 = this.isRole(x+1, y)
        if(_r1 != 'prop'){
          if(this.gamePro.type == 'night') {
            if(_r1 == 'Fire'){

              if(_r2 == 'prop'){
                if(merged[x+1][y]!=2){
                  merged[x+1][y] = 2;
                  let __name = this.data[x+1][y]
                  //拾取道具
                  this.data[x+1][y] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x+1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x+1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x+1][y], ()=>{
                      this.pickUp(__name, { x: x+1, y }, 'Up')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }

            }else{
              if (callback) {
                isMoved = true;
                callback();
              }
              return;
            }
          }
          //角色
          if(_r2 == 'prop'){
            //拾取道具
            if(_r1 == 'Princess'){
              //公主无法拾取道具
              if (callback) {
                isMoved = true;
                callback();
              }
            }else{
              //拾取
              if(merged[x+1][y]!=2){
                merged[x+1][y] = 2;
                let __name = this.data[x+1][y]
                //拾取道具
                this.data[x+1][y] = this.getPrev(this.data[x][y]).curName
                this.data[x][y] = 0;
                let b2 = this.blocks[x+1][y];
                let b1 = this.blocks[x][y];
                let p = this.positions[x+1][y];
                this.blocks[x][y] = null;
                this.moveAction(b1, p, ()=> {
                  this.mergeAction(b1, b2, this.data[x+1][y], ()=>{
                    this.pickUp(__name, { x: x+1, y }, 'Up')
                    isMoved = true;
                    callback();
                  });
                });
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }
            }
          }else{
            //角色
            if(_r1 == 'Hero'){
              //Hero先行动
              if(_r2 == 'Princess'){
                //营救公主
                if(merged[x+1][y]!=2){
                  merged[x+1][y] = 2;
                  let __name = this.data[x+1][y]
                  //拾取道具
                  this.data[x+1][y] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x+1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x+1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x+1][y], ()=>{
                      this.rescuePrincess(__name, { x: x+1, y })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    callback();
                  }
                  return;
                }
              }else if(_r2 == 'Fire'){
                //火焰陷阱
                if(merged[x+1][y]!=2){
                  merged[x+1][y] = 2;
                  let __name = this.data[x+1][y]
                  //拾取道具
                  this.data[x+1][y] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x+1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x+1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x+1][y], ()=>{
                      this.pickUp(__name, { x: x+1, y }, 'Up')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                //Hero 先攻模式
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x+1][y].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x+1][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: this.heroPro
                }, {
                  node: this.blocks[x+1][y],
                  pos: {x: x+1, y},
                  obj: enemy
                }, 'Up', ()=>{
                  isMoved = true;
                  callback();
                })
              }
            }else if(_r1 == 'Princess'){
              if(_r2 == 'Dragon' || _r2 == 'Skull'){
                //公主先攻
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x+1][y].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x+1][y].split(',')[1])
                let _princess = this.getPrincessByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _princess
                }, {
                  node: this.blocks[x+1][y],
                  pos: {x: x+1, y},
                  obj: enemy
                }, 'Up', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Hero'){
                //营救公主
                if(merged[x+1][y]!=2){
                  merged[x+1][y] = 2;
                  let __name = this.data[x][y]
                  //拾取道具
                  this.data[x+1][y] = 'Hero'
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x+1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x+1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x+1][y], ()=>{
                      this.rescuePrincess(__name, { x: x+1, y })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Fire'){
              //火焰陷阱不会主动触发
              if (callback) {
                isMoved = true;
                callback();
              }
            }else if(_r1 == 'Dragon'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //恶龙先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x+1][y].split(',')[1])
                let _dragon = this.getDragonByID(this.data[x][y].split(',')[1])

                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _dragon
                }, {
                  node: this.blocks[x+1][y],
                  pos: {x: x+1, y},
                  obj: enemy
                }, 'Up', ()=>{
                  isMoved = true;
                  callback();
                })
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Skull'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //史莱姆先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x+1][y].split(',')[1])
                let _skull = this.getSkullByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _skull
                }, {
                  node: this.blocks[x+1][y],
                  pos: {x: x+1, y},
                  obj: enemy
                }, 'Up', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Skull'){
                //合并史莱姆升级
                let skull1 = this.data[x][y]
                let skull2 = this.data[x+1][y]
                let name1 = skull1.split(',')[0]
                let name2 = skull2.split(',')[0]
                if(name1 == name2){
                  //相同属性
                  if(name1 == 'Skull16' || name2 == 'Skull16'){
                    console.log('不进行升级')
                    //已达到最高等级
                    isMoved = true;
                    callback();
                  }else{
                    //合并升级
                    let _next = ''
                    if(name1 == 'Skull2')  _next = 'Skull4'
                    if(name1 == 'Skull4')  _next = 'Skull8'
                    if(name1 == 'Skull8')  _next = 'Skull16'
                    merged[x+1][y] = 2;
                    this.data[x+1][y] = _next + ',' + skull2.split(',')[1]
                    this.data[x][y] = 0;
                    let b2 = this.blocks[x+1][y];
                    let b1 = this.blocks[x][y];
                    let p = this.positions[x+1][y];
                    this.blocks[x][y] = null;
                    this.moveAction(b1, p, ()=> {
                      this.mergeSkull(b1, b2, this.data[x+1][y], {x: x+1, y}, skull1, skull2, ()=>{
                        isMoved = true;
                        callback();
                      })
                    });
                  }
                }else{
                  //不同属性
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                }
              }else{
                //不会攻击恶龙
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }
          }
        }else{
          if (callback) {
            isMoved = true;
            callback();
          }
          return;
        }

      }
      else if (this.data[x+1][y] == this.data[x][y] && !merged[x+1][y]) {

        //判断最高等级
        if(this.data[x][y]){
          if(this.data[x][y].includes('Skull16') || this.data[x][y].includes('Princess') || this.data[x][y].includes('Dragon') || this.data[x][y].includes('Phea16') || this.data[x][y].includes('Shield16') || this.data[x][y].includes('Sword16')){
            isMoved = true;
            callback();
            return
          }
        }

        merged[x+1][y] = 1;
        this.data[x+1][y] = this.getPrev(this.data[x][y]).nextName;
        this.data[x][y] = 0;
        let b1 = this.blocks[x+1][y];
        let b = this.blocks[x][y];
        let p = this.positions[x+1][y];
        this.blocks[x][y] = null;
        this.moveAction(b, p, ()=> {
          this.mergeAction(b, b1, this.data[x+1][y], ()=>{
            isMoved = true;
            callback();
          })
        });
      }
      else if (this.data[x+1][y] == 0) {
        this.data[x+1][y] = this.data[x][y];
        this.data[x][y] = 0;
        let b = this.blocks[x][y];
        let p = this.positions[x+1][y];
        this.blocks[x+1][y] = b;
        this.blocks[x][y] = null;

        this.moveAction(b, p, ()=>{
          isMoved = true;
          move(x+1, y, callback);
        });
      } else {
        isMoved = true;
        callback();
      }

    };

    let total = 0;
    let counter = 0;
    let willMove = [];
    let willMoveNodes = []
    for (let x = 2; x >= 0; x--) {
      for (let y = 0; y < 4; y++){
        let n = this.data[x][y];
        if (n != 0){
          total += 1;
          willMove.push({x: x, y: y});
          let _tmp = this.copy(this.blocks[x][y])
          willMoveNodes.push({
            id: _tmp.uuid,
            x: _tmp.x,
            y: _tmp.y,
          })
        }
      }
    }
    for (let i = 0; i < willMove.length; i++) {
      let x = willMove[i].x;
      let y = willMove[i].y;
      move(x, y, ()=> {
        counter += 1;
        if (counter == total) {
          // cc.log('counter: ' + counter + " total: " + total);
          this.afterMove(isMoved, willMoveNodes, 'Up');
        }
      });
    }

    if(willMove.length == 0){
      //处理未移动块
      this.afterMove(true, willMoveNodes, 'Up');
    }

  },

  /**
   * 向下移动
   */
  moveDown() {
    // 递归移动操作
    let isMoved = true;
    let merged = [];
    for (let i = 0; i < 4; i++) {
      merged.push([0,0,0,0]);
    }
    let move = (x, y, callback)=> {
      if (x == 0) {
        if (callback) {
          isMoved = true;
          callback();
        }
        return;
      }
      else if (this.data[x-1][y] != 0 && this.data[x-1][y] != this.data[x][y]) {

        let _r1 = this.isRole(x, y)
        let _r2 = this.isRole(x-1, y)
        if(_r1 != 'prop'){
          if(this.gamePro.type == 'night') {
            if(_r1 == 'Fire'){

              if(_r2 == 'prop'){
                if(merged[x-1][y]!=2){
                  merged[x-1][y] = 2;
                  let __name = this.data[x+1][y]
                  //拾取道具
                  this.data[x-1][y] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x-1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x-1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x-1][y], ()=>{
                      this.pickUp(__name, { x: x-1, y }, 'Down')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }

            }else{
              if (callback) {
                isMoved = true;
                callback();
              }
              return;
            }
          }
          //角色
          if(_r2 == 'prop'){
            //拾取道具
            if(_r1 == 'Princess'){
              //公主无法拾取道具
              if (callback) {
                isMoved = true;
                callback();
              }
            }else{
              //拾取
              if(merged[x-1][y]!=2){
                merged[x-1][y] = 2;
                let __name = this.data[x-1][y]
                //拾取道具
                this.data[x-1][y] = this.getPrev(this.data[x][y]).curName
                this.data[x][y] = 0;
                let b2 = this.blocks[x-1][y];
                let b1 = this.blocks[x][y];
                let p = this.positions[x-1][y];
                this.blocks[x][y] = null;
                this.moveAction(b1, p, ()=> {
                  this.mergeAction(b1, b2, this.data[x-1][y], ()=>{
                    this.pickUp(__name, { x: x-1, y }, 'Down')
                    isMoved = true;
                    callback();
                  });
                });
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
                return;
              }
            }
          }else{
            //角色
            if(_r1 == 'Hero'){
              //Hero先行动
              if(_r2 == 'Princess'){
                //营救公主
                if(merged[x-1][y]!=2){
                  merged[x-1][y] = 2;
                  let __name = this.data[x-1][y]
                  //拾取道具
                  this.data[x-1][y] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x-1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x-1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x-1][y], ()=>{
                      this.rescuePrincess(__name, { x: x-1, y })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else if(_r2 == 'Fire'){
                //火焰陷阱
                if(merged[x-1][y]!=2){
                  merged[x-1][y] = 2;
                  let __name = this.data[x-1][y]
                  //拾取道具
                  this.data[x-1][y] = this.getPrev(this.data[x][y]).curName
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x-1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x-1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x-1][y], ()=>{
                      this.pickUp(__name, { x: x-1, y}, 'Down')
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                //Hero 先攻模式
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x-1][y].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x-1][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: this.heroPro
                }, {
                  node: this.blocks[x-1][y],
                  pos: {x: x-1, y},
                  obj: enemy
                }, 'Down', ()=>{
                  isMoved = true;
                  callback();
                })
              }
            }else if(_r1 == 'Princess'){
              if(_r2 == 'Dragon' || _r2 == 'Skull'){
                //公主先攻
                let enemy = {}
                if(_r2 == 'Skull')
                  enemy = this.getSkullByID(this.data[x-1][y].split(',')[1])
                if(_r2 == 'Dragon')
                  enemy = this.getDragonByID(this.data[x-1][y].split(',')[1])
                let _princess = this.getPrincessByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _princess
                }, {
                  node: this.blocks[x-1][y],
                  pos: {x: x-1, y},
                  obj: enemy
                }, 'Down', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Hero'){
                //营救公主
                if(merged[x-1][y]!=2){
                  merged[x-1][y] = 2;
                  let __name = this.data[x][y]
                  //拾取道具
                  this.data[x-1][y] = 'Hero'
                  this.data[x][y] = 0;
                  let b2 = this.blocks[x-1][y];
                  let b1 = this.blocks[x][y];
                  let p = this.positions[x-1][y];
                  this.blocks[x][y] = null;
                  this.moveAction(b1, p, ()=> {
                    this.mergeAction(b1, b2, this.data[x-1][y], ()=>{
                      this.rescuePrincess(__name, { x: x-1, y })
                      isMoved = true;
                      callback();
                    });
                  });
                }else{
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                  return;
                }
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Fire'){
              //火焰陷阱不会主动触发
              if (callback) {
                isMoved = true;
                callback();
              }
            }else if(_r1 == 'Dragon'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //恶龙先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x-1][y].split(',')[1])
                let _dragon = this.getDragonByID(this.data[x][y].split(',')[1])

                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _dragon
                }, {
                  node: this.blocks[x-1][y],
                  pos: {x: x-1, y},
                  obj: enemy
                }, 'Down', ()=>{
                  isMoved = true;
                  callback();
                })
              }else{
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }else if(_r1 == 'Skull'){
              if(_r2 == 'Princess' || _r2 == 'Hero'){
                //史莱姆先攻
                let enemy = {}
                if(_r2 == 'Hero')
                  enemy = this.heroPro
                if(_r2 == 'Princess')
                  enemy = this.getPrincessByID(this.data[x-1][y].split(',')[1])
                let _skull = this.getSkullByID(this.data[x][y].split(',')[1])
                this.fight({
                  node: this.blocks[x][y],
                  pos: {x, y},
                  obj: _skull
                }, {
                  node: this.blocks[x-1][y],
                  pos: {x: x-1, y},
                  obj: enemy
                }, 'Down', ()=>{
                  isMoved = true;
                  callback();
                })
              }else if(_r2 == 'Skull'){
                //合并史莱姆升级
                let skull1 = this.data[x][y]
                let skull2 = this.data[x-1][y]
                let name1 = skull1.split(',')[0]
                let name2 = skull2.split(',')[0]
                if(name1 == name2){
                  //相同属性
                  if(name1 == 'Skull16' || name2 == 'Skull16'){
                    console.log('不进行升级')
                    //已达到最高等级
                    isMoved = true;
                    callback();
                  }else{
                    //合并升级
                    let _next = ''
                    if(name1 == 'Skull2')  _next = 'Skull4'
                    if(name1 == 'Skull4')  _next = 'Skull8'
                    if(name1 == 'Skull8')  _next = 'Skull16'
                    merged[x-1][y] = 2;
                    this.data[x-1][y] = _next + ',' + skull2.split(',')[1]
                    this.data[x][y] = 0;
                    let b2 = this.blocks[x-1][y];
                    let b1 = this.blocks[x][y];
                    let p = this.positions[x-1][y];
                    this.blocks[x][y] = null;
                    this.moveAction(b1, p, ()=> {
                      this.mergeSkull(b1, b2, this.data[x-1][y], {x: x-1, y}, skull1, skull2, ()=>{
                        isMoved = true;
                        callback();
                      })
                    });
                  }
                }else{
                  //不同属性
                  if (callback) {
                    isMoved = true;
                    callback();
                  }
                }
              }else{
                //不会攻击恶龙
                if (callback) {
                  isMoved = true;
                  callback();
                }
              }
            }
          }
        }else{
          if (callback) {
            isMoved = true;
            callback();
          }
          return;
        }

      }
      else if (this.data[x-1][y] == this.data[x][y] && !merged[x-1][y]) {

        //判断最高等级
        if(this.data[x][y]){
          if(this.data[x][y].includes('Skull16') || this.data[x][y].includes('Princess') || this.data[x][y].includes('Dragon') || this.data[x][y].includes('Phea16') || this.data[x][y].includes('Shield16') || this.data[x][y].includes('Sword16')){
            isMoved = true;
            callback();
            return
          }
        }

        merged[x-1][y] = 1;
        this.data[x-1][y] = this.getPrev(this.data[x][y]).nextName;
        this.data[x][y] = 0;
        let b1 = this.blocks[x-1][y];
        let b = this.blocks[x][y];
        let p = this.positions[x-1][y];
        this.blocks[x][y] = null;
        this.moveAction(b, p, ()=> {
          this.mergeAction(b, b1, this.data[x-1][y], ()=>{
            isMoved = true;
            callback();
          })
        });
      }
      else if (this.data[x-1][y] == 0) {
        this.data[x-1][y] = this.data[x][y];
        this.data[x][y] = 0;
        let b = this.blocks[x][y];
        let p = this.positions[x-1][y];
        this.blocks[x-1][y] = b;
        this.blocks[x][y] = null;

        this.moveAction(b, p, ()=>{
          isMoved = true;
          move(x-1, y, callback);
        });
      } else {
        isMoved = true;
        callback();
      }

    };

    let total = 0;
    let counter = 0;
    let willMove = [];
    let willMoveNodes = []
    for (let x = 1; x < 4; x++) {
      for (let y = 0; y < 4; y++){
        let n = this.data[x][y];
        if (n != 0){
          total += 1;
          willMove.push({x: x, y: y});
          let _tmp = this.copy(this.blocks[x][y])
          willMoveNodes.push({
            id: _tmp.uuid,
            x: _tmp.x,
            y: _tmp.y,
          })
        }
      }
    }
    for (let i = 0; i < willMove.length; i++) {
      let x = willMove[i].x;
      let y = willMove[i].y;
      move(x, y, ()=> {
        counter += 1;
        if (counter == total) {
          // cc.log('counter: ' + counter + " total: " + total);
          this.afterMove(isMoved, willMoveNodes, 'Down');
        }
      });
    }

    if(willMove.length == 0){
      //处理未移动块
      this.afterMove(true, willMoveNodes, 'Down');
    }

  },

});
