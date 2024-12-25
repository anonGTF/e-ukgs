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
                <Spacer height="h-4"/>
                <Toggle
                    v-model="showUpdate"
                    label="Tampilkan Update Kegiatan"
                />
                <template v-if="showUpdate">
                    <Spacer height="h-4"/>
                    <ActivityUpdateItem
                        v-for="(update, index) in updateList"
                        :order-no="index + 1"
                        :update-data="wrapWithUpdateItem(update)"
                        :show-decoration="index != updateList.length - 1"
                    />
                </template>
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
                                :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/student-assignment?id=${data.result.id}`"
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
                                :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/parent-questionnarie?id=${data.result.id}`"
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
                <TextField
                    v-model="searchQuery"
                    placeholder="Cari siswa dgn nama"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
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
                                v-if="data.result"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/student-health?id=${data.result.studentId}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="px-4 py-2">
                                <Text>Pemeriksaan belum dilakukan</Text>
                            </div>
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
        layout: 'admin'
    })

    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const uiStore = useUiStore()

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Data Kegiatan UKGS",
            route: "/admin/ukgs"
        },
        {
            label: "Sekolah",
            route: `/admin/ukgs/${route.params.schoolId}`
        },
        {
            label: "Detail Kegiatan",
            route: `/admin/ukgs/${route.params.schoolId}/${route.params.activityId}`
        }
    ])

    const activity = ref<Activity | null>(null)
    const pic = ref<User | null>(null)
    const updates = useGetAllUpdates(route.params.schoolId as string, route.params.activityId as string)
    const updateList = computed(() => [
        updates.budgetPlan.value,
        updates.startData.value,
        updates.completionData.value
    ].filter((data) => data != undefined))
    const showUpdate = ref(false)
    const students = useGetAllStudents(route.params.schoolId as string)
    const entries = useGetAllEntries(route.params.schoolId as string, route.params.activityId as string)
    const toothHealthData = useGetAllToothHealth(route.params.schoolId as string, route.params.activityId as string)
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
        const result = await useGetActivityById(route.params.schoolId as string, route.params.activityId as string)
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
</script>