<template>
	<!-- 更多拼团 -->
	<view class="group-more">
		<view class="participate-info" v-for="(item,index) in pt_list" :key="index">
			<view class="participate-name">
				<image :src="item.member_avatar" mode=""></image>
				<text class="fn-sz-28 fn-cl-333">{{item.member_nickname}}</text>
			</view>
			<view class="go-group">
				<view class="fn-sz-22 fn-cl-333">参团时间：{{item.create_time}}</view>
				<view class="fn-sz-22 fn-cl-999">成团时间：{{item.finish_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				spu_id:'',
				page:1,
				pt_list:[],//拼团列表
			}
		},
		onLoad(options){
			this.spu_id=options.spu_id;
			this.getlist();
		},
		methods:{
			getlist(){
				this.$api.teamList({
					spu_id:this.spu_id,
					page:this.page,
					page_size:10
				}).then(res=>{
					this.pt_list=res.data.data;
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.group-more {
		width: 100%;
		display: flex;
		flex-direction: column;

		.participate-info {
			display: flex;
			justify-content: space-between;
			margin: 20upx 0upx;
			padding: 10px;
			padding-top: 0;
			.participate-name {
				display: flex;

				image {
					width: 82upx;
					height: 82upx;
					border-radius: 50%;
					margin: auto;
				}

				text {
					margin: auto 10upx;
				}
			}

			.go-group {
				display: flex;
				flex-direction: column;
				padding: 10upx 20upx;
			}
		}

	}
</style>
