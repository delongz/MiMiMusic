<template>
	<view class="musichead" :style="{'color':color,'backgroundColor':bgColor}">
		<view v-if="icon" class="icon-head-bg">
			<text @tap="handleBack" class="iconfont icon-31fanhui1"></text> | <text @tap="handleHome" class="iconfont icon-icon_home"></text>
		</view>
		<text class="title">
			{{title}}
		</text>
	</view>
</template>

<script>
	import '../../common/iconfont/iconfont.css'
	export default {
		name:"musichead",
		props:['icon','title','color','bgColor'],
		data() {
			return {
				
			};
		},
		methods:{
			// 返回处理按键
			handleBack(){
				uni.navigateBack()
			},
			
			// 回到主页
			handleHome(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="less">
	.musichead{
		position: relative;
		width: 100%;
		height: 120rpx;
		color: black;
		font-size: 38rpx;
		text-align: center;
		line-height: 130rpx;
		padding-top: 40rpx;
		.icon-head-bg{
			position: absolute;
			display: flex;
			justify-content: space-around;
			left: 40rpx;
			top: 75rpx;	
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			background-color: rgba(0,0,0,0.3);
			color: #f5f5f5;
			padding-right:15rpx;
			.iconfont{
				font-size:40rpx;
				
			}
		}
		.title{
			display: inline-block;
			width: 300rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	
</style>
