<template>
  <div class="toast-container position-fixed pe-3 top-0 end-0" style="z-index: 1500">
    <div v-for="(msg, key) in messages" :key="key" class="toast show" :class="`toast${key}`" role="alert">
      <div class="toast-header">
        <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button type="button" class="btn-close" @click="clearToast(key)" aria-label="Close"></button>
      </div>
      <!-- <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

import emitter from '../plugins/eventBus';

export default {
  name: 'toastsMsg',
  setup() {
    let messages = ref([]);

    onMounted(() => {
      emitter.on('push-message', (message) => {
        const { style = 'success', title, content } = message;
        messages.value.push({ style, title, content });
        toastShow();
      });
    });

    const toastShow = () => {
      setTimeout(() => {
        messages.value.shift();
      }, 3000);
    };

    const clearToast = (index) => {
      messages.value.splice(index, 1);
    };

    return {
      messages,
      toastShow,
      clearToast,
    };
  },
};
</script>

<style>
.toast-container {
  top: 20px !important;
}
</style>
