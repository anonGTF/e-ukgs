<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Edit Data Siswa</Text>
        <Spacer class="h-6"/>
        <div v-if="studentData == null">
            <Text>memuat...</Text>
        </div>
        <div v-else class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="studentData.name"
                placeholder="Masukkan Nama Siswa"
                label="Nama Siswa"
            />
            <Spacer height="h-4" />
            <TextField
                v-model:number="studentData.age"
                type="number"
                placeholder="Masukkan Umur Siswa (hanya angka)"
                label="Umur Siswa (Tahun)"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="studentData.grade"
                type="text"
                placeholder="Masukkan Kelas Siswa (contoh: Kelas 1, Kelas 2, dst)"
                label="Kelas"
            />
            <Spacer height="h-4" />
            <DropdownSelector 
                v-model="studentData.gender"
                label="Jenis Kelamin" 
                placeholder="Pilih Jenis Kelamin"
                :options="genderSelection"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="studentData.parentPhoneNumber"
                type="text"
                placeholder="Masukkan Nomor HP Orang tua/Wali Siswa"
                label="Nomor HP Orang tua/Wali (Format: 62xxxx)"
            />
            <Spacer height="h-12" />
            <Button 
                full-width
                :loading="isLoading"
                @click="save"
            >
                Simpan
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })
    
    const router = useRouter()
    const route = useRoute()
    const uiStore = useUiStore()
    const userStore = useUserStore()

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
        },
        {
            label: "Edit Data Siswa",
            route: `/teacher/school/${route.params.id}/edit`
        }
    ])

    const genderSelection = ref(["Laki-laki", "Perempuan"])
    const studentData = ref<Student | null>(null)
    const isLoading = ref(false)

    const save = async () => {
        if (studentData.value == null) {
            return
        }

        const result = await useSaveStudent(userStore.school?.id ?? "", studentData.value)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            router.go(-2)
        }
    }

    onMounted(async () => {
        const result = await useGetStudentById(route.params.id as string, userStore.school?.id ?? "")
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            studentData.value = unwrapEither(result)
        }
    })
</script>