<script>
import { ref, onMounted } from 'vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import SwiperSlide from '../components/Carousel.vue';

export default {
  components: { Breadcrumb, SwiperSlide },
  name: 'About',
  setup() {
    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;
      isLoading.value = false;
    });
    return {
      isLoading,
    };
  },
};
</script>

<template>
  <div class="container pt-4 about">
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <SwiperSlide />
    <Breadcrumb class="mt-5" />
    <div class="mb-5">
      <img src="../assets/img/img_wd.jpeg" class="img-fluid rounded-start" alt="about-navigant" />
    </div>
    <div>
      <img src="../assets/img/img_about.jpeg" class="img-fluid rounded-start" alt="about-navigant" />
    </div>
    <div class="about-content px-5 pb-5">
      <div class="card about-card-first border-0 text-start">
        <div class="row g-0">
          <div class="col-12 col-sm-12 col-md-7 col-md-pull-5">
            <div class="card-body text-start">
              <p class="about-big-text h3">FROM MILAN</p>
              <p class="about-text h5">Navigant起源於義大利米蘭，至今已有50年的歷史，以海洋風情為題材的服飾品牌，但它更是一個注重生活、提倡健康的品牌。是在為不同國度的消費者提供與他們生活更加貼近，穿著舒適、時尚的服裝產品。並且利用世界各地不同的文化與喜好建立起豐富多樣的銷售主題。</p>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-5 col-md-push-7">
            <div clas="about-card-first-main">
              <img src="../assets/img/img_about-1.jpeg" class="img-fluid rounded-start about-img-position" alt="about-navigant" />
            </div>
          </div>
        </div>
      </div>
      <div class="card about-card-second border-0 text-start">
        <div class="about-card-second-bg-text">
          Core <br />
          values
        </div>
        <div class="row g-0">
          <div class="col-md-10 offset-md-2">
            <div class="card-body about-card-second-body">
              <p class="about-text h5">
                至今的Navigant堅持一貫享受生命的態度:來源於客觀、包容感、現代的生活，而從不隨同低俗的風趣，並且更注重消費者的文化、信仰 、購買習慣以及他們對時尚的不同認識。從所有材料根據功能性生產精心挑選，創建特定材料或根據生產需要進行修改，甚至選擇處理以優化服裝的風格和品質。
              </p>
            </div>
          </div>
        </div>
      </div>
      <figure class="text-center">
        <blockquote class="blockquote about-text h5">
          <p class="text-start">Navigant自引進台灣市場多年以來，每年研發出不同風格的新穎服飾，並且結合歐美各地設計師同步設計。我們擁有成熟的經驗和先進的繪圖軟體，提供高品質休閒風格的服裝系列。至今代理的商品從外到內有男裝、女裝、包包皮件、服裝配件、內衣褲、襪子…。</p>
        </blockquote>
      </figure>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  .about-card-first {
    margin: 10px 0 50px 0;
    .about-img-position {
      position: absolute;
      top: -150px;
      right: 30px;
      height: 480px;
    }
  }

  .about-card-second {
    .about-card-second-bg-text {
      float: left;
      color: #f3f3f3;
      text-align: left;
      font-weight: 900;
      font-size: 70px;
      font-family: 'Archivo Black', sans-serif;
      line-height: 1em;
    }
    .about-card-second-body {
      transform: translateY(-65px);
    }
  }
  .about-big-text {
    font-weight: 900;
  }
  .about-text {
    line-height: 2.2em;
  }
}
</style>
