<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Buat Rancangan Anggaran Biaya</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6"></div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })

    const route = useRoute()
    const userStore = useUserStore()

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Kelola Kegiatan UKGS",
            route: "/teacher/activity"
        },
        {
            label: "Detail Kegiatan",
            route: `/teacher/activity/${route.params.id}`
        },
        {
            label: "Rancangan Anggaran Biaya",
            route: `/teacher/activity/${route.params.id}/budget`
        }
    ])
</script>