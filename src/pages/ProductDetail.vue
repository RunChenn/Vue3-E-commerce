<script>
import api from '../api/index.js';
import { getCurrentInstance, ref, reactive, onMounted, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from '../components/Breadcrumb.vue';
import RelatedProds from '../components/RelatedProds.vue';

export default {
  components: { Breadcrumb, RelatedProds },
  name: 'Home',
  setup() {
    const $httpMsgState = getCurrentInstance()?.appContext.config.globalProperties.$httpMsgState;

    let { proxy } = getCurrentInstance();

    const isLoading = ref(false);

    const product = ref({});

    const route = useRoute();

    const loadingStatus = reactive({
      loadingItem: '',
    });

    const qty = ref(1);

    onMounted(async () => {
      isLoading.value = true;

      window.addEventListener('scroll', handleScroll());

      const id = route.params.id;

      getProduct(id);
    });

    onUnmounted(() => {
      document.removeEventListener('scroll', handleScroll());
    });

    // watch 監聽路由發生變化
    watch(
      () => route.fullPath,
      async (newVal) => {
        // 確保路由還在當前頁
        if (route.name === 'ProductDetail') {
          const id = route.params.id;

          getProduct(id);

          goTop();
        }
      }
    );

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      proxy.scrollTop = scrollTop;
    };

    const goTop = () => {
      let timer = setInterval(() => {
        let ispeed = Math.floor(-proxy.scrollTop / 10);
        document.documentElement.scrollTop = document.body.scrollTop = proxy.scrollTop + ispeed;
        if (proxy.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 10);
    };

    // 載入單一商品
    const getProduct = async (id) => {
      try {
        const prodsData = await api.products.getProduct(id);

        product.value = prodsData.product;
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        $httpMsgState(err, '錯誤訊息');
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

        $httpMsgState(res, '加入購物車');

        loadingStatus.loadingItem = '';
      } catch (err) {
        $httpMsgState(err, '加入購物車');
      }
    };

    return {
      qty,
      product,
      addToCart,
    };
  },
};
</script>

<template>
  <div class="container pt-4 productDetail">
    <div class="row align-items-center">
      <div class="col-md-6">
        <div id="prodImgControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item" v-for="(img, index) in product.imagesUrl" :key="img" :class="[index == 0 ? 'active' : '']">
              <img :src="img" class="d-block w-100" alt="商品圖片" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#prodImgControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#prodImgControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <Breadcrumb />
        <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
        <p class="mb-0 text-muted text-end">
          <del>NT${{ product.origin_price }}</del>
        </p>
        <p class="h4 fw-bold text-end">NT${{ product.price }}</p>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1" @click="qty--" :disabled="qty === 1">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input type="text" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" disabled v-model="qty" />
              <div class="input-group-append">
                <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2" @click="qty++">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <button type="button" class="text-nowrap btn btn-dark w-100 py-2" @click="addToCart(product.id)">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col">
        <ul class="nav nav-tabs nav-fill justify-content-center" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">商品詳情</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">尺碼指南</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">商品注意事項</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade py-3 px-3 show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="mt-4 mb-5">
              <img v-for="img in product.imagesUrl" :key="img" :src="img" class="rounded-0 d-block mx-auto mb-3 tabProdsImg" alt="商品圖片" />
            </div>
          </div>
          <div class="tab-pane fade py-3 px-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <img src="../assets/img/試穿建議表.jpg" class="d-block w-55 w-md-100 mx-auto" alt="試穿建議表" />
          </div>
          <div class="tab-pane fade text-start py-3 px-3" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <p class="mb-1 fw-bold">▲ 依照消費者保護法規定，線上購物消費者均享有商品到貨七天猶豫期之權益，並非試用期。</p>
            <p class="mb-1 fw-bold">▲ 退回商品必須是全新狀態且完整包裝(保持商品、附件、包裝、廠商紙箱及所有附隨文件或資料之完整性)，不影響二次銷售之全新商品，否則恕不接受退訂。</p>
            <p class="mb-1 fw-bold">▲ 商品銷售網頁上特別載明之商品，均不接受退訂。</p>
            <p class="mb-1 fw-bold">▲ 退貨後保留商品金額若未達滿額禮活動門檻，贈品需連同退貨商品一併退回(全新未拆封)，未退回將會直接以原價計算。</p>
            <p class="mb-1 fw-bold">▲ 收到商品後如發現有瑕疵或破損或是配件短缺的狀況，請於到貨後7天內登錄「聯絡我們」→填寫表單之頁面申請「換貨」，我們會儘速為您處理。</p>
            <p class="mb-1 fw-bold">▲ 訂單因退貨後未達至訂單成立時之優惠(例-滿額-折扣、滿額-免運等優惠)，退款時會扣除優惠金額後再退款。</p>
            <p class="mb-1 fw-bold">※ 退貨後訂單保留商品金額若未達訂購時享有免運門檻，需負擔原出貨運費於退款款項內扣除，超商運費80元/宅配運費120元(無須額外夾帶現金於包裹內)。</p>
            <p class="mb-1 fw-bold">※ 提醒您，若您無故或惡意三次(含)以上違反Navigant制定訂購與退貨相關規則，本公司有權暫停您的帳號並拒絕您使用本服務，同時列為交易黑名單，請您留意。</p>
          </div>
        </div>

        <h3 class="fw-bold mt-3">相關產品</h3>
        <RelatedProds />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pic {
  width: 500px;
  height: 350px;
  img {
    width: 500px;
    height: 350px;

    object-fit: contain;
  }
}
</style>
