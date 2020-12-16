<template>
	<view>
		<uni-popup class="uni-popup" ref="popup" type="center" @close="payPassword = ''">
			<!-- 支付弹窗 -->
			<view class=" wrapper">
				<view class="pay-wrapper">
					<view class="modal-title">输入支付密码</view>
					<view class="modal-main">
						<input class="password-input" focus type="number" maxlength="6" v-model="payPassword" />
						<view class="password-input-wrapper">
							<view class="password-input-item" v-for="(item, index) in 6" :key="index"><view class="input-item-dot" v-if="payPassword[index]"></view></view>
						</view>
					</view>
					
				</view>
				<view>
					<view class="modal-btns fn-sz-28 fn-cl-fff">
						<view class="common-btn cancle-btn"  @tap="close">取消</view>
						<view  class="common-btn" @tap="confirmPay">确认</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import UniPopup from '@/components/tui/uni-popup/uni-popup';
export default {
	name: 'PwdInput',
	components: {
		UniPopup
	},
	data() {
		return {
			payPassword: ''
		};
	},
	methods: {
		// 确认支付
		confirmPay() {
			if (this.payPassword == '') {
				this.$mUtils.toast('请输入支付密码');
				return false;
			}
			if (this.payPassword.length < 6) {
				this.$mUtils.toast('支付密码为6位数纯数字');
				return;
			}
			this.$emit('confirmPay', this.payPassword);
			this.payPassword=''
		},
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
			this.payPassword=''
		}
	}
};
</script>

<style lang="scss">
.uni-popup {
	
	/deep/.uni-popup__wrapper-box{
		border-radius: 8upx !important;
	}
	.wrapper{
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}
	.pay-wrapper {
		flex-direction: column;
		width: 606upx;
		background: white;
		border-radius: 10upx;
		padding: 0 30upx;
		padding-bottom: 20upx;
		.modal-title {
			display: block;
			width: 100%;
			text-align: center;
			font-weight: bolder;
			font-size: 30upx;
			line-height: 90upx;
		}
		.modal-main {
			position: relative;
			margin-top: 25upx;
			margin-bottom: 25upx;
			width: 100%;
			height: 89upx;
			border: 2upx solid rgba(204, 204, 204, 1);
			border-radius: 5upx;
			.password-input {
				position: absolute;
				left: -200%;
				top: 0;
				width: 300%;
				height: 100%;
				z-index: 100;
				opacity: 0;
			}
			.password-input-wrapper {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				.password-input-item {
					justify-content: center;
					align-items: center;
					flex: 1;
					border-right: 2upx solid #cccccc;
					&:last-child {
						border: 0;
					}
					.input-item-dot {
						width: 16upx;
						height: 16upx;
						background: rgba(0, 0, 0, 1);
						border-radius: 50%;
					}
				}
			}
		}
		
	}
	.modal-btns {
		width: 100%;
		margin-top: 10upx;
		justify-content: space-between;
		height: 90upx;
		border-top: 2upx solid #F5F5F5;
		.common-btn {
			justify-content: center;
			width: 50%;
			background-color: #FA5E09;
			align-items: center;
		}
		.cancle-btn{
			background-color: #f6f6f6;
			color: #999;
		}
	}
}
</style>
