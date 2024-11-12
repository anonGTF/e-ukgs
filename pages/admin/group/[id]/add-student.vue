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
                v-model="id"
                type="text"
                placeholder="Masukkan ID Siswa"
                label="ID Siswa"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="password"
                type="text"
                placeholder="Masukkan Password untuk Akun Siswa"
                label="Password Akun Siswa"
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

    definePageMeta({
        layout: 'admin'
    })

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
            label: "Tambah Siswa",
            route: `/admin/group/${route.params.id}/add-student`
        }
    ])

    const name = ref('')
    const id = ref('')
    const password = ref('')
    const gender = ref('')
    const genderSelection = ref(["Laki-laki", "Perempuan"])
    const isLoading = ref(false)

    const router = useRouter()

    watch(name, () => {
        id.value = name.value.toLowerCase().trim().replaceAll(" ", ".")
    })

    const create = async () => {
        isLoading.value = true
        const result = await useAddStudent(
            name.value, 
            id.value,
            password.value,
            gender.value,
            route.params.id as string
        )

        if (isLeft(result)) {
            isLoading.value = false
            alert(unwrapEither(result))
        } else {
            isLoading.value = false
            alert("Siswa berhasil ditambahkan")
            router.back()
        }
    }
</script>