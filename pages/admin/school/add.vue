<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Tambah Sekolah</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="name"
                placeholder="Masukkan Nama Sekolah"
                label="Nama Sekolah"
            />
            <Spacer height="h-4"/>
            <TextField
                v-model="address"
                placeholder="Masukkan Alamat Sekolah"
                label="Alamat Sekolah"
            />
            <Spacer height="h-6" />
            <Button 
                full-width
                :loading="isLoading"
                @click="create"
            >
                Simpan Data Sekolah
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Sekolah",
            route: "/admin/school"
        },
        {
            label: "Tambah Sekolah",
            route: "/admin/school/add"
        }
    ])

    const name = ref('')
    const address = ref('')
    const isLoading = ref(false)

    const router = useRouter()
    const uiStore = useUiStore()

    const create = async () => {
        isLoading.value = true
        const result = await useAddSchool({
            id: "",
            name: name.value,
            address: address.value,
            totalStudent: 0
        } satisfies School)

        if (isLeft(result)) {
            isLoading.value = false
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            isLoading.value = false
            uiStore.showToast("Sekolah berhasil ditambahkan", ToastType.SUCCESS)
            router.back()
        }
    }
</script>