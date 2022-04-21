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

    onMounted(() => {
      const matched = route.matched;
      state.list = matched.filter((item) => item.meta.hidden !== true);
    });

    watch(
      () => route.matched,
      (newVal) => {
        const matched = newVal;
        state.list = matched.filter((item) => item.meta.hidden !== true);
      }
    );

    return {
      ...toRefs(state),
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
