<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/index.js';

export default {
  name: 'admin',
  setup() {
    const router = useRouter();
    const checkSuccess = ref(false);

    const signout = async () => {
      try {
        await api.auth.logout();
        router.push({ name: 'Login' });
      } catch (err) {
        alert(err.message);
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
  <!-- <div class="bg-light py-4">
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
        <p class="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
        <div class="input-group w-md-50 mt-md-0 mt-3">
          <input type="text" class="form-control rounded-0" placeholder="" />
          <div class="input-group-append">
            <button class="btn btn-dark rounded-0" type="button" id="search">Lorem ipsum</button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="bg-primary py-5">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
        <router-link :to="{ name: 'Index' }">
          <img src="../assets/img_footlogo.png" class="card-img-top rounded-0" width="100px" alt="Logo" />
        </router-link>
        <ul class="d-flex list-unstyled mb-0 h4">
          <li>
            <a href="#" class="text-white mx-3"><i class="fab fa-facebook"></i></a>
          </li>
          <li>
            <a href="#" class="text-white mx-3"><i class="fab fa-instagram"></i></a>
          </li>
          <li>
            <a href="#" class="text-white ms-3"><i class="fab fa-line"></i></a>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
        <div class="mb-md-0 mb-1">
          <p class="mb-0">02-8262-3578</p>
          <p class="mb-0">navigant@gmail.com</p>
        </div>
        <p class="mb-0">© 2022 NAVIGANT All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>
