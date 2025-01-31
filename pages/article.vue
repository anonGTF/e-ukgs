<template>
    <div v-if="articleData" class="mt-6">
        <div class="flex flex-row items-center gap-1 cursor-pointer" @click="navigateTo('/')">
            <Icon name="mdi:keyboard-backspace" size="1.5rem"/>
            <Text class="font-semibold">Kembali</Text>
        </div>
        <Spacer height="h-6"/>
        <Text :typography="Typography.H1" color="text-black" class="font-semibold text-center">{{ articleData.title }}</Text>
        <Spacer height="h-4"/>
        <iframe :src="articleData.source" class="w-full h-svh"></iframe>
    </div>
    <div v-else class="flex h-svh justify-center items-center">
        <Text>Memuat...</Text>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute()
    const router = useRouter()
    const uiStore = useUiStore()

    const articleData = ref<Media | null>(null)

    onMounted(async () => {
        const mediaResult = await useGetArticleById(route.query.id as string)

        if (isLeft(mediaResult)) {
            uiStore.showToast(unwrapEither(mediaResult), ToastType.ERROR)
            router.back()
        }

        articleData.value = unwrapEither(mediaResult) as Media
    })
</script>