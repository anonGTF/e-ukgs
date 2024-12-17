<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Kuesioner Peran Orang Tua Siswa {{ userStore.school?.name }}</Text>
        <Spacer class="h-6"/>
        <template v-if="activeActivity != null">
            <div class="bg-white border border-border-primary rounded-2xl p-6">
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
                                :to="`/teacher/parent-questionnarie/${activeActivity.id}/${data.student.id}`"
                            >
                                Lihat Detail
                            </Button>
                            <div v-else class="px-4 py-2">
                                <Text>Orang Tua Belum Mengisi</Text>
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
                <Text :typography="Typography.H2">Tidak Ada Kegiatan Penilaian Peran Orang Tua Siswa!</Text>
                <Spacer height="h-6"/>
                <Text :typography="Typography.Label">Anda bisa mengikuti petunjuk berikut untuk membuat kegiatan penilaian perang orang tua:</Text>
                <Spacer height="h-2"/>
                <ol class="w-full lg:w-2/5 list-decimal">
                    <li>
                        <Text>Arahkan cursor ke sebelah kiri (apabila menggunakan tablet/handphone, klik tombol garis tiga di sebelah pojok kiri atas) ke bagian <span class="font-bold">MENU</span></Text>
                    </li>
                    <li>
                        <Text>Pilih menu <span class="font-bold">Kelola Kegiatan UKGS</span></Text>
                    </li>
                    <li>
                        <Text>Klik tombol <span class="font-bold">Tambah Kegiatan</span></Text>
                    </li>
                    <li>
                        <Text>Pilih tipe <span class="font-bold">Kegiatan Penilaian Peran Orang Tua Siswa</span> kemudian isi detail kegiatan sesuai form yang tersedia.</Text>
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
            label: "Peran Orang Tua",
            route: "/teacher/parent-questionnarie"
        }
    ])

    const tableHeader = ref([
        "",
        "Nama Siswa",
        "Nama Orang Tua",
        "Relasi",
        "Hasil",
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

    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })

    onMounted(async () => {
        const result = await useGetActiveActivityByType(userStore.school?.id as string, ActivityType.PARENT_FORM)
        if (isRight(result)) {
            activeActivity.value = unwrapEither(result)
        }
    })
</script>