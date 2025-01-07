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
        <Spacer class="h-6"/>
        <div v-if="activity && activity.type != ActivityType.OTHER" class="bg-white border border-border-primary rounded-2xl p-6">
            <template v-if="activity.type == ActivityType.STUDENT_FORM">
                <TextField
                    v-model="searchQuery"
                    placeholder="Cari siswa dgn nama"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Spacer class="h-6"/>
                <DataTable
                    :headers="studentFormTableHeader"
                    :is-empty="filteredStudentResultData.length == 0"
                >
                    <tr v-for="(data, index) in filteredStudentResultData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.name }}</Text>
                        </td>
                        <td>
                            <!-- <ScoreStatusCard
                                v-if="data.result?.ohis != undefined"
                                :rules="ohisScoreRule"
                                :value="data.result?.ohis.totalScore ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text> -->
                        </td>
                        <td>
                            <!-- <ScoreStatusCard
                                v-if="data.result?.dmft != undefined"
                                :rules="dmftScoreRule"
                                :value="data.result?.dmft.totalScore ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text> -->
                        </td>
                        <td>
                            <!-- <ScoreStatusCard
                                v-if="data.result?.gums != undefined"
                                :rules="gumScoreRule"
                                :value="data.result?.gums.score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text> -->
                        </td>
                        <td class="flex justify-end">
                            <Button 
                                v-if="data.result"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/teacher/student-assignment/${activity.id}/${data.student.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="px-4 py-2">
                                <Text>Siswa Belum Mengisi!</Text>
                            </div>
                        </td>
                    </tr>
                </DataTable>
            </template>
            <template v-if="activity.type == ActivityType.PARENT_FORM">
                <TextField
                    v-model="searchQuery"
                    placeholder="Cari siswa dgn nama"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Spacer class="h-6"/>
                <DataTable
                    :headers="parentTableHeader"
                    :is-empty="filteredStudentResultData.length == 0"
                >
                    <tr v-for="(data, index) in filteredStudentResultData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.result ? data.result.parentData?.name : "-" }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.result ? data.result.parentData?.relation : "-" }}</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.sections[0].score != undefined"
                                :rules="parentScoreRule"
                                :value="data.result?.sections[0].score ?? 0"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button 
                                v-if="data.result"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/teacher/parent-questionnarie/${activity.id}/${data.student.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="px-4 py-2">
                                <Text>Orang Tua Belum Mengisi</Text>
                            </div>
                        </td>
                    </tr>
                </DataTable>
            </template>
            <template v-if="activity.type == ActivityType.TOOTH_HEALTH">
                <div class="flex flex-row justify-between">
                    <TextField
                        v-model="searchQuery"
                        placeholder="Cari siswa dgn nama"
                        leading-icon="mdi:magnify"
                        class="me-1 w-52 sm:w-[16.7rem]"
                    />
                    <Button class="hidden sm:block" to="/teacher/student-health/check">
                        Lakukan Pemeriksaan
                    </Button>
                    <div 
                        class="drawer-button btn btn-square flex justify-center sm:hidden bg-primary text-white"
                        @click="navigateTo('/teacher/student-health/check')"
                    >
                        <Icon name="mdi:doctor" size="24px"/>
                    </div>
                </div>
                <Spacer class="h-6"/>
                <DataTable
                    :headers="healthTableHeader"
                    :is-empty="filteredStudentHealthData.length == 0"
                >
                    <tr v-for="(data, index) in filteredStudentHealthData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.student.gender }}</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.ohis != undefined"
                                :rules="ohisScoreRule"
                                :value="data.result?.ohis.totalScore ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.dmft != undefined"
                                :rules="dmftScoreRule"
                                :value="data.result?.dmft.totalScore ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.gums != undefined"
                                :rules="gumScoreRule"
                                :value="data.result?.gums.score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button 
                                :type="data.result == undefined ? ButtonType.Primary : ButtonType.Outlined" 
                                dense
                                @click="getAction(data)"
                            >
                                {{ data.result == undefined ? "Periksa" : "Lihat Detail" }}
                            </Button>
                        </td>
                    </tr>
                </DataTable>
            </template>
            <template v-if="activity.type == ActivityType.EVALUATION">

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
            label: "Manajemen Kegiatan UKGS",
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
    const students = useGetAllStudents(userStore.school?.id ?? "")
    const entries = useGetAllEntries(userStore.school?.id ?? "", route.params.id as string)
    const toothHealthData = useGetAllToothHealth(userStore.school?.id ?? "", route.params.id as string)
    const searchQuery = ref("")

    const studentResultData = computed(() => students.value.map((student) => ({
        student,
        result: entries.value.find((entry) => entry.id == student.id)
    })))

    const studentHealthData = computed(() => students.value.map((student) => ({
        student,
        result: toothHealthData.value.find((entry) => entry.studentId == student.id)
    })))

    const filteredStudentResultData = computed(() => 
        studentResultData.value.filter((data) => 
            data.student.name.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase())
        )
    )

    const filteredStudentHealthData = computed(() => 
        studentHealthData.value.filter((data) => 
            data.student.name.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase())
        )
    )

    const studentFormTableHeader = ref([
        "",
        "Nama Siswa",
        "Hasil Pengetahuan",
        "Hasil Sikap",
        "Hasil Perilaku",
        ""
    ])

    const parentTableHeader = ref([
        "",
        "Nama Siswa",
        "Nama Orang Tua",
        "Relasi",
        "Hasil",
        ""
    ])

    const healthTableHeader = ref([
        "",
        "Nama Siswa",
        "Jenis Kelamin",
        "Hasil OHIS",
        "Hasil DMFT",
        "Hasil Gusi",
        ""
    ])

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

    const getAction = (data: { student: Student, result?: ToothHealth}) => {
        const link = data.result == undefined ? `/teacher/student-health/check?id=${data.student.id}` : `/teacher/student-health/${activity.value?.id ?? '-'}/${data.student.id}`
        navigateTo(link)
    }
</script>