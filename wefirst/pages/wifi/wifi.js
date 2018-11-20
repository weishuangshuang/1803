// pages/wifi/wifi.js
const app = getApp(); //获取全局对象(app对象)
Page({


    /**
     * 页面的初始数据
     */
    data: {
        "lo":0,
        "la":0,
        "markers":[],
        "wifiUrl": app.globalData.wifiUrl, //获取全局对象app下的globalData下的wifiUrl
        "wifiKey": app.globalData.wifiKey
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getLocation({
            success: function(res) {
                var mks = that.data.markers;
                mks.push({
                    "id": 0,
                    "iconPath": "../../imgs/d.png",
                    "latitude": res.latitude,
                   "longitude": res.longitude,
                    "width": 40,
                    "height": 40
                });
                that.setData({
                    "lo":res.longitude,
                    "la":res.latitude,
                    "markers":mks
                });

                //获取当前位置周边的wifi
                wx.request({
                    url: that.data.wifiUrl,
                    method:"GET",
                    data:{
                        "lon": res.longitude, 
                        "lat":res.latitude,
                        "gtype": 1,
                        "r":1000,
                        "key":that.data.wifiKey
                    },
                    success:function(res){
                        console.log("----------------"),
                        console.log(res)
                        var mks = that.data.markers;
                        if(null != res.data.result){
                            for (var i = 0; i < res.data.result.data.length; i++) {
                                var item = res.data.result.data[i];
                                mks.push({
                                    "id": i + 1,
                                    "iconPath": "/imgs/ww.png",
                                    "latitude": item.google_lat,
                                    "longitude": item.google_lon,
                                    "width": 20,
                                    "height": 20
                                });
                            }
                            that.setData({
                                "markers": mks
                            });
                        }                
                    }
                })            
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})