<template>
    <div class="m-2 sm:m-8">
       <Breadcrumb :items="breadcrumbs"/>
       <Spacer class="h-6"/>
       <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Hasil Peran Orang Tua</Text>
       <Spacer class="h-6"/>
       <div v-if="studentData != null && entryData != null" class="bg-white border border-border-primary rounded-2xl p-6">
           <Text :typography="Typography.H2">Identitas Diri</Text>
           <Spacer height="h-4"/>
           <Text :typography="Typography.Body1">Nama Siswa</Text>
           <Spacer class="h-0.5"/>
           <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ studentData.name }}</Text>
           <Spacer height="h-4"/>
           <Text :typography="Typography.Body1">Kelas</Text>
           <Spacer class="h-0.5"/>
           <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ studentData.grade }}</Text>
           <Spacer height="h-4"/>
           <Text :typography="Typography.Body1">Nama Orang Tua/Wali</Text>
           <Spacer class="h-0.5"/>
           <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ entryData.parentData?.name }}</Text>
           <Spacer height="h-4"/>
           <Text :typography="Typography.Body1">Hubungan dengan Siswa</Text>
           <Spacer class="h-0.5"/>
           <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ entryData.parentData?.relation }}</Text>
           <Spacer height="h-4"/>
           <Text :typography="Typography.Body1">Skor</Text>
           <Spacer class="h-0.5"/>
           <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ roundScore(entryData.sections[0].score ?? 0) }}</Text>
           <Spacer height="h-4"/>
           <Text :typography="Typography.Body1">Kategori Skor</Text>
           <Spacer class="h-0.5"/>
           <ScoreStatusCard
               :rules="parentScoreRule"
               :value="entryData.sections[0].score ?? 0"
           />
           <Spacer height="h-12"/>
           <div class="w-full border border-border-divider border-dashed"/>
           <Spacer height="h-8"/>

           <Text :typography="Typography.H2">Detail Jawaban Form Peran Orang Tua</Text>
           <Spacer height="h-4"/>
           <div>
               <template v-for="section in entryData.sections">
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
                       />
                       <Spacer height="h-4"/>
                   </template>
                   <Spacer height="h-6"/>
               </template>
           </div>
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
            route: `/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/parent-questionnarie?id=${route.query.id}`
        }
    ])

   const entryData = ref<Questionnarie | null>(null)
   const studentData = ref<Student | null>(null)

   onMounted(async () => {
       const result = await useGetEntryById(route.params.schoolId as string, route.params.activityId as string, route.query.id as string)
       if (isLeft(result)) {
           uiStore.showToast(unwrapEither(result), ToastType.ERROR)
           router.back()
       } else {
           entryData.value = unwrapEither(result)
       }

       const studentResult = await useGetStudentById(route.query.id as string, route.params.schoolId as string)
       if (isLeft(studentResult)) {
           uiStore.showToast(unwrapEither(studentResult), ToastType.ERROR)
           router.back()
       } else {
           studentData.value = unwrapEither(studentResult)
       }
   })
</script>