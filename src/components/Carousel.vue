<script>
import { ref } from 'vue';
export default {
  name: 'Carousel',
  setup() {
    const swipImg = ref([
      new URL('../assets/img/banner1.jpeg', import.meta.url),
      new URL('../assets/img/banner2.jpeg', import.meta.url),
      new URL('../assets/img/banner3.jpeg', import.meta.url),
      new URL('../assets/img/banner4.jpeg', import.meta.url),
      new URL('../assets/img/banner5.jpeg', import.meta.url),
    ]);

    return {
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
        <swiper-slide class="swiper-slide" v-for="banner in swipImg" :key="banner">
          <img style="width: 100%; height: 400px" :src="banner" alt="banner" />
        </swiper-slide>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.swiper-container {
  --swiper-theme-color: #ff6600;
  --swiper-pagination-color: #00ff33;
  --swiper-navigation-color: #00ff33;
  --swiper-navigation-size: 20px;
}
</style>
