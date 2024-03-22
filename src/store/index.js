
import { createPinia } from 'pinia';
import { App } from 'vue';



const pinia = createPinia();
App.Vue.use(pinia);


export default pinia;

