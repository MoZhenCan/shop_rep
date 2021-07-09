import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: '全部',
                isActive: true
            },
            {
                id: 2,
                value: '待付款',
                isActive: false
            },
            {
                id: 3,
                value: '待发货',
                isActive: false
            },
            {
                id: 3,
                value: '退款\退货',
                isActive: false
            }
        ],
    },
    onShow() {

        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            });
            return
        }


        //页面栈-数组     长度10
        let Pages = getCurrentPages();
        //数组最后的元素为当前页面
        let currentPage = Pages[Pages.length - 1]
        const type = currentPage.options
        this.getOrders(type)
    },
    //获取订单列表
    async getOrders(type) {
        const res = await request({ url: "/my/orders/all", data: { type } })
        console.log(res)
    },
    handelTabsChangeItem(e) {
        const { index } = e.detail
        let { tabs } = this.data
        tabs.forEach((v, i) => index === i ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },

})