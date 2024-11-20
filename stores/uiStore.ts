import type { ConfirmationModalState } from "~/components/attr/ConfirmationModalAttr"
import { ToastType, type ToastState } from "~/components/attr/ToastAttr"

export const useUiStore = defineStore(
    'ui', 
    () => {
        const toast = ref<ToastState | null>(null)
        const confirmationModal = ref<ConfirmationModalState | null>(null)

        const $reset = () => {
            toast.value = null
            confirmationModal.value = null
        }

        const showToast = (message: string, type: ToastType) => {
            toast.value = {
                message,
                type
            }

            setTimeout(() => {
                toast.value =null
            }, 5000)
        }

        const confirm = (
            message: string,
            onConfirm: () => void,
            onCancel: () => void
        ) => {
            confirmationModal.value = {
                message,
                onConfirm,
                onCancel
            }
        }

        const hideConfirmationModal = () => {
            confirmationModal.value = null
        }

        return {
            toast,
            confirm: confirmationModal,
            $reset
        }
  }, 
  {
    persist: true
  }
)