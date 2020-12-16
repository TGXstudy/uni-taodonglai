<template>
	<view class="slide-del-item" @tap="goMsgDetail(item)">
		<view class="slide-item-box ">
			<view class="item-touch" :style="marginLeft" @touchstart="touchS" @touchmove="touchM" @touchend="touchE">
				<slot></slot>
			</view>
			<view class="item-delete" :style=" {width:px(delBtnWidth)}" @tap.stop="deleteItem(item)">
				<view class="delete-icon">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			},
		},
		data() {
			return {
				// 前台用户标志
				delBtnWidth: 150, //删除按钮宽度单位（px）

				startX: '',
				marginLeft: '',
				timeid: null
			}
		},

		methods: {


			px(num) {
				return uni.upx2px(num) + "px"
			},
			touchS(e) {
				// console.log('touchS',e)
				if (e.touches.length === 1) {
					//设置触摸起始点水平方向位置
					this.startX = e.touches[0].clientX
					// console.log(this.startX)
				}
			},
			touchM: function(e) {
				// console.log('touchM')
				if (e.touches.length === 1) {
					//手指移动时水平方向位置
					var moveX = e.touches[0].clientX;
					//手指起始点位置与移动期间的差值
					var disX = this.startX - moveX;
					var delBtnWidth = this.delBtnWidth;
					if (disX == 0 || disX < 0) { //如果移动距离小于等于0，说明向右滑动，文本层位置不变
						this.marginLeft = "0px"
					} else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
						this.marginLeft = "-" + this.px(disX);
						if (disX >= delBtnWidth) {
							//控制手指移动距离最大值为删除按钮的宽度
							this.marginLeft = "-" + this.px(delBtnWidth);
						}
					}

				}
			},
			touchE: function(e) {
				// console.log('touchE')
				if (e.changedTouches.length === 1) {
					//手指移动结束后水平位置
					var endX = e.changedTouches[0].clientX;
					//触摸开始与结束，手指移动的距离
					var disX = this.startX - endX;
					var delBtnWidth = this.delBtnWidth;
					//如果距离小于删除按钮的1/2，不显示删除按钮
					this.marginLeft = disX > delBtnWidth / 2 ? "margin-left:-" + this.px(delBtnWidth) : "margin-left:0px";
					this.timeid = setTimeout(() => {
						this.marginLeft = "margin-left:0";
						clearInterval(this.timeid)
					}, 2000)
				}
			},
			//点击删除按钮事件
			deleteItem(item) {
				let that = this;
				clearInterval(this.timeid)
				uni.showModal({
					title: "提示",
					content: "确认删除",
					success(res) {
						that.marginLeft = "margin-left:0";
						if (res.confirm) {							
							that.$emit("deleteItem", item)
						}
					}
				})

			},
			//
			goMsgDetail(item) {
				this.$emit("goMsgDetail", item)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.slide-del-item {
		display: block;
		width: 100%;
		height: 100%;
		// border-bottom: 1upx solid #F5F5F5;
	}

	.clearfix {
		clear: both;
	}

	.slide-item-box {
		width: 100%;
		display: block;
		// height: 100%;
		position: relative;
		overflow: hidden;


	}

	.item-touch {
		position: relative;
		padding: 0 24upx;
		width: 100%;
		// height: 100%;
		background-color: #fff;
		transition: margin-left 0.2s ease-in-out;
		z-index: 6;
		box-sizing: border-box;

	}


	.item-delete {
		
		position: absolute;
		right: 0;
		z-index: 5;
		top: 0;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.content-box {
		width: 100%;
	}

	.delete-icon {
		width: 150upx;
		height: 100%;
		display: flex;
		background-color: #FA403B;
		justify-content: center;
		align-items: center;
		color: #FFF;
		font-size: 28upx;
		line-height: 80upx;
		text-align: center;
	}
</style>
