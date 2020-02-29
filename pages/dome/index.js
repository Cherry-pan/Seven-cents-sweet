// pages/dome/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist: ['《乱世佳人》', '《教父》', '《肖申克的救赎》', '《大约在冬季》']
  },

  up(e) {
    console.log(e.currentTarget.dataset.index)
    let temp = this.data.userlist[e.currentTarget.dataset.index]
    this.data.userlist[e.currentTarget.dataset.index] = this.data.userlist[e.currentTarget.dataset.index - 1]
    this.data.userlist[e.currentTarget.dataset.index - 1] = temp
    this.setData({
      userlist: this.data.userlist
    })
  },
  down(e) {
    let temp = this.data.userlist[e.currentTarget.dataset.index]
    this.data.userlist[e.currentTarget.dataset.index] = this.data.userlist[e.currentTarget.dataset.index + 1]
    this.data.userlist[e.currentTarget.dataset.index + 1] = temp
    this.setData({
      userlist: this.data.userlist
    })
  },
  remove(e) {
    this.data.userlist.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      userlist: this.data.userlist
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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