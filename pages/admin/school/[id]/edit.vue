<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Edit Sekolah</Text>
        <Spacer class="h-6"/>
        <div v-if="schoolData" class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="schoolData.name"
                placeholder="Masukkan Nama Sekolah"
                label="Nama Sekolah"
            />
            <Spacer height="h-4"/>
            <TextField
                v-model="schoolData.address"
                placeholder="Masukkan Alamat Sekolah"
                label="Alamat Sekolah"
            />
            <Spacer height="h-6" />
            <Button 
                full-width
                :loading="isLoading"
                @click="save"
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

    const route = useRoute()
    const router = useRouter()
    const uiStore = useUiStore()

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
            label: "Edit Sekolah",
            route: `/admin/school/${route.params.id}/edit`
        }
    ])

    const schoolData = ref<School | null>(null)
    const isLoading = ref(false)
    const save = async () => {
        if (schoolData.value == null) return

        isLoading.value = true
        const result = await useSaveSchool(schoolData.value)
        if (isLeft(result)) {
            isLoading.value = false
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            isLoading.value = false
            uiStore.showToast("Data Sekolah Berhasil Diedit", ToastType.SUCCESS)
            router.back()
        }
    }

    onMounted(async () => {
        const result = await useGetSchoolById(route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
            return
        }

        schoolData.value = unwrapEither(result)
    })
</script>