<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Evaluasi Kegiatan UKGS {{ userStore.school?.name }}</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between items-center">
                <Text :typography="Typography.Label" class="font-semibold">1. Evaluasi Peran Guru</Text>
                <Button dense to="/teacher/evaluation/teacher-questionnarie">
                    Isi Kuesioner
                </Button>
            </div>
            <!-- <Spacer height="h-6"/>
            <div class="flex flex-row gap-2 items-center">
                <Text :typography="Typography.Label" class="font-semibold">Evaluasi Penggunaan Platform E-UKGS</Text>
                <Button dense to="/teacher/evaluation/teacher-questionnarie">
                    Isi Kuesioner
                </Button>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Evaluasi Kegiatan UKGS",
            route: "/teacher/evaluation"
        }
    ])

    const userStore = useUserStore()
</script>