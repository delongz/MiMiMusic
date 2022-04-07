<template>
	<view class="detail" :style="{background:'#f1f1f1'}">
		<musichead :title="songList.name" color="#black" :icon='true'></musichead>	
		<view class="play-container" v-show="!isLoading">
			<image class="logo" src="../../static/logo.png"></image>
			<view class="paly-jukebox" @tap="handleToPlay">
				<image class="part3" :src="songList.al.picUrl" :class="{'play-run':isPlayRotate}"></image>
				<image class="part2" src="../../static/disc.png" mode=""></image>
				<image class="part1" src="../../static/needle.png" mode=""></image>
				<text class="iconfont" :class="playIcon"></text>				
			</view>
			<!-- 歌詞 -->
			<view class="paly-lyric" >
				<view class="play-lyric-y" :style="{transform:'translateY('+ (-lyricIndex+1)*73 +'rpx)'}">
					<view
					class="play-lyric-item"
					:class="{active:lyricIndex == index}"
					v-for="(word,index) in songLyric" 
					:key="index"
					> {{word.lyric}}
					</view>
				</view>
			</view>
			<view class="word">喜欢这首歌的人也听</view>
			<view class="play-like" v-for="(simi,index) in songSimi" :key="index">
				<image :src="simi.album.blurPicUrl" class="play-like-img"></image>
				<view class="song-item-name">
					<text class="music-name">{{simi.name}}</text>
					<view class="music-author">
						<!--图标过滤-->
						<!-- <image v-if=" privileges[index].flag > 60 && privileges[index].flag < 70" src="../../static/dujia.png" mode=""></image>
						<image v-if="privileges[index].maxbr == 999000" src="../../static/sq.png" mode=""></image> -->
						<text>{{simi.artists[0].name}}-{{simi.name}}</text>
					</view>
				</view>
				<view class="song-item-play">
					<text class="iconfont icon-bofang"></text>
				</view>
			</view>
			
			<view class="word">精彩评论</view>
			<view class="play-comment" v-for="(item,index) in songComment" :key="item.commentId">
				<view class="play-comment-author">
					<image :src="item.user.avatarUrl" mode=""></image>
					<view class="comment-author-left">
						<text class="comment-name">{{item.user.nickname}}</text>
						<text class="comment-time">{{item.time | formatTime}}</text>
					</view>
					<view class="comment-author-right">
						<text class="right-num">{{ item.likedCount | formatNum }}</text>
						<text class="iconfont icon-dianzan"></text>
					</view>
				</view>
				<view class="comment-conent">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import '../../common/iconfont/iconfont.css'
	import {songDetail,songUrl,songSimi,songComment,songLyric} from '../../common/api/api.js'
	export default {
		data() {
			return {
				songList:{
					al:{picURl:''}
				},
				playIcon :'icon-bofang2',   //播放默认图标
				isPlayRotate: true,   //默认旋转暂停
				songSimi:[],
				songComment:[],
				songLyric:[],   //歌词转换成秒的时间点数组
				lyricIndex:0,    //歌词选中状态
				isLoading: true  //加载状态
			}
		},
		onLoad(options) {
			this.clearLyricIndex()
			// 等待加载
			uni.showToast({
				title:'加载中...'
			})
			this.playMusic(options.id)
		},
		// 离开页面，返回上一级
		onUnload(){
			this.clearLyricIndex()
			// #ifdef H5 
			this.bgAudioMannager.destroy()
			// #endif
		},
		// 返回首页的时候
		onHide() {
			this.clearLyricIndex()
			// #ifdef H5
			this.bgAudioMannager.destroy()
			// #endif
		},
		methods: {
			playMusic(songId){
				// 保留歌手ID，获得下一个播放的歌曲
				this.$store.commit('NEXT_ID',songId)
				console.log(songId)
				// 等待加载
				uni.showToast({
					title:'加载中...'
				})
				// 加载窗口
				this.isLoading=true
				// 判断所有接口
				Promise.all([songDetail(songId),songUrl(songId),songSimi(songId),songComment(songId),songLyric(songId)]).then((res)=>{
					// 歌曲详情页
					if(res[0][1].data.code == 200){
						this.songList = res[0][1].data.songs[0]
					}
					// 歌曲URL
					if(res[1][1].data.code == 200){
						// #ifdef MP-WEIXIN
						this.bgAudioMannager = uni.getBackgroundAudioManager()
						this.bgAudioMannager.title = this.songList.name
						// #endif
						// #ifdef H5
						if(!this.bgAudioMannager){
							// 创建并返回上下文
							this.bgAudioMannager = uni.createInnerAudioContext()
						}
						this.playIcon = 'icon-bofang2'
						this.isPlayRotate = false
						// #endif
						// this.bgAudioMannager.autoplay = true
						this.bgAudioMannager.src = res[1][1].data.data[0].url
						this.listenLyricIndex()
						// 监听播放事件
						this.bgAudioMannager.onPlay(()=>{
							this.playIcon = 'icon-bofang3'
							this.isPlayRotate = true
							this.listenLyricIndex()
						})
						// 监听暂停事件
						this.bgAudioMannager.onPause(()=>{
							this.playIcon = 'icon-bofang2'
							this.isPlayRotate = false
							this.clearLyricIndex()
						})
						// 监听上一首播放完之后，从vuex中调取下一曲
						this.bgAudioMannager.onEnded(()=>{
							this.playMusic(this.$store.state.nextId)
							uni.showToast({
								title:'即将播放下一首'
							})
						})
					}
					 // 相似歌曲
					if(res[2][1].data.code == 200){
						this.songSimi = res[2][1].data.songs
					}
					// 精彩评论
					if(res[3][1].data.code == 200){
						this.songComment = res[3][1].data.hotComments
						// console.log(res[3][1].data.hotComments[0].user.nickname)
					}
					// 歌词滚动
					if(res[4][1].data.code == 200){
						// 定义歌词
						let lyric = res[4][1].data.lrc.lyric
						// 定义时间
						let result = []
						// 定义正则分割歌词
						let re = /\[([^\]]+)\]([^[]+)/g;
						// $0表示第一个小括号的结果，$1表示第二个小括号的结果，$2表示歌词
						lyric.replace(re,($0,$1,$2)=>{
							result.push({time:this.formatTimeToSec($1), lyric:$2})
						})
						this.songLyric = result
						// 加载完成
						this.isLoading =false
					}
				})
			},
			// 监听点击暂停和开始
			handleToPlay(){
				// 如果暂停就开始，反之暂停
				if(!this.bgAudioMannager.paused){
					this.bgAudioMannager.pause()
				}else{
					this.bgAudioMannager.play()
				}
			},
			// 转化成秒的方法
			formatTimeToSec(time){
				let arr = time.split(':')
				// 将时间转化为数字再将其格式化一个数值
				return (parseFloat(arr[0])*60+parseFloat(arr[1])).toFixed(2)
			},
			// 利用节流实现监听慢加载
			listenLyricIndex(){
				clearInterval(this.timer)
				// 每五百毫秒监听一次歌词
				this.timer = setInterval(()=>{
					// 遍历歌词
					for(let i=0;i<this.songLyric.length;i++){
						// 如果时间小于最后一首歌的时间
						if(this.songLyric[this.songLyric.length-1].time < this.bgAudioMannager.currentTime){
							this.lyricIndex = this.songLyric.length-1
							break
						}
						// 播放时间小于上一条歌词
						if(this.songLyric[i].time < this.bgAudioMannager.currentTime && this.songLyric[i+1].time > this.bgAudioMannager.currentTime){
							this.lyricIndex = i
						}
					}
				},500)
			},
			// 防止暂停时定时器还在工作
			clearLyricIndex(){
				clearInterval(this.timer)
			}
		}
	}
