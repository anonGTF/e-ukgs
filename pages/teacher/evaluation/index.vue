<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Evaluasi Kegiatan UKGS {{ userStore.school?.name }}</Text>
        <Spacer class="h-6"/>
        <template v-if="activeActivity != null">
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.Label" class="font-semibold">1. Evaluasi Peran Guru</Text>
                    <Button v-if="!(currentTeacherData?.peranGuru ?? false)" dense :to="`/teacher/evaluation/${activeActivity.id}/teacher-questionnarie`">
                        Isi Kuesioner
                    </Button>
                </div>
                <Spacer height="h-6"/>
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.Label" class="font-semibold">2. Evaluasi E-UKGS</Text>
                    <Button v-if="!(currentTeacherData?.evaluation ?? false)" dense :to="`/teacher/evaluation/${activeActivity.id}/platform-questionnarie`">
                        Isi Kuesioner
                    </Button>
                </div>
            </div>
            <Spacer class="h-6"/>
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H3" class="font-semibold">Kegiatan Evaluasi yang Berjalan</Text>
                <Spacer height="h-6"/>
                <div class="flex flex-row gap-4">
                    <BarCard
                        :labels="parentLabels"
                        :background-colors="parentColor"
                        :data="teacherChartData"
                        class="flex-1"
                        max-height="h-72"
                        title="Hasil Peran Guru"
                    />
                    <BarCard
                        :labels="evalLabels"
                        :background-colors="evalColor"
                        :data="evalChartData"
                        class="flex-1"
                        max-height="h-72"
                        title="Hasil Evaluasi"
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
                <DataTable
                    :headers="teacherTableHeaders"
                >
                    <tr v-for="(data, index) in usersWithEntryData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}.</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.user.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.user.role == 'teacher' ? 'Guru' : 'Perawat' }}</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.peranGuru?.sections[0].score != undefined"
                                :rules="teachertScoreRule"
                                :value="data.peranGuru?.sections[0].score ?? 0"
                            />
                            <Text v-else-if="data.user.role == 'teacher'" :typography="Typography.Body2">-</Text>
                            <Text v-else>Tidak tersedia</Text>
                        </td>
                        <td>
                            <ScoreStatusCard
                                v-if="data.evalTotalScore != undefined"
                                :rules="evalScoreRule"
                                :value="data.evalTotalScore"
                            />
                            <Text v-else :typography="Typography.Body2">-</Text>
                        </td>
                        <td class="flex justify-end">
                            <Button
                                v-if="data.peranGuru != null || data.evaluation != null"
                                :type="ButtonType.Outlined" 
                                dense
                                :to="`/teacher/evaluation/${activeActivity.id}/${data.user.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="p-2">
                                <Text>Belum Mengisi</Text>
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
                <Text :typography="Typography.H2">Tidak Ada Kegiatan Evaluasi UKGS yang Aktif!</Text>
                <Spacer height="h-6"/>
                <Text :typography="Typography.Label">Anda bisa mengikuti petunjuk berikut untuk membuat kegiatan evaluasi UKGS:</Text>
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
                        <Text>Pilih tipe <span class="font-bold">Kegiatan Evaluasi UKGS</span> kemudian isi detail kegiatan sesuai form yang tersedia.</Text>
                    </li>
                </ol>
            </div>
        </template>
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
    const activeActivity = ref<Activity | null>(null)
    const users = useGetAllUsers()
    const filteredUsers = computed(() => users.value
        .filter((user) => user.role == "admin" || user.schoolId == userStore.school?.id)
        .sort((a, b) => {
            if (a.role === b.role) return 0
            if (a.role === "teacher") return -1
            if (b.role === "teacher") return 1
            if (a.role === "admin") return -1
            if (b.role === "admin") return 1
            return 0
        })
    )
    const entries = computed(() => useGetAllEntries(userStore.school?.id ?? "", activeActivity.value?.id ?? "-"))
    const usersWithEntryData = computed(() => filteredUsers.value.map((user) => {
        const evaluation = entries.value.value.find((entry) => entry.id == `${user.id}-eval` && entry.type == QuestionType.EvaluasiEUkgs)
        return {
            user,
            evaluation,
            evalTotalScore: getEvalTotalScore(evaluation),
            peranGuru: entries.value.value.find((entry) => entry.id == `${user.id}-teacher` && entry.type == QuestionType.PeranGuru)
        }
    }))
    const currentTeacherData = computed(() => usersWithEntryData.value.find((data) => data.user.id == userStore.user?.id))
    const teacherTableHeaders = ref([
        "",
        "Nama",
        "Tugas",
        "Peran Guru",
        "Evaluasi",
        ""
    ])

    const teacherChartData = computed(() => {
        const scoreList = usersWithEntryData.value.map((data) => findRule(teachertScoreRule, data.peranGuru?.sections[0].score ?? -1)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, teacherLabels)
    })

    const evalChartData = computed(() => {
        const scoreList = usersWithEntryData.value.map((data) => findRule(evalScoreRule, data.evalTotalScore ?? -1)).filter((data) => data != undefined)
        const scoreLabel = countByLabel(scoreList)
        return getCountsInOrder(scoreLabel, evalLabels)
    })

    const positiveDataCount = computed(() => usersWithEntryData.value.reduce((acc, data) => {
        let count = 0
        if (data.user.role == "teacher" && data.peranGuru != null) count += 1
        if (data.evaluation != null) count += 1
        return acc + count
    }, 0))

    const negativeDataCount = computed(() => {
        const totalCount = usersWithEntryData.value.reduce((acc, data) => acc + ((data.user.role == "teacher") ? 2 : 1), 0)
        return totalCount - positiveDataCount.value
    })

    onMounted(async () => {
        const result = await useGetActiveActivityByType(userStore.school?.id as string, ActivityType.EVALUATION)
        if (isRight(result)) {
            activeActivity.value = unwrapEither(result)
        }
    })
</script>