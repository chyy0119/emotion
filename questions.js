const questions = [
    {
        id: 1,
        type: 'initial',
        scenario: "Ta：今天去吃了一家超好吃的烤肉店！那个牛舌绝了！😋",
        message: "今天去吃了一家超好吃的烤肉店！那个牛舌绝了！😋",
        options: [
            { text: "哇！流口水，快把定位丢给我，我已经饿了！", scores: { E: 2, S: 2, T: 0, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "在哪条路上？是单点还是自助？你感觉性价比如何？", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我上周在老街吃的那家才叫一绝，下次我带你去见识见识什么叫正宗。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "不错。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 2,
        type: 'routine',
        scenario: "Ta：刚刚发现我喜欢的歌手发新专辑了！太期待了！🎶",
        message: "刚刚发现我喜欢的歌手发新专辑了！太期待了！🎶",
        options: [
            { text: "快分享给我，我听听！", scores: { E: 2, S: 2, T: 0, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "我看这次的整体评分挺高，换制作团队了吧。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "他居然出新歌了？但我最近其实更迷电子乐和摇滚，他以前那几首还行。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "so？ ", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 3,
        type: 'routine',
        scenario: "Ta：今天在路上看到一只特别可爱的柯基，屁股一扭一扭的！🐶",
        message: "今天在路上看到一只特别可爱的柯基，屁股一扭一扭的！🐶",
        options: [
            { text: "拍照片或者视频了吗？给我看看。", scores: { E: 2, S: 2, T: 0, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "柯基智商在犬类里算高的，不过服从性因狗而异，而且据说掉毛挺厉害。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "柯基是挺萌，但我个人还是更偏爱猫咪，总觉得猫更懂成年人的边界感。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "狗都一个样。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 4,
        type: 'routine',
        scenario: "Ta：周末要不要一起打游戏？🎮",
        message: "周末要不要一起打游戏？🎮",
        options: [
            { text: "来来来！你随时呼唤我随时上线，我的本命英雄已经饥渴难耐了！", scores: { E: 2, S: 2, T: 0, D: 0 }, reciprocity: 'high', supportType: 'practical', attachment: 'secure', disclosure: 'medium' },
            { text: "什么游戏？", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我最近都在玩别的。", scores: { E: -1, S: -1, T: 0, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "没兴趣。", scores: { E: -1, S: -1, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 5,
        type: 'routine',
        scenario: "Ta：太不容易了，今天终于把那个死磕了半个月的项目做完了！🎉",
        message: "太不容易了，今天终于把那个死磕了半个月的项目做完了！🎉",
        options: [
            { text: "牛啊！！这半个月看你熬得整个人都瘦了，今晚必须吃顿好的狠狠庆祝一下！", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "太好了，这次是提前完成还是按时交付的？后续的复盘和结项报告需要你主笔吗？", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我最近也快被我们公司的傻逼KPI忙疯了，真羡慕你已经解脱了。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "做完就好，职场上很多项目就是这样，付出了精力能顺利落地就行。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 6,
        type: 'routine',
        scenario: "Ta：刚才出门居然看到天上有超级大的一道彩虹！🌈",
        message: "刚才出门居然看到天上有超级大的一道彩虹！🌈",
        options: [
            { text: "哇！你拍下来了吗？听说看到彩虹的人都会交好运！", scores: { E: 2, S: 2, T: 0, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "今天刚好是阵雨过后转晴，空气湿度和光线折射角度正合适，确实容易形成地形彩虹。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我这边今天全是阴天和暴雨，别说彩虹了，出门鞋子都湿透了，太烦了。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "彩虹啊，说明今天空气质量还不错。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 7,
        type: 'routine',
        scenario: "Ta：我今天买了一件衣服，感觉有点超出我平时的风格，不知道合不合适。👕",
        message: "我今天买了一件衣服，感觉有点超出我平时的风格，不知道合不合适。👕",
        options: [
            { text: "是吗？拍给我看看！肯定很好看！", scores: { E: 2, S: 2, T: 0, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "如果是网购，不合适随时退掉。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我也经常买那种挂着好看但买回家就吃灰的衣服。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "买都买了就先穿着试几天吧，衣服这东西也就是个日常消耗品。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 8,
        type: 'routine',
        scenario: "Ta：刷到一部感觉很小众但评价很高的悬疑片，突然很想看。🎬",
        message: "刷到一部感觉很小众但评价很高的悬疑片，突然很想看。🎬",
        options: [
            { text: "叫什么名字？你今晚有空吗，我们要不要一起看？", scores: { E: 2, S: 2, T: 0, D: 1 }, reciprocity: 'high', supportType: 'practical', attachment: 'secure', disclosure: 'medium' },
            { text: "你先看看是哪个导演拍的，豆瓣评分是多少，免得被一些虚高营销骗了。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "小众悬疑片啊……我个人更喜欢节奏快一点的好莱坞商业大片，看恐怖小众的总觉得压抑。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "现在很多所谓的\"小众高分\"其实都有特定受众，如果你喜欢这种类型可以去看看。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 9,
        type: 'routine',
        scenario: "Ta：今天下班路上，耳机里随机播到了高中时最爱听的那首歌，突然好怀念以前啊。🍃",
        message: "今天下班路上，耳机里随机播到了高中时最爱听的那首歌，突然好怀念以前啊。🍃",
        options: [
            { text: "这种瞬间最容易让人心动了。那是哪首歌啊？快发给我，我也去回味一下青春。", scores: { E: 2, S: 2, T: 0, D: 2 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "大脑在特定旋律刺激下会迅速激活海马体的长期记忆，这在心理学上叫\"普鲁斯特效应\"。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我高中时候最喜欢的乐队早就解散了，现在每次听到他们的歌我都觉得特别唏嘘。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "人偶尔确实会有些怀旧情绪，不过过去的事情也就是一种经历，看看就过去了。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 10,
        type: 'routine',
        scenario: "Ta：最近在跟着网上的教程学做饭，今天尝试做了糖醋排骨！🍳",
        message: "最近在跟着网上的教程学做饭，今天尝试做了糖醋排骨！🍳",
        options: [
            { text: "哇塞！你也太厉害了吧！如果这时候我在你身边就好了，这样我就能尝到了嘿嘿嘿……", scores: { E: 2, S: 2, T: 0, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "做糖醋排骨火候和糖醋比例（1:2:3:4:5）是关键，对了，你用的是冰糖还是白糖？", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "真佩服你还有精力和闲情逸致自己做饭，我天天高强度加班，除了外卖根本不想进厨房。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "自己做饭确实比在外面吃健康卫生，能坚持下去也算是一个挺好的生活习惯。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 11,
        type: 'crisis',
        scenario: "Ta：今天被领导批评了，明明不是我的问题，心情好差...",
        message: "今天被领导批评了，明明不是我的问题，心情好差...",
        options: [
            { text: "抱抱你！先别难过，你一直都是很努力的。要不要我们一起分析一下，看看怎么跟领导沟通？或者我们先去吃顿好的，转换一下心情？", scores: { E: 2, S: 2, T: 1, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "具体是什么情况？领导怎么说的？你有没有留存邮件或者记录？我们可以梳理一下时间线，看看责任到底在谁。", scores: { E: 1, S: 0, T: 2, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "太过分了！凭什么批评你！我也好生气，这些人根本不了解你的辛苦。这种人就不配当领导！", scores: { E: 2, S: -2, T: -1, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "嗯，别想了。我这边也有点忙，你先休息吧。", scores: { E: 0, S: 0, T: -1, D: -2 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 12,
        type: 'routine',
        scenario: "Ta：今天发烧38.8度，我好难受啊。",
        message: "今天发烧38.8度，我好难受啊。🤒",
        options: [
            { text: "有没有药？要不要去医院？有什么需要的随时叫我，我帮你点外卖！", scores: { E: 2, S: 2, T: 2, D: 1 }, reciprocity: 'high', supportType: 'practical', attachment: 'secure', disclosure: 'medium' },
            { text: "一般超过38.5度就得吃要了，并且注意24小时内不要超量。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我昨天也淋了雨，不知道会不会发烧，我得预防起来。", scores: { E: -1, S: -1, T: 0, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "多喝热水、多盖被子睡一觉，身体免疫力上来了过几天就好了。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 13,
        type: 'routine',
        scenario: "Ta：这次准备了那么久的考试还是考砸了💔",
        message: "这次准备了那么久的考试还是考砸了💔",
        options: [
            { text: "快别这么说！抱抱你，下次还有机会的！", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "这次考砸是因为临场发挥失误，还是有某些特定的知识盲区？下次好好复习。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我当年考公的时候比你现在还惨，准备了一年最后卡在复试线下0.5分，当时我天都塌了。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "早干嘛去了。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 14,
        type: 'routine',
        scenario: "Ta：我感觉最近特别焦虑。",
        message: "我感觉最近特别焦虑。",
        options: [
            { text: "是遇到什么烦心事了吗？今晚我们打电话吧，不说话也行。", scores: { E: 2, S: 2, T: 2, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "焦虑来源是什么？", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我也是……", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "白天多做点运动，或者吃点褪黑素，会好很多。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 15,
        type: 'routine',
        scenario: "Ta：今天和爸妈在电话里大吵了一架，他们完全不理解我。",
        message: "今天和爸妈在电话里大吵了一架，他们完全不理解我。",
        options: [
            { text: "发生什么了？你一定特别委屈吧……抱抱你。", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "你们之间矛盾的核心在于信息不对称，需要及时解决，不然以后还会吵。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "父母都是这样的，我早就放弃跟他们沟通了，反正我自己赚学费生活费，他们根本管不着我。", scores: { E: -1, S: -1, T: 0, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "两代人的观念代沟太深，争吵是解决不了问题的，不如各自先冷静一段时间，等大家都理智了再谈。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 16,
        type: 'routine',
        scenario: "Ta：总觉得自己混得好失败、好没用。",
        message: "总觉得自己混得好失败、好没用。",
        options: [
            { text: "不许你这么贬低自己！每个人的花期都是不一样的，你在我眼里已经有超级多闪闪发光的优点了！", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "幸存者偏差会让人只看到别人光鲜的一面。我们可以客观做个自我盘点，看看你真正的竞争优势在哪里。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "谁不是呢。我朋友圈里天天都是出去旅游放飞自我的，看多了我都想把朋友圈直接关了。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "幸福感都是相对的。过好自己的底层生活就行了，没必要非要去和金字塔尖的人硬碰硬。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 17,
        type: 'routine',
        scenario: "Ta：昨天还好好的，今天微信发过去朋友突然对我冷淡淡的，我是不是说错什么话得罪Ta了？",
        message: "昨天还好好的，今天微信发过去朋友突然对我冷淡淡的，我是不是说错什么话得罪Ta了？",
        options: [
            { text: "这种被冷落的感觉确实挺折磨人的……你先别慌，说不定Ta只是今天自己遇到了什么倒霉事，不是你的问题。", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "你们说什么了？我帮你分析一下。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我也经常莫名其妙被人鸽或者冷落，也不知道想干嘛。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "既然Ta不想聊，那也别一直发了，把注意力放在自己身上。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 18,
        type: 'routine',
        scenario: "Ta：真倒霉，今天胃痛得直不起腰，现在一个人在医院排队挂号。🩺",
        message: "真倒霉，今天胃痛得直不起腰，现在一个人在医院排队挂号。🩺",
        options: [
            { text: "天哪！胃痛很折磨人的！你在哪家医院？有人陪着你吗？我马上过去陪你！", scores: { E: 2, S: 2, T: 2, D: 1 }, reciprocity: 'high', supportType: 'practical', attachment: 'secure', disclosure: 'medium' },
            { text: "胃痛可能是急性胃炎。你先看清楚是挂消化内科还是急诊，看病期间注意保留好所有的机打发票和病历。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "一个人看病确实是孤独等级最高的一级。我去年做手术也是自己签的字，当时麻药退了痛得我眼泪狂流。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'medium' },
            { text: "在大城市漂泊，成年人独立看病基本是必修课。挂上号看完医生拿了药，早点打车回家躺着休息吧。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 19,
        type: 'crisis',
        scenario: "Ta：总觉得你最近回复变慢了……你是不是生我气了？",
        message: "总觉得你最近回复变慢了……你是不是生我气了？",
        options: [
            { text: "没有没有~我只是有点累~", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "有一点，我觉得我们有必要聊聊。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "你不如自己好好想想，你到底哪里做错了。", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "随便你怎么想。", scores: { E: -1, S: -1, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 20,
        type: 'crisis',
        scenario: "Ta：我觉得我们最近的共同话题变少了，你对我越来越冷淡了，这样下去还有意义吗？",
        message: "我觉得我们最近的共同话题变少了，你对我越来越冷淡了，这样下去还有意义吗？",
        options: [
            { text: "谢谢你愿意告诉我……我们周末见面吧，好好聊聊好么？", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "你为什么会产生这种感觉？我哪里做错了吗？", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "那你呢？你太敏感了……", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "那就没有聊下去的必要了。", scores: { E: -1, S: -1, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 21,
        type: 'crisis',
        scenario: "Ta：我发现我们在很多社会新闻和价值观念上的看法完全不一样，根本聊不到一块去。",
        message: "我发现我们在很多社会新闻和价值观念上的看法完全不一样，根本聊不到一块去。",
        options: [
            { text: "观念不同其实很正常，正因为我们不一样，世界才有趣嘛。只要我们尊重彼此的差异，不影响我们互相喜欢呀。", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'medium' },
            { text: "求同存异吧。我们可以先试着把情绪抽离出来，只讨论客观事实和底层的逻辑差异，没必要非要说服对方。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "你天天除了刷短视频就是打游戏，我觉得是你的思维方式被网上的一些片面言论给误导了，你根本就没有深度理解我说的那些观点的底层逻辑。", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "观念这东西本来就没办法强求一致。既然一聊这个就容易吵架，那以后遇到这种话题我们直接换台，谁也别提。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 22,
        type: 'crisis',
        scenario: "Ta：如果以后我们因为现实不可抗力必须要异地恋，你觉得我们能走下去吗？",
        message: "如果以后我们因为现实不可抗力必须要异地恋，你觉得我们能走下去吗？",
        options: [
            { text: "我们可以一起想办法，共同规划未来！", scores: { E: 2, S: 2, T: 2, D: 2 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "那要看异地多长时间。如果是有明确期限的短期异地（比如一年内），我觉得可以克服；如果是无期限的，现实难度非常大。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "异地恋的背叛率和出轨率太高了，我是绝对接受不了的。如果你非要去别的城市，那就是逼我做选择。", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "这种假设性的未来问题现在想了也没用，毕竟计划赶不上变化，走一步看一步吧，真到了那天再说。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 23,
        type: 'crisis',
        scenario: "Ta：万一以后我们吵架了，甚至吵到要闹分手了，你会怎么处理啊？",
        message: "万一以后我们吵架了，甚至吵到要闹分手了，你会怎么处理啊？",
        options: [
            { text: "那我们约定好：不管再生气也绝对不能摔门扔下对方，不隔夜、不见怪，当天晚上必须用一个拥抱把问题解决。", scores: { E: 2, S: 2, T: 2, D: 0 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "吵架不可怕，可怕的是情绪宣泄。我们可以立个规矩：吵架时只对事不对人，不翻旧账，冷静1小时后各自轮流陈述核心诉求。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "那要看是谁的错。如果是你的错，我绝对不会轻易低头，必须等到你真正意识到自己的问题并向我道歉为止。", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "如果真的吵到不可开交了，那最好就是各自搬出去或者切断联系冷处理一段时间，等大家都彻底冷静了再看要不要继续。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 24,
        type: 'crisis',
        scenario: "Ta：我以前在感情里受过伤，所以我缺乏安全感、很容易胡思乱想。",
        message: "我以前在感情里受过伤，所以我缺乏安全感、很容易胡思乱想。",
        options: [
            { text: "谢谢你愿意告诉我……抱抱，我会用行动给你带来安全感。", scores: { E: 2, S: 2, T: 2, D: 2 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "你放心，安全感我们可以共同建立。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "其实我也受不了被背叛和隐瞒。既然大家都这样，那以后我们任何事都互相分享，互相公开~", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "你如果把所有的安全感都押在另一个人身上，往往最后会更失望。。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 25,
        type: 'deep',
        scenario: "Ta：我小时候被同学孤立和校园霸凌过，导致我留下了很严重的创伤。💭",
        message: "我小时候被同学孤立和校园霸凌过，导致我留下了很严重的创伤。💭",
        options: [
            { text: "心疼你……谢谢你愿意这么信任我，那些不好的过去不是你的错。", scores: { E: 2, S: 2, T: 2, D: 3 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "童年创伤会在潜意识里形成一种防御性人格，你可以试试心理咨询，很管用的。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我没经历过，不过我们班也有人被霸凌。", scores: { E: -1, S: 0, T: 0, D: 0 }, reciprocity: 'medium', supportType: 'emotional', attachment: 'anxious', disclosure: 'deep' },
            { text: "都过去了，人还是要多往前看，别让过去的人继续恶心现在的自己。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 26,
        type: 'deep',
        scenario: "Ta：我对你不设防，手机密码、社交账号、甚至银行卡密码你都知道。我觉得爱一个人就是毫无保留地信任。🔓",
        message: "我对你不设防，手机密码、社交账号、甚至银行卡密码你都知道。我觉得爱一个人就是毫无保留地信任。🔓",
        options: [
            { text: "谢谢你这么信任我，我也会用同样的坦诚来回应你，但如果你哪天想保留一点自己的小空间，我也完全理解。", scores: { E: 2, S: 2, T: 2, D: 2 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "我希望你不要完全不设防的信任我，这是对我们亲密关系的一种保护。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "我也希望可以和对方无条件相互信任，我觉得这是爱一个人的前提与证明。", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'deep' },
            { text: "永远不要把100%的底牌和筹码都压在另一个人身上，要学会自我保护。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 27,
        type: 'deep',
        scenario: "Ta：当我情绪崩溃或者极度难过的时候，我会直接关机玩消失，谁也找不到我。",
        message: "当我情绪崩溃或者极度难过的时候，我会直接关机玩消失，谁也找不到我。",
        options: [
            { text: "没关系的，我理解。但我希望我们能约定一个暗号，哪怕发个'。'也行，让我知道你安全，然后我绝不打扰你。", scores: { E: 2, S: 2, T: 2, D: 1 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "需要独处消化情绪是正常的，但关机失联会让我很焦虑，请你以后不要这样。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "如果你突然消失好几个小时甚至几天，我会脑补出一万种你出事了或者你想跟我分手的画面，然后一直联系你。", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "我情绪不好的时候也极度讨厌别人来烦我。大家各自找个角落把负能量消化干净了再见面，挺好。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 28,
        type: 'deep',
        scenario: "Ta：认识这么久了，我想听听你的真心话——你觉得在你的眼里，我到底是个什么样的人？",
        message: "认识这么久了，我想听听你的真心话——你觉得在你的眼里，我到底是个什么样的人？",
        options: [
            { text: "你在工作中xxx，但私底下xxx；虽然偶尔xxx，但xxx，我觉得你很xxx。", scores: { E: 2, S: 2, T: 2, D: 3 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "整体来看，你是一个xxx的人。优点在于xxx，缺点在于xxx。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "那你先告诉我，你觉得我是个什么样的人？", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "说实话，人都是多面性的，很难用几个词去定义。我觉得我们就这样顺其自然地相处、慢慢观察就挺好的。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 29,
        type: 'deep',
        scenario: "Ta：如果有一天，我因为工作或者家庭原因，必须突然离开这座城市去一个完全陌生的地方生活呢？",
        message: "如果有一天，我因为工作或者家庭原因，必须突然离开这座城市去一个完全陌生的地方生活呢？",
        options: [
            { text: "那我肯定会超级无敌舍不得你。但如果那是对你而言最好的选择，我会支持你，并且努力追随你。", scores: { E: 2, S: 2, T: 2, D: 2 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "如果你在那座城市能拿到的核心资源以及生活成本都优于这边，离开是理智的选择。", scores: { E: 1, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "你会不会带上我一起走？", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "天下没有不散的筵席，人生的常态本就是走走停停。如果你觉得去那边发展更好，那就去吧，各自多珍重。", scores: { E: 0, S: 0, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    },
    {
        id: 30,
        type: 'final',
        scenario: "Ta：不知不觉居然陪我做完了整整30道奇奇怪怪的恋爱假设题。说实话……你觉得我们现在，到底算是什么关系啊？",
        message: "不知不觉居然陪我做完了整整30道奇奇怪怪的恋爱假设题。说实话……你觉得我们现在，到底算是什么关系啊？",
        options: [
            { text: "我觉得现在的我们，已经是彼此生命里非常重要、而且想要一直走下去的人了。", scores: { E: 3, S: 3, T: 3, D: 3 }, reciprocity: 'high', supportType: 'emotional', attachment: 'secure', disclosure: 'deep' },
            { text: "我们的关系还需要时间来定义。", scores: { E: 2, S: 0, T: 1, D: 0 }, reciprocity: 'medium', supportType: 'advice', attachment: 'secure', disclosure: 'medium' },
            { text: "这取决于你怎么看我。如果你对我没兴趣，那我在这段关系里可就陷得有点太深、太狼狈了。", scores: { E: -1, S: -1, T: -1, D: 0 }, reciprocity: 'low', supportType: 'none', attachment: 'anxious', disclosure: 'medium' },
            { text: "我觉得现在的状态就挺好的，懂彼此的无话不谈的好朋友，没必要非要用一个世俗的恋爱名分把两个人都绑死。", scores: { E: -1, S: -1, T: 0, D: -1 }, reciprocity: 'low', supportType: 'none', attachment: 'avoidant', disclosure: 'shallow' }
        ]
    }
];
