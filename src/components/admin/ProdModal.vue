<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import api from '../../api/index.js';

import { Modal } from 'bootstrap';

export default {
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => ({
        imagesUrl: {
          type: Array,
          default: () => [],
        },
        id: {
          type: String,
          default: '',
        },
      }),
    },
  },
  setup(props) {
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;
    let productModal = ref(null);

    onMounted(async () => {
      productModal.value = new Modal(document.getElementById('adminProductModal'), {
        keyboard: false,
      });
    });

    // 上傳圖片;
    const oneFileInput = ref(null);
    const fileInput = ref(null);

    const upload = async (status) => {
      if (status === 'oneImage') {
        const file = oneFileInput.value.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', file);
        try {
          const res = await api.adminProducts.uploadImg(formData);
          const { imageUrl } = res;
          props.product.imageUrl = imageUrl;
        } catch (err) {
          $httpMsgState(err, '錯誤訊息');
        }
        return;
      }

      props.product.imagesUrl = [];

      for (let i = 0; i < fileInput.value.files.length; i++) {
        const formData = new FormData();
        formData.append('file-to-upload', fileInput.value.files[i]);
        try {
          const res = await api.adminProducts.uploadImg(formData);
          const { imageUrl } = res;
          props.product.imagesUrl.push(imageUrl);
        } catch (err) {
          $httpMsgState(err, '錯誤訊息');
        }
      }
    };

    return {
      oneFileInput,
      fileInput,
      upload,
    };
  },
};
</script>

<template>
  <div id="adminProductModal" ref="adminProductModal" class="modal fade text-start" tabindex="-1" aria-labelledby="adminProductModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 id="adminProductModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row needs-validation" novalidate>
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <div class="mb-3">
                  <input class="form-control" type="file" id="oneFileInput" ref="oneFileInput" @change="upload('oneImage')" />
                </div>
                <img class="img-fluid" v-if="product.imageUrl" :src="product.imageUrl" alt="product-img" />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div class="mb-3">
                <input class="form-control" type="file" id="fileInput" ref="fileInput" multiple @change="upload('multipleImage')" />
              </div>
              <div v-if="Array.isArray(product.imagesUrl)">
                <div class="mb-1" v-for="image in product.imagesUrl" :key="`${image}index`">
                  <img class="img-fluid" :src="image" alt="product-img" />
                </div>
              </div>
              <div v-else>
                <button type="button" class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">新增圖片</button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" v-model="product.title" type="text" class="form-control" placeholder="請輸入標題" required />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" v-model="product.category" type="text" class="form-control" placeholder="請輸入分類" required />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" v-model="product.unit" type="text" class="form-control" placeholder="請輸入單位" />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" v-model.number="product.origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" required />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" v-model.number="product.price" type="number" min="0" class="form-control" placeholder="請輸入售價" required />
                </div>
                <!-- <div class="mb-3">
                  <label for="price" class="form-label">庫存數量</label>
                  <input id="price" v-model.number="product.inventory" type="number" min="0" class="form-control" placeholder="請輸入庫存數量" required />
                </div> -->
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" v-model="product.description" type="text" class="form-control" placeholder="請輸入產品描述"> </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" v-model="product.content" type="text" class="form-control" placeholder="請輸入說明內容"> </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" v-model="product.is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-success" @click="$emit('update-product', product)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-group > .btn:not(:last-child):not(.dropdown-toggle),
.btn-group > .btn-group:not(:last-child) > .btn,
.btn-group > .btn:nth-child(n + 3),
.btn-group > :not(.btn-check) + .btn,
.btn-group > .btn-group:not(:first-child) > .btn {
  border-radius: 0.25rem;
  margin-right: 10px;
  min-width: 45px;
}
</style>
