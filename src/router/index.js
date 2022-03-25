import { createRouter, createWebHistory } from 'vue-router';
import { Cookies } from '../utils/cookies';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      title: '登入',
      layout: 'Login',
      requiresAuth: false,
    },
  },
  // {
  //   path: '/',
  //   component: () => import('../pages/index.vue'),
  // },
  // 後台
  {
    path: '/admin',
    component: () => import('../pages/admin/index.vue'),
    children: [
      {
        path: 'products',
        name: 'admin-Products',
        component: () => import('../pages/admin/Products.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'admin-Orders',
        component: () => import('../pages/admin/Orders.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        name: 'admin-Coupons',
        component: () => import('../pages/admin/Coupons.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('../pages/Index.vue'),
    meta: {
      title: '首頁',
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
        meta: {
          title: '首頁',
          layout: 'home',
          requiresAuth: false,
        },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../pages/About.vue'),
        meta: {
          title: '關於我們',
          layout: 'about',
          requiresAuth: false,
        },
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../pages/Products.vue'),
        meta: {
          title: '全部商品',
          requiresAuth: false,
        },
      },
      {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('../pages/ProductDetail.vue'),
        meta: {
          title: '詳細商品',
          requiresAuth: false,
        },
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../pages/Cart.vue'),
        meta: {
          title: '購物車',
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' },
  },
];

const router = createRouter({
  history: createWebHistory('/Vue3-E-commerce/'),
  // history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => {
      return record.meta.requiresAuth;
    })
  ) {
    // 如果沒有 token
    if (Cookies.getCookie() === '') {
      // 轉跳到 login page
      next({ name: 'Login' });
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }
});

export default router;
