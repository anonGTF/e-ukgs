<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Kegiatan</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <Text :typography="Typography.Body1">Nama Kegiatan</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ activity?.title }}</Text>
            <Spacer class="h-4"/>
            <Text :typography="Typography.Body1">Waktu Pelaksanaan</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ activity ? getActivityTimeFormatted(activity) : "" }}</Text>
            <Spacer class="h-4"/>
            <Text :typography="Typography.Body1">Penanggung Jawab</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ pic?.name }}</Text>
            <template v-if="updateList.length > 0">
                <Spacer height="h-8"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-6"/>
                <Text :typography="Typography.H2">Update Kegiatan</Text>
                <Spacer height="h-6"/>
                <ActivityUpdateItem
                    v-for="(update, index) in updateList"
                    :order-no="index + 1"
                    :update-data="wrapWithUpdateItem(update)"
                    :show-decoration="index != updateList.length - 1"
                />
            </template>
            <template v-if="activity?.status != ActivityStatus.DROPPED && activity?.status != ActivityStatus.DONE">
                <Spacer height="h-6"/>
                <div  class="flex flex-row gap-2">
                    <Button
                        v-if="activity?.status != ActivityStatus.ONPROGRESS"
                        :type="ButtonType.Outlined"
                        class="btn-danger flex-1"
                        :to="`/teacher/activity/${activity?.id}/completion?isDone=false`"
                    >
                        Batalkan
                    </Button>
                    <Button
                        v-if="activity?.status == ActivityStatus.TODO"
                        class="flex-1"
                        :to="`/teacher/activity/${activity.id}/budget`"
                    >
                        Buat RAB
                    </Button>
                    <Button
                        v-if="activity?.status == ActivityStatus.READY"
                        class="flex-1"
                        @click="startActivity"
                    >
                        Mulai Kegiatan
                    </Button>
                    <Button
                        v-if="activity?.status == ActivityStatus.ONPROGRESS"
                        class="flex-1"
                        :to="`/teacher/activity/${activity.id}/completion?isDone=true`"
                    >
                        Selesaikan Kegiatan
                    </Button>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })

    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const uiStore = useUiStore()

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
        }
    ])

    const activity = ref<Activity | null>(null)
    const pic = ref<User | null>(null)
    const updates = useGetAllUpdates(userStore.school?.id ?? "", route.params.id as string)
    const updateList = computed(() => [
        updates.budgetPlan.value,
        updates.startData.value,
        updates.completionData.value
    ].filter((data) => data != undefined))

    const wrapWithUpdateItem = (data: BudgetPlan | StartData | CompletionData): UpdateItem => {
        if ('total' in data) {
            const budgetPlan = data as BudgetPlan
            return {
                updateTime: budgetPlan.createdAt ?? new Date(),
                budgetPlan
            }
        } else if ('actualStartTime' in data) {
            const startData = data as StartData
            return {
                updateTime: startData.actualStartTime,
                startData
            }
        } else {
            const completionData = data as CompletionData
            return {
                updateTime: completionData.createdAt ?? new Date(),
                completionData
            }
        }
    }

    onMounted(async () => {
        const result = await useGetActivityById(userStore.school?.id ?? "", route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
            return
        }
        activity.value = unwrapEither(result)
        
        const picResult = await useGetUserById(activity.value.picId)
        if (isLeft(picResult)) {
            uiStore.showToast(unwrapEither(picResult), ToastType.ERROR)
            router.back()
            return
        }
        pic.value = unwrapEither(picResult)
    })

    const startActivity = () => {
        if (activity.value == undefined) return
        uiStore.confirm(
            "Anda yakin ingin memulai kegiatan?",
            `Kegiatan ${activity.value.title} akan dimulai. Tidak bisa membatalkan kegiatan yang sudah dimulai`,
            ConfirmationType.INFO,
            async () => {
                uiStore.hideConfirmationModal()
                const updateResult = await useAddStartData(userStore.school?.id ?? "", activity.value?.id ?? "", {
                    id: UPDATE_CONSTANTS.startDataAttr,
                    plannedStartTime: activity.value?.startTime ?? new Date(),
                    actualStartTime: new Date() 
                })

                if (isLeft(updateResult)) {
                    uiStore.showToast(unwrapEither(updateResult), ToastType.ERROR)
                    return
                }
                await useUpdateActivityStatus(userStore.school?.id ?? "", activity.value?.id ?? "", ActivityStatus.ONPROGRESS)
            },
            () => {
                uiStore.hideConfirmationModal()
            }
        )
    }
</script>