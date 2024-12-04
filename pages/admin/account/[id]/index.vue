<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Akun</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <div class="flex flex-row items-center justify-between pb-7 border-b border-border-divider">
                <Text :typography="Typography.H2">Identitas Akun</Text>
                <Button 
                    :type="ButtonType.Outlined" 
                    dense
                    class="hidden md:block"
                    @click="navigateTo(`/admin/account/${route.params.id}/edit`)"
                >
                    Edit Akun
                </Button>
                <div class="btn btn-square md:hidden" @click="navigateTo(`/admin/account/${route.params.id}/edit`)">
                    <Icon name="mdi:pencil" size="24px"/>
                </div>
            </div>
            <template v-for="detail in details" :key="detail.label">
                <Spacer class="h-6"/>
                <Text :typography="Typography.Body1">{{ detail.label }}</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ detail.data }}</Text>
            </template>
        </div>
    </div>
</template>
    
<script setup lang="ts">
    const route = useRoute()

    definePageMeta({
        layout: 'admin'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Akun",
            route: "/admin/account"
        },
        {
            label: "Detail Akun",
            route: `/admin/account/${route.params.id}`
        }
    ])

    const userData = ref<User | null>(null)
    const schoolData = ref<School | null>(null)
    const details = computed(() => [
        {
            label: "Nama",
            data: userData.value?.name
        },
        {
            label: "ID Akun",
            data: userData.value?.userId
        },
        {
            label: "Jenis Kelamin",
            data: userData.value?.gender
        },
        {
            label: "Role",
            data: userData.value?.role
        },
        {
            label: "Sekolah",
            data: schoolData.value?.name ?? "-"
        }
    ])

    const uiStore = useUiStore()

    onMounted(async () => {
        const result = await useGetUserById(route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            return
        }
        userData.value = unwrapEither(result) as User

        if (userData.value.role == "teacher") {
            const schoolResult = await useGetSchoolById(userData.value.schoolId ?? "")
            if (isLeft(schoolResult)) {
                uiStore.showToast(unwrapEither(schoolResult), ToastType.ERROR)
                return
            }
            schoolData.value = unwrapEither(schoolResult)
        }
    })
</script>