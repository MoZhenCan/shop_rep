import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftList: [],
        rightList: [],
        //被点击的左侧的菜单
        currentIndex: 0,
        //右侧商品置顶距离
        scrollTop: 0
    },
    //总的数据数组
    cate: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const cate = wx.getStorageSync("cate");
        if (!cate) {
            this.getCate()
        } else {
            if (Date.now() - cate.time > 1000 * 60 * 5) {
                this.getCate()
            } else {
                console.log("旧数据")
                this.cate = cate.data
                let leftList = this.cate.map((v) => v.cat_name)
                let rightList = this.cate[0].children
                this.setData({
                    leftList,
                    rightList
                })
            }
        }
    },
    async getCate() {
        // request({ url: '/categories' }).then((ruslut) => {
        //     this.cate = ruslut.data.message
        //     console.log("新")
        //     wx.setStorageSync("cate", { time: Date.now(), data: this.cate });
        //     let leftList = this.cate.map((v) => v.cat_name)
        //     let rightList = this.cate[0].children
        //     this.setData({
        //         leftList,
        //         rightList
        //     })
        // })
        const ruslut = await request({ url: '/categories' })
        this.cate = ruslut
        console.log("新")
        wx.setStorageSync("cate", { time: Date.now(), data: this.cate });
        let leftList = this.cate.map((v) => v.cat_name)
        let rightList = this.cate[0].children
        this.setData({
            leftList,
            rightList
        })
    },
    leftTap(e) {
        const { index } = e.currentTarget.dataset
        let rightList = this.cate[index].children
        this.setData({
            currentIndex: index,
            rightList,
            //右侧置顶距离
            scrollTop: 0
        })
    }


})