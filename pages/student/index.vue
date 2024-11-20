<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <h1>Student Home</h1>
        <Spacer height="h-4" />
        <Button
            class="w-64"
            @click="logout"
        >
            Logout
        </Button>
    </div>
</template>

<script setup lang="ts">
    import { ToastType } from '~/components/attr/ToastAttr';

    const uiStore = useUiStore()
    const logout = async () => {
        const result = await useLogout()
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        }
    }
</script>