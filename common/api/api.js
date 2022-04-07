import {
	baseUrl
} from '../config/config.js'

// 获取排行榜
export function topList() {
	// 获取排行榜的列表4位
	let listIds = [' 19723756', '3779629', '2884035', '3778678']
	return new Promise(function(resolve, reject) {
		uni.request({
			//分类列表的接口
			url: `${baseUrl}/toplist/detail`,
			// 请求方式
			method: 'GET',
			// 数据类型
			data: {},
			success: res => {
				let result = res.data.list
				result.length = 4
				for (let i = 0; i < result.length; i++) {
					result[i].listId = listIds[i]
				}
				resolve(result)
			},
			fail: err => {
				console.log(err)
			}
		})
	})
}

// 获取今日推荐
export function newSong() {
	return uni.request({
		url: `${baseUrl}/personalized/newsong?limit=3`,
		method: 'GET'
	})
}

// 轮播图
export function bannerPic() {
	return uni.request({
		url:`${baseUrl}/banner?type=2`,
		method:'GET',
		// success:res=>{
		// 	return res.data
		// 	console.log(res.data)
		// }
	})
}

// 排行榜獲取列表
export function songList(listId){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=${listId}`,
		method:'GET'
	})
}

// 歌曲詳情
export function songDetail(songId){
	return uni.request({
		url:`${baseUrl}/song/detail?ids=${songId}`,
		method:'GET'
	})
}

// 获取音频地址
export function songUrl(songId){
	return uni.request({
		url : `${baseUrl}/song/url?id=${songId}`,
		method : 'GET'
	})
}

// 获取相似音乐
export function songSimi(songId){
	return uni.request({
		url:`${baseUrl}/simi/song?id=${songId}`,
		method:'GET'
	})
}

// 精彩评论
export function songComment(songId){
	return uni.request({
		url : `${baseUrl}/comment/music?id=${songId}`,
		method : 'GET'
	})
}

// 获取歌词
export function songLyric(songId){
	return uni.request({
		url : `${baseUrl}/lyric?id=${songId}`,
		method : 'GET'
	})
}