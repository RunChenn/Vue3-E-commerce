<script>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/index.js';

import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import RelatedProds from '../components/RelatedProds.vue';

export default {
  components: { Carts, Form, RelatedProds },
  name: 'Checkout',
  setup() {
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;

    const router = useRouter();
    const isLoading = ref(false);

    const cart = ref({});

    const loadingStatus = reactive({
      loadingItem: '',
    });

    const isHaveCoupon = ref(false);

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

        if (cart.value.carts[0].coupon) {
          isHaveCoupon.value = true;
          codeMsg.value = cart.value.carts[0].coupon.code;
        }

        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        $httpMsgState(err, '錯誤訊息');
      }
    };

    const createOrder = async (order) => {
      isLoading.value = true;

      try {
        const res = await api.order.addOrder({ data: order });

        router.push({ name: 'checkout-success', params: { id: res.orderId } });

        isLoading.value = false;
      } catch (err) {
        loadingStatus.loadingItem = '';
        isLoading.value = false;
        $httpMsgState(err, '錯誤訊息');
      }
    };

    return {
      isLoading,
      cart,
      loadingStatus,
      getCart,
      createOrder,
      isHaveCoupon,
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
      <div class="row flex-row-reverse justify-content-center pb-5">
        <div class="col-md-6" v-if="cart.carts">
          <div class="border p-4 mb-4">
            <div class="d-flex" v-for="item in cart.carts" :key="item.id">
              <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="checkout-img" class="me-2 checkout-product-img" />
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

.checkout-product-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
}
</style>
