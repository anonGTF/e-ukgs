<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Profil</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <template v-for="detail in details" :key="detail.label">
                <Text :typography="Typography.Body1">{{ detail.label }}</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ detail.data }}</Text>
                <Spacer class="h-6"/>
            </template>
            <Button 
                full-width
                @click="navigateTo(`/admin/profile/edit`)"
            >
                Edit Profil
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "admin"
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Profil Pengguna",
            route: "/admin/profile"
        }
    ])

    const userStore = useUserStore()

    const details = computed(() => [
        {
            label: "Nama",
            data: userStore.user?.name
        },
        {
            label: "ID Akun",
            data: userStore.user?.userId
        },
        {
            label: "Jenis Kelamin",
            data: userStore.user?.gender
        },
        {
            label: "Instansi",
            data: userStore.user?.instansi
        }
    ])
</script>