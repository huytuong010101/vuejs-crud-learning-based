import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Init app
const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueSweetalert2);
app.mount('#app')