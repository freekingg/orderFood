import Vue from 'vue'
import App from './App.vue'
import storage from './model/storage.js';

//请求数据配置
import VueResource from 'vue-resource';
Vue.use(VueResource);


//获取url传过来的桌号  保存桌号

// console.log(window.location.hash.split('=')[1]);

var roomid=window.location.hash.split('=')[1] || '001'
console.log(roomid)

if(roomid){
    storage.set('roomid',roomid);

}else{

  roomid=storage.get('roomid');
}

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://a.itying.com?roomid='+roomid);

//vue-socket.io的使用步骤


/*

1、安装npm install vue-socket.io --save


2、main.js 引入  并且use

  import VueSocketio from 'vue-socket.io';
  Vue.use(VueSocketio, 'http://a.itying.com');

3、vue实例里面定义sockets，sockets里面的方法表示接收到服务器的消息以后触发

  sockets:{
      connect: function(){
        console.log('socket connected')
      },
      customEmit: function(val){
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      }
    }


4、给服务器发数据

    this.$socket.emit('emit_method', val);


*/




//引入路由  use路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//1、创建引入组件

import Start from './components/Start.vue';
import Home from './components/Home.vue';
import Hot from './components/Hot.vue';
import Order from './components/Order.vue';
import Pcontent from './components/Pcontent.vue';
import Search from './components/Search.vue';
import Cart from './components/Cart.vue';
import EditPeopleInfo from './components/EditPeopleInfo.vue';
import Success from './components/Success.vue';
//2、配置路由

const routes = [
  { path: '/start', component: Start },
  { path: '/home', component: Home },
  { path: '/hot', component: Hot },
  { path: '/order', component: Order },
  { path: '/pcontent', component: Pcontent },
  { path: '/search', component: Search },
  { path: '/cart', component: Cart },
  { path: '/editpeopleinfo', component: EditPeopleInfo },
  { path: '/success', component: Success },  
  { path: '*', redirect: '/start' }
]


//3、实例化VueRouter

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes  属性的简写
})



//4、挂载


new Vue({
  el: '#app',
  router,
  sockets:{  /*测试期间写 也不不写在根里面*/
    connect: function(){
      console.log('socket connected')
    }
    
  },

  render: h => h(App)
})


//5、需要 <router-view></router-view>  放在根组件里面

  