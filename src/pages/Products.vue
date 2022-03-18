<script>
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';

import { Modal } from 'bootstrap';

import ProdsTable from '../components/ProdsTable.vue';
import Pagination from '../components/Pagination.vue';
import Carts from '../components/Carts.vue';
import Form from '../components/Form.vue';
import ProdModal from '../components/ProdModal.vue';

export default {
  components: { ProdModal, ProdsTable, Pagination, Carts, Form },
  name: 'Products',
  setup() {
    const isLoading = ref(false);
    // const fullPage = ref(true);

    const pagination = ref({});

    const products = ref([]);
    const categorys = ref([]);
    const product = ref({});
    const cart = ref({});

    const productModal = ref(null);

    const loadingStatus = reactive({
      loadingItem: '',
    });

    onMounted(async () => {
      isLoading.value = true;

      // productModal.value = new Modal(document.getElementById('productModal'), {
      //   keyboard: false,
      // });

      getProducts();
    });

    // 載入所有商品
    const getProducts = async (page = 1) => {
      try {
        // const prodsData = await api.products.getProductsAll();
        const prodsData = await api.adminProducts.getProducts(page);

        console.log(prodsData.products);

        const data = prodsData.products;
        pagination.value = prodsData.pagination;

        let categoryList = data.map((ele) => ele.category);

        categorys.value = [...new Set(categoryList)];

        console.log(categorys.value);

        products.value = prodsData.products;
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        alert(err.message);
      }
    };

    // 載入單一商品
    const getProduct = async (id) => {
      loadingStatus.loadingItem = id;

      try {
        const prodsData = await api.products.getProduct(id);

        loadingStatus.loadingItem = '';

        product.value = prodsData.product;
      } catch (err) {
        alert(err.message);
      }
    };

    // 取得 購物車商品
    // const getCart = async () => {
    //   try {
    //     const res = await api.cart.getCart();

    //     cart.value = res.data;
    //   } catch (err) {
    //     alert(err.message);
    //   }
    // };

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

        // getCart();
      } catch (err) {
        alert(err.message);
      }
    };

    return {
      // ...toRefs(form),
      isLoading,
      // fullPage,
      products,
      pagination,
      categorys,
      product,
      cart,
      loadingStatus,
      getProduct,
      getProducts,
      // getCart,
      addToCart,
    };
  },
};
</script>

<template>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 400px"
  >
    <div
      class="position-absolute"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
        background-position: center center;
        opacity: 0.1;
      "
    ></div>
    <h2 class="fw-bold">Lorem ipsum.</h2>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-4">
        <div
          class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample"
        >
          <div
            class="card border-0"
            v-for="category in categorys"
            :key="category"
          >
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingOne"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">{{ category }}</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <!-- 產品列表 -->
        <ProdsTable
          v-model:products="products"
          v-model:loadingStatus="loadingStatus"
          @get-product="getProducts"
          @add-to-cart="addToCart"
        />

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
