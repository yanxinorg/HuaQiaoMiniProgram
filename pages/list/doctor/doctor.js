// pages/list/doctor/doctor.js
const __API__ = require("../../../services/backbone.api.js");

Page({

    /**
     * 页面的初始数据
     */
	data: {
		department: {},
		doctors: []
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		var that = this;

		this.data.department = JSON.parse(options.department);

		wx.request({
			url: __API__.queryRelatives("doctor", this.data.department.id),
			data: {},
			header: {
				'content-type': 'application/json'
			},
			success: function (response) {
				console.info(response);
				that.data.doctors = JSON.parse(response.data.doctors).map(doctor => {
					return {
						id: doctor.id,
						name: doctor.name,
						position: doctor.position,
						title: doctor.title,
						resume: doctor.resume,
						field: doctor.field,
						imageurl: __API__.getImageRequestPrefix(doctor.imageurl)
					}
				});

				that.setData({
					doctors: that.data.doctors
				});
			}
		})
	},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
	onReady: function () {

	},

    /**
     * 生命周期函数--监听页面显示
     */
	onShow: function () {

	},

    /**
     * 生命周期函数--监听页面隐藏
     */
	onHide: function () {

	},

    /**
     * 生命周期函数--监听页面卸载
     */
	onUnload: function () {

	},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
	onPullDownRefresh: function () {

	},

    /**
     * 页面上拉触底事件的处理函数
     */
	onReachBottom: function () {

	},

    /**
     * 用户点击右上角分享
     */
	onShareAppMessage: function () {

	},

	toShowDoctorDetails: function (e) {
		wx.navigateTo({
			url: '/pages/details/doctor/doctor?doctor=' + JSON.stringify(e.currentTarget.dataset.doctor)
			+ '&departmentName=' + this.data.department.name
		})
	}
})