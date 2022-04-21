<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    loadingStatus: {
      type: Object,
      default: () => ({
        loadingItem: {
          type: String,
          default: '',
        },
      }),
    },
  },
  setup(props, { emit }) {
    const openModal = (id) => {
      emit('getProduct', id);
    };

    return {
      openModal,
    };
  },
};
</script>

<template>
  <div class="row">
    <div class="col-md-4" v-for="item in products" :key="item.id">
      <div class="card border-0 mb-4 position-relative">
        <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }" class="pic">
          <img :src="item.imageUrl" class="card-img-top rounded-0 img-fluid" alt="product-img" />
        </router-link>
        <div class="card-body p-0">
          <h5 class="mb-0 mt-3">
            <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }">{{ item.title }}</router-link>
          </h5>
          <p class="card-text mb-0">
            NT${{ item.price }}
            <span class="text-muted"
              ><del>NT${{ item.origin_price }}</del></span
            >
          </p>
          <p class="text-muted mt-3"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prodsTable {
  overflow: auto;
  max-height: calc(100vh - 130px);
  height: calc(100vh - 130px);
  table {
    max-height: 300px;
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
}
</style>
