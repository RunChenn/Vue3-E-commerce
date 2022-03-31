<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

import { ref, onBeforeMount } from 'vue';
import api from '../api/index.js';
import { useRouter } from 'vue-router';

export default {
  components: { Navbar, Footer },
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
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>

<style lang="scss" scoped></style>
