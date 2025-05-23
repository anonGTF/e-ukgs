<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Penilaian Perilaku Kesehatan Gigi Siswa {{ userStore.school?.name }}</Text>
        <Spacer class="h-6"/>
        <template v-if="activeActivity != null">
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H3" class="font-semibold">Kegiatan Penilaian Perilaku Kesehatan Gigi yang Berjalan</Text>
                <Spacer height="h-6"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="educationActionLabels"
                        :background-colors="educationActionColor"
                        :data="educationChartData"
                        class="flex-1"
                        max-height="h-72"
                        title="Skor Pengetahuan"
                    />
                    <BarCard 
                        :labels="attitudeLabels"
                        :background-colors="attitudeColor"
                        :data="attitudeChartData"
                        class="flex-1"
                        max-height="h-72"
                        title="Skor Sikap"
                    />
                    <BarCard 
                        :labels="educationActionLabels"
                        :background-colors="educationActionColor"
                        :data="actionChartData"
                        class="flex-1"
                        max-height="h-72"
                        title="Skor Tindakan"
                    />
                    <ProgressChart 
                        title="Progress Penilaian"
                        :positive="positiveDataCount"
                        positive-label="Sudah mengisi"
                        :negative="negativeDataCount"
                        negative-label="Belum mengisi"
                        description="Kegiatan penilaian sudah mencapai:"
                    />
                </div>
                <Spacer height="h-12"/>
                <TextField
                    v-model="searchQuery"
                    :placeholder="isSmall(activeBreakpoint) ? 'Cari siswa dgn nama' : 'Cari siswa berdasarkan nama'"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Spacer class="h-6"/>
                <DataTable
                    :headers="tableHeader"
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
                            <ScoreStatusCard
                                v-if="data.result?.sections[0].score != null"
                                :rules="educationActionScoreRule"
                                :value="data.result?.sections[0].score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.sections[1].score != null"
                                :rules="attitudeScoreRule"
                                :value="data.result?.sections[1].score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.result?.sections[2].score != null"
                                :rules="educationActionScoreRule"
                                :value="data.result?.sections[2].score ?? 999"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button 
                                v-if="data.result"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/teacher/student-assignment/${activeActivity.id}/${data.student.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="px-4 py-2">
                                <Text>Siswa Belum Mengisi!</Text>
                            </div>
                        </td>
                    </tr>
                </DataTable>
            </div>
        </template>
        <template v-else>
            <div class="bg-white border border-border-primary rounded-2xl p-8 flex flex-col justify-center items-center">
                <Icon name="mdi:calendar-cursor-outline" class="text-content-secondary" size="5rem"/>
                <Spacer height="h-6"/>
                <Text :typography="Typography.H2">Tidak Ada Kegiatan Penilaian Perilaku Kesehatan Gigi Siswa!</Text>
                <Spacer height="h-6"/>
                <Text :typography="Typography.Label">Anda bisa mengikuti petunjuk berikut untuk membuat kegiatan penilaian perilaku:</Text>
                <Spacer height="h-2"/>
                <ol class="w-full lg:w-2/5 list-decimal">
                    <li>
                        <Text>Arahkan cursor ke sebelah kiri (apabila menggunakan tablet/handphone, klik tombol garis tiga di sebelah pojok kiri atas) ke bagian <span class="font-bold">MENU</span></Text>
                    </li>
                    <li>
                        <Text>Pilih menu <span class="font-bold">Manajemen Kegiatan UKGS</span></Text>
                    </li>
                    <li>
                        <Text>Klik tombol <span class="font-bold">Tambah Kegiatan</span></Text>
                    </li>
                    <li>
                        <Text>Pilih tipe <span class="font-bold">Kegiatan Pengisian Kuesioner Perilaku Siswa</span> kemudian isi detail kegiatan sesuai form yang tersedia.</Text>
                    </li>
                </ol>
            </div>
        </template>
        <Spacer height="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <Text :typography="Typography.H3" class="font-semibold">Daftar Riwayat Kegiatan Perilaku Kesehatan Gigi Siswa</Text>
            <Spacer height="h-4"/>
            <DataTable
                :headers="doneTableHeader"
                :is-empty="doneActivities.length == 0"
            >
                <tr v-for="(data, index) in doneActivities">
                    <td>
                        <div class="flex flex-row gap-2">
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}.</Text>
                            <Text :typography="Typography.Body2">{{ getActivityTimeFormatted(data) }}</Text>
                        </div>
                    </td>
                    <td class="flex justify-end gap-2">
                        <Button 
                            :type="ButtonType.Outlined" 
                            dense
                            :to="`/teacher/activity/${data.id}`"
                        >
                            Lihat Detail
                        </Button>
                    </td>
                </tr>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })

    type StudentResult = {
        student: Student,
        result: Questionnarie | undefined
    }

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Perilaku Siswa",
            route: "/teacher/student-assignment"
        }
    ])

    const tableHeader = ref([
        "",
        "Nama Siswa",
        "Hasil Pengetahuan",
        "Hasil Sikap",
        "Hasil Tindakan",
        ""
    ])

    const userStore = useUserStore()
    const searchQuery = ref("")
    const activeBreakpoint = ref("")
    const activeActivity = ref<Activity | null>(null)
    const studentData = useGetAllStudents(userStore.school?.id)
    const entries = computed(() => useGetAllEntries(userStore.school?.id ?? "-", activeActivity.value?.id ?? "-"))
    const studentResultData = computed(() => {
        return studentData.value
            .sort((curr, next) => curr.name.localeCompare(next.name))
            .map((student) => ({
                student,
                result: entries.value.value.length > 0 ? entries.value.value.find((result) => result.id == student.id) : undefined
            } satisfies StudentResult))
            .sort((curr, next) => curr.result === undefined ? -1 : next.result === undefined ? 1 : 0)
    })
    const filteredStudentResultData = computed(() => studentResultData.value.filter((data) => data.student.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    const educationChartData = computed(() => {
        const scoreList = entries.value.value.map((data) => findRule(educationActionScoreRule, data.sections[0].score ?? 0)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, educationActionLabels)
    })

    const attitudeChartData = computed(() => {
        const scoreList = entries.value.value.map((data) => findRule(attitudeScoreRule, data.sections[1].score ?? 0)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, attitudeLabels)
    })

    const actionChartData = computed(() => {
        const scoreList = entries.value.value.map((data) => findRule(educationActionScoreRule, data.sections[2].score ?? 0)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, educationActionLabels)
    })

    const positiveDataCount = computed(() => studentResultData.value.reduce((acc, data) => acc + ((data.result != undefined) ? 1 : 0), 0))
    const negativeDataCount = computed(() => studentResultData.value.length - positiveDataCount.value)

    const doneActivities = useGetDoneActivitiesByType(userStore.school?.id as string, ActivityType.STUDENT_FORM)
    const doneTableHeader = ["", ""]


    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })

    onMounted(async () => {
        const result = await useGetActiveActivityByType(userStore.school?.id as string, ActivityType.STUDENT_FORM)
        if (isRight(result)) {
            activeActivity.value = unwrapEither(result)
        }
    })
</script>