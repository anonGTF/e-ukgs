<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Tambah Akun Guru</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="name"
                placeholder="Masukkan Nama Guru"
                label="Nama Guru"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="id"
                type="text"
                placeholder="Masukkan ID Guru"
                label="ID Guru"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="password"
                type="text"
                placeholder="Masukkan Password untuk Akun Guru"
                label="Password Akun Guru"
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
                Buat Akun Guru
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/Breadcrumb'
    import { Typography } from '~/components/attr/TextAttr'

    definePageMeta({
        layout: 'admin'
    })

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
            label: "Tambah Akun Guru",
            route: "/admin/teacher/add"
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
        const result = await useAddTeacher(
            name.value, 
            id.value,
            password.value,
            gender.value
        )

        if (isLeft(result)) {
            isLoading.value = false
            alert(unwrapEither(result))
        } else {
            isLoading.value = false
            alert("Guru berhasil ditambahkan")
            router.back()
        }
    }
</script>