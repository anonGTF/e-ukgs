<template>
    <div class="my-6 min-h-dvh">
        <Text :typography="Typography.H1" class="text-center">Form Kuesioner Peran Guru</Text>
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
    </div>
</template>

<script setup lang="ts">
    const router = useRouter()
    const uiStore = useUiStore()

    const questionnarie = ref<Questionnarie | null>(null)

    const submit = () => {
        console.log(questionnarie.value)
    }

    onMounted(async () => {
        const result = await useGetQuestionnarieByType(QuestionType.PeranGuru)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            questionnarie.value = unwrapEither(result)
        }
    })
</script>