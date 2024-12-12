<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Tambah Akun</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="name"
                placeholder="Masukkan Nama"
                label="Nama Pemilik Akun"
            />
            <Spacer height="h-4" />
            <DropdownSelector 
                v-model="gender"
                label="Jenis Kelamin" 
                placeholder="Pilih Jenis Kelamin"
                :options="genderSelection"
            />
            <Spacer height="h-4" />
            <CustomDropdownSelector 
                label="Role" 
                placeholder="Pilih Role"
                :selected="wrapRoleWithDropdownOption(role)"
                :options="roleOptions"
                class="w-full"
                @change="data => role = data.data"
            />
            <template v-if="role == 'teacher'">
                <Spacer height="h-4" />
                <CustomDropdownSelector 
                    label="Sekolah" 
                    placeholder="Pilih Sekolah"
                    :selected="wrapSchoolWithDropdownOption(selectedSchool)"
                    :options="schoolDropdownOptions"
                    class="w-full"
                    @change="data => selectedSchool = data.data"
                />
            </template>
            <template v-else>
                <Spacer height="h-4" />
                <TextField
                    v-model="instansi"
                    type="text"
                    placeholder="Masukkan nama instansi (Puskesmas)"
                    label="Instansi/Puskesmas"
                />
            </template>
            <Spacer height="h-4" />
            <TextField
                v-model="id"
                type="text"
                placeholder="Masukkan ID Akun"
                label="ID Akun"
            />
            <Spacer height="h-4" />
            <TextField
                v-model="password"
                type="text"
                placeholder="Masukkan Password untuk Akun"
                label="Password Akun"
            />
            <Spacer height="h-12" />
            <Button 
                full-width
                :loading="isLoading"
                @click="create"
            >
                Buat Akun
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
            label: "Kelola Akun",
            route: "/admin/account"
        },
        {
            label: "Tambah Akun",
            route: "/admin/account/add"
        }
    ])

    const name = ref('')
    const id = ref('')
    const password = ref('')
    const gender = ref('')
    const genderSelection = ref(["Laki-laki", "Perempuan"])
    const role = ref('')
    const roleOptions = ref([
        {
            label: "Guru",
            data: "teacher"
        },
        {
            label: "Admin",
            data: "admin"
        }
    ])
    const instansi = ref('')
    const schools = useGetAllSchools()
    const schoolDropdownOptions = computed(() => schools.value.map((school) => ({
        label: school.name,
        data: school
    } satisfies CustomDropdownOption<School>)))
    const selectedSchool = ref<School | null>(null)
    const isLoading = ref(false)

    const router = useRouter()

    const wrapRoleWithDropdownOption = (data: string): CustomDropdownOption<string> | undefined => 
        roleOptions.value.find((option) => option.data == data) ?? undefined
    
    const wrapSchoolWithDropdownOption = (data: School | null): CustomDropdownOption<School> | undefined => 
        schoolDropdownOptions.value.find((option) => option.data == data) ?? undefined

    watch(name, () => {
        id.value = name.value.toLowerCase().trim().replaceAll(" ", ".")
    })

    const uiStore = useUiStore()

    const create = async () => {
        isLoading.value = true
        const result = await useAddUser(
            role.value,
            name.value, 
            gender.value,
            selectedSchool.value?.id ?? null,
            instansi.value,
            id.value,
            password.value
        )

        if (isLeft(result)) {
            isLoading.value = false
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            isLoading.value = false
            uiStore.showToast("Akun berhasil ditambahkan", ToastType.SUCCESS)
            router.back()
        }
    }
</script>