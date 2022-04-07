import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	// 初始数据
	state:{
		idSongList:[],  //播放列表
		nextId:''  		//下一首歌曲ID
	},
	
	mutations:{
		// 歌单列表
		INIT_CHANGE(state,payload){
			state.idSongList = payload
		},
		
		// 自动播放下一首
		NEXT_ID(state,payload){
			// 遍历所有歌曲ID
			for(var i=0;i<state.idSongList.length;i++){
				// 如果传递过来的ID值相等，切下一首
				if(payload == state.idSongList[i].id){
					state.nextId = state.idSongList[i+1].id
				}
			}
		}
	}

})