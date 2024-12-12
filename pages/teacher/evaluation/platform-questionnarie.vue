<template>
    <div class="my-6 min-h-dvh">
        <Text :typography="Typography.H1" class="text-center">Form Kuesioner Perilaku Kesehatan Gigi Siswa</Text>
        <Spacer height="h-6"/>
        <div v-if="!questionMode" class="bg-white rounded-2xl p-6">
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
            <CustomDropdownSelector
                v-if="selectedSchool"
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
            <Spacer height="h-4"/>
            <Button
                full-width
                @click="goToQuestionMode"
            >
                Selanjutnya
            </Button>
        </div>
        <template v-if="questionMode">
            <div class="bg-primary rounded-2xl px-6 py-4">
                <Text :typography="Typography.Label" color="text-white" class="font-semibold">Halo, {{ selectedStudent?.name }}</Text>
                <Text color="text-gray-100">Pastiin semua soal udah terjawab sebelum submit ya. Jawab dengan jujur <span class="text-xl">😉</span></Text>
            </div>
            <Spacer height="h-6"/>
            <template v-if="questionnarie" v-for="section in questionnarie.sections">
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
    
    const questionMode = ref(false)
    const questionnarie = ref<Questionnarie | null>(null)

    const goToQuestionMode = () => {
        questionMode.value = true
    }

    const submit = () => {
        console.log(questionnarie.value)
    }

    onMounted(async () => {
        const result = await useGetQuestionnarieByType(QuestionType.SoalPerilaku)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            questionnarie.value = unwrapEither(result)
        }
    })
</script>