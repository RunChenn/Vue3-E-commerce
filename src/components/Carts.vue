<script>
import emitter from '../plugins/eventBus';

export default {
  props: {
    cart: {
      type: Object,
      default: () => ({
        carts: {
          type: Array,
          default: () => [],
        },
      }),
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
    const minusItem = (item) => {
      item.qty--;
      if (item.qty < 1) {
        item.qty = 1;
        return;
      }
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      emitter.emit('get-cart');
      emit('updateCart', data);
    };

    const addItem = (item) => {
      item.qty++;

      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      emitter.emit('get-cart');
      emit('updateCart', data);
    };

    return {
      addItem,
      minusItem,
    };
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>品名</th>
        <th class="text-center">數量</th>
        <th>單價</th>
        <th scope="col" class="border-0"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr class="border-bottom border-top" v-for="item in cart.carts" :key="item.id">
          <th scope="row" class="border-0 px-0 font-weight-normal py-4">
            <img class="carts-product-img" :src="item.product.imageUrl" alt="product-img" />
            <p class="mb-0 fw-bold ms-3 d-inline-block">
              {{ item.product.title }}
            </p>
          </th>
          <td class="border-0 align-middle text-center" style="max-width: 160px">
            <div class="input-group pe-5">
              <div class="input-group-prepend">
                <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1" @click="minusItem(item)" :disabled="item.qty === 1">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input type="text" class="form-control border-0 text-center my-auto shadow-none qtyInput" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" disabled v-model="item.qty" />
              <div class="input-group-append">
                <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2" @click="addItem(item)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ item.product.price }}
          </td>

          <td class="border-0 align-middle">
            <button type="button" class="btn btn-sm" @click="$emit('remove-cart-item', item.id)" :disabled="loadingStatus.loadingItem === item.id">
              <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
              <i class="fas fa-times" v-else></i>
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.qtyInput.form-control:disabled,
.form-control {
  background-color: #fff;
}

.carts-product-img {
  width: 72px;
  height: 72px;
  object-fit: cover;
}
</style>
