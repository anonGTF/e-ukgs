<template>
    <div class="m-2 sm:m-8">
       <Breadcrumb :items="breadcrumbs"/>
       <Spacer class="h-6"/>
       <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Hasil Evaluasi</Text>
       <Spacer class="h-6"/>
       <div v-if="userData != null" class="bg-white border border-border-primary rounded-2xl p-6">
            <Text :typography="Typography.H2">Identitas Diri</Text>
            <Spacer height="h-4"/>
            <Text :typography="Typography.Body1">Nama</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ userData.name }}</Text>
            <Spacer height="h-4"/>
            <Text :typography="Typography.Body1">Jenis Kelamin</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ userData.gender }}</Text>
            <Spacer height="h-4"/>
            <Text :typography="Typography.Body1">Tugas</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ userData.role == "admin" ? "Petugas Puskesmas" : "Guru Pelaksana UKGS" }}</Text>
            <template v-if="userData.role == 'teacher'">
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Skor Peran Guru</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ roundScore(teacherEntryData?.sections[0].score ?? 0) }}</Text>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Kategori Skor Peran Guru</Text>
                <Spacer class="h-0.5"/>
                <ScoreStatusCard
                    :rules="teachertScoreRule"
                    :value="teacherEntryData?.sections[0].score ?? 0"
                />
            </template>
            <template v-else>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Instansi</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ userData.instansi }}</Text>
            </template>
            <template v-if="evalTotalScore">
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Skor Mutu Manajemen UKGS</Text>
                <Spacer class="h-0.5"/>
                <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ roundScore(evalTotalScore) }}</Text>
                <Spacer height="h-4"/>
                <Text :typography="Typography.Body1">Kategori Skor Mutu Manajemen UKGS</Text>
                <Spacer class="h-0.5"/>
                <ScoreStatusCard
                    :rules="evalScoreRule"
                    :value="evalTotalScore"
                />
            </template>
            <Spacer height="h-12"/>
            <template v-if="teacherEntryData">
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H2">Detail Jawaban Form Peran Guru</Text>
                <Spacer height="h-4"/>
                <div>
                    <template v-for="section in teacherEntryData.sections">
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
                                :enabled="false"
                            />
                            <Spacer height="h-4"/>
                        </template>
                        <Spacer height="h-6"/>
                    </template>
                </div>
            </template>

            <template v-if="evalEntryData">
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H2">Detail Jawaban Form Mutu Manajemen UKGS</Text>
                <Spacer height="h-4"/>
                <div>
                    <template v-for="section in evalEntryData.sections">
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
                                :enabled="false"
                            />
                            <Spacer height="h-4"/>
                        </template>
                        <Spacer height="h-6"/>
                    </template>
                </div>
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
            label: "Detail Hasil",
            route: `/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/evaluation?id=${route.query.id}`
        }
    ])

    const teacherEntryData = ref<Questionnarie | null>(null)
    const evalEntryData = ref<Questionnarie | null>(null)
    const userData = ref<User | null>(null)

    const evalTotalScore = computed(() => {
        if (evalEntryData.value == undefined) return undefined
        return evalEntryData.value.sections.reduce((acc, data) => acc + (data.score ?? 0), 0) / evalEntryData.value.sections.length
    })

    onMounted(async () => {
        const teacherResult = await useGetEntryById(route.params.schoolId as string, route.params.activityId as string, `${route.query.id as string}-teacher`)
        const evalResult = await useGetEntryById(route.params.schoolId as string, route.params.activityId as string, `${route.query.id as string}-eval`)

        if (isLeft(teacherResult) && isLeft(evalResult)) {
            uiStore.showToast("Terjadi kesalahan memuat data", ToastType.ERROR)
            router.back()
        }

        if (isRight(teacherResult)) teacherEntryData.value = unwrapEither(teacherResult)
        if (isRight(evalResult)) evalEntryData.value = unwrapEither(evalResult)

        const userResult = await useGetUserById(route.query.id as string)
        if (isLeft(userResult)) {
            uiStore.showToast(unwrapEither(userResult), ToastType.ERROR)
            router.back()
        } else {
            userData.value = unwrapEither(userResult)
        }
    })
</script>