</script>

<style lang="less" scoped>
	.play-container {
		width: 95%;
		margin: 0 auto;
		color: white;
		.logo {
			width: 200rpx;
			height: 110rpx;
		}

		.paly-jukebox {
			position: relative;
			text-align: center;

			
			.part1 {
				position: absolute;
				top: -90rpx;
				left: 390rpx;
				width: 140rpx;
				height: 300rpx;
			}

			.part2 {
				padding-top: 30rpx;
				width: 600rpx;
				height: 600rpx;
			}

			.part3 {
				position: absolute;
				border-radius: 50%;
				top: 130rpx;
				left: 150rpx;
				width: 400rpx;
				height: 400rpx;
				animation:10s linear infinite move;
				animation-play-state: paused;
			}
			.play-run{
				animation-play-state: running;
			}
			@keyframes move{
				from{transform:rotate(0deg);}
				to{transform:rotate(360deg);}
			}
			
			.iconfont {
				position: absolute;
				top: 250rpx;
				left: 270rpx;
				color: rgba(255,255,255,0.8);
				font-size: 160rpx;
			}
		}

		.paly-lyric {
			text-align: center;
			margin: 30rpx;
			height: 219rpx;
			overflow: hidden;
			line-height: 73rpx;
			.play-lyric-y{
				transition: .5s;
				.play-lyric-item {
					height: 73rpx;
					color: rgb(148, 148, 149);
				}
				.active {
					color: black;
					font-size: 34rpx;
				}
			}
			
			
		}

		.word {
			color: black;
			font-size: 36rpx;
			padding: 20rpx 0;
		}

		.play-like {
			color: black;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			margin:20rpx 0;
			
			.play-like-img{
				margin: 0 15rpx;
				border-radius: 15rpx;
				width: 80rpx;
				height: 80rpx;
			}
			.song-item-name {
				position: relative;
				flex: 8;

				.music-name {
					display: inline-block;
					font-size: 30rpx;
					width: 500rpx;
					height: 50rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.music-author {
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

					image {
						width: 30rpx;
						height: 20rpx;
						margin-right: 5rpx;
					}
				}
			}

			.song-item-play {
				flex: 1;

				.icon-bofang {
					line-height: 90rpx;
					font-size: 46rpx;
					color: #777;
				}
			}
		}
		
		.play-comment{
			padding: 20rpx 0;
			border-bottom: 1rpx solid rgba(0,0,0,0.1);
			border-radius: 2rpx;
			.play-comment-author{
				display: flex;
				image{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
				.comment-author-left{
					margin-left: 15rpx;
					flex: 8;
					color: #555;
					.comment-name{
						width: 100rpx;
						height: 25rpx;
						font-size: 28rpx;
					}
					.comment-time{
						display: block;
						font-size: 24rpx;	
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #737373;
						padding: 3rpx 0;
					}
				}
				.comment-author-right{
					color: #777;
					font-size: 28rpx;
					line-height: 60rpx;
					.icon-dianzan{
						font-size: 40rpx;
					}
				}
			}
			.comment-conent{
				margin-left: 40rpx;
				padding: 10rpx 5rpx;
				color: #444;
				font-size: 30rpx;
			}
		}
	}
</style>
