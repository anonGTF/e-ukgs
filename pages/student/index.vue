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
    const logout = async () => {
        const result = await useLogout()
        if (isLeft(result)) {
            alert(unwrapEither(result))
        }
    }
</script>