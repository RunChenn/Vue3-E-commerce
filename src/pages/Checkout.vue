<script>
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';

import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import RelatedProds from '../components/RelatedProds.vue';

export default {
  components: { Carts, Form, RelatedProds },
  name: 'Checkout',
  setup() {
    const isLoading = ref(false);

    const cart = ref({});

    const codeText = ref('');

    const loadingStatus = reactive({
      loadingItem: '',
    });

    const isHaveCoupon = ref(false);
    const couponTotal = ref(0);

    const codeMsg = ref('');

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
      createOrder,
    };
  },
};
</script>

<template>
  <div class="container">
    <!-- Loading -->
    <Loading v-model:active="isLoading" :is-full-page="true" />

    <div class="mt-3">
      <!-- <h3 class="mt-3 mb-4"><i class="fas fa-shopping-cart"></i>&nbsp;購物車</h3> -->
      <div class="row justify-content-center mb-5">
        <div class="col-md-12">
          <h3 class="fw-bold mb-4 pt-3"><i class="fas fa-shopping-bag"></i>&nbsp;確認訂單</h3>
        </div>
        <div class="col-md-12">
          <ul class="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-center w-100 mt-md-0 mt-4">
            <li class="me-md-6 me-3 position-relative custom-step-line">
              <i class="fas fa-check-circle d-md-inline d-block text-center"></i>
              <span class="text-nowrap">&nbsp;購物車</span>
            </li>
            <li class="me-md-6 me-3 position-relative custom-step-line">
              <i class="fas fa-check-circle d-md-inline d-block text-center"></i>
              <span class="text-nowrap">&nbsp;確認訂單</span>
            </li>
            <li><i class="fas fa-dot-circle d-md-inline d-block text-center"></i> <span class="text-nowrap">完成訂單</span></li>
          </ul>
        </div>
      </div>
      <div class="row flex-row-reverse justify-content-center pb-5">
        <div class="col-md-6" v-if="cart.carts">
          <div class="border p-4 mb-4" v-for="item in cart.carts" :key="item.id">
            <div class="d-flex">
              <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="me-2" style="width: 48px; height: 48px; object-fit: cover" />
              <div class="w-100">
                <div class="d-flex justify-content-between">
                  <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                  <p class="mb-0">NT${{ item.product.price }}</p>
                </div>
                <p class="mb-0 fw-bold">x{{ item.qty }}</p>
              </div>
            </div>
            <table class="table mt-4 border-top border-bottom text-muted">
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
          </div>
        </div>
        <div class="col-md-6">
          <!-- 表單 -->
          <Form @create-order="createOrder" v-model:cart="cart" />
        </div>
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
