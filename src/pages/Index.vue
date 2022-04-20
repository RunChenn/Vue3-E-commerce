<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import ToastsMsg from '../components/toastsMsg.vue';

import { ref } from 'vue';

export default {
  components: { Navbar, Footer, ToastsMsg },
  name: 'Index',
  setup() {
    const isLoading = ref(false);

    return {
      isLoading,
    };
  },
};
</script>

<template>
  <!-- Loading -->
  <Loading v-model:active="isLoading" :is-full-page="true" />
  <ToastsMsg />
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style lang="scss" scoped></style>
