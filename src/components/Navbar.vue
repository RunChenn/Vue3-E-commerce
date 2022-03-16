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
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="./index.html">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse justify-content-end"
      id="navbarNavAltMarkup"
    >
      <div class="navbar-nav">
        <router-link class="nav-item nav-link me-4 active" to="/"
          >首頁</router-link
        >
        <router-link class="nav-item nav-link me-4" to="/products"
          >產品列表</router-link
        >
        <router-link class="nav-item nav-link me-4" to="/cart"
          >購物車</router-link
        >
      </div>
    </div>
  </nav>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand text-secondary" href="#">Navigant</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse text-white" id="navbar">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link text-white"
            >產品</router-link
          >
          <router-link to="/admin/orders" class="nav-link text-white"
            >訂單</router-link
          >
          <router-link to="/admin/coupons" class="nav-link text-white"
            >優惠券</router-link
          >
          <a href="#" @click.prevent="signout" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav> -->
</template>
