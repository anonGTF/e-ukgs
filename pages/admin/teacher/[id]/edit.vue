<template>
<div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Edit Akun Guru</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="name"
                placeholder="Masukkan Nama Guru"
                label="Nama Guru"
            />
            <Spacer height="h-4" />
            <TextField
                type="text"
                :placeholder="id"
                :enabled="false"
                label="ID Guru (tidak bisa diedit)"
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
            label: "Kelola Akun Guru",
            route: "/admin/teacher"
        },
        {
            label: "Edit Akun Guru",
            route: `/admin/teacher/${route.params.id}/edit`
        }
    ])

    const name = ref('')
    const id = ref('')
    const gender = ref('')
    const genderSelection = ref(["Laki-laki", "Perempuan"])
    const isLoading = ref(false)

    const save = async () => {
        const result = await useSaveTeacer(route.params.id as string, name.value, gender.value)
        if (isLeft(result)) {
            alert(unwrapEither(result))
        } else {
            router.go(-2)
        }
    }

    onMounted(async () => {
        const result = await useGetTeacherById(route.params.id as string)
        if (isLeft(result)) {
            alert(unwrapEither(result))
        } else {
            const teacher = unwrapEither(result) as Teacher
            name.value = teacher.name
            id.value = teacher.userId
            gender.value = teacher.gender
        }
    })
</script>