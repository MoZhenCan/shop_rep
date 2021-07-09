import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        //输入框的值
        inputValue: ""
    },
    TimeId: -1,
    handelInput(e) {
        //获取输入框的值
        const { value } = e.detail

        //检测合法性
        if (!value.trim()) {
            this.setData({
                goods: [],
                isFocus: false
            })
            return
        }
        //发请求 /goods/qsearch
        this.setData({
            isFocus: true
        })
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(() => {
            this.qsearch(value)
        }, 1000)
    },
    //发送请求的函数
    async qsearch(query) {
        const res = await request({ url: "/goods/qsearch", data: { query } })
        console.log(res)
        this.setData({
            goods: res
        })
    },
    handelCancel() {
        this.setData({
            inputValue: "",
            isFocus: false,
            goods: []
        })
    }
})