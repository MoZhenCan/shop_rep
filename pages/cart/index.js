// pages/cart/index.js
/*
  1获取用户的收货地址
  2 api为 wx.chooseAddress
  3 如果用户在获取地址是点了取消  就会有权限的 授权的问题
    scope = true 为授权flase反之
    scope在wx.getSetting  api 的result中

    4用户没有调用过 scope为 undefined

    当scope为false 诱导用户 设置授权


*/
import { showModal, showToast } from '../../utils/ascynUtil.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        address: {},
        cart: [],
        allcheck: false,
        //总价格
        totalprice: 0,
        //总数量
        totalnum: 0

    },
    onShow() {
        //
        const address = wx.getStorageSync("address");
        const cart = wx.getStorageSync("cart") || [];
        // let allcheck = cart.length ? cart.every(v => v.check) : false
        this.setCart(cart)
        this.setData({
            address
        })
    },
    handleChooseAddress() {
        wx.chooseAddress({
            success: (result) => {
                wx.setStorageSync("address", result);
            },
            fail: () => {},
            complete: () => {}
        });
    },
    handelChecked(e) {
        console.log(e.currentTarget.dataset.id)
        let { cart } = this.data
            //1.找到要修改的商品
        let index = cart.findIndex(v => v.goods_id === e.currentTarget.dataset.id)
            //取反
        cart[index].check = !cart[index].check

        this.setCart(cart)
    },
    setCart(cart) {
        let allcheck = true
        let totalprice = 0
        let totalnum = 0
        cart.forEach(v => {
            if (v.check) {
                totalprice += v.goods_price * v.num
                totalnum += v.num
            } else {
                allcheck = false
            }
        })
        allcheck = cart.length != 0 ? allcheck : false

        this.setData({
            cart,
            totalprice,
            totalnum,
            allcheck
        })
        wx.setStorageSync("cart", cart);

    },
    allChange() {
        let { allcheck, cart } = this.data
        allcheck = !allcheck
        cart.forEach(v => v.check = allcheck)
        this.setCart(cart)
    },
    async numEdit(e) {
        const { orperation, id } = e.currentTarget.dataset
        let { cart } = this.data
        let index = cart.findIndex(v => v.goods_id === id)
        if (cart[index].num <= 1 && orperation === -1) {
            const res = await showModal({ content: "你确定删除吗?" })
            console.log("res")
            if (res.confirm) {
                cart.splice(index, 1)
                this.setCart(cart)
            }

        } else {
            cart[index].num += orperation
            this.setCart(cart)
        }
    },
    async handelPay() {
        let { address, totalnum } = this.data
        if (!address.userName) {
            await showToast({ title: "你还没有选择地址" })
            return
        }
        if (totalnum === 0) {
            await showToast({ title: "你还没有选购商品" })
            return
        }
        wx.navigateTo({
            url: '/pages/pay/index',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });

    }




})