<template>
<div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Akun Guru</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6 lg:w-[30rem]">
            <div class="flex flex-row items-center justify-between pb-7 border-b border-border-divider">
                <Text :typography="Typography.H2">Identitas Guru</Text>
                <Button 
                    :type="ButtonType.Outlined" 
                    dense
                    class="hidden md:block"
                    @click="navigateTo(`/admin/teacher/${route.params.id}/edit`)"
                >
                    Edit Detail Guru
                </Button>
                <div class="btn btn-square md:hidden" @click="navigateTo(`/admin/teacher/${route.params.id}/edit`)">
                    <Icon name="mdi:pencil" size="24px"/>
                </div>
            </div>
            <template v-for="detail in details" :key="detail.label">
                <Spacer class="h-6"/>
                <Text :typography="Typography.Body1">{{ detail.label }}</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ detail.data }}</Text>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr'
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr'
    import { ToastType } from '~/components/attr/ToastAttr';
    import type { Teacher } from '~/models/teacher/Teacher';

    const route = useRoute()

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
            label: "Detail Akun Guru",
            route: `/admin/teacher/${route.params.id}`
        }
    ])

    const teacherData = ref<Teacher | null>(null)
    const details = computed(() => [
        {
            label: "Nama Guru",
            data: teacherData.value?.name
        },
        {
            label: "ID Guru",
            data: teacherData.value?.userId
        },
        {
            label: "Jenis Kelamin",
            data: teacherData.value?.gender
        }
    ])

    const uiStore = useUiStore()

    onMounted(async () => {
        const result = await useGetTeacherById(route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            teacherData.value = unwrapEither(result) as Teacher
        }
    })
</script>