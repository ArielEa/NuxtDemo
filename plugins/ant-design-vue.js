// plugins/ant-design-vue.js
import { defineNuxtPlugin } from '#app';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { message } from 'ant-design-vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Antd);
    nuxtApp.vueApp.config.globalProperties.$message = message;
});
