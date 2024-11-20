<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Tambah Kelompok</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="name"
                placeholder="Masukkan Nama Kelompok"
                label="Nama Guru"
            />
            <Spacer height="h-12" />
            <Button 
                full-width
                :loading="isLoading"
                @click="create"
            >
                Buat Kelompok
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr'
    import { Typography } from '~/components/attr/TextAttr'
    import { ToastType } from '~/components/attr/ToastAttr';

    definePageMeta({
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Kelompok Siswa",
            route: "/admin/group"
        },
        {
            label: "Tambah Kelompok",
            route: "/admin/group/add"
        }
    ])

    const name = ref('')
    const isLoading = ref(false)

    const router = useRouter()
    const uiStore = useUiStore()

    const create = async () => {
        isLoading.value = true
        const result = await useAddGroup(name.value)

        if (isLeft(result)) {
            isLoading.value = false
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            isLoading.value = false
            uiStore.showToast("Guru berhasil ditambahkan", ToastType.SUCCESS)
            router.back()
        }
    }
</script>