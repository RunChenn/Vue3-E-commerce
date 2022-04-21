import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const env = loadEnv(mode, __dirname);

  return defineConfig({
    plugins: [vue()],
    base: process.env.NODE_ENV === 'production' ? '/Vue3-E-commerce/' : './',
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: 'https://vue3-course-api.hexschool.io/v2',
          changeOrigin: true, // 支持跨域
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      define: {
        'process.env': {},
      },
    },
  });
};
