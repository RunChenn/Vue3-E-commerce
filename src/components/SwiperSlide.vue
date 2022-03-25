<script>
import api from '../api/index.js';
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Breadcrumb from '../components/Breadcrumb.vue';

export default {
  components: { Breadcrumb },
  name: 'Home',
  setup() {
    // const isLoading = ref(false);

    // const product = ref({});

    // const route = useRoute();

    // onMounted(async () => {
    //   isLoading.value = true;

    //   const id = route.params.id;

    //   getProduct(id);
    // });

    // // 載入單一商品
    // const getProduct = async (id) => {
    //   // loadingStatus.loadingItem = id;

    //   try {
    //     const prodsData = await api.products.getProduct(id);

    //     // loadingStatus.loadingItem = '';

    //     console.log(prodsData);

    //     product.value = prodsData.product;
    //     isLoading.value = false;
    //   } catch (err) {
    //     alert(err.message);
    //     isLoading.value = false;
    //   }
    // };

    const swipImg = ref([
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    ]);

    return {
      // product,
      swipImg,
    };
  },
};
</script>

<template>
  <div class="swiperSlide">
    <div>
      <swiper
        class="swiper-container"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :pagination="{ clickable: true }"
        :autoplay="{
          autoplay: true,
          delay: 2500,
          disableOnInteraction: false,
        }"
        loop
        :slidesPerView="1"
        :spaceBetween="10"
        :breakpoints="{
          767: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }"
      >
        <swiper-slide class="swiper-slide" v-for="(banner, index) in swipImg" :key="index">
          <img style="width: 100%; height: 350px" :src="banner" alt="" />
          <!-- <div class="card border-0 mb-4 position-relative position-relative">
            <img class="card-img-top rounded-0" :src="banner" alt="" />
            <a href="#" class="text-dark"> </a>
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
              <p class="card-text mb-0">
                NT$1,080 <span class="text-muted"><del>NT$1,200</del></span>
              </p>
              <p class="text-muted mt-3"></p>
            </div>
          </div> -->
        </swiper-slide>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div class="swiper-button-next"></div>
        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.swiper-container {
  --swiper-theme-color: #ff6600;
  --swiper-pagination-color: #00ff33; /* 两种都可以 */
  --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 20px; /* 设置按钮大小 */
}
</style>
