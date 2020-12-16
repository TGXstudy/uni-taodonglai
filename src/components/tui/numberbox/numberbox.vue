<template>
	<view class="tui-numberbox-class tui-numberbox" @tap.stop="">
		<view
			class="tui-numbox-icon tui-icon-reduce "
			:class="[disabled || min>=val?'tui-disabled':'']"
			@tap="reduce"
			:style="{color:iconcolor,fontSize:px(iconsize)}"
		></view>
		<view class="cover-box" v-if="!isFocus" @tap="getFoucs">{{val}}</view>
		<input v-else="" type="number" :focus="isFocus" v-model="val" :disabled="disabled" @blur="blur" class="tui-num-input" :style="{color:color,fontSize:px(iconsize),background:bgcolor,height:px(height),width:px(width)}" />
		<view
			class="tui-numbox-icon tui-icon-plus"
			:class="[disabled || val>=max?'tui-disabled':'']"
			@tap="plus"
			:style="{color:iconcolor,fontSize:px(iconsize)}"
		></view>
	</view>
</template>

<script>
	export default {
		name: "numberbox",
		props: {
			value: {
				type: Number,
				default: 1
			},
			//最小值
			min: {
				type: Number,
				default: 0
			},
			//最大值
			max: {
				type: Number,
				default: 100
			},
			//迈步大小 1 1.1 10...
			step: {
				type: Number,
				default: 1
			},
			//是否禁用操作
			disabled: {
				type: Boolean,
				default: false
			},
			//加减图标大小 rpx
			iconsize: {
				type: Number,
				default: 24
			},
			iconcolor: {
				type: String,
				default: "#333"
			},
			//input 高度
			height: {
				type: Number,
				default: 50
			},
			//input 宽度
			width: {
				type: Number,
				default: 90
			},
			//input 背景颜色
			bgcolor: {
				type: String,
				default: "#f2f2f2"
			},
			//input 字体颜色
			color: {
				type: String,
				default: "#333"
			}
		},
		computed: {
			
		},
		watch: {
			value(newValue, oldValue) {
				this.val = newValue;
			}
		},
		data() {
			return {
				val: this.value,
				isFocus: false
			};
		},
		methods: {
			px(num) {
				return uni.upx2px(num) + "px"
			},
			getFoucs(){
				this.isFocus = true;
			},
			getScale() {
				let scale = 1;
				//浮点型
				if (!Number.isInteger(this.step)) {
					scale = Math.pow(10, (this.step + '').split('.')[1].length)
				}
				return scale;
			},
			calcNum: function(type) {
				if (this.disabled) {
					return
				}
				const scale = this.getScale()
				let num = this.val * scale
				let step = this.step * scale
				if (type === 'reduce') {
					num -= step
				} else if (type === 'plus') {
					num += step
				}
				let value = num / scale
				if (value < this.min || value > this.max) {
					return
				}
				this.val = value;
				console.log(this.val);
				this.handleChange(value, type)
			},
			plus: function() {
				this.calcNum("plus")
			},
			reduce: function() {
				this.calcNum("reduce")
			},
			blur: function(e) {
				let value = e.detail.value
				if (value) {
					value = +value
					if (value > this.max) {
						value = this.val = this.max
					} else if (value < this.min) {
						value = this.val = this.min
					}
				} else {
					value = this.val = this.min
				}
				this.isFocus = false;
				this.handleChange(value, "blur")
			},
			handleChange(value, type) {
				if (this.disabled) {
					return
				}
				this.$emit('change', {
					value: value,
					type: type
				})
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'numberbox';
		src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAASQAA0AAAAABtwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEdAAAABoAAAAciBpnRUdERUYAAARUAAAAHgAAAB4AKQALT1MvMgAAAZwAAABDAAAAVjxzSINjbWFwAAAB9AAAAEYAAAFK5zLpOGdhc3AAAARMAAAACAAAAAj//wADZ2x5ZgAAAkgAAACHAAAAnIfIEjxoZWFkAAABMAAAAC8AAAA2FZWEOWhoZWEAAAFgAAAAHAAAACQH3gOFaG10eAAAAeAAAAARAAAAEgwAAAFsb2NhAAACPAAAAAwAAAAMADAATm1heHAAAAF8AAAAHwAAACABEAAobmFtZQAAAtAAAAFJAAACiCnmEVVwb3N0AAAEHAAAAC0AAABV/+8iFXjaY2BkYGAA4gVmC5Tj+W2+MnCzMIDATWsFOQT9v5GFgbkeyOVgYAKJAgDrogf+AHjaY2BkYGBu+N/AEMPCAAJAkpEBFbAAAEcKAm142mNgZGBgYGWQYQDRDAxMQMwFhAwM/8F8BgALpAE5AHjaY2BkYWCcwMDKwMDUyXSGgYGhH0IzvmYwYuQAijKwMjNgBQFprikMDs9Yn01kbvjfwBDD3MDQABRmBMkBAOXpDHEAeNpjYYAAFghmZGAAAACdAA4AAAB42mNgYGBmgGAZBkYGEHAB8hjBfBYGDSDNBqQZGZiesT6b+P8/AwOElvwnWQxVDwSMbAxwDiMTkGBiQAWMDMMeAABRZwszAAAAAAAAAAAAAAAwAE542iWKQQrCMBBF5xNpd0pQ7EIoTEnahSCTUNqdWz2A9TrieXKeXCc1qcPn/zfzh0BYv2pVH7oQgbvqdG5Yt/DTrNlPYz+wHvuuqhFSME4sFshTgKUsKfhH5lg8BSul3i5bS3mQdd0RIh2IjnvUrkXDd8zuhuFt86tY9fonIsSYgsXpB+cCGosAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMwiWZmJQJRXVQoigTgjMd9QGIsgAFDsEBsAAAAAAAAB//8AAgABAAAADAAAABYAAAACAAEAAwAEAAEABAAAAAIAAAAAeNpjYGBgZACCq0vUOUD0TWsFORgNADPBBE4AAA==) format('woff');
		font-weight: normal;
		font-style: normal;
	}

	.tui-numbox-icon {
		font-family: "numberbox" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 10upx;
	}

	.tui-icon-reduce:before {
		content: "\e691";
	}

	.tui-icon-plus:before {
		content: "\e605";
	}

	.tui-numberbox {
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
	}

	.tui-num-input {
		text-align: center;
		margin: 0 10upx;
		font-size: 26upx;
	}

	.tui-disabled {
		color: #ededed !important;
	}
	.tui-numberbox{
		width: 192upx;
		height: 48upx;
		border-radius: 10upx;
		border:2upx solid rgba(240,240,240,1);
	}
	.tui-numbox-icon{
		min-width: 52upx;
		align-items: center;
		justify-content: center;
		width: 52upx;
		height: 100%;
	}
	.tui-num-input{
		margin: 0;
		background: white !important;
		width: 84upx !important;
		min-height: 100% !important;
		height: 100% !important;
		border-left: 2upx solid rgba(240,240,240,1);
		border-right: 2upx solid rgba(240,240,240,1);
		line-height: 44upx;
	}
	.cover-box{
		flex: 1;
		justify-content: center;
		border-left: 2upx solid rgba(240,240,240,1);
		border-right: 2upx solid rgba(240,240,240,1);
		align-items: center;
		font-size: 25upx;
		font-family: UICTFontTextStyleBody;
		height: 100%;
	}
</style>
