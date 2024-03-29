<script>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import api from '../api/index.js';
import emitter from '../plugins/eventBus';

import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import RelatedProds from '../components/RelatedProds.vue';

export default {
  components: { Carts, Form, RelatedProds },
  name: 'Products',
  setup() {
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;
    const isLoading = ref(false);
    const cart = ref({});
    const codeText = ref('');
    const loadingStatus = reactive({
      loadingItem: '',
    });
    const isHaveCoupon = ref(false);
    const couponTotal = ref(0);
    const codeMsg = ref('');

    onMounted(() => {
      isLoading.value = true;
      getCart();
      emitter.emit('get-cart');
    });

    // 取得 購物車商品
    const getCart = async () => {
      try {
        const res = await api.cart.getCart();

        cart.value = res.data;

        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        $httpMsgState(err, '錯誤訊息');
      }
    };

    // 加入購物車
    const addToCart = async (id, qty = 1) => {
      productModal.value.hide();
      try {
        loadingStatus.loadingItem = id;
        const cart = {
          product_id: id,
          qty,
        };
        const res = await api.cart.addCart({ data: cart });
        $httpMsgState(res, '加入購物車');
        loadingStatus.loadingItem = '';
        getCart();
        emitter.emit('get-cart');
      } catch (err) {
        $httpMsgState(err, '加入購物車');
      }
    };

    // 移除 購物車特定商品
    const removeCartItem = async (id) => {
      try {
        const res = await api.cart.removeCartItem(id);
        loadingStatus.loadingItem = id;
        $httpMsgState(res, '移除購物車品項');
        loadingStatus.loadingItem = '';
        getCart();
        emitter.emit('get-cart');
      } catch (err) {
        $httpMsgState(err, '移除購物車品項');
      }
    };

    // 清空 購物車
    const removeCartAll = async () => {
      try {
        const res = await api.cart.removeCartAll();
        $httpMsgState(res, '清除購物車');
        getCart();
        emitter.emit('get-cart');
      } catch (err) {
        $httpMsgState(err, '清除購物車');
      }
    };

    // 更新 購物車
    const updateCart = async (data) => {
      try {
        loadingStatus.loadingItem = data.id;
        const cart = {
          product_id: data.product_id,
          qty: data.qty,
        };
        const res = await api.cart.updateCart(data.product_id, { data: cart });
        $httpMsgState(res, '更新購物車');
        loadingStatus.loadingItem = '';
        getCart();
        emitter.emit('get-cart');
      } catch (err) {
        loadingStatus.loadingItem = '';
        $httpMsgState(err, '更新購物車');
      }
    };

    // 新增 優惠券
    const addConpon = async () => {
      try {
        loadingStatus.loadingItem = codeText.value !== '';
        const code = {
          code: codeText.value,
        };
        const res = await api.coupon.addConpon({ data: code });
        isHaveCoupon.value = true;
        codeText.value = '';
        codeMsg.value = res.message.split(':')[1];
        $httpMsgState(res, '加入優惠券');
        loadingStatus.loadingItem = '';
        getCart();
        emitter.emit('get-cart');
      } catch (err) {
        loadingStatus.loadingItem = '';
        $httpMsgState(err, '加入優惠券');
      }
    };

    return {
      isLoading,
      cart,
      loadingStatus,
      getCart,
      addToCart,
      removeCartItem,
      removeCartAll,
      updateCart,
      codeText,
      addConpon,
      isHaveCoupon,
      couponTotal,
      codeMsg,
    };
  },
};
</script>

<template>
  <div class="container pt-4">
    <!-- Loading -->
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <div class="mt-3">
      <h3 class="mt-3 mb-4"><i class="fas fa-shopping-cart"></i>&nbsp;購物車</h3>
      <div class="row" v-if="cart.carts && cart.carts.length !== 0">
        <div class="col-md-8">
          <Carts v-model:cart="cart" v-model:loadingStatus="loadingStatus" @remove-cart-item="removeCartItem" @remove-cart-all="removeCartAll" @update-cart="updateCart" />
          <div class="row justify-content-between">
            <div class="col-auto">
              <button class="btn btn-outline-primary" type="button" @click="removeCartAll" :disabled="cart.carts && cart.carts.length === 0">清空購物車</button>
            </div>
            <div class="col-auto">
              <div class="input-group w-100 mb-3">
                <input type="text" class="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" placeholder="輸入優惠券" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="codeText" />
                <div class="input-group-append">
                  <button class="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0" type="button" id="button-addon2" :disabled="loadingStatus.loadingItem === (codeText !== '') || codeText === ''" @click="addConpon">
                    <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === isHaveCoupon"></i>
                    <i class="fas fa-paper-plane" v-else></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="border p-4 mb-4">
            <h4 class="fw-bold mb-4">訂單資訊</h4>
            <table class="table text-muted border-bottom">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                  <td class="text-end border-0 px-0 pt-4">NT${{ cart.total }}</td>
                </tr>
                <tr v-if="isHaveCoupon">
                  <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">優惠券</th>
                  <td class="text-end border-0 px-0 pt-0 pb-4">{{ codeMsg }}</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 fw-bold">總金額</p>
              <p class="mb-0 h4 fw-bold">NT${{ cart.final_total }}</p>
            </div>
            <router-link class="btn btn-dark w-100 mt-4" to="/checkout" v-if="cart.carts && cart.carts.length !== 0">前往結帳</router-link>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="border p-4 mb-4">
          <h4 class="fw-bold mt-3 mb-4">購物車目前沒有商品</h4>
          <router-link class="btn btn-primary" to="/products">繼續購物</router-link>
        </div>
      </div>
      <div class="my-5">
        <h3 class="fw-bold">相關產品</h3>
        <RelatedProds />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  vertical-align: middle;
}
img {
  max-width: 100%;

  object-fit: contain;
}

.primary-image {
  height: 300px;
}

.form-check-label span.checked {
  color: #198754;
}

.images {
  height: 150px;
}
.form-check-input:checked {
  border-color: #198754;
  background-color: #198754;
}
</style>
