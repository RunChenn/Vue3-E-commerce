<script>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import api from '../api/index.js';

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
    const isLoading = ref(false);

    const pagination = ref({});

    const products = ref([]);
    const categorys = ref([]);

    const cart = ref({});

    const loadingStatus = reactive({
      loadingItem: '',
    });

    // const emitter = inject('$emitter');

    // this.$httpMessageState(response, '登出');
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;

    onMounted(async () => {
      isLoading.value = true;

      getProducts();
    });

    // 載入所有商品
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
        alert(err.message);
      }
    };

    // 加入購物車
    const addToCart = async (id) => {
      try {
        loadingStatus.loadingItem = id;

        const cart = {
          product_id: id,
          qty: qty.value,
        };

        const res = await api.cart.addCart({ data: cart });

        console.log(res);

        $httpMsgState.toastsMsg(res, '加入購物車');

        alert(res.message);

        loadingStatus.loadingItem = '';
      } catch (err) {
        alert(err.message);
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
    <!-- Loading -->
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <Carousel />
    <div class="row mt-3">
      <!-- <div class="col-md-3">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
          <div class="card border-0" v-for="category in categorys" :key="category">
            <div class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">{{ category }}</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="col-md-12">
        <Breadcrumb />
      </div>
      <div class="col-md-12">
        <!-- 產品列表 -->
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
