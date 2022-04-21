<script>
import { reactive } from 'vue';
import Carousel from '../components/Carousel.vue';

export default {
  name: 'Home',
  components: { Carousel },
  setup() {
    const cards = reactive([
      {
        title: '透氣輕盈 柔軟彈性',
        text: '透氣舒適有效調解體溫 保護肌膚避免服裝破損',
        imgUrl: new URL('../assets/img/home1.jpeg', import.meta.url),
        imgAlt: '透氣輕盈 柔軟彈性',
      },
      {
        title: '耐穿實用 跨界機能',
        text: '強韌耐穿應付多變天氣 上班通勤方便多種場合',
        imgUrl: new URL('../assets/img/home2.jpeg', import.meta.url),
        imgAlt: '耐穿實用 跨界機能',
      },
      {
        title: '休閒運動 與眾不同',
        text: '自在活動挑戰最佳表現 打造簡約時尚機能造型',
        imgUrl: new URL('../assets/img/home3.jpeg', import.meta.url),
        imgAlt: '休閒運動 與眾不同',
      },
    ]);

    return {
      cards,
    };
  },
};
</script>

<template>
  <div class="home">
    <div class="position-relative">
      <div class="position-absolute home-bg"></div>
      <div class="container d-flex flex-column" style="min-height: 100vh">
        <div class="row justify-content-center my-auto" style="z-index: 100">
          <div class="col-md-4 text-center">
            <h2>Navigant</h2>
            <p class="text-muted mb-1">起源於義大利米蘭，至今已有50年的歷史，以海洋風情為題材的服飾品牌，它更是一個注重生活、提倡健康的品牌。</p>
            <router-link :to="{ name: 'Products' }"><button type="button" class="btn btn-dark rounded-0 mt-6">熱銷商品</button></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 mt-md-4" v-for="card in cards" :key="card.title">
          <div class="card border-0 mb-4">
            <img :src="card.imgUrl" class="card-img-top rounded-0" :alt="card.imgAlt" />
            <div class="card-body text-center">
              <h4>{{ card.title }}</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  {{ card.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-light my-5">
      <div class="container">
        <Carousel />
      </div>
    </div>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6 mb-3">
          <img src="../assets/img/五大特點.png" alt="五大特點" class="img-fluid" />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">五大特點</h4>
          <p class="text-muted">吸濕性、保濕性、耐熱性、耐鹼性、衛生性</p>
        </div>
      </div>
      <div class="row flex-row-reverse justify-content-between mt-4">
        <div class="col-md-6">
          <img src="../assets/img/水洗測試圖.jpeg" alt="水洗測試圖" class="img-fluid" />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">商品均水洗測試</h4>
          <p class="text-muted">透氣輕盈，柔軟彈性<br />耐穿實用，跨界機能<br />休閒運動，與眾不同</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-bg {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1648265449862.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LQZxp16W7KgXS3iq7y3CrN7buiB3WDc4zwXnTfcYPJL0snx2Vo5iY%2FrPna%2BZ%2Bd8B3EAk33lx0PcYNlX2tgtV1Qta8C1QYCMM1rmitHB4a7mmAHc9GDFJwYJ2KCGG1f6c2z8lBVoWptSKbuQPgrgIYPcahxI5Uzec0Po1nRPxEbkX%2FacpXv4UyodhVi%2BBvDx6Tf1wdHWaUEfbzsMOLwvkKPWyLdXiQanw14fii9SgYAyvz88kgfTZL8MJTB5qe3HQATBZBqsQ3iUSjwn87qhW%2BofclZddBvbsF4p%2FZvZTvbAkxnpfk8S6uuzmSyr0BhEc%2BYyNhjsBMjrbCcsugqE6mQ%3D%3D);
  background-position: center center;
  opacity: 0.1;
  max-height: 100vh;
}
</style>
