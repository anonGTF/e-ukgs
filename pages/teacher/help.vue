<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Panduan Pengguna</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between items-center">
                <Text :typography="Typography.Label" class="font-semibold">Panduan E-UKGS untuk Guru</Text>
                <Button 
                    dense
                    external
                    :to="CONFIG.teacherTutorialLink"
                >
                    Download
                </Button>
            </div>
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
            label: "Panduan Pengguna",
            route: "/teacher/help"
        }
    ])
</script>