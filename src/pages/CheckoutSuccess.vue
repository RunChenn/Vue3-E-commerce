<script>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api/index.js';

import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import RelatedProds from '../components/RelatedProds.vue';

export default {
  components: { Carts, Form, RelatedProds },
  name: 'CheckoutSuccess',
  setup() {
    const isLoading = ref(false);

    const route = useRoute();

    const order = ref({});

    const loadingStatus = reactive({
      loadingItem: '',
    });

    const isHaveCoupon = ref(false);

    const codeMsg = ref('');

    onMounted(async () => {
      isLoading.value = true;

      const id = route.params.id;

      getOrder(id);
    });

    // 取得 訂單
    const getOrder = async (order_id) => {
      console.log(order_id);
      try {
        const res = await api.order.getOrder(order_id);

        order.value = res.order;

        console.log(res.order);

        const isCoupon = res.order.products.map((ele) => {
          console.log(Object.values(ele));
        });

        // if (res.order.products[0].coupon) {
        //   isHaveCoupon.value = true;
        //   codeMsg.value = res.order.products[0].coupon.code;
        // }

        console.log(res);
        console.log(order.value);
        isLoading.value = false;
      } catch (err) {
        alert(err.message);
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      order,
      loadingStatus,
      getOrder,
      isHaveCoupon,
      codeMsg,
    };
  },
};
</script>

<template>
  <div class="container">
    <!-- Loading -->
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <div
      style="
        min-height: 400px;
        background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1648265449862.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LQZxp16W7KgXS3iq7y3CrN7buiB3WDc4zwXnTfcYPJL0snx2Vo5iY%2FrPna%2BZ%2Bd8B3EAk33lx0PcYNlX2tgtV1Qta8C1QYCMM1rmitHB4a7mmAHc9GDFJwYJ2KCGG1f6c2z8lBVoWptSKbuQPgrgIYPcahxI5Uzec0Po1nRPxEbkX%2FacpXv4UyodhVi%2BBvDx6Tf1wdHWaUEfbzsMOLwvkKPWyLdXiQanw14fii9SgYAyvz88kgfTZL8MJTB5qe3HQATBZBqsQ3iUSjwn87qhW%2BofclZddBvbsF4p%2FZvZTvbAkxnpfk8S6uuzmSyr0BhEc%2BYyNhjsBMjrbCcsugqE6mQ%3D%3D);
        background-position: center center;
      "
    ></div>
    <div class="mt-5 mb-5">
      <div class="row">
        <div class="col-md-6">
          <h2>訂單成立</h2>
          <p>感謝您的購買，收到訂單後，預計3~5天出貨，請您耐心等候。</p>
          <router-link :to="{ name: 'Index' }" class="btn btn-outline-dark me-2 rounded-0 mb-4">回首頁</router-link>
        </div>
        <div class="col-md-6">
          <div class="card rounded-0 py-4">
            <div class="card-header border-bottom-0 bg-white px-4 py-0">
              <h2>訂單資訊</h2>
            </div>
            <div class="card-body px-4 py-0">
              <ul class="list-group list-group-flush">
                <li class="list-group-item px-0">
                  <div class="d-flex mt-2" v-for="item in order.products" :key="item.title">
                    <img :src="item.product.imageUrl" alt="" class="me-2" style="width: 60px; height: 60px; object-fit: cover" />
                    <div class="w-100 d-flex flex-column">
                      <div class="d-flex justify-content-between fw-bold">
                        <h5>{{ item.product.title }}</h5>
                        <p class="mb-0">x{{ item.qty }}</p>
                      </div>
                      <div class="d-flex justify-content-between mt-auto">
                        <p class="text-muted mb-0">
                          <small>NT${{ item.product.price }}</small>
                        </p>
                        <p class="mb-0">NT${{ item.total }}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="list-group-item px-0 pb-0">
                  <table class="table text-muted">
                    <tbody>
                      <tr>
                        <th scope="row" class="border-0 px-0 font-weight-normal">總金額</th>
                        <td class="text-end border-0 px-0">NT${{ order.total }}</td>
                      </tr>
                      <tr v-if="isHaveCoupon">
                        <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">優惠券</th>
                        <td class="text-end border-0 px-0 pt-0">{{ codeMsg }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-between mt-2">
                    <p class="mb-0 h4 fw-bold">Lorem ipsum</p>
                    <p class="mb-0 h4 fw-bold">NT$24,000</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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
