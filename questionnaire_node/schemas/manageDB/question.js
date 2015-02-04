var QuestionSchema = require('../Question.js');

var saveQuestion = exports.savePrize = function(data){
    var QuestionTable = QuestionSchema.newHandler();
    for(var i=0; i<data.length; i++){
        var questionSave = new QuestionTable({
            qId: data[i].qId,
            qContent: data[i].qContent,
            aContent: data[i].aContent,
            bContent: data[i].bContent,
            cContent: data[i].cContent?data[i].cContent:"",
            dContent: data[i].dContent?data[i].dContent:"",
            aNum: 0,
            bNum: 0,
            cNum: 0,
            dNum: 0,
            aMNum: 0,
            bMNum: 0,
            cMNum: 0,
            dMNum: 0,
            sum:0
        });
        questionSave.save(function (err) {
            if (!err) {
                console.log("save is success!");
            } else {
                console.log("save is failed!");
            }
        });
    }
};

var questionData = [
    {
        qId: 1,
        qContent: "您如花般的年龄是",
        aContent: "18-24岁",
        bContent: "25-28岁",
        cContent: "29-33岁",
        dContent: "34-40岁"
    },
    {
        qId: 2,
        qContent: "你的职业是",
        aContent: "学生",
        bContent: "公司工作对内",
        cContent: "公司工作对外",
        dContent: "自由职业"
    },
    {
        qId: 3,
        qContent: "你如何形容自己",
        aContent: "宅女",
        bContent: "宅男",
        cContent: "聚会女王",
        dContent: "情场王子"
    },
    {
        qId: 4,
        qContent: "你认为男女暧昧阶段该多长时间",
        aContent: "至少一个月，之后直奔主题",
        bContent: "一个月到三个月",
        cContent: "三个月到半年",
        dContent: "无所谓，一直下去，也是生活调节"
    },
    {
        qId: 5,
        qContent: "你觉得调戏男生性能力是件（女生完成）",
        aContent: "有意思，有时会当面调戏",
        bContent: "想调戏，碍于面子有点不好意思",
        cContent: "私下闺蜜会说，不会再公开场合",
        dContent: "从来不调戏"
    },
    {
        qId: 6,
        qContent: "如果你被女生调戏性能力，你会（男生完成）",
        aContent: "用一切手段反击",
        bContent: "果断把她拉黑",
        cContent: "无所谓，但想知道她是谁",
        dContent: "约她出来，让她试一下"
    },
    {
        qId: 7,
        qContent: "你在看到一个自己有好感的异性的照片，或者发现自己被异性评价时候，你会",
        aContent: "主动搭话",
        bContent: "时不时看看电脑，等他／她和自己搭话",
        cContent: "想和他搭话，又怕被拒绝，最好能找个借口",
        dContent: "约她出来，让她试一下"
    },
    {
        qId: 8,
        qContent: "你希望借助一些有意思的方式向心中的他（她）表达吗",
        aContent: "不需要，直接了当就好",
        bContent: "希望，这样可以避免尴尬，并且加速推进"
    },
    {
        qId: 9,
        qContent: "你如何看所谓的“约炮”",
        aContent: "社会变态的产物",
        bContent: "社会开放，人性需求，可接受",
        cContent: "尝试过，很刺激",
        dContent: "如果有一定了解，还是可以的"
    }
];

saveQuestion(questionData);

