import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 2,
                value: '销量',
                isActive: false
            },
            {
                id: 3,
                value: '价格',
                isActive: false
            }
        ],
        goodsList: []
    },
    QueryParme: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10,
    },
    Pagetotal: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.QueryParme.cid = options.cid
        this.getGoodsList()
    },
    async getGoodsList() {
        const res = await request({ url: "/goods/search", data: this.QueryParme })
        const total = res.total
        this.Pagetotal = Math.ceil(total / this.QueryParme.pagesize)
            //请求成功后手动关闭刷新窗口
        wx.stopPullDownRefresh()
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })
    },
    handelTabsChangeItem(e) {
        const { index } = e.detail
        let { tabs } = this.data
        tabs.forEach((v, i) => index === i ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    onReachBottom() {
        if (this.QueryParme.pagenum >= this.Pagetotal) {
            wx.showToast({
                title: '没有下一页了',
            });

        } else {
            this.QueryParme.pagenum++
                this.getGoodsList()
            console.log("还有下一页")
        }
    },
    // 下拉刷新数据
    onPullDownRefresh() {
        // 1 下拉重置旧数据
        this.setData({
                goodsList: []
            })
            // 2  重置页码
        this.QueryParme.pagenum = 1
            // 3  重新发请求
        this.getGoodsList()
    }
})