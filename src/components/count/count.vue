<template>
	<view class="count-box" >
		<!--  @longpress='longpressLess' @touchend="handletouchend" @longpress='longpressAdd' @touchend="handletouchend" -->
		<text class="count-less count-pub" :class="[myValue <= min ? 'light' : 'gray']" @tap.stop="less" >-</text>
		<text class="count-add count-pub" :class="[myValue >= max ? 'light' : 'gray']" @tap.stop="add" >+</text>
		<input type="number" v-model="myValue" @focus="onFocus" @blur="onBlue" class="count-input"/>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				myValue: 0,
				status: false,
				timer: null
			}
		},
		//传参
		props: {
			// 计数器中的值
			value: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: 10000
			},
			min: {
				type: Number,
				default: 0
			},
			// 点击当前数据的索引
			index: {
				type: Number
			},
			delayed: {
				type: Number,
				default: 200
			}
		},
		created() {
			this.myValue = this.value
		},
		watch:{
			value(val) {
				this.myValue = val
			}
		},
		methods: {
			onBlue() {
				if(+this.myValue >= this.max) {
					this.myValue = this.max
					this.status = false
				}else if(+this.myValue <= this.min) {
					this.myValue = this.min
					this.status = false
				}else {
					this.status = true
					this.myValue = +this.myValue
				}
				if(!isNaN(this.myValue)) {
					this.$emit('handleCount', this.myValue, this.index)
				}else {
					this.$emit('handleCount', 0, this.index)
				}
				
			},
			onFocus() {
				this.status = true
			},
			add() {
				this.addPublick()
			},
			addPublick() {
				if(this.myValue >= this.max) {
					this.status = false
					this.myValue = this.max
					clearInterval(this.timer)
				}else {
					this.status = true
					this.myValue ++
				}
				this.$emit('handleCount', this.myValue, this.index)
			},
			longpressAdd() {
				this.timer = setInterval(() => {
					this.addPublick()
				}, this.delayed)
			},
			less() {
				this.lessPublick()
			},
			lessPublick() {
				if(this.myValue <= this.min) {
					clearInterval(this.timer)
					this.status = false
					this.myValue = this.min
				}else {
					this.status = true
					this.myValue --
				}
				this.$emit('handleCount', this.myValue, this.index)
			},
			longpressLess() {
				this.timer = setInterval(() => {
					this.lessPublick()
				}, this.delayed)
			},
			handletouchend() {
				clearInterval(this.timer)
			}
		}
	}
</script>
<style>
	.gray{
		color: #333;
	}
	.light{
		color: #999;
	}
	.count-box{
		position: relative;
		width: 180upx;
		height: 60upx;
		z-index: 1;
		transition: all .3s;
	}

	.count-pub{
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		width: 60upx;
		height: 100%;
		text-align: center;
		font-size: 20px;
		display: inline-block;
		background-color: #F6F6F6;
		line-height: 60upx;
	}
	.count-less{
		left: 0;
		border-top-left-radius:4px;
		border-bottom-left-radius:4px;
	}
	.count-add{
		right: 0;
		border-top-right-radius:4px;
		border-bottom-right-radius:4px;
	}
	.count-input{
		width: 60upx;
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		padding: 6rpx 10rpx;
		box-sizing: border-box;
		color: #333;
		font-size: 28upx;
		text-align: center;
	}
</style>
