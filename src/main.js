import { createApp } from 'vue';
// 引入路由配置
import router from './router/index';
// import axios from './utils/axios.js';

import App from './App.vue';

import './scss/custom.scss';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-solid-svg-icons';
import 'jquery';
import 'bootstrap';
import toastsMsg from './plugins/pushMsgState';
import veeValidate from './plugins/vee-validate';
import { date, currency } from './plugins/filters';

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};

app.config.globalProperties.$httpMsgState = toastsMsg;

app.component('Loading', Loading);
app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

app.use(veeValidate);

app.use(router);

app.mount('#app');
