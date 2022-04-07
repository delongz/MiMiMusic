<template>
	<view class="home">
		<musichead class="musichead" bgColor="#479aff" color="white" title="MiMiMusic"></musichead>
		<scroll-view class="container">
			<view class="header">
				<view class="left">
					<text class="iconfont icon-yonghu"></text>
					<text class="user-name">未登录</text>
				</view>
		
				<view class="right">
					<text class="iconfont icon-sousuo"></text>
					<input type="text" placeholder="请输入歌名/歌手/ID" />
				</view>
			</view>
			<!-- 轮播图 -->
			<swiper class="swipper" 
			indicator-dots indicator-color="rgba(0,0,0,0.3)" 
			indicator-active-color="#777" 
			autoplay
			>
				<swiper-item v-for="(banner,index) in banners" :key="banner.bannerId">
					<cover-image class="swipper-img" :src="banner.pic" mode=""></cover-image>
				</swiper-item>
			</swiper>
		
			<!-- 今日推荐 -->
			<view class="tody-recommend">
				<text class="word">新歌速递</text>
				<view class="today-container" v-for="(song,index) in newSong" :key="song.id" @tap="handleSong(song.song.id)">
					<view class="today-pic">
						<image :src="song.picUrl" mode="aspectFit"></image>
						<text class="iconfont icon-bofangqi-bofang"></text>
					</view>
					<view class="today-music">
						<text class="today-name">{{song.name}}</text>-
						<block  v-for="(name,index) in song.song.artists" :key="name.id">
							<text class="today-author">{{name.name}} {{' /'}}</text>
						</block>
					</view>
				</view>
			</view>
		
			<!-- 排行榜 -->
			<view class="ranking-container">
				<text class="word">排行榜</text>
			</view>
			<!-- 骨架屏 -->
			<view class="skeleton" v-if="loading">
				<m-for-skeleton :avatarSize="200" :row="3" :loading="loading" :title="false" :titleStyle="{}" isarc="square"
					v-for="(item,key) in 4" :key="key">
				</m-for-skeleton>
			</view>
			<!-- 排行榜列表 -->
			<view v-else class="top-list" v-for="(list,index) in topList" :key="list.id" @tap="handlerList(list.id)">
				<view class="toplist-image">
					<image :src="list.coverImgUrl" mode=""></image>
					<text class="toplist-image-word">{{list.updateFrequency}}</text>
				</view>
				<view class="toplist-name">
					<view class="toplist-name-item" v-for="(name,index) in list.tracks" :key="index">
						{{index+1}}.&nbsp;{{name.first}}- {{name.second}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont/iconfont.css'
	// 骨架屏
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton";
	// 引入排行榜数据
	import {
		topList,
		newSong,
		bannerPic
	} from '../../common/api/api.js'
	export default {
		components: {
			mForSkeleton
		},
		data() {
			return {
				// 骨架屏是否显示
				loading: true,
				topList: [],
				newSong:[],
				banners:[]
			}
		},
		onLoad() {			
			// 排行榜的结果
			topList().then((res) => {
				if (res.length) {
					setTimeout(() => {
						this.topList = res
						this.loading = false
					}, 1000)
				}
			})
			
			// 新歌速递
			newSong().then((res)=>{
				if(res[1].data.code == '200'){
					this.newSong = res[1].data.result
				}
			})
			
			// 轮播图
			bannerPic().then((res)=>{
				if(res[1].data.code == '200'){
					this.banners = res[1].data.banners
				}
			})
		},
		methods: {
			// 排行榜页面跳转
			handlerList(listId){
				uni.navigateTo({
					url:'/pages/list/list?id='+listId
					
				})
			},
			// 点击歌曲详情页
			handleSong(songId){
				console.log(songId)
				return uni.navigateTo({
					url:'../detail/detail?id='+songId
				})
			}
		}
	}
</script>

<style lang="less">
	.container {
		width: 95%;
		margin: 0 auto;
		.header {
			width: 100%;
			height: 80rpx;
			display: flex;
			margin-top: 10rpx;
			justify-content: space-between;

			.left {
				height: 80rpx;
				// width: 200rpx;
				align-items: center;
				justify-content: center;
				display: flex;

				.icon-yonghu {
					font-size: 50rpx;
					color: #1296db
				}
				
				.user-name{
					width: 105rpx;
					height: 80rpx;
					line-height: 86rpx;
					margin-left: 5rpx;
					overflow: hidden;
					font-size: 28rpx;
					color: #888;
				}
			}

			.right {
				margin: auto 0rpx;
				width: 400rpx;
				height: 56rpx;
				border: 1px solid #1296db;
				border-radius: 26rpx;
				display: flex;
				line-height: 56rpx;
				
				text {
					color: #1296db;
					font-size: 40rpx;
					margin: 0 20rpx;
				}

				input {
					font-size: 26rpx;
					margin: auto 0;
				}
			}
		}

		.word {
			font-size: 36rpx;
			color: #1296db;
		}

		swiper {
			// width: 100%;
			height: 300rpx;
			margin: 10rpx 0;

			swiper-item {
				width: 100%;

				.swipper-img {
					width: 100%;
					border-radius: 20rpx;
				}
			}
		}

		.tody-recommend {
			position: relative;
			margin-top: 40rpx;

			.today-container {
				position: relative;
				border: 2px solid rgba(0, 0, 0, 0.11);
				border-radius: 20rpx;
				margin: 10rpx 0;

				.today-pic {
					margin: 20rpx 20rpx;
					width: 120rpx;

					image {
						border-radius: 10rpx;
						width: 80rpx;
						height: 80rpx;

					}

					.icon-bofangqi-bofang {
						position: absolute;
						top: 34rpx;
						left: 32rpx;
						color: rgba(152, 152, 152, 0.5);
						font-size: 60rpx;
					}
				}

				.today-music {
					position: absolute;
					top: 38rpx;
					left: 150rpx;

					.today-name {
						color: #333;
						font-size: 32rpx;
					}

					.today-author {
						color: #666;
						font-size: 26rpx;
					}
				}
			}

			.today-container:active {
				border: 3px solid rgba(0, 0, 0, 0.11);
			}
		}

		.ranking-container {
			margin-top: 30rpx;
			margin-bottom: 10px;
		}
		
		
		.top-list {
			position: relative;
			display: flex;
			padding-bottom: 20rpx;
			margin: 20rpx 0;
			width: 100%;

			.toplist-image {
				position: relative;
				width: 212rpx;
				height: 208rpx;
				margin-left: 20rpx;
				margin-right: 25rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					border-radius: 30rpx;
				}

				text {
					position: absolute;
					bottom: 10rpx;
					left: 12rpx;
					color: rgb(253, 253, 253);
					font-size: 24rpx;
				}
			}

			.toplist-name {
				flex: 1;
				line-height: 73rpx;
				margin-left: 20rpx;

				.toplist-name-item {
					width: 60vw;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 28rpx;
					color: #444;
				}
			}
		}
	}
</style>
