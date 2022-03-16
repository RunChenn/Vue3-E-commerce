<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'Home',
  setup() {
    const cards = reactive([
      {
        title: '透氣輕盈 柔軟彈性',
        text: '透氣舒適有效調解體溫 保護肌膚避免服裝破損',
        imgUrl:
          'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1642347133690.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=MCf7QoAYKDpopNW6GB04FjhcyWY02GWYv8%2BhrrWh1Bt0ktRLfK%2BxEVA7%2BKRFRMG0SHghCIu4RrxQruY84GSU0VfB8p490swcs4JbI4gH5sHYXQBUvtLe0wZnTMRHhXElrro454oGFwiifpm6aCHUffYNIxnDR2nppU876QsxnSYaskiy5ywWEyjSaEtJjW%2F1ydj%2BVET3wl32w4y4En0Pl3r4UOl3v4zMfNf%2FWDCZOQPah2y%2Fvt5OCIuqn90WF4UzfGBTy92usV981V1avdT7%2FAolvd2%2FyHBCP0SIPlUtm%2FgGtUKyIU%2BN9Ht0Zepctlw18PPB36XV5cT%2BipUkcqHzvw%3D%3D',
        imgAlt: '透氣輕盈 柔軟彈性',
      },
      {
        title: '耐穿實用 跨界機能',
        text: '強韌耐穿應付多變天氣 上班通勤方便多種場合',
        imgUrl:
          'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1642347919234.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cBLaqvuTWiP%2FN7xDKUcIYwXel87kRJvyIA1Wzxn21mAUpUMBX%2FzodmAaba53nCpFUofbRykTFl07OaBVKU6A%2BtnTIqm7mYJzmyfpZRHQk7vvkyoAbgG0nn3xakmVmCHmnpHIn%2FW3ETKdfgoUlYxTDCQJJ%2B8CbLEF8dHgKGUtvtTWc9SB4v7PHTxWbb%2F9DaGLmj6AvVUABaBj93SGpFoeLbNDOnDl4E8zvbCrUkN7f0wT1PXv6%2FsCHmwp9OuCX72iw1sgursmRVlY%2BQhshQ%2FqoofEon2JhH%2F5ST3hEJG75xyzgKoSysP%2BgXxozLY7%2Be5fsz0PRvO%2F1%2F1cLrYFXvUIYA%3D%3D',
        imgAlt: '耐穿實用 跨界機能',
      },
      {
        title: '休閒運動 與眾不同',
        text: '自在活動挑戰最佳表現 打造簡約時尚機能造型',
        imgUrl:
          'https://storage.googleapis.com/vue-course-api.appspot.com/aprilchen/1643270797486.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VUvtmABM3r68OoFr0bpbcNZnn1AMKAM0LmvMni8dcOFMQfu5v2qEGyPuwmgA0MfqCTppzO5%2BK6nMj5pXsgWk73oCcG70nxEyBEPv3rdEKE8%2FTx30%2FrWlUN6NGEjxWlPbFuZ4IxhGewDUoWhoOg0jZ%2FyoAHPDwbI5Zbkb1EBDozDU3rpvLFsY6DO2ccdVdPmQdvZ1lHB%2FzrdYxYovDnMRaDF07dMq1BWCaK02IrHb%2FEwD%2F9KAltBJOZz45ToJKj1Egt4kK3bozNh2WEQFjbvt95Lilr2uQd3ZlI8f6EwwcLqITwmdhKlAjpvFZe7mnmoUvOoTPPCLngogZRou2KU%2FBA%3D%3D',
        imgAlt: '休閒運動 與眾不同',
      },
    ]);

    return {
      cards,
    };
  },
};
</script>

<template>
  <div class="home">
    <!-- <h1>你現在在前台頁面</h1>
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">前台產品列表</router-link> |
      <router-link to="/cart">前台購物車</router-link> |
      <router-link to="/admin/products">後台購物車列表</router-link>
    </div>
    <router-view></router-view> -->

    <div class="position-relative">
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
      <div class="container d-flex flex-column" style="min-height: 100vh">
        <!-- <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href="./index.html">Navbar</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav">
              <router-link class="nav-item nav-link me-4 active" to="/"
                >首頁</router-link
              >
              <router-link class="nav-item nav-link me-4" to="/products"
                >產品列表</router-link
              >
              <router-link class="nav-item nav-link me-4" to="/cart"
                >購物車</router-link
              >
            </div>
          </div>
        </nav> -->
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center">
            <h2>Navigant</h2>
            <p class="text-muted mb-1">
              起源於義大利米蘭，至今已有50年的歷史，以海洋風情為題材的服飾品牌，它更是一個注重生活、提倡健康的品牌。
            </p>
            <button class="btn btn-dark rounded-0 mt-6">熱銷商品</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 mt-md-4" v-for="card in cards" :key="card.title">
          <div class="card border-0 mb-4">
            <img
              :src="card.imgUrl"
              class="card-img-top rounded-0"
              :alt="card.imgAlt"
            />
            <div class="card-body text-center">
              <h4>{{ card.title }}</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  {{ card.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-4 mt-md-4">
          <div class="card border-0 mb-4">
            <img
              src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
              class="card-img-top rounded-0"
              alt="..."
            />
            <div class="card-body text-center">
              <h4>Lorem ipsum</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-md-4">
          <div class="card border-0 mb-4">
            <img
              src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
              class="card-img-top rounded-0"
              alt="..."
            />
            <div class="card-body text-center">
              <h4>Lorem ipsum</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="bg-light mt-7">
      <div class="container">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p class="my-5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat.”
                  </p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p class="my-5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat.”
                  </p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row justify-content-center py-7">
                <div class="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p class="my-5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat.”
                  </p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <div class="container my-7">
      <div class="row">
        <div class="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            alt=""
            class="img-fluid"
          />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">Lorem ipsum</h4>
          <p class="text-muted">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna.
          </p>
        </div>
      </div>
      <div class="row flex-row-reverse justify-content-between mt-4">
        <div class="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            alt=""
            class="img-fluid"
          />
        </div>
        <div class="col-md-4 m-auto text-center">
          <h4 class="mt-4">Lorem ipsum</h4>
          <p class="text-muted">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna.
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="bg-light py-4">
      <div class="container">
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start"
        >
          <p class="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
          <div class="input-group w-md-50 mt-md-0 mt-3">
            <input type="text" class="form-control rounded-0" placeholder="" />
            <div class="input-group-append">
              <button class="btn btn-dark rounded-0" type="button" id="search">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-dark py-5">
      <div class="container">
        <div
          class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4"
        >
          <a class="text-white h4" href="./index.html">LOGO</a>
          <ul class="d-flex list-unstyled mb-0 h4">
            <li>
              <a href="#" class="text-white mx-3"
                ><i class="fab fa-facebook"></i
              ></a>
            </li>
            <li>
              <a href="#" class="text-white mx-3"
                ><i class="fab fa-instagram"></i
              ></a>
            </li>
            <li>
              <a href="#" class="text-white ms-3"
                ><i class="fab fa-line"></i
              ></a>
            </li>
          </ul>
        </div>
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white"
        >
          <div class="mb-md-0 mb-1">
            <p class="mb-0">02-3456-7890</p>
            <p class="mb-0">service@mail.com</p>
          </div>
          <p class="mb-0">© 2020 LOGO All Rights Reserved.</p>
        </div>
      </div>
    </div> -->
  </div>
</template>
