(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"05b9":function(n,t,e){},"0760":function(n,t,e){"use strict";e.r(t);var o=e("1387"),u=e("91d4");for(var a in u)"default"!==a&&function(n){e.d(t,n,(function(){return u[n]}))}(a);e("6058");var i,r=e("f0c5"),c=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=c.exports},1387:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}));var o={musichead:function(){return e.e("components/musichead/musichead").then(e.bind(null,"8c90"))},mForSkeleton:function(){return e.e("components/m-for-skeleton/m-for-skeleton").then(e.bind(null,"e51b"))}},u=function(){var n=this,t=n.$createElement,e=(n._self._c,n.loading?n.__map(4,(function(t,e){var o=n.__get_orig(t),u={};return{$orig:o,a0:u}})):null);n.$mp.data=Object.assign({},{$root:{l0:e}})},a=[]},"1fdc":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("2fdd");var o=e("bcad"),u=function(){e.e("components/m-for-skeleton/m-for-skeleton").then(function(){return resolve(e("e51b"))}.bind(null,e)).catch(e.oe)},a={components:{mForSkeleton:u},data:function(){return{loading:!0,topList:[],newSong:[],banners:[]}},onLoad:function(){var n=this;(0,o.topList)().then((function(t){t.length&&setTimeout((function(){n.topList=t,n.loading=!1}),1e3)})),(0,o.newSong)().then((function(t){"200"==t[1].data.code&&(n.newSong=t[1].data.result)})),(0,o.bannerPic)().then((function(t){"200"==t[1].data.code&&(n.banners=t[1].data.banners)}))},methods:{handlerList:function(t){n.navigateTo({url:"/pages/list/list?id="+t})}}};t.default=a}).call(this,e("543d")["default"])},"443e":function(n,t,e){"use strict";(function(n){e("5f9a");o(e("66fd"));var t=o(e("0760"));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e("543d")["createPage"])},6058:function(n,t,e){"use strict";var o=e("05b9"),u=e.n(o);u.a},"91d4":function(n,t,e){"use strict";e.r(t);var o=e("1fdc"),u=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=u.a}},[["443e","common/runtime","common/vendor"]]]);