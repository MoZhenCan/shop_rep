import { request } from '../../request/index.js'
Page({
    data: {
        //轮播图
        swiperList: [],
        //导航栏数据https://api-hmugo-web.itheima.net/api/public/v1/home/catitems
        catitemsList: [],
        floorList: []
    },
    onLoad: function(options) {
        //发送异步请求获取轮播图数据
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     method: 'GET',
        //     dataType: 'json',
        //     success: (result) => {
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     },
        //     //失败
        //     fail: () => {},
        //     //成功、失败
        //     complete: () => {}
        // });

        //用promise请求数据
        this.getSwiperList();
        this.getCatitemsList();
        this.getFloorList();
    },
    getSwiperList() {
        request({ url: '/home/swiperdata' }).then((result) => {
            this.setData({
                swiperList: result

            })
        })
    },
    getCatitemsList() {
        request({ url: '/home/catitems' }).then((result) => {
            this.setData({
                catitemsList: result

            })
        })
    },
    getFloorList() {
        request({
            url: '/home/floordata'
        }).then((result) => {
            this.setData({
                floorList: result

            })
        })
    }
})