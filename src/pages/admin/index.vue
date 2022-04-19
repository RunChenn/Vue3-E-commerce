<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api/index.js';

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
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-5">
      <div class="container-fluid">
        <router-link :to="{ name: 'Index' }" class="navbar-brand">
          <img src="../../assets/Logo.png" class="card-img-top d-inline-block align-text-top" alt="Logo" width="40" height="40" />
        </router-link>
        <span class="logo-text text-white">NAVIGANT</span>
        <!-- <a class="navbar-brand" href="./index.html">Navbar</a> -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/admin/products" class="nav-item nav-link me-4">產品</router-link>
            <router-link to="/admin/orders" class="nav-item nav-link me-4">訂單</router-link>
            <router-link to="/admin/coupons" class="nav-item nav-link me-4">優惠券</router-link>
            <!-- <router-link to="/admin/article" class="nav-link">貼文</router-link> -->
            <!-- <button
            @click="logout"
            class="nav-link text-white btn-link bg-primary"
          >
            登出
          </button> -->
            <a href="#" @click.prevent="signout" class="nav-link">登出</a>
          </div>
          <!-- <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link text-white">前台頁面</router-link>
          <router-link to="/cart" class="nav-link text-white"
            >購物車</router-link
          >
        </div> -->
        </div>
      </div>
    </nav>
    <div class="container-fluid mt-3 position-relative">
      <RouterView />
    </div>
  </div>
</template>
