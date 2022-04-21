<script>
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/index.js';

export default {
  name: 'admin',
  setup() {
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;
    const router = useRouter();
    const checkSuccess = ref(false);

    const signout = async () => {
      try {
        await api.auth.logout();
        router.push({ name: 'Login' });
      } catch (err) {
        $httpMsgState(err, '錯誤訊息');
      }
    };

    return {
      checkSuccess,
      signout,
    };
  },
};
</script>

<template>
  <div class="bg-primary py-5">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
        <router-link :to="{ name: 'Home' }">
          <img src="../assets/img/img_footlogo.png" class="card-img-top rounded-0" width="100px" alt="Logo" />
        </router-link>
        <ul class="d-flex list-unstyled mb-0 h4">
          <li>
            <a href="https://www.facebook.com/Navigant-114264293299738" class="text-white mx-3"><i class="fab fa-facebook"></i></a>
          </li>
          <li>
            <a href="https://www.instagram.com/navigant_italy/" class="text-white mx-3"><i class="fab fa-instagram"></i></a>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white text-start">
        <div class="mb-md-0 mb-1">
          <p class="mb-0">02-8262-3578</p>
          <p class="mb-0">navigant@gmail.com</p>
        </div>
        <p class="mb-0">© 2022 NAVIGANT All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>
