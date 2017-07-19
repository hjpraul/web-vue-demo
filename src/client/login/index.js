import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import HttpTool from '../http-tool'
import ElementUI from 'element-ui'
import '../style/style.css'
import Login from './Login.vue'
import routes from '../router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCookie from 'vue-cookie'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(HttpTool);
Vue.use(VueCookie);
Vue.use(VueAwesomeSwiper);

const router = new VueRouter({
  routes : routes
});

router.beforeEach((to, from, next) => {
	if (to.path == "/"){
		Vue.cookie.set('axinfu-pagination', 'slideDown');
	}
	else {
		Vue.cookie.set('axinfu-pagination', 'slideUp');
	}
	next();
})

console.log('ttttttttttttttttttttttttttttest')

const login = new Vue({  
    router: router,  
    render: h => h(Login)  
}).$mount('#login') 
