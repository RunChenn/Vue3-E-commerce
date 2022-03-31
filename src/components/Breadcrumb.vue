<script>
import { toRefs, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
  name: 'admin',
  setup() {
    const route = useRoute();
    const state = reactive({
      list: [],
    });

    // onMounted
    onMounted(() => {
      const matched = route.matched; // 獲取菜單對應的路由信息
      state.list = matched.filter((item) => item.meta.hidden !== true); // 更新路由菜單數組
    });

    // watch
    watch(
      () => route.matched,
      (newVal) => {
        const matched = newVal;

        state.list = matched.filter((item) => item.meta.hidden !== true); // 更新路由菜單數組
      }
    );

    // return
    return {
      ...toRefs(state), // toRefs() 將數據變成響應式數據
    };
  },
};
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-for="(item, index) in list" :class="{ active: index === 2 ? true : false }" :key="item.meta.title">
        <router-link :to="{ path: item.path }">{{ item.meta.title }}</router-link>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
