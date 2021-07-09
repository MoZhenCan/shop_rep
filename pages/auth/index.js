import { request } from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/ascynUtil.js'
Page({

    async handelGetUserInfo(e) {
        let { encryptedData, iv, rawData, signature, userInfo } = e.detail

        let { code } = await login()

        let getToken = { encryptedData, iv, rawData, signature, code }

        let toden = await request({ url: "/users/wxlogin", method: "post", data: getToken })

        wx.setStorageSync("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
    }
})