import { onMounted, onUnmounted } from "vue";

export const useEventListener = (eventName: string, handler: EventListenerOrEventListenerObject) => {
  onMounted(() => document.addEventListener(eventName, handler));
  onUnmounted(() => document.removeEventListener(eventName, handler));
}