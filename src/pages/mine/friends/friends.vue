<template>
	<view class="hy">
		<view class="top">
			<view class="left">
				<p class='one'>{{friends_info.total_friend_num}}</p>
				<p class='two'>好友总人数(人)</p>
			</view>
			<view class="middle" v-if="tabCurrentIndex!==3">
				<p class='one'>{{friends_info.total_in_score}}</p>
				<p  class='two'>总收益(积分)</p>
			</view>
		</view>
		<view class="tab">
			<view class="left" @click="tabClick(0)" :class="[ tabCurrentIndex == 0 ? 'cur-title':'']">
				<p class='one'>{{friends_info.type_1_num}}</p>
				<p class='two'>直推好友(人)</p>
			</view>
			<view class="middle" @click="tabClick(1)" :class="[ tabCurrentIndex == 1 ? 'cur-title':'']">
				<p class='one'>{{friends_info.type_2_num}}</p>
				<p  class='two'>间推好友(人)</p>
			</view>
			<view class="middle" @click="tabClick(2)" :class="[ tabCurrentIndex == 2 ? 'cur-title':'']">
				<p class='one'>{{friends_info.type_3_num}}</p>
				<p  class='two'>普通好友(人）</p>
			</view>
			<view class="right" @click="tabClick(3)" :class="[ tabCurrentIndex == 3 ? 'cur-title':'']">
				<p class='one'>{{friends_info.type_4_num}}</p>
				<p  class='two'>店铺好友(人）</p>
			</view>
		</view>
		<!-- 切换 -->
		<view class="bottom11">
			<friendsItem  :item="friends_info" :type="this.hytype"></friendsItem>
		</view>
	</view>
</template>
<script>
	import friendsItem from '@/components/mine/friendsItem.vue';
	export default{
		components: {
			friendsItem,
		},
		data(){
			return{
				hytype:1,
				tabCurrentIndex:0,
				friends_list:[],//好友列表
				friends_info:{},//好友详情
			}
		},
		onLoad(){
		this.get_myfriend()
		this.tabCurrentIndex=0;
		},
		methods:{
			get_myfriend(){
				this.$api.myFriend({
					type:this.tabCurrentIndex+1,
					page:1,
					page_size:100
				}).then(res=>{
					this.friends_info=res.data;
					//this.friends_list=res.data.list.data;
				})
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.get_myfriend()
				// if(index==0){
				// 	this.hytype=1
				// }
				// if(index==3){
				// 	this.hytype=4
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cur-title{
		.one{
			color: #FA5D09 !important;
		}
		.two{
			color: #FA5D09 !important;
		}
	}
	.hy{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.bottom11{
			width: 100%;
			padding: 10px;
			display: flex;
			flex-direction: column;
		}
		.tab{
			width: 95%;
			margin: 0 auto;
			margin-top: -10px;
			height: 100px;
			background:rgba(255,255,255,1);
			box-shadow:2px 12px 16px 0px rgba(245,245,245,0.4);
			border-radius:10px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.left{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
			
				border-right: 1px solid rgba(229,229,229,1);
				.one{
					font-size:30upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
			.middle{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				
				border-right: 1px solid rgba(229,229,229,1);
				.one{
					font-size:30upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:30upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
		}
		.top{
			width: 100%;
			height: 150px;
			background:linear-gradient(90deg,rgba(255,85,0,1),rgba(255,114,0,1));
			display: flex;
			justify-content: space-around;
			align-items: center;
			.left{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:42upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,247,241,1);
				}
			}
			.middle{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:38upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,247,241,1);
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				height: 60px;
				.one{
					font-size:38upx;
					font-family:DIN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.two{
					font-size:26upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,247,241,1);
				}
			}
		}
	}
</style>
