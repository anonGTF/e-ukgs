<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Edit Akun</Text>
        <Spacer class="h-6"/>
        <div v-if="userData == null">...loading</div>
        <div v-else class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="userData.name"
                placeholder="Masukkan Nama"
                label="Nama Pemilik Akun"
            />
            <Spacer height="h-4" />
            <DropdownSelector 
                v-model="userData.gender"
                label="Jenis Kelamin" 
                placeholder="Pilih Jenis Kelamin"
                :options="genderSelection"
            />
            <Spacer height="h-4" />
            <CustomDropdownSelector 
                label="Role" 
                placeholder="Pilih Role"
                :selected="wrapRoleWithDropdownOption(userData.role)"
                :options="roleOptions"
                class="w-full"
                @change="data => onRoleChanged(data as unknown as string)"
            />
            <template v-if="userData.role == 'teacher'">
                <Spacer height="h-4" />
                <CustomDropdownSelector 
                    label="Sekolah" 
                    placeholder="Pilih Sekolah"
                    :selected="wrapSchoolWithDropdownOption(userData.schoolId)"
                    :options="schoolDropdownOptions"
                    class="w-full"
                    @change="data => onSchoolChanged(data.data as unknown as string)"
                />
            </template>
            <template v-else>
                <Spacer height="h-4" />
                <TextField
                    v-model="userData.instansi"
                    type="text"
                    placeholder="Masukkan nama instansi (Puskesmas)"
                    label="Instansi/Puskesmas"
                />
            </template>
            <Spacer height="h-4" />
            <TextField
                v-model="userData.userId"
                type="text"
                label="ID Akun (tidak bisa diedit)"
                :enabled="false"
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

    const uiStore = useUiStore()
    
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
            label: "Kelola Akun",
            route: "/admin/account"
        },
        {
            label: "Edit Akun",
            route: `/admin/account/${route.params.id}/edit`
        }
    ])

    const genderSelection = ref(["Laki-laki", "Perempuan"])
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
    const schools = useGetAllSchools()
    const schoolDropdownOptions = computed(() => schools.value.map((school) => ({
        label: school.name,
        data: school.id
    } satisfies CustomDropdownOption<string>)))
    const userData = ref<User | null>(null)
    const isLoading = ref(false)

    const wrapRoleWithDropdownOption = (data: string): CustomDropdownOption<string> | undefined => 
        roleOptions.value.find((option) => option.data == data) ?? undefined
    
    const wrapSchoolWithDropdownOption = (id: string | undefined): CustomDropdownOption<string> | undefined => 
        schoolDropdownOptions.value.find((option) => option.data == id) ?? undefined

    const onRoleChanged = (role: string) => {
        if (userData.value) { 
            userData.value.role = role
        }
    }

    const onSchoolChanged = (id: string) => {
        if (userData.value) { 
            userData.value.schoolId = id
        }
    }

    const save = async () => {
        if (userData.value == undefined) return

        const result = await useSaveUser(userData.value)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            router.go(-2)
        }
    }

    onMounted(async () => {
        const result = await useGetUserById(route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            return
        }
        userData.value = unwrapEither(result) as User
    })
</script>