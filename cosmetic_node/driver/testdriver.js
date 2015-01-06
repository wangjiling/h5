var Driver = require('./index.js');
var setting = require('../configuration').setting;

Driver.queryDataByGet('http://meizhuangyouxuan.com/app/inter/getProductInfo.ss', {uuid: 'IJ45014z98', appKey:'6581235709', appVer:'1.0'},function(returnData){
    // console.log('returnGetData: ' + JSON.stringify(returnData));
});

Driver.queryDataByPost('http://meizhuangyouxuan.com/app/inter/getProductInfo.ss', {uuid: 'IJ45014z98', appKey:'6581235709', appVer:'1.0'},function(returnData){
    // console.log('returnPostData: ' + JSON.stringify(returnData));
});

Driver.queryByPost('http://meizhuangyouxuan.com/app/inter/getProductInfo.ss',{uuid: 'IJ45014z98', appKey:'6581235709', appVer:'1.0'},function(data){
    // console.log('post: ' + JSON.stringify(data));
});