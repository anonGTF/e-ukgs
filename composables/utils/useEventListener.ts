import { onMounted, onUnmounted } from "vue";

export const useEventListener = (eventName: string, handler: EventListenerOrEventListenerObject) => {
  onMounted(() => window.addEventListener(eventName, handler));
  onUnmounted(() => window.removeEventListener(eventName, handler));
}