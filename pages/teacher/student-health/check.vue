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
                    <Button :to="`/teacher/student-health/${activeActivity?.id ?? '-'}/${selectedStudent?.id}`" class="w-fit">Lihat Hasil Pemeriksaan</Button>
                </div>
            </template>
            <template v-else>
                <!-- PEMERIKSAAN DEBRIS OHIS -->
    
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.H2">Pemeriksaan Debris OHIS</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        @click="showDebrisInstruction = !showDebrisInstruction"
                    >
                        {{ showDebrisInstruction ? "Sembunyikan Instruksi" : "Tampilkan Instruksi" }}
                    </Button>
                </div>
                <template v-if="showDebrisInstruction">
                    <Spacer height="h-4"/>
                    <div class="w-full bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Instruksi Pemeriksaan Debris OHIS</Text>
                    </div>
                </template>
                <Spacer height="h-4"/>
                <div class="grid grid-cols-3 gap-6 w-full">
                    <CustomDropdownSelector
                        v-for="(score, index) in debris"
                        :label="index.toString()"
                        label-class="text-center font-semibold"
                        :label-typography="Typography.H3"
                        :placeholder="`Pilih skor debris untuk gigi ${index}`"
                        :placeholder-overflow="PlaceholderOverflowType.ELLIPSIS"
                        :selected="wrapWithDropdownOption(score, debrisScoreOptions)"
                        :options="debrisScoreOptions"
                        @change="data => debris[index] = data.data"
                    />
                </div>
                <Spacer height="h-12"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
                <!-- PEMERIKSAAN Kalkulus OHIS -->
    
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.H2">Pemeriksaan Kalkulus OHIS</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        @click="showKalkulusInstruction = !showKalkulusInstruction"
                    >
                        {{ showKalkulusInstruction ? "Sembunyikan Instruksi" : "Tampilkan Instruksi" }}
                    </Button>
                </div>
                <template v-if="showKalkulusInstruction">
                    <Spacer height="h-4"/>
                    <div class="w-full bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Instruksi Pemeriksaan Kalkulus OHIS</Text>
                    </div>
                </template>
                <Spacer height="h-4"/>
                <div class="grid grid-cols-3 gap-6 w-full">
                    <CustomDropdownSelector
                        v-for="(score, index) in kalkulus"
                        class="flex-1"
                        :label="index.toString()"
                        label-class="text-center font-semibold"
                        :label-typography="Typography.H3"
                        :placeholder="`Pilih skor kalkulus untuk gigi ${index}`"
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
                    <Text :typography="Typography.H2">Pemeriksaan DMFT</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        @click="showDmftInstruction = !showDmftInstruction"
                    >
                        {{ showDmftInstruction ? "Sembunyikan Instruksi" : "Tampilkan Instruksi" }}
                    </Button>
                </div>
                <template v-if="showDmftInstruction">
                    <Spacer height="h-4"/>
                    <div class="w-full bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Instruksi Pemeriksaan DMFT</Text>
                    </div>
                </template>
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
                        label="Jumlah Gigi Goyang"
                        :error-message="looseErrorMessage"
                        class="flex-1"
                    />
                    <TextField
                        v-model:number="missing"
                        type="number"
                        placeholder="Masukkan banyak gigi hilang karena berlubang"
                        label="Jumlah Gigi Hilang"
                        :error-message="missingErrorMessage"
                        class="flex-1"
                    />
                </div>
                <Spacer height="h-12"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
    
                <!-- PEMERIKSAAN GUSI -->
                <div class="flex flex-row justify-between items-center">
                    <Text :typography="Typography.H2">Pemeriksaan Gusi</Text>
                    <Button
                        :type="ButtonType.Ghost"
                        dense
                        class="text-primary"
                        @click="showGumInstruction = !showGumInstruction"
                    >
                        {{ showGumInstruction ? "Sembunyikan Instruksi" : "Tampilkan Instruksi" }}
                    </Button>
                </div>
                <template v-if="showGumInstruction">
                    <Spacer height="h-4"/>
                    <div class="w-full bg-primary/10 p-4 rounded-lg border border-dashed border-primary">
                        <Text :typography="Typography.Label" color="text-black" class="font-semibold">Instruksi Pemeriksaan Gusi</Text>
                    </div>
                </template>
                <Spacer height="h-4"/>
                <CustomDropdownSelector
                    class="w-full"
                    label="Kondisi Gusi"
                    placeholder="Pilih kondisi gusi"
                    :placeholder-overflow="PlaceholderOverflowType.ELLIPSIS"
                    :selected="wrapWithDropdownOption(gum, gumScoreOptions)"
                    :options="gumScoreOptions"
                    @change="data => gum = data.data"
                />
                <template v-if="ohisScore >= 0 && typeof(dmftScore) === 'number' && dmftScore >= 0 && gum >= 0">
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
                            <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ roundScore(gum) }}</Text>
                            <ScoreStatusCard :value="gum" :rules="gumScoreRule"/>
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
        layout: 'teacher'
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Kesehatan Gigi Siswa",
            route: "/teacher/student-health"
        },
        {
            label: "Periksa",
            route: "/teacher/student-health/check"
        },
    ])

    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const uiStore = useUiStore()

    const activeActivity = ref<Activity | null>(null)
    const selectedStudent = ref<Student | null>(null)
    const allStudents = useGetAllStudents(userStore.school?.id as string)
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
    const toothHealthData = computed(() => useGetAllToothHealth(userStore.school?.id ?? "", activeActivity.value?.id ?? "-"))

    const showDebrisInstruction = ref(false)
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
        }
    ])
    const debrisScore = computed(() => {
        const scoreList = Object.values(debris.value)
        return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
    })

    const showKalkulusInstruction = ref(false)
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
        }
    ])
    const kalkulusScore = computed(() => {
        const scoreList = Object.values(kalkulus.value)
        return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
    })
    const ohisScore = computed(() => debrisScore.value + kalkulusScore.value)

    const showGumInstruction = ref(false)
    const gum = ref(-1)
    const gumScoreOptions = ref<CustomDropdownOption<number>[]>([
        {
            label: "Normal (0)",
            data: 0
        },
        {
            label: "Ada sedikit perubahan warna, bengkak, namun tidak ada pendarahan (1)",
            data: 1
        },
        {
            label: "Warna kemerahan, bengkak, pendarahan saat diperiksa (2)",
            data: 2
        },
        {
            label: "Warna merah terang atau merah menyala, luka, pendarahan spontan (3)",
            data: 3
        }
    ])

    const wrapWithDropdownOption = (data: number, options: CustomDropdownOption<number>[]): CustomDropdownOption<number> | undefined => 
        options.find((option) => option.data == data)

    const showDmftInstruction = ref(false)
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
            const uplaodJob = evidences.value.map((evidence) => useUploadFile(evidence, `${userStore.school?.id ?? '-'}/${activeActivity.value?.id ?? '-'}`))
            const uploadResults = await Promise.all(uplaodJob)
            if (uploadResults.some((result) => isLeft(result))) {
                uiStore.showToast("Upload Foto gagal", ToastType.ERROR)
                isLoading.value = false
                return
            }
            evidencesLink = uploadResults.map((result) => unwrapEither(result))
        }

        const result = await useAddToothHealth(userStore.school?.id ?? "", activeActivity.value.id, {
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
                score: gum.value
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
        const result = await useGetActiveActivityByType(userStore.school?.id as string, ActivityType.TOOTH_HEALTH)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            activeActivity.value = unwrapEither(result)
        }

        if (route.query.id != null) {
            const studentResult = await useGetStudentById(route.query.id as string, userStore.school?.id as string)
            if (isLeft(studentResult)) {
                uiStore.showToast(unwrapEither(studentResult), ToastType.ERROR)
            } else {
                selectedStudent.value = unwrapEither(studentResult)
            }
        }
    })
</script>