<script>
import { ref, onMounted } from 'vue';
import api from '../api/index.js';
export default {
  name: 'RelatedProds',
  setup() {
    const isLoading = ref(false);

    const relatedProd = ref([]);

    onMounted(async () => {
      isLoading.value = true;

      getProducts();
    });

    // 載入所有商品
    const getProducts = async (page = 1) => {
      try {
        const prodsData = await api.products.getProducts(page);

        const data = prodsData.products.slice(0, 5);

        relatedProd.value = data;

        isLoading.value = false;

        console.log(relatedProd.value);
      } catch (err) {
        isLoading.value = false;
        alert(err.message);
      }
    };

    return {
      relatedProd,
    };
  },
};
</script>

<template>
  <div class="relatedProds">
    <div class="mt-4 mb-5">
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
        :slidesPerView="2"
        :spaceBetween="10"
        :breakpoints="{
          767: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }"
      >
        <swiper-slide class="swiper-slide" v-for="(item, index) in relatedProd" :key="index">
          <!-- <img style="width: 100%; height: 200px" :src="banner" alt="" /> -->
          <div class="card border-0 mb-4 position-relative">
            <div class="pic">
              <img class="card-img-top rounded-0" :src="item.imageUrl" alt="" :height="380" />
            </div>
            <a href="#" class="text-dark"> </a>
            <div class="card-body p-0">
              <h5 class="mb-0 mt-3">
                <a href="#">{{ item.title }}</a>
              </h5>
              <p class="card-text mb-0">
                NT$ {{ item.price }}
                <span class="text-muted"
                  ><del>NT${{ item.origin_price }}</del></span
                >
              </p>
              <p class="text-muted mt-3"></p>
            </div>
          </div>
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
  --swiper-pagination-color: #00ff33;
  --swiper-navigation-color: #00ff33;
  --swiper-navigation-size: 20px;
}
</style>
