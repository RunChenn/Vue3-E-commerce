<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import api from '../api/index.js';
import emitter from '../plugins/eventBus';

export default {
  name: 'admin',
  setup() {
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;

    const cartsTotal = ref(0);

    onMounted(() => {
      getCart();
      emitter.on('get-cart', () => {
        getCart();
      });
    });

    const getCart = async () => {
      try {
        const res = await api.cart.getCart();

        console.log(res.data);

        let sum = 0;

        res.data.carts.map((item) => {
          sum += item.qty;
        });

        console.log(sum);

        cartsTotal.value = sum;
      } catch (err) {
        $httpMsgState(err, '錯誤訊息');
      }
    };

    return {
      cartsTotal,
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-5">
    <router-link :to="{ name: 'Home' }" class="navbar-brand">
      <img src="../assets/Logo.png" class="card-img-top d-inline-block align-text-top" alt="Logo" width="40" height="40" />
    </router-link>
    <span class="logo-text text-white">NAVIGANT</span>
    <!-- <a class="navbar-brand" href="./index.html">Navbar</a> -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link me-4" to="/">首頁</router-link>
        <router-link class="nav-item nav-link me-4" to="/about">關於我們</router-link>
        <router-link class="nav-item nav-link me-4" to="/products">產品列表</router-link>
        <router-link class="nav-item nav-link me-4" to="/cart">
          <i class="position-relative fas fa-shopping-cart">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{ cartsTotal }}</span>
          </i>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav .logo-text {
  font-size: 24px;
}
</style>
