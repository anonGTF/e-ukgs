<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Tambah Siswa</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="name"
                placeholder="Masukkan Nama Siswa"
                label="Nama Siswa"
            />
            <Spacer height="h-4" />
            <TextField
                v-model:number="age"
                type="number"
                placeholder="Masukkan Umur Siswa (hanya angka)"
                label="Umur Siswa (Tahun)"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="grade"
                type="text"
                placeholder="Masukkan Kelas Siswa (contoh: Kelas 1, Kelas 2, dst)"
                label="Kelas"
            />
            <Spacer height="h-4" />
            <DropdownSelector 
                v-model="gender"
                label="Jenis Kelamin" 
                placeholder="Pilih Jenis Kelamin"
                :options="genderSelection"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="parentPhoneNumber"
                type="text"
                placeholder="Masukkan Nomor HP Orang tua/Wali Siswa"
                label="Nomor HP Orang tua/Wali (Format: 62xxxx)"
            />
            <Spacer height="h-12" />
            <Button 
                full-width
                :loading="isLoading"
                @click="create"
            >
                Tambahkan Siswa
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr'
    import { Typography } from '~/components/attr/TextAttr'
    import { ToastType } from '~/components/attr/ToastAttr';

    definePageMeta({
        layout: 'teacher'
    })

    const route = useRoute()

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
            label: "Tambah Siswa",
            route: "/teacher/school/add"
        }
    ])

    const name = ref('')
    const age = ref(0)
    const grade = ref('')
    const gender = ref('')
    const genderSelection = ref(["Laki-laki", "Perempuan"])
    const parentPhoneNumber = ref('')
    const isLoading = ref(false)

    const router = useRouter()
    const uiStore = useUiStore()
    const userStore = useUserStore()

    const create = async () => {
        if (name.value == "" || age.value == 0 || grade.value == "" || gender.value == "" || parentPhoneNumber.value == "") {
            console.log("lengkap")
            uiStore.showToast("Data harus lengkap!", ToastType.ERROR)
            return
        }

        if (!parentPhoneNumber.value.startsWith("62")) {
            console.log("coba")
            uiStore.showToast("Nomor HP harus dengan format 62xxxx", ToastType.ERROR)
            return
        }

        isLoading.value = true
        const result = await useAddStudent(
            userStore.school?.id ?? "",
            {
                id: "",
                name: name.value,
                age: age.value,
                gender: gender.value,
                grade: grade.value,
                parentPhoneNumber: parentPhoneNumber.value
            }
        )

        if (isLeft(result)) {
            isLoading.value = false
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            isLoading.value = false
            uiStore.showToast("Siswa berhasil ditambahkan", ToastType.SUCCESS)
            router.back()
        }
    }
</script>