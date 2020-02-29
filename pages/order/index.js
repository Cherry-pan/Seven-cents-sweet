import {
  TENCENT_KEY,
  BASEURL
} from '../../config/index.js'
import {
  getlocation
} from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    showadv: true,
    lat: '',
    lng: '',
    address: [],
    distance: '',
    promiseall: [],
    menu: [],
    minShop: {},
    shoplist: [],
    typeid: 1,
    goodslist:[],
    littletitle:'热卖',
    good:{}
  },

  changeMenu(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
    })
    this.setData({
      littletitle: this.data.menu[this.data.activeIndex].menuname
    })
    console.log(this.data.menu[this.data.activeIndex].id)
    this.getgoodsList()    
  },

  add(e) {
    console.log(e.currentTarget.dataset.index)    
    wx.hideTabBar({
      aniamtion: true
    })
    this.setData({
      showadv: true
    })
   this.setData({
     good: this.data.goodslist[e.currentTarget.dataset.index]
   })    
  },
  close() {
    wx.showTabBar({
      aniamtion: true
    })
    this.setData({
      showadv: false
    })
  },
  
  // 方法
  getgoodsList(){
    wx.request({
      url: BASEURL + '/goodslist',
      data: {
        typeid: this.data.activeIndex + 1
      },
      success: (res) => {
        this.setData({
          goodslist: res.data
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.getgoodsList()
    // 获取当前位置的经纬度
    wx.getLocation({
      type: 'gcj02 ',
      altitude: true,
      success: (res) => {
        this.data.lat = res.latitude
        this.data.lng = res.longitude
        let nowlocal = this.data.lat + ',' + this.data.lng
        wx.request({
          url: BASEURL + '/shopAddress',
          data: {},
          success: (res) => {
            res = res.data
            this.data.shoplist = res

            res.forEach((r) => {
              this.data.address.push(r.address)
            })
            this.data.address.forEach((r) => {
              let pro = new Promise((reslove, reject) => {
                wx.request({
                  url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=',
                  data: {
                    address: r,
                    key: TENCENT_KEY
                  },
                  success: function(res) {
                    reslove(res)
                  },
                })
              })
              this.data.promiseall.push(pro)
            })
            Promise.all(this.data.promiseall).then((res) => {
              let local = res.map((r) => {
                return r.data.result.location.lat + ',' + r.data.result.location.lng
              })
              let shoplist = local.join(',')
              wx.request({
                url: 'https://apis.map.qq.com/ws/distance/v1/?parameters',
                data: {
                  from: nowlocal,
                  to: shoplist,
                  key: TENCENT_KEY
                },
                success: (res) => {
                  let distance = res.data.result.elements.map((r) => {
                    return r.distance
                  })
                  // console.log(distance)
                  // 通过下标找到最小值所对应的门店
                  let mindistance = Math.min(...distance)
                  let minIndex = distance.indexOf(mindistance)
                  // console.log(minIndex)
                  // console.log(this.data.shoplist)
                  this.setData({
                    minShop: {
                      shopName: this.data.shoplist[minIndex].shopname,
                      distance: mindistance
                    }
                  })
                },
              })
            })
          },
        })
      }
    })

    wx.request({
      url: BASEURL + '/meauslist',
      success: (res) => {        
        this.setData({
          menu: res.data
        })       
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})