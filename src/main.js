import Vue from 'vue'
import VAvatar from "v-avatar";
import App from './App.vue'
import router from './router'
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify'
import i18n from './i18n';
import '@mdi/font/css/materialdesignicons.css' 
import store from './store'
import axios from './axios'
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueRouterUserRoles from "vue-router-user-roles";
Vue.use(VueRouterUserRoles, {
  router
});

Vue.use(VAvatar);
let authenticate = Promise.resolve({ role:store.state.role });
Vue.use(VueSweetalert2);
authenticate.then(user => {
  Vue.prototype.$user.set(user);


  new Vue({
    router,
    render: h => h(App),
    vuetify,
    i18n,
    axios,
    store
  }).$mount('#app')
  


})


;
