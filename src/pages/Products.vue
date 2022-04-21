<script>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import api from '../api/index.js';
import emitter from '../plugins/eventBus';

import Breadcrumb from '../components/Breadcrumb.vue';
import ProdsTable from '../components/ProdsTable.vue';
import Pagination from '../components/Pagination.vue';
import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import ProdModal from '../components/ProdModal.vue';
import Carousel from '../components/Carousel.vue';

export default {
  components: { Carousel, Breadcrumb, ProdModal, ProdsTable, Pagination, Carts, Form },
  name: 'Products',
  setup() {
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;
    const isLoading = ref(false);
    const pagination = ref({});
    const products = ref([]);
    const categorys = ref([]);
    const cart = ref({});
    const loadingStatus = reactive({
      loadingItem: '',
    });

    onMounted(async () => {
      isLoading.value = true;
      getProducts();
    });

    const getProducts = async (page = 1) => {
      try {
        const prodsData = await api.products.getProducts(page);
        const data = prodsData.products;
        pagination.value = prodsData.pagination;
        let categoryList = data.map((ele) => ele.category);
        categorys.value = [...new Set(categoryList)];
        products.value = data;
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        $httpMsgState(err, '錯誤訊息');
      }
    };

    const addToCart = async (id) => {
      try {
        loadingStatus.loadingItem = id;
        const cart = {
          product_id: id,
          qty: qty.value,
        };
        const res = await api.cart.addCart({ data: cart });
        emitter.emit('get-cart');
        $httpMsgState(res, '加入購物車');
        loadingStatus.loadingItem = '';
      } catch (err) {
        $httpMsgState(err, '加入購物車');
      }
    };

    const toDetail = async (row) => {
      router.push({ path: `/apps-list/members/detail/${row._id}` });
    };

    return {
      isLoading,
      products,
      pagination,
      categorys,
      cart,
      loadingStatus,
      getProducts,
      addToCart,
      toDetail,
    };
  },
};
</script>

<template>
  <div class="container pt-4 mb-5">
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <Carousel />
    <div class="row mt-3">
      <div class="col-md-12">
        <Breadcrumb />
      </div>
      <div class="col-md-12">
        <ProdsTable v-model:products="products" v-model:loadingStatus="loadingStatus" @get-product="getProducts" @add-to-cart="addToCart" />
        <Pagination v-model:pages="pagination" @update-pages="getProducts" />
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
