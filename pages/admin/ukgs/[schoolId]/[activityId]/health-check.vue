<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Form Pemeriksaan Gigi</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <CustomDropdownSelector
                :options="studentDropdownOptions"
                :selected="selectedStudentForDropdownOption"
                placeholder="Pilih Siswa"
                label="Siswa yang Diperiksa"
                search-placeholder="Cari nama siswa"
                class="w-full"
                @change="selectStudent"
            />
            <Spacer height="h-12"/>
            <div class="w-full border border-border-divider border-dashed"/>
            <Spacer height="h-8"/>
            <template v-if="alreadyHasData">
                <div class="flex flex-col items-center">
                    <Text>Pemeriksaan pada {{ selectedStudent?.gender == "Laki-laki" ? "siswa" : "siswi" }} <span class="font-semibold">{{ selectedStudent?.name }}</span> sudah dilakukan</Text>
                    <Spacer height="h-4"/>
                    <Button :to="`/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/student-health?id=${selectedStudent?.id}`" class="w-fit">Lihat Hasil Pemeriksaan</Button>
                </div>
            </template>
            <template v-else>

                <!-- PEMERIKSAAN DEBRIS OHIS -->
    
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.H2">Debris Index - OHIS</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        external
                        :to="CONFIG.ohisTutorialLink"
                    >
                        Lihat Instruksi
                    </Button>
                </div>
                <Spacer height="h-4"/>
                <div class="grid grid-cols-3 gap-6 w-full">
                    <CustomDropdownSelector
                        v-for="(score, index) in debris"
                        :label="index.toString()"
                        label-class="text-center font-semibold"
                        :label-typography="Typography.H3"
                        :placeholder="`Pilih debris index untuk gigi ${index}`"
                        :placeholder-overflow="PlaceholderOverflowType.ELLIPSIS"
                        :selected="wrapWithDropdownOption(score, debrisScoreOptions)"
                        :options="debrisScoreOptions"
                        @change="data => debris[index] = data.data"
                    />
                </div>
                <Spacer height="h-12"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>

                <!-- PEMERIKSAAN KALKULUS OHIS -->
    
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.H2">Kalkulus Index - OHIS</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        external
                        :to="CONFIG.ohisTutorialLink"
                    >
                        Lihat Instruksi
                    </Button>
                </div>
                <Spacer height="h-4"/>
                <div class="grid grid-cols-3 gap-6 w-full">
                    <CustomDropdownSelector
                        v-for="(score, index) in kalkulus"
                        class="flex-1"
                        :label="index.toString()"
                        label-class="text-center font-semibold"
                        :label-typography="Typography.H3"
                        :placeholder="`Pilih kalkulus index untuk gigi ${index}`"
                        :placeholder-overflow="PlaceholderOverflowType.ELLIPSIS"
                        :selected="wrapWithDropdownOption(score, kalkulusScoreOptions)"
                        :options="kalkulusScoreOptions"
                        @change="data => kalkulus[index] = data.data"
                    />
                </div>
                <Spacer height="h-12"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
    
                <!-- PEMERIKSAAN DMFT -->
    
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.H2">DMFT</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        external
                        :to="CONFIG.dmftTutorialLink"
                    >
                        Lihat Instruksi
                    </Button>
                </div>
                <Spacer height="h-4"/>
                <div class="grid grid-cols-2 gap-6 w-full">
                    <TextField
                        v-model:number="cavity"
                        type="number"
                        placeholder="Masukkan banyak gigi berlubang"
                        label="Jumlah Gigi Berlubang"
                        :error-message="cavityErrorMessage"
                        class="flex-1"
                    />
                    <TextField
                        v-model:number="filled"
                        type="number"
                        placeholder="Masukkan banyak gigi ditambal"
                        label="Jumlah Gigi Ditambal"
                        :error-message="filledErrorMessage"
                        class="flex-1"
                    />
                    <TextField
                        v-model:number="loose"
                        type="number"
                        placeholder="Masukkan banyak gigi goyang karena berlubang"
                        label="Jumlah Gigi Goyang karena Lubang"
                        :error-message="looseErrorMessage"
                        class="flex-1"
                    />
                    <TextField
                        v-model:number="missing"
                        type="number"
                        placeholder="Masukkan banyak gigi hilang karena berlubang"
                        label="Jumlah Gigi Hilang karena Lubang"
                        :error-message="missingErrorMessage"
                        class="flex-1"
                    />
                </div>
                <Spacer height="h-12"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
    
                <!-- PEMERIKSAAN GUSI -->
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.H2">Kondisi Gusi</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        external
                        :to="CONFIG.gumTutorialLink"
                    >
                        Lihat Instruksi
                    </Button>
                </div>
                <Spacer height="h-4"/>
                <div class="w-full bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                    <Text :typography="Typography.Label" color="text-black" class="font-semibold">Catatan: Nilai Kondisi Gusi</Text>
                    <Spacer height="h-2"/>
                    <div class="space-y-3">
                        <div class="flex items-start">
                            <span class="w-4 font-bold">0</span>
                            <span class="w-4 text-center">:</span>
                            <span class="flex-1">Normal.</span>
                        </div>
                        <div class="flex items-start">
                            <span class="w-4 font-bold">1</span>
                            <span class="w-4 text-center">:</span>
                            <span class="flex-1">Ada sedikit perubahan warna, bengkak, namun tidak ada pendarahan.</span>
                        </div>
                        <div class="flex items-start">
                            <span class="w-4 font-bold">2</span>
                            <span class="w-4 text-center">:</span>
                            <span class="flex-1">Warna kemerahan, bengkak, pendarahan saat diperiksa.</span>
                        </div>
                        <div class="flex items-start">
                            <span class="w-4 font-bold">3</span>
                            <span class="w-4 text-center">:</span>
                            <span class="flex-1">Warna merah terang atau merah menyala, luka, pendarahan spontan.</span>
                        </div>
                    </div>
                </div>
                <Spacer height="h-6"/>
                <div class="px-4 grid grid-cols-[1fr,2fr,2fr,2fr,2fr,2fr,2fr,1fr] gap-6 w-full items-center">
                    <Text 
                        v-for="header in gumTableHeaders"
                        :typography="Typography.Body2" 
                        class="font-semibold text-center flex-1 -mx-6 py-4 border-b border-border-divider"
                    >{{ header }}</Text>
                    <template v-for="(tooth, toothIndex) in gumData">
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary text-center flex-1">{{ toothIndex }}</Text>
                        <template v-for="(side, sideIndex) in tooth">
                            <CustomDropdownSelector
                                v-if="side != null"
                                class="flex-1"
                                placeholder="Pilih kondisi gusi"
                                :placeholder-overflow="PlaceholderOverflowType.ELLIPSIS"
                                :selected="wrapWithDropdownOption(side, gumScoreOptions)"
                                :options="gumScoreOptions"
                                @change="data => gumData[toothIndex][sideIndex] = data.data"
                            />
                            <Text v-else :typography="Typography.Body2" color="text-content-secondary" class="text-center flex-1">Tidak Tersedia</Text>
                        </template>
                        <Text :typography="Typography.Body2" class="text-center flex-1">{{ gumScore[toothIndex] }}</Text>
                    </template>
                </div>

                <template v-if="ohisScore >= 0 && typeof(dmftScore) === 'number' && dmftScore >= 0 && gumFilled">
                    <Spacer class="h-12"/>
                    <div class="w-full bg-primary p-4 rounded-lg">
                        <Text :typography="Typography.H2" color="text-white">Hasil Pemeriksaan</Text>
                        <Spacer height="h-4"/>
                        <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                            <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor OHIS</Text>
                            <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ roundScore(ohisScore) }}</Text>
                            <ScoreStatusCard :value="ohisScore" :rules="ohisScoreRule"/>
                        </div>
                        <div class="flex flex-row justify-between items-center border-b border-border-divider ms-4 mt-2">
                            <Text :typography="Typography.Body1" color="text-white">Debris</Text>
                            <Text :typography="Typography.H3" color="text-white" class="font-semibold">{{ roundScore(debrisScore) }}</Text>
                        </div>
                        <div class="flex flex-row justify-between items-center border-b border-border-divider ms-4 mt-2">
                            <Text :typography="Typography.Body1" color="text-white">Kalkulus</Text>
                            <Text :typography="Typography.H3" color="text-white" class="font-semibold">{{ roundScore(kalkulusScore) }}</Text>
                        </div>
                        <br/>
                        <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                            <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor DMFT</Text>
                            <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ roundScore(dmftScore) }}</Text>
                            <ScoreStatusCard :value="dmftScore" :rules="dmftScoreRule"/>
                        </div>
                        <br/>
                        <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                            <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor Gusi</Text>
                            <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ roundScore(gumScore.averageScore) }}</Text>
                            <ScoreStatusCard :value="gumScore.averageScore" :rules="gumScoreRule"/>
                        </div>
                    </div>
                </template>
                <Spacer class="h-12"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
                
                <!-- UPLOAD Foto -->
                <Text :typography="Typography.H2">Upload Foto Kondisi Gigi</Text>
                <Spacer height="h-4"/>
                <Text>Untuk keperluan dokumentasi pemeriksaan bagi pihak Puskesmas, maka guru diharapkan meng-upload kondisi kesehatan gigi siswa yang sekiranya memerlukan perawatan lebih lanjut.</Text>
                <Spacer height="h-4"/>
                <FileInput
                    label=""
                    file-type="image/*"
                    button-text="Pilih satu atau beberapa foto"
                    multiple
                    @multiple-change="files => evidences = files"
                />
                <Spacer class="h-12"/>
                <Button 
                    full-width
                    :loading="isLoading"
                    @click="save"
                >
                    Simpan
                </Button>
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
        },
        {
            label: "Pemeriksaan",
            route: `/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/health-check?id=${route.query.id}`
        }
    ])

    const activeActivity = ref<Activity | null>(null)
    const selectedStudent = ref<Student | null>(null)
    const allStudents = useGetAllStudents(route.params.schoolId as string)
    const studentDropdownOptions = computed<CustomDropdownOption<Student>[]>(() => allStudents.value.map((student) => ({
        label: student.name,
        data: student
    })))
    const selectedStudentForDropdownOption = computed(() => {
        if (selectedStudent.value == null) return undefined

        return studentDropdownOptions.value.find((option) => option.data.id == selectedStudent.value?.id)
    })
    const selectStudent = (data: CustomDropdownOption<Student>) => {
        selectedStudent.value = data.data
    }
    const toothHealthData = computed(() => useGetAllToothHealth(route.params.schoolId as string, activeActivity.value?.id ?? "-"))

    const debris = ref({
        16: -1,
        11: -1,
        26: -1,
        46: -1,
        31: -1,
        36: -1
    })
    const debrisScoreOptions = ref<CustomDropdownOption<number>[]>([
        {
            label: "Tidak ada debris atau stain (0)",
            data: 0
        },
        {
            label: "Kurang dari 1/3 permukaan gigi tertutupi Debris atau terdapat stain menutupi permukaan gigi (1)",
            data: 1
        },
        {
            label: "1/3 sampai 2/3 permukaan gigi tertutupi Debris (2)",
            data: 2
        },
        {
            label: "lebih dari 2/3 permukaan gigi tertutupi Debris (3)",
            data: 3
        },
        {
            label: "Tidak tersedia",
            data: -2
        }
    ])
    const debrisScore = computed(() => {
        const scoreList = Object.values(debris.value).filter((value) => value != -2)
        return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
    })

    const kalkulus = ref({
        16: -1,
        11: -1,
        26: -1,
        46: -1,
        31: -1,
        36: -1
    })
    const kalkulusScoreOptions = ref<CustomDropdownOption<number>[]>([
        {
            label: "Tidak ada kalkulus (0)",
            data: 0
        },
        {
            label: "Kurang dari 1/3 permukaan gigi tertutupi Supragingival kalkulus pada mahkota gigi (1)",
            data: 1
        },
        {
            label: "1/3 sampai 2/3 tertutupi Supragingival kalkulus atau ada bintik kalkulus subgingiva (2)",
            data: 2
        },
        {
            label: "Lebih dari 2/3 tertutupi Supragingival kalkulus atau ada kalkulus yang melingkari subgingiva (3)",
            data: 3
        },
        {
            label: "Tidak tersedia",
            data: -2
        }
    ])
    const kalkulusScore = computed(() => {
        const scoreList = Object.values(kalkulus.value).filter((value) => value != -2)
        return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
    })
    const ohisScore = computed(() => debrisScore.value + kalkulusScore.value)

    const gumScoreOptions = ref<CustomDropdownOption<number>[]>([
        {
            label: "0",
            data: 0
        },
        {
            label: "1",
            data: 1
        },
        {
            label: "2",
            data: 2
        },
        {
            label: "3",
            data: 3
        },
        {
            label: "Tidak tersedia",
            data: -2
        }
    ])

    const gumTableHeaders = [
        "Index Gigi",
        "Mesial",
        "Bucal",
        "Labial",
        "Distal",
        "Palatal",
        "Lingual",
        "TOTAL"
    ]
    const gumData = ref({
        16: {
            mesial: -1,
            bucal: -1,
            labial: null,
            distal: -1,
            palatal: -1,
            lingual: null
        },
        21: {
            mesial: -1,
            bucal: null,
            labial: -1,
            distal: -1,
            palatal: -1,
            lingual: null
        },
        24: {
            mesial: -1,
            bucal: -1,
            labial: null,
            distal: -1,
            palatal: -1,
            lingual: null
        },
        36: {
            mesial: -1,
            bucal: -1,
            labial: null,
            distal: -1,
            palatal: null,
            lingual: -1
        },
        41: {
            mesial: -1,
            bucal: null,
            labial: -1,
            distal: -1,
            palatal: null,
            lingual: -1
        },
        44: {
            mesial: -1,
            bucal: -1,
            labial: null,
            distal: -1,
            palatal: null,
            lingual: -1
        }
    })

    const gumScore = ref<GumScore>({ 
        16: 0,
        21: 0,
        24: 0,
        36: 0,
        41: 0,
        44: 0,
        totalScore: 0, 
        totalSide: 0, 
        averageScore: 0 
    })

    const gumFilled = computed(() => {
        const filledStatus = []
        for (const [_, side] of Object.entries(gumData.value)) {
            const sideList = Object.values(side)
            filledStatus.push(sideList.every((score) => score != -1))
        }

        return filledStatus.every((status) => status)
    })

    watch(gumData, () => {
        const updated: GumScore = { totalScore: 0, totalSide: 0, averageScore: 0 }
        for (const [key, side] of Object.entries(gumData.value)) {
            const sideList = Object.values(side)
            const toothScore = sideList.reduce((sum, score) => (sum ?? 0) + ((score == null || score < 0) ? 0 : score), 0)
            updated[key as unknown as number] = toothScore ?? 0
            updated.totalScore += toothScore ?? 0
            updated.totalSide += sideList.filter((score) => score != -2 || score != null).length
        }
        updated.averageScore = updated.totalScore / updated.totalSide
        gumScore.value = updated
    }, { deep: true })

    const wrapWithDropdownOption = (data: number, options: CustomDropdownOption<number>[]): CustomDropdownOption<number> | undefined => 
        options.find((option) => option.data == data)

    const cavity = ref<number>(0)
    const filled = ref<number>(0)
    const loose = ref<number>(0)
    const missing = ref<number>(0)
    const cavityErrorMessage = ref("")
    const filledErrorMessage = ref("")
    const looseErrorMessage = ref("")
    const missingErrorMessage = ref("")
    const dmftScore = computed(() => (cavity.value ?? -1) + (filled.value ?? -1) + (loose.value ?? -1) + (missing.value ?? -1))
    const alreadyHasData = ref(false)

    const evidences = ref<File[]>([])

    const isLoading = ref(false)

    const save = async () => {
        if (activeActivity.value == null) return

        if (selectedStudent.value == null) {
            uiStore.showToast("Pilih siswa terlebih dahulu!", ToastType.ERROR)
            return
        }

        if (cavity.value == undefined || filled.value == undefined || loose.value == undefined || missing.value == undefined) {
            uiStore.showToast("Data DMFT harus diisi lengkap!", ToastType.ERROR)
            return
        }

        isLoading.value = true
        let evidencesLink: string[] = []
        if (evidences.value.length > 0) {
            const uplaodJob = evidences.value.map((evidence) => useUploadFile(evidence, `${route.params.schoolId}/${activeActivity.value?.id ?? '-'}`))
            const uploadResults = await Promise.all(uplaodJob)
            if (uploadResults.some((result) => isLeft(result))) {
                uiStore.showToast("Upload Foto gagal", ToastType.ERROR)
                isLoading.value = false
                return
            }
            evidencesLink = uploadResults.map((result) => unwrapEither(result))
        }

        const result = await useAddToothHealth(route.params.schoolId as string, activeActivity.value.id, {
            id: "",
            studentId: selectedStudent.value.id,
            ohis: {
                debris: debris.value,
                kalkulus: kalkulus.value,
                totalScore: ohisScore.value
            },
            dmft: {
                cavity: cavity.value,
                filled: filled.value,
                loose: loose.value,
                missing: missing.value,
                totalScore: dmftScore.value
            },
            gums: {
                data: gumData.value,
                score: gumScore.value
            },
            referral: {
                evidences: evidencesLink,
                treatment: evidencesLink.map(() => "")
            }
        })

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            isLoading.value = false
        } else {
            uiStore.showToast("Data pemeriksaan gigi berhasil disimpan", ToastType.SUCCESS)
            router.back()
        }
    }

    watch(selectedStudent, () => {
        if (selectedStudent.value == null) return

        const studentHealthData = toothHealthData.value.value.find((data) => data.studentId == selectedStudent.value?.id)
        alreadyHasData.value = studentHealthData != null
    })

    onMounted(async () => {
        const result = await useGetActiveActivityByType(route.params.schoolId as string, ActivityType.TOOTH_HEALTH)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            activeActivity.value = unwrapEither(result)
        }

        if (route.query.id != null) {
            const studentResult = await useGetStudentById(route.query.id as string, route.params.schoolId as string)
            if (isLeft(studentResult)) {
                uiStore.showToast(unwrapEither(studentResult), ToastType.ERROR)
            } else {
                selectedStudent.value = unwrapEither(studentResult)
            }
        }
    })
</script>