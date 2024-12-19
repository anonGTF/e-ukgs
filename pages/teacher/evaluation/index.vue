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
                    <Button dense :to="`/teacher/evaluation/${activeActivity.id}/teacher-questionnarie`">
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
            <Spacer class="h-6"/>
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <DataTable
                    :headers="teacherTableHeaders"
                >
                    <tr v-for="(data, index) in teacherWithEntryData">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.teacher.name }}</Text>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ data.isPeranGuruDone ? "Sudah Mengisi" : "Belum Mengisi" }}</Text>
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
                        <Text>Pilih menu <span class="font-bold">Kelola Kegiatan UKGS</span></Text>
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
    const teachers = ref<User[]>([])
    const entries = computed(() => useGetAllEntries(userStore.school?.id ?? "", activeActivity.value?.id ?? "-"))
    const teacherWithEntryData = computed(() => teachers.value.map((teacher) => ({
        teacher,
        isPeranGuruDone: entries.value.value.find((entry) => entry.id == teacher.id && entry.type == QuestionType.PeranGuru)
    })))
    const teacherTableHeaders = ref([
        "",
        "Nama Guru",
        "Pengisian Peran Guru"
    ])

    onMounted(async () => {
        const result = await useGetActiveActivityByType(userStore.school?.id as string, ActivityType.EVALUATION)
        if (isRight(result)) {
            activeActivity.value = unwrapEither(result)
        }

        const teacherResult = await useGetAllUsersBySchoolId(userStore.school?.id ?? "")
        if (isRight(result)) {
            teachers.value = unwrapEither(teacherResult) as User[]
        }
    })
</script>