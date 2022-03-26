<script>
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';

import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import RelatedProds from '../components/RelatedProds.vue';

export default {
  components: { Carts, Form, RelatedProds },
  name: 'Products',
  setup() {
    const isLoading = ref(false);

    const cart = ref({});

    const codeText = ref('');

    const loadingStatus = reactive({
      loadingItem: '',
    });

    const isHaveCoupon = ref(false);
    const couponTotal = ref(0);

    onMounted(async () => {
      isLoading.value = true;

      getCart();
    });

    // 取得 購物車商品
    const getCart = async () => {
      try {
        const res = await api.cart.getCart();

        cart.value = res.data;

        console.log(cart.value);
        isLoading.value = false;
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
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

        alert(res.message);

        loadingStatus.loadingItem = '';

        getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    // 移除 購物車特定商品
    const removeCartItem = async (id) => {
      try {
        const res = await api.cart.removeCartItem(id);

        loadingStatus.loadingItem = id;

        alert(res.message);
        loadingStatus.loadingItem = '';
        getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    // 清空 購物車
    const removeCartAll = async () => {
      try {
        const res = await api.cart.removeCartAll();

        alert(res.message);
        getCart();
      } catch (err) {
        alert(err.message);
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

        const res = await api.cart.updateCart({ data: cart });

        alert(res.message);
        loadingStatus.loadingItem = '';
        getCart();
      } catch (err) {
        loadingStatus.loadingItem = '';
        alert(err.message);
      }
    };

    // 新增 優惠券
    const addConpon = async () => {
      try {
        loadingStatus.loadingItem = codeText.value !== '';

        console.log(codeText.value);

        const code = {
          code: codeText.value,
        };

        const res = await api.coupon.addConpon({ data: code });

        isHaveCoupon.value = true;

        // res.data.final_total

        console.log(res);

        alert(res.message);
        loadingStatus.loadingItem = '';
        getCart();
      } catch (err) {
        loadingStatus.loadingItem = '';
        alert(err.message);
      }
    };

    const createOrder = async (order) => {
      isLoading.value = true;

      try {
        const res = await api.order.addOrder({ data: order });

        alert(res.message);

        getCart();
        isLoading.value = false;
      } catch (err) {
        loadingStatus.loadingItem = '';
        isLoading.value = false;
        alert(err.message);
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
      createOrder,
      codeText,
      addConpon,
      isHaveCoupon,
      couponTotal,
    };
  },
};
</script>

<template>
  <div class="container">
    <!-- Loading -->
    <Loading v-model:active="isLoading" :is-full-page="true" />

    <div class="mt-3">
      <h3 class="mt-3 mb-4"><i class="fas fa-shopping-cart"></i>&nbsp;購物車</h3>
      <div class="row">
        <div class="col-md-8">
          <Carts v-model:cart="cart" v-model:loadingStatus="loadingStatus" @remove-cart-item="removeCartItem" @remove-cart-all="removeCartAll" @update-cart="updateCart" />
          <div class="input-group w-50 mb-3">
            <input type="text" class="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" placeholder="輸入優惠券" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="codeText" />
            <div class="input-group-append">
              <button class="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0" type="button" id="button-addon2" :disabled="loadingStatus.loadingItem === (codeText !== '') || codeText === ''" @click="addConpon">
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === (codeText !== '')"></i>
                <i class="fas fa-paper-plane" v-else></i>
              </button>
            </div>
          </div>
          <!-- <div class="input-group mb-3 ml-auto">
                    <input type="text" class="form-control" placeholder="輸入優惠券" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-outline-dark border-bottom border-top border-start border-end rounded-0" type="button" id="button-addon2">
                      套用
                    </button>
                  </div> -->
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
                  <td class="text-end border-0 px-0 pt-0 pb-4">{{ cart.carts.coupon.percent }}%</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 fw-bold">總金額</p>
              <p class="mb-0 h4 fw-bold">NT${{ cart.final_total }}</p>
            </div>
            <a href="./checkout.html" class="btn btn-dark w-100 mt-4">前往結帳</a>
          </div>
        </div>
      </div>
      <div class="my-5">
        <h3 class="fw-bold">相關產品</h3>
        <RelatedProds />
      </div>
    </div>
  </div>

  <div class="container">
    <div class="mt-4">
      <!-- Loading -->
      <Loading v-model:active="isLoading" :is-full-page="true" />

      <!-- 購物車列表 -->
      <Carts v-model:cart="cart" v-model:loadingStatus="loadingStatus" @remove-cart-item="removeCartItem" @remove-cart-all="removeCartAll" @update-cart="updateCart" />
    </div>
    <div class="my-5 row justify-content-center">
      <!-- 表單 -->
      <Form @create-order="createOrder" v-model:cart="cart" />
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
