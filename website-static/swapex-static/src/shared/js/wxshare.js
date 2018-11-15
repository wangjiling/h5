// wx share
document.addEventListener('DOMContentLoaded', function() {
  if (util.isWX) {
    var href = window.location.href
    var url = encodeURIComponent(href.split('#')[0])
    var spt = document.createElement('script')
    document.body.appendChild(spt)
    spt.onload = function() {
      var wx = window.wx
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
          var data = JSON.parse(xhr.response)
          wx.config({
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ]
          })
        }
      }
      xhr.open('GET', 'https://www.bittool.com/api/wx/services/getJssdkSignature' + '?url=' + url, true)
      xhr.send(null)
      var shareData = {
        title: 'BitTool - Tools For Bitcoin',
        desc: 'BitTool - Tools For Bitcoin',
        // link: href,
        link: 'https://www.bittool.com',
        imgUrl: 'https://www.bittool.com/shared/images/wx_share_300x300.png'
      }
      wx.ready(function() {
        wx.onMenuShareAppMessage(shareData)
        wx.onMenuShareTimeline(shareData)
        wx.onMenuShareQQ(shareData)
        wx.onMenuShareQZone(shareData)
        wx.onMenuShareWeibo(shareData)
      })
    }
    spt.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'
  }
}, false)
