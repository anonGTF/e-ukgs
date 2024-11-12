<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Edit Data Siswa</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="name"
                placeholder="Masukkan Nama Siswa"
                label="Nama Siswa"
            />
            <Spacer height="h-4" />
            <TextField
                type="text"
                :placeholder="id"
                :enabled="false"
                label="ID Siswa (tidak bisa diedit)"
            />
            <Spacer height="h-4" />
            <DropdownSelector 
                v-model="gender"
                label="Jenis Kelamin" 
                placeholder="Pilih Jenis Kelamin"
                :options="genderSelection"
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
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr'
    import { Typography } from '~/components/attr/TextAttr'
import type { Student } from '~/models/group/Student';
    import type { Teacher } from '~/models/teacher/Teacher';
    
    definePageMeta({
        layout: 'admin'
    })
    
    const router = useRouter()
    const route = useRoute()

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
            label: "Detail Kelompok Siswa",
            route: `/admin/group/${route.params.id}`
        },
        {
            label: "Edit Data Siswa",
            route: `/admin/group/${route.params.id}/${route.params.studentId}/edit`
        }
    ])

    const name = ref('')
    const id = ref('')
    const gender = ref('')
    const genderSelection = ref(["Laki-laki", "Perempuan"])
    const isLoading = ref(false)

    const save = async () => {
        const result = await useSaveStudent(route.params.studentId as string, route.params.id as string, name.value, gender.value)
        if (isLeft(result)) {
            alert(unwrapEither(result))
        } else {
            router.go(-2)
        }
    }

    onMounted(async () => {
        const result = await useGetStudentById(route.params.studentId as string, route.params.id as string)
        if (isLeft(result)) {
            alert(unwrapEither(result))
        } else {
            const student = unwrapEither(result) as Student
            name.value = student.name
            id.value = student.userId
            gender.value = student.gender
        }
    })
</script>