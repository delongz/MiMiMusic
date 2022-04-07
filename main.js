import App from './App'
import Vue from 'vue'
import store from './store/index/index.js'

// 数字过滤器
Vue.filter('formatNum',function(value){
	// 在万和亿之间使用万表示
	if(value>10000 && value<100000000){
		value /= 10000
		return value.toFixed(0) + '万'
	}else if(value>100000000){
		value /= 100000000
		return value.toFixed(0) + '亿'
	}else{
		return value
	}
})

// 时间过滤器
Vue.filter('formatTime',function(value){
	let date = new Date(value)
	return date.getFullYear()+'年'+ (date.getMonth()+1)+'月' + date.getDay() +'日'
})

Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
