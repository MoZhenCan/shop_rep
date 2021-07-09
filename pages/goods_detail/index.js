import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailObj: {},
        isCollect: false
    },
    GoodsObj: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        let currentPages = getCurrentPages();
        let { options } = currentPages[currentPages.length - 1]
        console.log(options.goods_id)
        this.getDetailObj(options.goods_id)
    },

    async getDetailObj(goods_id) {
        const detailObj = await request({ url: "/goods/detail", data: { goods_id } })
        this.GoodsObj = detailObj
            // 1 获取缓存中的商品收藏的数组
        let collect = wx.getStorageSync("collect") || [];
        // 2 判断当前商品是否被收藏
        let isCollect = collect.some(v => v.goods_id === this.GoodsObj.goods_id);
        this.setData({
            detailObj: {
                goods_name: detailObj.goods_name,
                goods_price: detailObj.goods_price,
                //由于inphone 不支持webp格式的图片所以要转化为jpg
                pics: detailObj.pics,
                goods_introduce: detailObj.goods_introduce.replace(/\.webp/g, ".jpg")
            },
            isCollect
        })

    },
    imgPriview(e) {
        const urls = this.GoodsObj.pics.map((v) => v.pics_mid)
        const curentUrl = e.currentTarget.dataset.url
        wx.previewImage({
            urls: urls,
            current: curentUrl
        })
    },
    handelCartAdd() {
        let cart = wx.getStorageSync('cart') || []
            //获取商品是否存在于购物车
        let index = cart.findIndex(v => v.goods_id === this.GoodsObj.goods_id)
        if (index === -1) {
            //不存在
            this.GoodsObj.num = 1
            this.GoodsObj.check = true
            cart.push(this.GoodsObj)
        } else {
            //存在
            cart[index].num++
        }
        //把商品存到本低
        wx.setStorageSync('cart', cart)
            //提示
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true,
            duration: 800
        })
    },
    handelCollect() {
        let isCollect = false
        let collect = wx.getStorageSync("collect") || []
            //通过goods_id判断点击的商品是否已在收藏中
        let index = collect.findIndex((v) => v.goods_id === this.GoodsObj.goods_id)
        if (index !== -1) {
            //已存在那就删除它
            isCollect = false
            collect.splice(index, 1)
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: false,
            });

        } else {
            isCollect = true
            collect.push(this.GoodsObj)
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: false,
            });

        }
        wx.setStorageSync("collect", collect);

        this.setData({
            isCollect
        })

    }
})