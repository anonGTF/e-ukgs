<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Atur Kuesioner {{ data?.title }}</Text>
        <div v-if="data == null">
            <Spacer class="h-6"/>
            <Text>Memuat...</Text>
        </div>
        <template v-else v-for="(section, sectionIndex) in data.sections" :key="sectionIndex">
            <Spacer class="h-6"/>
            <div class="bg-white border border-border-primary rounded-2xl p-6">
                <div class="flex flex-row gap-4">
                    <TextField
                        v-model="section.title"
                        placeholder="Judul Section (kosongkan jika tidak perlu)"
                        class="flex-1"
                    />
                    <CustomDropdownSelector
                        :options="answerDropdownOption"
                        :selected="wrapWithDropdownOption(section.answerType)"
                        placeholder="Pilih Tipe Jawaban"
                        class="flex-none min-w-40"
                        @change="data => changeAnswerType(data, sectionIndex)"
                    />
                    <Button 
                        v-if="data.sections.length > 1"
                        :type="ButtonType.Primary" 
                        class="bg-error border-none hover:bg-error/75"
                        @click="deleteSection(sectionIndex)"
                    >
                        <Icon name="mdi:trash-can" class="text-white"/>
                    </Button>
                </div>
                <Spacer height="h-8"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-2"/>
                <template v-for="(question, questionIndex) in section.questions" :key="questionIndex">
                    <Spacer height="h-6"/>
                    <div>
                        <div class="flex flex-row gap-4 items-start">
                            <Text class="border rounded-full border-border-primary py-4 px-5 font-bold">{{ questionIndex + 1 }}</Text>
                            <div class="flex-1">
                                <TextField
                                    v-model="question.question"
                                    placeholder="Pertanyaan"
                                />
                                <Spacer height="h-4"/>
                                <Text :typography="Typography.Body1">Opsi Jawaban <span class="font-semibold">({{ getAnswerOptionInformation(section.answerType) }})</span></Text>
                                <Spacer height="h-4"/>
                                <div v-if="section.answerType == AnswerType.BINARY_OPTION" class="flex flex-row gap-4">
                                    <div v-for="option in question.answerOption" class="flex flex-row">
                                        <Text class="rounded-s-lg border border-border-primary p-2 min-w-14">{{ option.text }}</Text>
                                        <Text class="rounded-e-lg border border-border-primary p-2">{{ option.point }}</Text>
                                    </div>
                                </div>
                                <div v-if="section.answerType == AnswerType.RATING" class="flex flex-row gap-4">
                                    <div v-for="option in question.answerOption" class="flex flex-row">
                                        <Text class="rounded-s-lg border border-border-primary p-2 min-w-14">{{ option.text }}</Text>
                                        <Text class="rounded-e-lg border border-border-primary p-2">{{ option.point }}</Text>
                                    </div>
                                </div>
                                <div v-if="section.answerType == AnswerType.MULTIPLE_CHOICE">
                                    <div v-for="(option, index) in question.answerOption" class="flex flex-row gap-2 mb-4 items-center">
                                        <SelectionButton
                                            :selected="option.point == 1"
                                            :icon="multipleChoiceLabel[index].icon"
                                            :selected-icon="multipleChoiceLabel[index].selectedIcon"
                                            @select="changeCorrectAnswer(index, questionIndex, sectionIndex)"
                                        />
                                        <TextField
                                            v-model="option.text"
                                            :placeholder="`Masukkan opsi ${multipleChoiceLabel[index].label}`"
                                        />
                                    </div>
                                </div>
                                <Spacer height="h-6"/>
                                <div v-if="questionIndex != section.questions.length - 1" class="w-full border border-border-divider border-dashed"/>
                            </div>
                            <Button 
                                v-if="section.questions.length > 1"
                                :type="ButtonType.Primary" 
                                class="bg-error border-none hover:bg-error/75"
                                @click="deleteQuestion(questionIndex, sectionIndex)"
                            >
                                <Icon name="mdi:trash-can" class="text-white"/>
                            </Button>
                        </div>
                    </div>
                </template>
                <Spacer height="h-4"/>
                <Button 
                    full-width
                    :type="ButtonType.DashOutlined"
                    class="hover:bg-gray-200 hover:text-black hover:border-gray-200"
                    @click="addQuestion(sectionIndex)"
                >
                    <span class="flex flex-row items-center">
                        <Icon name="mdi:plus"/>
                        <Spacer width="w-2"/>
                        Tambah Pertanyaan
                    </span>
                </Button>
            </div>
        </template>
        <Spacer class="h-6"/>
        <Button 
            full-width
            :type="ButtonType.DashOutlined"
            class="hover:bg-gray-200 hover:text-black hover:border-gray-200"
            @click="addSection"
        >
            <span class="flex flex-row items-center">
                <Icon name="mdi:plus"/>
                <Spacer width="w-2"/>
                Tambah Section
            </span>
        </Button>
        <Spacer class="h-6"/>
        <Button 
            full-width
            :loading="isLoading"
            @click="save"
        >
            Simpan
        </Button>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr'
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import type { CustomDropdownOption } from '~/components/attr/CustomDropdownAttr';
    import { Typography } from '~/components/attr/TextAttr'
    import { ToastType } from '~/components/attr/ToastAttr';
    import type { Answer } from '~/models/questionnaire/Answer';
    import type { Questionnarie } from '~/models/questionnaire/Questionnarie';
    import { AnswerType } from '~/models/questionnaire/Section';

    definePageMeta({
        layout: 'admin'
    })

    const route = useRoute()
    const uiStore = useUiStore()

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        },
        {
            label: "Kelola Kuesioner",
            route: "/admin/questionnaire"
        },
        {
            label: "Atur",
            route: `/admin/questionnaire/${route.params.id}`
        }
    ])

    const data = ref<Questionnarie | null>(null)
    const isLoading = ref(false)
    const answerDropdownOption: CustomDropdownOption<AnswerType>[] = [
        {
            label: "Ya/Tidak",
            data: AnswerType.BINARY_OPTION
        },
        {
            label: "Pilihan Ganda",
            data: AnswerType.MULTIPLE_CHOICE
        },
        {
            label: "Rating",
            data: AnswerType.RATING
        }
    ]
    const multipleChoiceLabel = [
        {
            label: "A",
            icon:  "mdi:alpha-a-box-outline",
            selectedIcon: "mdi:alpha-a"
        },
        {
            label: "B",
            icon: "mdi:alpha-b-box-outline",
            selectedIcon: "mdi:alpha-b"
        },
        {
            label: "C",
            icon: "mdi:alpha-c-box-outline",
            selectedIcon: "mdi:alpha-c"
        },
        {
            label: "D",
            icon: "mdi:alpha-d-box-outline",
            selectedIcon: "mdi:alpha-d"
        }
    ]
    const wrapWithDropdownOption = (data: AnswerType): CustomDropdownOption<AnswerType> => 
        answerDropdownOption.find((option) => option.data == data) ?? answerDropdownOption[0]
    
    const changeAnswerType = (selected: CustomDropdownOption<any>, sectionIndex: number) => {
        if (data.value == null || !(selected.data in AnswerType)) {
            return
        }

        const selectedSection = data.value.sections[sectionIndex]
        data.value.sections[sectionIndex] = {
            ...selectedSection,
            answerType: selected.data as AnswerType,
            questions: selectedSection.questions.map((question) => {
            const updatedAnswerList = getDefaultAnswerOptions(selected.data)
            return {
                ...question,
                answerOption: updatedAnswerList
            }
        })
        }
    }

    const changeCorrectAnswer = (
        selectedIndex: number, 
        questionIndex: number, 
        sectionIndex: number
    ) => {
        if (data.value == null) {
            return
        }

        const selectedQuestion = data.value.sections[sectionIndex].questions[questionIndex]
        data.value.sections[sectionIndex].questions[questionIndex] = {
            ...selectedQuestion,
            answerOption: selectedQuestion.answerOption.map((answer, index) => 
                index == selectedIndex ? {...answer, point: 1} : {...answer, point: 0}
            )
        }
    }
        
    const addQuestion = (sectionIndex: number) => {
        if (data.value == null) {
            return
        }

        const selectedSection = data.value.sections[sectionIndex]
        data.value.sections[sectionIndex].questions.push({
            orderNo: 0,
            question: "",
            answerOption: getDefaultAnswerOptions(selectedSection.answerType)
        })
    }

    const deleteQuestion = (questionIndex: number, sectionIndex: number) => {
        if (data.value == null) {
            return
        }

        data.value.sections[sectionIndex].questions.splice(questionIndex, 1)
    }

    const addSection = () => {
        if (data.value == null) {
            return
        }

        data.value.sections.push({
            title: "",
            answerType: AnswerType.BINARY_OPTION,
            questions: []
        })
    }

    const deleteSection = (sectionIndex: number) => {
        if (data.value == null) {
            return
        }

        data.value.sections.splice(sectionIndex, 1)
    }

    const save = async () => {
        isLoading.value = true
        if (data.value != null) {
            const result = await useSaveQuestionnarie(data.value)
            if (isLeft(result)) {
                uiStore.showToast(unwrapEither(result), ToastType.ERROR)
                isLoading.value = false
            } else {
                uiStore.showToast("Data berhasil diubah", ToastType.SUCCESS)
                navigateTo("/admin/questionnarie")
            }
        }
    }

    const getDefaultAnswerOptions = (type: AnswerType): Answer[] => {
        switch (type) {
            case AnswerType.MULTIPLE_CHOICE:
                return [
                    {
                        text: "",
                        point: 1
                    },
                    {
                        text: "",
                        point: 0
                    },
                    {
                        text: "",
                        point: 0
                    },
                    {
                        text: "",
                        point: 0
                    }
                ]
            
            case AnswerType.BINARY_OPTION: 
                return [
                    {
                        text: "Ya",
                        point: 1
                    },
                    {
                        text: "Tidak",
                        point: 0
                    },
                ]
            
            case AnswerType.RATING:
                return [
                    {
                        text: "Sangat Tidak Setuju",
                        point: 1
                    },
                    {
                        text: "Tidak Setuju",
                        point: 2
                    },
                    {
                        text: "Setuju",
                        point: 3
                    },
                    {
                        text: "Sangat Setuju",
                        point: 4
                    }
                ]
        
            default:
                return []
        }
    }

    const getAnswerOptionInformation = (type: AnswerType) => type == AnswerType.MULTIPLE_CHOICE ? "Opsi terpilih bernilai 1, lainnya 0" : "Label : Point"

    onMounted(async () => {
        const result = await useGetQuestionnarieById(route.params.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        } else {
            data.value = unwrapEither(result)
            if (data.value.sections.length == 0) {
                data.value = {
                    ...data.value,
                    sections: [{
                        title: "",
                        answerType: AnswerType.BINARY_OPTION,
                        questions: []
                    }]
                }
            }
        }
    })
</script>