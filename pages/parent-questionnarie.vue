<template>
    <div class="my-6 min-h-dvh">
        <Text :typography="Typography.H1" class="text-center">Form Kuesioner Peran Orang Tua</Text>
        <Spacer height="h-6"/>
        <div v-if="!questionMode" class="bg-white rounded-2xl p-6">
            <CustomDropdownSelector
                :selected="wrapSchoolWithDropdownOption(selectedSchool)"
                label="Sekolah Asal"
                placeholder="Pilih sekolah asal siswa"
                search-placeholder="Cari Sekolah"
                :options="schoolDropdownOptions"
                class="w-full"
                @change="data => selectedSchool = data.data"
            />
            <Spacer height="h-4"/>
            <template v-if="selectedSchool">
                <CustomDropdownSelector
                    :selected="wrapStudentWithDropdownOption(selectedStudent)"
                    label="Nama Siswa"
                    placeholder="Pilih siswa"
                    search-placeholder="Cari sesuai nama"
                    :options="studentDropdownOptions"
                    class="w-full"
                    @change="data => selectedStudent = data.data"
                />
                <Spacer height="h-4"/>
            </template>
            <TextField
                v-model="name"
                label="Nama Anda"
                placeholder="Masukkan nama Anda"
                type="text"
            />
            <Spacer height="h-4"/>
            <DropdownSelector
                v-model="relation"
                label="Hubungan dengan Siswa"
                placeholder="Pilih hubungan dengan siswa"
                :options="relationOptions"
            />
            <Spacer height="h-6"/>
            <Text>Pastikan sekolah dan nama siswa yang Anda pilih sudah sesuai</Text>
            <Spacer height="h-4"/>
            <Button
                full-width
                @click="goToQuestionMode"
            >
                Selanjutnya
            </Button>
        </div>
        <template v-if="questionMode">
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
                        <Radio
                            v-for="option in question.answerOption"
                            :value="option"
                            :selected="question.selectedAnswer"
                            :group="`${section.title}-${question.question}`"
                            @change="data => question.selectedAnswer = data"
                        />
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
    const name = ref("")
    const relation = ref("")
    const relationOptions = [
        "Ayah",
        "Ibu",
        "Wali"
    ]

    const questionMode = ref(false)
    const questionnarie = ref<Questionnarie | null>(null)

    const goToQuestionMode = () => {
        questionMode.value = true
    }

    const submit = () => {
        console.log(questionnarie.value)
    }

    onMounted(async () => {
        const result = await useGetQuestionnarieByType(QuestionType.PeranOrangTua)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            questionnarie.value = unwrapEither(result)
        }
    })
</script>