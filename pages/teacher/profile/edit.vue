<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Edit Profil</Text>
        <Spacer class="h-6"/>
        <div v-if="userData == null">...loading</div>
        <div v-else class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <TextField
                v-model="userData.name"
                placeholder="Masukkan Nama"
                label="Nama"
            />
            <Spacer height="h-4" />
            <DropdownSelector 
                v-model="userData.gender"
                label="Jenis Kelamin" 
                placeholder="Pilih Jenis Kelamin"
                :options="genderSelection"
            />
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
    definePageMeta({
        layout: "teacher"
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Profil Pengguna",
            route: "/teacher/profile"
        },
        {
            label: "Edit Profil",
            route: "/teacher/profile/edit"
        }
    ])

    const userStore = useUserStore()
    const uiStore = useUiStore()
    const router = useRouter()

    const genderSelection = ref(["Laki-laki", "Perempuan"])
    const isLoading = ref(false)
    const userData = ref<User | null>(null)

    const save = async () => {
        if (userData.value == undefined) return

        isLoading.value = true
        const result = await useSaveUser(userData.value)
        if (isLeft(result)) {
            isLoading.value = false
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            router.go(-2)
        }
    }

    onMounted(() => {
        userData.value = JSON.parse(JSON.stringify(userStore.user))
    })
</script>