<script>
import { ref } from 'vue';
export default {
  name: 'Carousel',
  setup() {
    const swipImg = ref([
      'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1648265416426.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=R80irheRyi3tOoNn4u000tcVfqyn8I%2FCFvEhE0cJ2loGpzIfgUMTWTq6VHzn%2F9BLTm9W1uBslQtTwxThKGen%2F65wp9kGA7fALa8EPGEsJHVuT4IxxkDMDfsIOgkTb8sLcrQcROz3x%2BkVxHQ7ogQAvhqY6LMUcbfu6kWOTNvi%2FK0AicxQAaa5khAzSAQXOXVyFtLPxc838rE4DEO22mvsiFET3a9QQIyyXFq%2BmJlE9h0PfQJ3l7Ga1Ps8eb9EZacgD0wTnWjiIbAMl1sP6h%2FwzWGdNLQdXHN1fYRgMIEC6VEfHNZ82ItAqr1a4x81vRcKqVBu5f7LY0%2F4YMxhXcQCkg%3D%3D',
      'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1648265449862.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LQZxp16W7KgXS3iq7y3CrN7buiB3WDc4zwXnTfcYPJL0snx2Vo5iY%2FrPna%2BZ%2Bd8B3EAk33lx0PcYNlX2tgtV1Qta8C1QYCMM1rmitHB4a7mmAHc9GDFJwYJ2KCGG1f6c2z8lBVoWptSKbuQPgrgIYPcahxI5Uzec0Po1nRPxEbkX%2FacpXv4UyodhVi%2BBvDx6Tf1wdHWaUEfbzsMOLwvkKPWyLdXiQanw14fii9SgYAyvz88kgfTZL8MJTB5qe3HQATBZBqsQ3iUSjwn87qhW%2BofclZddBvbsF4p%2FZvZTvbAkxnpfk8S6uuzmSyr0BhEc%2BYyNhjsBMjrbCcsugqE6mQ%3D%3D',
      'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1648265477173.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=USUVTRQs60iKSJHQqufFyXwOX3ATgiOGusHNaS50sN1Cl0M9H5HW8VSnMqB4qKz2XGuL7BvtzECwHIbbd7GqfdQuLc%2Ff6saCf0BCpGAbo7CzwCBbQ2cX%2BDBP9QEst%2BCR9ERkhK%2FYeg1FvIbQP0r2XQEvQS8jm0sdGZnEUxRxc%2FpGMMwSMk8jrhtC3BQfQAltogAut7%2Fv2DUAHBs9T%2B6ysPfzi%2FeqiSHfXq7K1qOC%2BszKnvUqsokHU916H24QQ0UgyUUvbtRQuSuPfHD37qjXTmPMFoWvI18gJZT4mOacI3raAe8jNWrTwzJA9gndwSxksEpdVZIVYzsrW%2BckTGdRhg%3D%3D',
      'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1648265496572.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=MRRLCqL%2BVKcW2P9yKj9QRvv6vP%2B31cDGBDh6P81LFSxJqybHMYDlF%2FZDbGciNeT6HxHAzeeceG5WqNWdXt1%2FcUyNvzPL0DtxiJph9SUXLeej4ME7JASFYun2Dj8oQheYbNEXDosL7PfeU6L7rVmayIRq0%2FvjFUD4RTG%2BXHkXoA2iXejQJEIevVs7O%2BbUm63fHJufqZK9%2FfPSUMdv%2FT4WxCzIT82P8urFxZwfER142CBC4vO5UEgGDGKB6NQ%2B%2Fnqjpdlkfb4q9QOjYyVaw542G9B6ckSvlf%2B53%2B2pr8VtzqcwsHRE%2FMs0ZOw7AVRejw9T3T2IQBIPEp4ORzRg4Z1xUw%3D%3D',
      'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1648265517528.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Bl5%2FvkCRFUIoltYbL7OSJXxys3qriQGqh3osjBKFnpN1df5O2jsQAPw5yXj1S9DKZFxa9%2FBVcaBx20s%2B5%2BffaLod2rxOQ%2BbBt%2F7yHaVqBCle0jATap5HXz43MK5HoFysPAaVri161zMqyRmfLgMIggccrxnQaSH9ZkjDcOEG3ocBqC%2FyVv4bxiJb7vtLjuKYtLwRvWUd%2BchYKHMlKFbSWvHwlV2LHqzWxLKZss6HraIRsvq3dGm0btA8XL0YqSCdwt5RtgIKsQMo9QZ7Kn72KOUlFZMX6hoOAYs7BNCFyNra1goiT0JMfRZ1zRqP480HeH0OloilxGwj4hVKXCkzYA%3D%3D',
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
