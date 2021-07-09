import { showModal, showToast } from '../../utils/ascynUtil.js'
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        address: {},
        cart: [],
        //总价格
        totalprice: 0,
        //总数量
        totalnum: 0

    },
    onShow() {
        //
        const address = wx.getStorageSync("address");
        let cart = wx.getStorageSync("cart") || [];
        cart = cart.filter(v => v.check)
        this.setData({ address })
        let totalprice = 0
        let totalnum = 0
        cart.forEach(v => {
            totalprice += v.goods_price * v.num
            totalnum += v.num
        })
        this.setData({
            cart,
            totalprice,
            totalnum,
        })

    },
    async handelOrderPay() {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });

            return
        }

        //1.创建订单预处理
        let header = { Authorization: token }

        let order_price = this.data.totalprice

        let consignee_addr = this.data.address

        let goods = []

        const cart = wx.getStorageSync("cart");

        cart.filter(v => {
            goods.goods_id = v.goods_id,
                goods.goods_number = v.num,
                goods.goods_price = v.goods_price
        })

        let reqparms = { order_price, consignee_addr, goods }
            //2.创建订单

        // wx.requestPayment({
        //     timeStamp: '',
        //     nonceStr: '',
        //     package: '',
        //     signType: '',
        //     paySign: '',
        //     success: (result) => {

        //     },
        //     fail: () => {},
        //     complete: () => {}
        // });







    }




})