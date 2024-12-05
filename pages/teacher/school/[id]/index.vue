<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Siswa</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <div class="flex flex-row items-center justify-between pb-7 border-b border-border-divider">
                <Text :typography="Typography.H2">Identitas Siswa</Text>
                <Button 
                    :type="ButtonType.Outlined" 
                    dense
                    class="hidden md:block"
                    @click="navigateTo(`/teacher/school/${route.params.id}/edit`)"
                >
                    Edit Detail Siswa
                </Button>
                <div class="btn btn-square md:hidden" @click="navigateTo(`/teacher/school/${route.params.id}/edit`)">
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
    const uiStore = useUiStore()
    const userStore = useUserStore()

    definePageMeta({
        layout: 'teacher'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Kelola Sekolah",
            route: "/teacher/school"
        },
        {
            label: "Detail Siswa",
            route: `/teacher/school/${route.params.id}`
        }
    ])

    const studentData = ref<Student | null>(null)
    const details = computed(() => [
        {
            label: "Nama Siswa",
            data: studentData.value?.name
        },
        {
            label: "Kelas",
            data: studentData.value?.grade
        },
        {
            label: "Umur",
            data: `${studentData.value?.age} tahun`
        },
        {
            label: "Jenis Kelamin",
            data: studentData.value?.gender
        },
        {
            label: "Nomor HP Orang Tua/Wali",
            data: studentData.value?.parentPhoneNumber
        }
    ])

    onMounted(async () => {
        const result = await useGetStudentById(route.params.id as string, userStore.school?.id ?? "")
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            studentData.value = unwrapEither(result) as Student
        }
    })
</script>