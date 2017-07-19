import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import HttpTool from '../http-tool'
import ElementUI from 'element-ui'
// import './theme/index.css'
import '../style/style.css'
import App from './App.vue'
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

const app = new Vue({  
    router: router,  
    render: h => h(App)  
}).$mount('#app') 
