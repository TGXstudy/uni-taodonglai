<template>
	<view class="fn-sz-22 fn-cl-999">
		{{countDown}}
	</view>
</template>

<script>
	export default {
		props: {
			endTime: {
				type: String,
				default: ''
			},
		},
		watch:{
			endTime(newVal){
				console.log("watch",newVal)
				this.initTimer();
			},
		},
		data() {
			return {
				countDown: '00:00:00',
				timer: ''
			}
		},
	
		created() {
			this.initTimer();
		},
		beforeDestroy() {
			console.log('组件销毁');
			this.clearTimer();
		},
		methods: {
			clearTimer() {
				// 清除定时器
				console.log(this.timer, '清除定时器成功')
				clearInterval(this.timer);

			},
			initTimer() {
				console.log('开始倒计时---------------', this.endTime,new Date().getTime())
				this.timer = setInterval(() => {
					var nowTime = new Date(),
						endTime = this.endTime;
					var lefttime =endTime - nowTime.getTime(), //距离结束时间的毫秒数
						lefth = Math.floor(((lefttime-0) / (1000 * 60 * 60))), //计算小时数
						leftm = Math.floor(((lefttime-0) / (1000 * 60)) % 60), //计算分钟数
						lefts = Math.floor(((lefttime-0) / 1000) % 60); //计算秒数
						// console.log('开始倒计时---------------lefts', lefts,lefttime)
					if (lefts < 0) {
						clearInterval(this.timer)
						this.$emit("updateList")
						return;
					}
					this.countDown=(lefth<10?'0'+lefth:lefth)+':'+(leftm<10?'0'+leftm:leftm)+':'+(lefts<10?'0'+lefts:lefts);
					// console.log("typeof typeof typeof1111111 ",this.countDown,lefth);
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .count-down {
	// 	width: 354upx;
	// 	// justify-content: center;
	// 	.time-box{
	// 		flex:1;
	// 		justify-content: center;
	// 		}
	// }
</style>
