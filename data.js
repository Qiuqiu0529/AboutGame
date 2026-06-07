const STORAGE_KEY = "game-design-article-library";

const defaultArticles =[
  {
    "id": "a-mpu0t8uv-zb4vnj",
    "title": "分支剧情创作中的挑战和工具",
    "url": "https://indienova.com/indie-game-development/tools-for-branching-dialogs-and-narrative/",
    "category": "叙事",
    "tags": [
      "工具"
    ],
    "rating": 9
  },
  {
    "id": "a-mpu0rj2o-mesb1u",
    "title": "Technical Tools for Authoring Branching Dialogue",
    "url": "https://www.gdcvault.com/play/1025962/Technical-Tools-for-Authoring-Branching",
    "category": "叙事",
    "tags": [
      "工具"
    ],
    "rating": 8
  },
  {
    "id": "a-mpu0ohrp-nfu2os",
    "title": "How to Create Great Characters: Depth, Emotion and Player Agency",
    "url": "https://www.gdcvault.com/play/1025156/How-to-Create-Great-Characters",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 8
  },
  {
    "id": "a-mpu0mkze-aejieq",
    "title": "TGDC | 《天涯明月刀》IP总架构师顾婷婷：人设是内容生命力的源泉",
    "url": "http://www.gamelook.com.cn/2020/12/407137/",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 9
  },
  {
    "id": "a-mpu0l82k-149lc2",
    "title": "如何让你的游戏拥有吸引力的人设？",
    "url": "https://gameinstitute.qq.com/knowledge/100064",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 9
  },
  {
    "id": "a-mpu0ic1j-5ioi7a",
    "title": "游戏基础知识——将角色塑造得“真实”、“立体”的几个手法",
    "url": "https://mp.weixin.qq.com/s/HEzATPGreSkNGhKPnW2CKA",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 8
  },
  {
    "id": "a-mpu08491-hkqr6i",
    "title": "GDC Vault - Designing Relationships: How to Make Compelling RPG Companions",
    "url": "https://gdcvault.com/play/1035527/Designing-Relationships-How-to-Make",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 9
  },
  {
    "id": "a-mpu04bwg-dx22ky",
    "title": "从《十三机兵防卫圈》看游戏的群像叙事设计",
    "url": "https://zhuanlan.zhihu.com/p/494538812",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 8
  },
  {
    "id": "a-mpu03eie-bv8zxk",
    "title": "从《原神》看米哈游的人设方法论",
    "url": "https://mp.weixin.qq.com/s/m49Xdm5guFAigsisTAJcKA",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 7
  },
  {
    "id": "a-mpu02x78-svf2lj",
    "title": "游戏基础知识——“情绪波动对人物影响”的设计手法",
    "url": "https://mp.weixin.qq.com/s?__biz=MjM5NTMxNTU0MQ==&mid=2649957863&idx=3&sn=ec8eb97994bc746bfadf3764c4768904&scene=21&poc_token=HBxjHGqjXrfCZFLBUW9zbQeoR4_C-aZYrrKNBqcR",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 8
  },
  {
    "id": "a-mpu02dj5-ikk2yf",
    "title": "游戏叙事研究：英雄之旅角色原型理论",
    "url": "https://zhuanlan.zhihu.com/p/591901225",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 9
  },
  {
    "id": "a-mpu00fue-d83z5q",
    "title": "角色设定这件事，是否有固定套路？",
    "url": "https://mp.weixin.qq.com/s/2TWoIhG6GVSI93R3Uvq3tw",
    "category": "叙事",
    "tags": [
      "角色"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzwf4z-9qvind",
    "title": "如何让游戏更真实？六个方式打造世界观",
    "url": "http://www.gamelook.com.cn/2020/03/382391/",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzu7gt-zajh2u",
    "title": "玩家选择的价值：游戏世界观中的阵营设计",
    "url": "https://www.gameres.com/894427.html",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 9
  },
  {
    "id": "a-mptzqvgt-wkfg1j",
    "title": "题材设计探索——演化的世界观",
    "url": "https://zhuanlan.zhihu.com/p/598786608",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzq8uf-e8sqs6",
    "title": "游戏说的“世界观”究竟是什么？我们在架构什么？",
    "url": "https://zhuanlan.zhihu.com/p/604475050",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzphe9-uhszsp",
    "title": "策划必修课(2)：游戏世界观的设计",
    "url": "https://www.163.com/dy/article/GI5GRL400526DPBA.html",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzp7dn-e4p3fl",
    "title": "说来容易，但一部游戏该如何构建世界观并实现细节？ | 机核 GCORES",
    "url": "https://www.gcores.com/articles/112204",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 9
  },
  {
    "id": "a-mptzmwq1-2y3c6i",
    "title": "从抽象概念出发的游戏世界观搭建",
    "url": "https://zhuanlan.zhihu.com/p/612442911",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 10
  },
  {
    "id": "a-mptzje92-cgsrkm",
    "title": "天美世界观策划：情绪，以“线”牵引",
    "url": "https://baijiahao.baidu.com/s?id=1754689703393622753&wfr=spider&for=pc",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mptzi24j-qtgxqy",
    "title": "天美世界观策划：构思，从“点”开始",
    "url": "https://www.gameres.com/898486.html",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzgw15-4v6e0p",
    "title": "半盏清茶煮春秋  剧情设计方法",
    "url": "https://www.zhihu.com/people/banzhanqingcha/posts",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3m8uwm-ycfv5b",
    "title": "席德.梅尔：你所知道的一切都是错的",
    "url": "https://xvm.garphy.com/?p=17258",
    "category": "设计理论",
    "tags": [
      "情感设计"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3m79n5-4uunux",
    "title": "沉浸式游戏交互设计(上)：心流体验和沉浸感",
    "url": "https://www.gameres.com/868479.html",
    "category": "设计理论",
    "tags": [
      "情感设计"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3m4o3u-drxzk3",
    "title": "Flow in Games",
    "url": "https://www.jenovachen.com/flowingames/Flow_in_games_final.pdf",
    "category": "设计理论",
    "tags": [
      "情感设计"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3m2l9f-mphdnl",
    "title": "关卡策划成长之路：照猫画虎、移花接木、触景生情",
    "url": "https://www.gameres.com/687010.html",
    "category": "设计理论",
    "tags": [
      "成长"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3m1hbi-e58dgr",
    "title": "游戏设计如何给玩家带来情感体验",
    "url": "https://www.gameres.com/814327.html",
    "category": "设计理论",
    "tags": [
      "故事",
      "情感设计"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3lzq2m-earsb9",
    "title": "力量、敏捷与智力：一种跨越游戏类型的玩法思考框架【GDC精选】",
    "url": "https://www.bilibili.com/video/BV1TCraBBEHY/",
    "category": "设计理论",
    "tags": [],
    "rating": 8
  },
  {
    "id": "a-mq3lyszc-ez8wkp",
    "title": "MDA 框架：一种游戏设计和游戏研究的形式化方法 MDA: A Formal Approach to Game Design and Game Research (2004)",
    "url": "https://zhuanlan.zhihu.com/p/575977333",
    "category": "设计理论",
    "tags": [],
    "rating": 10
  },
  {
    "id": "a-mq3ly6mc-uxzqja",
    "title": "译介丨樱井政博：产生和提高游戏的乐趣的规律是？（2017）",
    "url": "https://www.gcores.com/articles/157456",
    "category": "设计理论",
    "tags": [],
    "rating": 10
  },
  {
    "id": "a-mq3luno3-pbmdkq",
    "title": "游戏设计必备逻辑思路：玩家、体验、设计三种不同目标和GMT理论",
    "url": "https://zhuanlan.zhihu.com/p/329912608",
    "category": "设计理论",
    "tags": [
      "理性游戏"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3ltoe3-r2fzsz",
    "title": "理性游戏设计应用指南，理解“原子参数”的运作机制和影响！ - GameRes游资网",
    "url": "https://www.gameres.com/884997.html",
    "category": "设计理论",
    "tags": [
      "理性游戏"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3lltkj-drdxhp",
    "title": "4 layers narrative design approach",
    "url": "https://frictionalgames.blogspot.com/2014/04/4-layers-narrative-design-approach.html",
    "category": "叙事",
    "tags": [
      "叙事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3lkuml-ydrbi7",
    "title": "创作出10年后还被人津津乐道故事的方法论：如何创造出奇妙且独特的世界观？",
    "url": "https://zhuanlan.zhihu.com/p/340061961",
    "category": "叙事",
    "tags": [
      "世界观"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3ljsvf-fv4ivp",
    "title": "理性与感性的碰撞-解析游戏叙事的概念、价值与方法",
    "url": "https://gameinstitute.qq.com/knowledge/100136",
    "category": "叙事",
    "tags": [
      "叙事"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3lidzr-oboop5",
    "title": "广义女性向游戏叙事构建：深度解析市场趋势与女性主义思潮发展",
    "url": "https://zhuanlan.zhihu.com/p/468858331",
    "category": "叙事",
    "tags": [
      "女性向"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3lgqtb-zgz74f",
    "title": "中国的城市叙事，以及游戏中的世界幻想",
    "url": "https://mp.weixin.qq.com/s/bMw0HELFGfXYbZIuF-UWGQ",
    "category": "叙事",
    "tags": [
      "环境叙事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3lfvqr-usfa87",
    "title": "如何调整游戏内事件的叙事分量？",
    "url": "https://www.gameres.com/898438.html",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3lfj4g-ijr4uk",
    "title": "浅谈游戏中的互动叙事",
    "url": "https://www.gameres.com/898561.html",
    "category": "叙事",
    "tags": [
      "对话"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3ldwn6-lmbi0q",
    "title": "后启示录题材的叙事设计",
    "url": "https://zhuanlan.zhihu.com/p/540985908",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3lczkc-yhx6nc",
    "title": "万字长文详解：游戏叙事结构和任务编排设计",
    "url": "https://cloud.tencent.com/developer/article/1966459",
    "category": "叙事",
    "tags": [
      "任务设计",
      "叙事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3lc8c4-r6yoab",
    "title": "叙事学六大基本问题的发展与应用",
    "url": "https://www.jianshu.com/p/dc7719639d50",
    "category": "叙事",
    "tags": [
      "叙事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3laxya-bnumlp",
    "title": "电子游戏的拟剧论：戏剧、故事和共情",
    "url": "https://indienova.com/indie-game-development/gdc-the-dramaturgy-of-video-games-theatre-story-and-empathy/",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3l9z7g-x307wm",
    "title": "从线性到非线性叙事的改造方法",
    "url": "https://zhuanlan.zhihu.com/p/592284595",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3l97k8-22illr",
    "title": "游戏的叙事：如何创造文学与电影无法替代的体验？",
    "url": "https://www.gameres.com/869277.html",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3l8awu-414eg1",
    "title": "如何才能写好“碎片化叙事”游戏策划案？",
    "url": "https://www.gameres.com/853097.html",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 7
  },
  {
    "id": "a-mq3l78gv-ebkfh5",
    "title": "“忘记环境叙事吧！”开发者谈游戏叙事设计的7个步骤",
    "url": "https://www.gameres.com/859797.html",
    "category": "叙事",
    "tags": [
      "叙事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3l6nex-pgfnk0",
    "title": "资深开发者分享：游戏如何讲好故事、有哪些套路和工具可以用？",
    "url": "http://www.gamelook.com.cn/2023/07/522568/",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3l5t0z-l5y0e6",
    "title": "译介丨给游戏研究的叙事学(2023)",
    "url": "https://www.gcores.com/articles/168243",
    "category": "叙事",
    "tags": [
      "叙事"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3l566g-rj5f6c",
    "title": "TGDC | 腾讯互娱魔方工作室群游戏主策划张樊钧：创造玩家故事",
    "url": "http://www.gamelook.com.cn/2021/11/461692/",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3l4g0j-hk1i7k",
    "title": "“丢掉脑子”做叙事——探索另类的叙事体验",
    "url": "https://zhuanlan.zhihu.com/p/506166923",
    "category": "叙事",
    "tags": [
      "情感设计"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3l3npd-tlwgw8",
    "title": "GUI是如何帮助游戏进行叙事的？",
    "url": "https://www.gameres.com/887215.html",
    "category": "叙事",
    "tags": [
      "叙事",
      "UI"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3l2a11-00c838",
    "title": "一墙之隔：银幕、Metagame与虚拟世界",
    "url": "https://zhuanlan.zhihu.com/p/634145476",
    "category": "叙事",
    "tags": [
      "meta"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3l1jjo-zsuyi5",
    "title": "抓住在电影院疯跑的熊孩子 ——开放世界游戏的剧本怎么写？",
    "url": "https://zhuanlan.zhihu.com/p/494582993",
    "category": "叙事",
    "tags": [
      "故事",
      "开放世界"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3kpd97-0xmfov",
    "title": "浅析游戏设计中的叙事失调：认知合理性的两端 | 机核 GCORES",
    "url": "https://www.gcores.com/articles/153815",
    "category": "叙事",
    "tags": [
      "叙事"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3kkt4v-8u22z6",
    "title": "Creating an Emotional Rollercoaster in HEAVY RAIN",
    "url": "https://www.gdcvault.com/play/1014674/Creating-an-Emotional-Rollercoaster-in",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3kke40-zwbdm8",
    "title": "结合电影叙事经验，为游戏打造引人入胜的故事",
    "url": "https://gameinstitute.qq.com/knowledge/100088",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3kjlg4-fuyclb",
    "title": "互动叙事游戏解构与体验评估",
    "url": "https://zhuanlan.zhihu.com/p/597978685",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3khrel-f7s1gm",
    "title": "IP建设：角色设计与世界观构建",
    "url": "https://gameinstitute.qq.com/knowledge/100141",
    "category": "叙事",
    "tags": [
      "角色",
      "世界观",
      "IP"
    ],
    "rating": 8
  },
  {
    "id": "a-mq3kgudb-1jivt8",
    "title": "游戏情感设计",
    "url": "https://baike.baidu.com/item/%E6%B8%B8%E6%88%8F%E6%83%85%E6%84%9F%E8%AE%BE%E8%AE%A1/11040196",
    "category": "叙事",
    "tags": [
      "情感设计"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3kfskl-wp7d5y",
    "title": "如何触达玩家的内心？谈游戏的情感设计",
    "url": "https://gameinstitute.qq.com/knowledge/100023",
    "category": "叙事",
    "tags": [
      "情感设计"
    ],
    "rating": 9
  },
  {
    "id": "a-mq3k31vb-47rr8e",
    "title": "重构漫画",
    "url": "https://baike.baidu.com/item/%E4%B8%96%E7%95%8C%E5%8A%A8%E6%BC%AB%E7%BB%8F%E5%85%B8%E6%95%99%E7%A8%8B%C2%B7%E9%87%8D%E6%9E%84%E6%BC%AB%E7%94%BB%EF%BC%9A%E4%BE%9D%E9%9D%A0%E6%83%B3%E8%B1%A1%E5%8A%9B%E5%92%8C%E6%8A%80%E6%9C%AF%E9%87%8D%E6%96%B0%E6%9E%84%E5%BB%BA%E4%B8%80%E7%A7%8D%E8%89%BA%E6%9C%AF%E5%BD%A2%E5%BC%8F/6798932?fromtitle=%E9%87%8D%E6%9E%84%E6%BC%AB%E7%94%BB&fromid=7183780",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3k2s0b-easet1",
    "title": "理解漫画",
    "url": "https://baike.baidu.com/item/%E4%B8%96%E7%95%8C%E5%8A%A8%E6%BC%AB%E7%BB%8F%E5%85%B8%E6%95%99%E7%A8%8B%EF%BC%9A%E7%90%86%E8%A7%A3%E6%BC%AB%E7%94%BB/3224602?fromtitle=%E7%90%86%E8%A7%A3%E6%BC%AB%E7%94%BB&fromid=10953787",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 10
  },
  {
    "id": "a-mq3k2bds-bykxp6",
    "title": "制造漫画",
    "url": "https://baike.baidu.com/item/%E5%88%B6%E9%80%A0%E6%BC%AB%E7%94%BB/10953924",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 10
  },
  {
    "id": "a-mptzgg0g-uuc9qv",
    "title": "如何让游戏讲一个好故事？",
    "url": "https://gameinstitute.qq.com/knowledge/100062",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 10
  },
  {
    "id": "a-mptzf8gq-ojwx9n",
    "title": "故事设计：撑起结构的七大支柱",
    "url": "https://mp.weixin.qq.com/s?__biz=MzAwNjAyMzczNQ==&mid=2650994627&idx=1&sn=c56627df4876e0d107bba8f6af5e4997&chksm=80e5e89bb792618dbabfbbc2d6052dea346f33a0de2b078c54fe634b08b0e949dc54a2b07c34&mpshare=1&scene=1&srcid=1208YRawW9h4FSZ2On5qcu9T&sharer_sharetime=1607399090140&sharer_shareid=76523d1e98da3b871114b903472cd101&version=3.0.36.2201&platform=win#rd",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mptzegwg-fy0wuw",
    "title": "游戏剧情总监分享：如何在开放世界游戏里讲连贯的故事？",
    "url": "https://mp.weixin.qq.com/s/O2LVMqW4wg2rkl8sXkAWjg",
    "category": "叙事",
    "tags": [
      "故事",
      "开放世界"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzdq0y-dynaqg",
    "title": "开发者分享：如何创作和处理游戏剧情中的戏剧性冲突？",
    "url": "https://mp.weixin.qq.com/s/yi2GJTHVeR_oWTHspqtLQQ",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mptzccgy-zkow5w",
    "title": "六大技巧教你写好游戏剧情",
    "url": "https://mp.weixin.qq.com/s/cPS0CypmXqWyfVJUmJE48g",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 7
  },
  {
    "id": "a-mptzb1jd-mgk4ex",
    "title": "游戏基础知识：快速设计游戏剧情的方法",
    "url": "https://www.gameres.com/897737.html",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mptza4fp-xigkcp",
    "title": "文案策划必修课(3)：游戏情节的塑造",
    "url": "https://mp.weixin.qq.com/s/bTZKnQzBXVeHs4J_-zOS-w",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mptz8jqf-yimk2u",
    "title": "文案策划必修课(1)：从零开始的游戏剧情创作",
    "url": "https://www.163.com/dy/article/GHJFKBGU0526DPBA.html",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mptz81sk-69qmve",
    "title": "故事结构研究汇总：十一种剧情故事结构&理论介绍和总结",
    "url": "https://zhuanlan.zhihu.com/p/38122523",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mptz79y3-rd50ap",
    "title": "游戏叙事设计：游戏故事主题设计探讨-50个故事主题设计汇总",
    "url": "https://mp.weixin.qq.com/s/fYu05Q7JSrDfa0pynx4irA",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 9
  },
  {
    "id": "a-mptz63h4-29m5a0",
    "title": "美国优秀剧本中的“叙事环”结构",
    "url": "https://zhuanlan.zhihu.com/p/605175044",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 8
  },
  {
    "id": "a-mptz5ehr-puu2y9",
    "title": "开发者分享：为何玩家讨厌你的游戏剧情？来看看五大原因中了几条",
    "url": "http://www.gamelook.com.cn/2023/05/519120/",
    "category": "叙事",
    "tags": [
      "故事",
      "角色"
    ],
    "rating": 8
  },
  {
    "id": "a-mptyjfce-nape7j",
    "title": "研发设计策划聊高分游戏剧情设计：表剧情是饵，里剧情是食",
    "url": "https://youxituoluo.com/530729.html",
    "category": "叙事",
    "tags": [
      "故事"
    ],
    "rating": 7
  },
  {
    "id": "a-mpws57a8-fia8wl",
    "title": "以眼说话",
    "url": "https://baike.baidu.com/item/%E4%BB%A5%E7%9C%BC%E8%AF%B4%E8%AF%9D/9364429",
    "category": "叙事",
    "tags": [
      "镜头"
    ],
    "rating": 10
  },
  {
    "id": "a-mpws3n93-x55r78",
    "title": "Ultimate Guide to Camera Movement — Every Camera Movement Technique Explained [The Shot List Ep6]",
    "url": "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=19s",
    "category": "叙事",
    "tags": [
      "镜头"
    ],
    "rating": 10
  },
  {
    "id": "a-mpws1ma0-5ewemf",
    "title": "游戏电影学研究：通过蒙太奇技法压缩游戏中时间的12个叙事技巧",
    "url": "https://zhuanlan.zhihu.com/p/639779239",
    "category": "叙事",
    "tags": [
      "工具",
      "镜头"
    ],
    "rating": 8
  },
  {
    "id": "a-mpws0ffa-urtw77",
    "title": "Procedural Generation of Cinematic Dialogues in 'Assassin's Creed Odyssey'",
    "url": "https://www.youtube.com/watch?v=DFM5zbekZ7c",
    "category": "叙事",
    "tags": [
      "工具",
      "叙事解析",
      "PCG"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwrxd08-zn3kd6",
    "title": "如何让玩家拥有独一无二的故事体验？浅谈程序化生成叙事",
    "url": "https://www.gameres.com/884806.html",
    "category": "叙事",
    "tags": [
      "PCG"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwrv72t-vavxp4",
    "title": "程序生成叙事是不是旁门左道？",
    "url": "https://mp.weixin.qq.com/s/F4Biw5MUuJt4oRQSNE95Ow",
    "category": "叙事",
    "tags": [
      "PCG"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwrues2-0m346v",
    "title": "基于大数据的语言模型与程序化叙事生成（下）",
    "url": "https://www.gcores.com/articles/161185",
    "category": "叙事",
    "tags": [
      "大模型",
      "PCG"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwrtxjv-o6eapp",
    "title": "基于大数据的语言模型与程序化叙事生成（上）",
    "url": "https://www.gcores.com/articles/160270",
    "category": "叙事",
    "tags": [
      "大模型",
      "PCG"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwrt12v-23tkpn",
    "title": "AI+多剧情游戏，能让玩家拥有更多选择吗？",
    "url": "https://mp.weixin.qq.com/s/KA435-RhIwQe-1_IAAiddw",
    "category": "叙事",
    "tags": [
      "大模型",
      "PCG"
    ],
    "rating": 7
  },
  {
    "id": "a-mpwrrgnm-mbwecb",
    "title": "Game AI Summit: Multiagent Planning for Large-Scale Narrative Content",
    "url": "https://gdcvault.com/play/1035557/Game-AI-Summit-Multiagent-Planning",
    "category": "叙事",
    "tags": [
      "大模型",
      "工具",
      "叙事解析",
      "PCG"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwrng1k-wfj5zr",
    "title": "环境叙事实践：共创世界之旅",
    "url": "https://www.gameres.com/893995.html",
    "category": "叙事",
    "tags": [
      "环境叙事",
      "世界观"
    ],
    "rating": 9
  },
  {
    "id": "a-mpwrlucp-wrmrx3",
    "title": "拆解经典游戏，玩转剧情与玩法的融合设计",
    "url": "https://gameinstitute.qq.com/article/10038",
    "category": "叙事",
    "tags": [
      "故事",
      "玩法"
    ],
    "rating": 10
  },
  {
    "id": "a-mpwrk78i-5ffmlz",
    "title": "环境叙事设计——创造不孤独的沉浸世界",
    "url": "https://zhuanlan.zhihu.com/p/360723508",
    "category": "叙事",
    "tags": [
      "环境叙事"
    ],
    "rating": 10
  },
  {
    "id": "a-mpwrh67i-11t54p",
    "title": "Design vs. Story: How 'Uncharted: The Lost Legacy' Addressed the Elephant in the Room",
    "url": "https://gdcvault.com/play/1025652/Design-vs-Story-How-Uncharted",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwrbr5n-jw59e8",
    "title": "Emergent Storytelling Techniques in 'The Sims'",
    "url": "https://www.gdcvault.com/play/1025112/Emergent-Storytelling-Techniques-in-The",
    "category": "叙事",
    "tags": [
      "叙事解析",
      "涌现"
    ],
    "rating": 9
  },
  {
    "id": "a-mpwr9trv-txx1rh",
    "title": "天刀手游上线 | 波澜壮阔，草蛇灰线，讲了五年多的江湖故事如何创作",
    "url": "https://gameinstitute.qq.com/knowledge/100089",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwr6t7g-5ufvvz",
    "title": "Words to Worlds: Exploring Narrative Writing in AAA Games",
    "url": "https://toronto.ubisoft.com/words-to-worlds-exploring-narrative-writing-in-aaa-games-at-gdc-2023/",
    "category": "叙事",
    "tags": [
      "开放世界",
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwqs4if-0uawem",
    "title": "FPP, Storytelling, and Player-as-an-Actor: Interactive Scenes in 'Cyberpunk 2077'",
    "url": "https://gdcvault.com/play/1027889/FPP-Storytelling-and-Player-as",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwqpucx-95qfjk",
    "title": "《巫师3》剧情解构：如何在任务驱动的剧情框架下打动玩家？",
    "url": "https://game.xiaomi.com/viewpoint/1393220466_1682218785616_100",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwqmp51-nutrhr",
    "title": "浅析《最后生还者2》叙事技法及可能的问题",
    "url": "https://mp.weixin.qq.com/s/Wsl1ROh_dtD-1YLnobl0zQ",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 7
  },
  {
    "id": "a-mpwqljpr-34mue1",
    "title": "从《艾迪芬奇的记忆》看游戏中的混合式叙事",
    "url": "https://zhuanlan.zhihu.com/p/468866929",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwqi93z-28euu1",
    "title": "'Disco Elysium': Meaningless Choices and Impractical Advice",
    "url": "https://gdcvault.com/play/1027160/-Disco-Elysium-Meaningless-Choices",
    "category": "叙事",
    "tags": [
      "对话",
      "极乐迪斯科",
      "叙事解析"
    ],
    "rating": 9
  },
  {
    "id": "a-mpwqfb89-q9v2r4",
    "title": "《Detroit：Become Human》玩家情感故事背后的叙事魔法和体验设计 - GameRes游资网",
    "url": "https://www.gameres.com/861121.html",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwqef2y-rboxxf",
    "title": "深度分析《零世代》剧情设计：环境叙事增强了游戏的“孤独感”",
    "url": "https://www.gameres.com/853547.html",
    "category": "叙事",
    "tags": [
      "环境叙事",
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwqd7ew-qgqd9t",
    "title": "最美游戏《奥日》团队分享：如何视觉叙事、将剧情与关卡无缝融合？ | 游戏大观 | GameLook.com.cn",
    "url": "http://www.gamelook.com.cn/2022/03/475380/",
    "category": "叙事",
    "tags": [
      "关卡",
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwqa6ne-ezzzqa",
    "title": "深入探究Mutazione的叙事设计和“多重选择”",
    "url": "https://www.gameres.com/861199.html",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 7
  },
  {
    "id": "a-mpwq9alp-qu0tx7",
    "title": "游戏中的空间驱动时间与《Edith Finch》叙事艺术",
    "url": "https://zhuanlan.zhihu.com/p/29824451",
    "category": "叙事",
    "tags": [
      "叙事解析"
    ],
    "rating": 8
  },
  {
    "id": "a-mpwq6uvb-ck585p",
    "title": "《极乐迪斯科》剧情系统设计拆解",
    "url": "https://zhuanlan.zhihu.com/p/709336823",
    "category": "叙事",
    "tags": [
      "极乐迪斯科",
      "叙事解析"
    ],
    "rating": 9
  }
];

function readLibrary() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    writeLibrary(defaultArticles);
    return [...defaultArticles];
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const merged = mergeArticles(defaultArticles, parsed);
      writeLibrary(merged);
      return merged;
    }
  } catch (error) {
    console.warn("Failed to parse article library.", error);
  }

  writeLibrary(defaultArticles);
  return [...defaultArticles];
}

function mergeArticles(sourceArticles, savedArticles) {
  const merged = new Map();
  sourceArticles.forEach((article) => merged.set(article.id || article.url, article));
  savedArticles.forEach((article) => merged.set(article.id || article.url, article));
  return [...merged.values()];
}

function writeLibrary(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

function getCategories(articles = readLibrary()) {
  return [...new Set(articles.map((article) => article.category).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-Hans-CN")
  );
}

function getTags(articles = readLibrary()) {
  return [...new Set(articles.flatMap((article) => article.tags || []).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-Hans-CN")
  );
}

function createArticleId() {
  return `a-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
