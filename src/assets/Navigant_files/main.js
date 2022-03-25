import { createApp } from '/node_modules/.vite/vue.js?v=10c3a2e2';
// 引入路由配置
import router from '/src/router/index.js?t=1648050726173';
// import axios from './utils/axios.js';

import App from '/src/App.vue';

import '/src/scss/custom.scss';

import __vite__cjsImport4_vueLoadingOverlay from "/node_modules/.vite/vue-loading-overlay.js?v=10c3a2e2"; const Loading = __vite__cjsImport4_vueLoadingOverlay.__esModule ? __vite__cjsImport4_vueLoadingOverlay.default : __vite__cjsImport4_vueLoadingOverlay;
import '/node_modules/vue-loading-overlay/dist/vue-loading.css';

// import Swiper from 'swiper';
// import 'swiper';
import { Swiper, SwiperSlide } from '/node_modules/.vite/swiper_vue.js?v=10c3a2e2';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from '/node_modules/.vite/swiper.js?v=10c3a2e2';
import '/node_modules/swiper/swiper.min.css';

import '/node_modules/.vite/@fortawesome_fontawesome-svg-core.js?v=10c3a2e2';
import '/node_modules/.vite/@fortawesome_free-regular-svg-icons.js?v=10c3a2e2';
import '/node_modules/.vite/@fortawesome_free-solid-svg-icons.js?v=10c3a2e2';
import "/node_modules/.vite/jquery.js?v=10c3a2e2";
import '/node_modules/.vite/bootstrap.js?v=10c3a2e2';

import veeValidate from '/src/plugins/vee-validate.js';
import { date, currency } from '/src/plugins/filters.js';

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};

// app.provide('message', function () {
//   console.log('來自全域的 provide');
// });

app.component('Loading', Loading);
app.component('Swiper', Swiper);
app.component('SwiperSlide', SwiperSlide);

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

// app.use(Loading);
app.use(veeValidate);

app.use(router);

app.mount('#app');
