import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(CkeditorPlugin)
})
