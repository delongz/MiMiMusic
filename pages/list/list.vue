<template>
	<view class="list" :style="{backgroundImage:`url(${songList.coverImgUrl})`}">
		<musichead title="排行榜" :icon='true'></musichead>
		<view class="list-container">
			<view class="list-header">
				<view class="cover" :style="{backgroundImage:`url(${songList.coverImgUrl})`,backgroundSize:'260rpx'}">
					<text class="listenNum">▷{{songList.playCount | formatNum}}</text>
				</view>
				<view class="list-info">
					<text class="list-title">{{songList.name}}</text>
					<view class="list-name">
						<image class="list-name-img" :src="songList.creator.avatarUrl"></image>
						<text class="list-name-author">{{songList.creator.nickname}}</text>
					</view>
					<view class="list-details">
						<text>{{songList.description}}</text>
					</view>
				</view>
			</view>
			<view class="song-list">
				<view class="paly-all">
					<text class="iconfont icon-bofang1"></text>
					<text class="play-all-word">播放全部</text>
					<text class="play-all-num">(共{{songList.trackCount}}首)</text>
				</view>
				<view class="song-item" 
				v-for="(song,index) in songList.tracks" :key="song.id" 
				@tap="handleSong(songList.tracks[index].id)"
				>
					<view class="song-item-index">{{index+1}}</view>
					<view class="song-item-name">
						<text class="music-name">{{song.name}}</text>
						<view class="music-author">
							<!--图标过滤-->
							<image v-if=" privileges[index].flag > 60 && privileges[index].flag < 70" src="../../static/dujia.png" mode=""></image>
							<image v-if="privileges[index].maxbr == 999000" src="../../static/sq.png" mode=""></image>
							<text>{{song.ar[0].name}}-{{song.name}}</text>
						</view>
					</view>
					<view class="song-item-play">
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// iconfont
	import '../../common/iconfont/iconfont.css'
	// 音乐头部组件
	// import musichead from '../../components/musichead/musichead.vue'
	// 获取api
	import { songList } from'../../common/api/api.js'
	export default {
		data() {
			return {
				// 背景图
				songList:{
					coverImgUrl:'',
					trackCount:'',
					creator:''
				},
				privileges:[]
			}
		},
		onLoad(playList) {
			// 获取传来的ID
			// console.log(playList)
			let listId = playList.id
			// 获取歌单列表
			songList(listId).then((res)=>{
				if(res[1].data.code == 200){
					this.songList = res[1].data.playlist
					this.privileges = res[1].data.privileges
					this.$store.commit('INIT_CHANGE',this.songList.trackIds)
					// console.log(this.songList.trackIds)
				}
			})
		},
		methods: {
			// 跳转至播放页
			handleSong(songId){
				return uni.navigateTo({
					url:"../detail/detail?id="+songId
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.list{background-repeat: no-repeat;}
	.list-container{
			// background-color: #007AFF;
			padding-bottom: 30rpx;
		.list-header{
			width: 95%;
			margin: 0 auto;
			position: relative;
			height: 400rpx;
			overflow: hidden;
			.cover{
				margin:50rpx  20rpx;
				width: 260rpx;
				height: 260rpx;
				background-color: #555555;
				// background:url('../../static/images/yes.jpg');
				border-radius: 20rpx;
				.listenNum{
					margin: 10rpx;
					font-size: 28rpx;
					float: right;
				}
			}
			.list-info{
				position: absolute;
				top:60rpx;
				left: 320rpx;
				.list-title{
					font-size: 38rpx;
					color: white;
				}
				.list-name{
					margin-top:30rpx;
					overflow: hidden;
					width: 220rpx;
					height: 60rpx;
					display: flex;
					.list-name-img{
						border-radius: 50%;
						width: 40rpx;
						height: 40rpx;
					}
					.list-name-author{
						font-size: 28rpx;
						margin-left: 15rpx;
						color: #7a7a7a;
					}
				}
			}
			.list-details{
				font-size: 26rpx;
				color: #757575;
				line-height: 35rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				width: 350rpx;
				height: 120rpx;
			}
		}
		.song-list{
			padding: 0 3%;
			background-color: white;
			padding-top: 30rpx;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			overflow: hidden;
			.paly-all{
				line-height: 50rpx;
				// margin-bottom: 40rpx;
				.icon-bofang1{
					font-size: 42rpx;
					font-weight: 600;
				}
				.play-all-word{
					font-size: 36rpx;
					margin-left: 30rpx;
					margin-right: 15rpx;
				}
				.play-all-num{
					font-size: 28rpx;
					color: #999;
				}
			}
			.song-item{
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				margin: 35rpx 0;
				.song-item-index{
					flex: 1;
					font-size: 36rpx;
					color: #777;
				}
				.song-item-name{
					position: relative;
					flex: 8;
				
					.music-name{
						display: inline-block;
						font-size: 30rpx;
						width: 500rpx;
						height: 50rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.music-author{
						width: 400rpx;
						height: 28rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						position: absolute;
						padding: 10rpx 0;
						top: 40rpx;
						left: 0;
						font-size: 26rpx;
						color: #777;
						image{
							width: 30rpx;
							height: 20rpx;margin-right: 5rpx;
						}
					}
				}
				.song-item-play{
					flex: 1;
					.icon-bofang{
						line-height: 90rpx;
						font-size: 46rpx;
						color: #777;
					}
				}
			}
		}
	}
	
</style>
