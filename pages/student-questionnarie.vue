<template>
    <div class="my-6 min-h-dvh">
        <Text :typography="Typography.H1" class="text-center">Form Kuesioner Perilaku Kesehatan Gigi Siswa</Text>
        <Spacer height="h-6"/>
        <div v-if="questionMode == FormState.IDENTITY" class="bg-white rounded-2xl p-6">
            <CustomDropdownSelector
                :selected="wrapSchoolWithDropdownOption(selectedSchool)"
                label="Sekolah Asal"
                placeholder="Pilih sekolah asal kamu"
                search-placeholder="Cari Sekolah"
                :options="schoolDropdownOptions"
                class="w-full"
                @change="data => selectedSchool = data.data"
            />
            <Spacer height="h-4"/>
            <template v-if="selectedSchool">
                <template v-if="activeActivity == null">
                    <div class="bg-white border border-border-primary rounded-2xl p-8 flex flex-col justify-center items-center">
                        <Icon name="mdi:calendar-cursor-outline" class="text-content-secondary" size="5rem"/>
                        <Spacer height="h-6"/>
                        <Text :typography="Typography.H2" class="text-center">Tidak Ada Kegiatan Penilaian yang Aktif!</Text>
                        <Spacer height="h-2"/>
                        <Text :typography="Typography.Label">Pengisian kuesioner cuman bisa dilakuin kalo ada kegiatan penilaian yang aktif.</Text>
                    </div>
                </template>
                <template v-else>
                    <CustomDropdownSelector
                        :selected="wrapStudentWithDropdownOption(selectedStudent)"
                        label="Nama"
                        placeholder="Pilih siswa"
                        search-placeholder="Cari sesuai nama"
                        :options="studentDropdownOptions"
                        class="w-full"
                        @change="data => selectedStudent = data.data"
                    />
                    <Spacer height="h-6"/>
                    <Text>Pastiin sekolah dan nama siswa yang kamu pilih udah sesuai ya~</Text>
                </template>
                <Spacer height="h-4"/>
            </template>
            <Button
                full-width
                :enabled="selectedStudent != null && selectedSchool != null"
                :loading="nextLoading"
                @click="goToQuestionMode"
            >
                Selanjutnya
            </Button>
        </div>
        <template v-if="questionMode == FormState.NEW">
            <div class="bg-primary rounded-2xl px-6 py-4">
                <Text :typography="Typography.Label" color="text-white" class="font-semibold">Halo, {{ selectedStudent?.name }}</Text>
                <Text color="text-gray-100">Pastiin semua soal udah terjawab sebelum submit ya. Jawab dengan jujur <span class="text-xl">😉</span></Text>
            </div>
            <Spacer height="h-6"/>
            <template v-if="entryData" v-for="section in entryData.sections">
                <div class="bg-white rounded-2xl px-6 py-4">
                    <Text 
                        v-if="section.title != ''"
                        :typography="Typography.Label"
                        color="text-black"
                        class="font-semibold"
                    >
                        {{ section.title }}
                    </Text>
                    <Spacer height="h-4"/>
                    <template v-for="(question, index) in section.questions">
                        <Text><span class="font-bold">{{ index + 1 }}.</span> {{ question.question }}</Text>
                        <Spacer height="h-2"/>
                        <template v-if="section.answerType == AnswerType.MULTIPLE_CHOICE" v-for="(option, optionIndex) in question.answerOption">
                            <div class="flex flex-row gap-2 items-center cursor-pointer" @click="question.selectedAnswer = option">
                                <SelectionButton
                                    :selected="question.selectedAnswer?.text == option.text"
                                    :icon="multipleChoiceLabel[optionIndex].icon"
                                    :selected-icon="multipleChoiceLabel[optionIndex].selectedIcon"
                                    dense
                                    @select="question.selectedAnswer = option"
                                />
                                <Text>{{ option.text }}</Text>
                            </div>
                        </template>
                        <template v-if="section.answerType == AnswerType.BINARY_OPTION" v-for="option in question.answerOption">
                            <Radio
                                :value="option"
                                :selected="question.selectedAnswer"
                                :group="`${section.title}-${question.question}`"
                                @change="data => question.selectedAnswer = data"
                            />
                        </template>
                        <template v-if="section.answerType == AnswerType.RATING" v-for="option in question.answerOption">
                            <Radio
                                :value="option"
                                :selected="question.selectedAnswer"
                                :group="`${section.title}-${question.question}`"
                                @change="data => question.selectedAnswer = data"
                            />
                        </template>
                        <Spacer height="h-4"/>
                    </template>
                </div>
                <Spacer height="h-6"/>
            </template>
            <Button
                full-width
                @click="submit"
            >
                Submit
            </Button>
        </template>
        <div v-if="questionMode == FormState.EXIST" class="flex flex-col items-center bg-white rounded-2xl p-6">
            <Icon name="mdi:file-document-check" class="text-content-secondary" size="5rem"/>
            <Spacer height="h-6"/>
            <Text :typography="Typography.Label">🎉 Pengisian kamu sudah tersimpan! 🥳</Text>
            <Spacer height="h-4"/>
            <Button to="/">Kembali ke beranda</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    const router = useRouter()
    const uiStore = useUiStore()

    const schools = useGetAllSchools()
    const selectedSchool = ref<School | null>(null)
    const schoolDropdownOptions = computed(() => schools.value.map((school) => ({
        label: school.name,
        data: school
    })))
    const wrapSchoolWithDropdownOption = (data: School | null): CustomDropdownOption<School> | undefined => 
        schoolDropdownOptions.value.find((option) => option.data == data)

    const students = computed(() => useGetAllStudents(selectedSchool.value?.id))
    const selectedStudent = ref<Student | null>(null)
    const studentDropdownOptions = computed(() => students.value.value.map((student) => ({
        label: student.name,
        data: student
    })))
    const wrapStudentWithDropdownOption = (data: Student | null): CustomDropdownOption<Student> | undefined => 
        studentDropdownOptions.value.find((option) => option.data == data)
    
    const questionMode = ref<FormState>(FormState.IDENTITY)
    const nextLoading = ref(false)
    const entryData = ref<Questionnarie | null>(null)
    const activeActivity = ref<Activity | null>(null)
    const isLoading = ref(false)

    const goToQuestionMode = async () => {
        if (selectedSchool.value == null || selectedStudent.value == null || activeActivity.value == null) return

        nextLoading.value = true
        const result = await useGetEntryById(selectedSchool.value.id, activeActivity.value.id, selectedStudent.value.id)
        console.log(unwrapEither(result))
        if (isRight(result)) {
            questionMode.value = FormState.EXIST
        } else {
            questionMode.value = FormState.NEW
        }
        nextLoading.value = false
    }

    const submit = async () => {
        if (selectedSchool.value == null || selectedStudent.value == null || activeActivity.value == null || entryData.value == null) return

        isLoading.value = true
        const result = await useAddEntry(selectedSchool.value.id, activeActivity.value.id, {
            ...entryData.value,
            id: selectedStudent.value.id
        })

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            isLoading.value = false
        } else {
            uiStore.showToast("Jawaban Berhasil Disimpan!", ToastType.SUCCESS)
            router.back()
        }
    }

    watch(selectedSchool, async () => {
        if (selectedSchool.value == null) return

        const result = await useGetActiveActivityByType(selectedSchool.value?.id as string, ActivityType.STUDENT_FORM)
        if (isRight(result)) {
            activeActivity.value = unwrapEither(result)
        } else {
            activeActivity.value = null
        }
    })

    onMounted(async () => {
        const result = await useGetQuestionnarieByType(QuestionType.SoalPerilaku)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            entryData.value = unwrapEither(result)
        }
    })
</script>