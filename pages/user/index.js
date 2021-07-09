// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: {},
        collectGoods: 0
    },
    onShow() {
        const userinfo = wx.getStorageSync("userInfo");
        let collectGoods = wx.getStorageSync("collect") || []
        this.setData({
            collectGoods: collectGoods.length,
            userinfo
        })
    },
    handelpriview() {
        const { avatarUrl } = wx.getStorageSync("userInfo");
        wx.previewImage({
            current: '',
            urls: [avatarUrl],
            success: (result) => {
                // console.log(result)
            },
            fail: () => {},
            complete: () => {}
        });


    }

})