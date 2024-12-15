<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Detail Hasil Pemeriksaan Gigi</Text>
        <Spacer class="h-6"/>
        <div v-if="studentData != null && toothHealthData != null" class="bg-white border border-border-primary rounded-2xl p-6">
            <Text :typography="Typography.H2">Identitas Siswa</Text>
            <Spacer height="h-4"/>
            <Text :typography="Typography.Body1">Nama</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ studentData.name }}</Text>
            <Spacer height="h-4"/>
            <Text :typography="Typography.Body1">Kelas</Text>
            <Spacer class="h-0.5"/>
            <Text :typography="Typography.Label" class="font-medium" color="text-black">{{ studentData.grade }}</Text>
            <Spacer height="h-12"/>
            <div class="w-full border border-border-divider border-dashed"/>
            <Spacer height="h-8"/>
            
            <Text :typography="Typography.H2">Hasil Pemeriksaan Debris OHIS</Text>
            <Spacer height="h-4"/>
            <div class="grid grid-cols-3 gap-6 w-full">
                <div v-for="(data, index) in toothHealthData.ohis.debris">
                    <Text :typography="Typography.H3" class="text-center font-semibold">{{ index.toString() }}</Text>
                    <Spacer height="h-1"/>
                    <Text :typography="Typography.Body1" class="text-center">{{ debrisLabel[data] }}</Text>
                </div>
            </div>
            <Spacer height="h-12"/>
            <div class="w-full border border-border-divider border-dashed"/>
            <Spacer height="h-8"/>
            
            <Text :typography="Typography.H2">Hasil Pemeriksaan Kalkulus OHIS</Text>
            <Spacer height="h-4"/>
            <div class="grid grid-cols-3 gap-6 w-full">
                <div v-for="(data, index) in toothHealthData.ohis.kalkulus">
                    <Text :typography="Typography.H3" class="text-center font-semibold">{{ index.toString() }}</Text>
                    <Spacer height="h-1"/>
                    <Text :typography="Typography.Body1" class="text-center">{{ kalkulusLabel[data] }}</Text>
                </div>
            </div>
            <Spacer height="h-12"/>
            <div class="w-full border border-border-divider border-dashed"/>
            <Spacer height="h-8"/>

            <Text :typography="Typography.H2">Hasil Pemeriksaan DMFT</Text>
            <Spacer height="h-4"/>
            <div class="grid grid-cols-2 gap-6 w-full">
                <ReadOnlyTextField
                    :text="toothHealthData.dmft.cavity.toString()"
                    label="Jumlah Gigi Berlubang"
                    class="flex-1"
                />
                <ReadOnlyTextField
                    :text="toothHealthData.dmft.filled.toString()"
                    label="Jumlah Gigi Ditambal"
                    class="flex-1"
                />
                <ReadOnlyTextField
                    :text="toothHealthData.dmft.loose.toString()"
                    label="Jumlah Gigi Goyang"
                    class="flex-1"
                />
                <ReadOnlyTextField
                    :text="toothHealthData.dmft.missing.toString()"
                    label="Jumlah Gigi Hilang"
                    class="flex-1"
                />
            </div>
            <Spacer height="h-12"/>
            <div class="w-full border border-border-divider border-dashed"/>
            <Spacer height="h-8"/>

            <!-- PEMERIKSAAN GUSI -->
            <Text :typography="Typography.H2">Hasil Pemeriksaan Gusi</Text>
            <Spacer height="h-4"/>
            <Text :typography="Typography.H3" class="font-semibold">Kondisi Gusi</Text>
            <Spacer height="h-1"/>
            <Text :typography="Typography.Body1">{{ gumsLabel[toothHealthData.gums.score] }}</Text>
            <Spacer class="h-12"/>
            <div class="w-full bg-primary p-4 rounded-lg">
                <Text :typography="Typography.H2" color="text-white">Hasil Pemeriksaan</Text>
                <Spacer height="h-4"/>
                <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                    <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor OHIS</Text>
                    <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ toothHealthData.ohis.totalScore }}</Text>
                    <ScoreStatusCard :value="toothHealthData.ohis.totalScore" :rules="ohisScoreRule"/>
                </div>
                <div class="flex flex-row justify-between items-center border-b border-border-divider ms-4 mt-2">
                    <Text :typography="Typography.Body1" color="text-white">Debris</Text>
                    <Text :typography="Typography.H3" color="text-white" class="font-semibold">{{ debrisScore }}</Text>
                </div>
                <div class="flex flex-row justify-between items-center border-b border-border-divider ms-4 mt-2">
                    <Text :typography="Typography.Body1" color="text-white">Kalkulus</Text>
                    <Text :typography="Typography.H3" color="text-white" class="font-semibold">{{ kalkulusScore }}</Text>
                </div>
                <br/>
                <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                    <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor DMFT</Text>
                    <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ toothHealthData.dmft.totalScore }}</Text>
                    <ScoreStatusCard :value="toothHealthData.dmft.totalScore" :rules="dmftScoreRule"/>
                </div>
                <br/>
                <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                    <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor Gusi</Text>
                    <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ toothHealthData.gums.score }}</Text>
                    <ScoreStatusCard :value="toothHealthData.gums.score" :rules="gumScoreRule"/>
                </div>
            </div>

            <template v-if="toothHealthData.referral?.evidences.length ?? 0 > 0">
                <Spacer class="h-12"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H2">Foto Kondisi Gigi</Text>
                <Spacer height="h-4"/>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'teacher'
    })

    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const uiStore = useUiStore()

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
            label: "Detail Hasil",
            route: `/teacher/student-health/${route.params.id}`
        },
    ])

    const studentData = ref<Student | null>(null)
    const toothHealthData = ref<ToothHealth | null>(null)
    const debrisLabel = [
        "Tidak ada debris atau stain",
        "Kurang dari 1/3 permukaan gigi tertutupi Debris atau terdapat stain menutupi permukaan gigi",
        "1/3 sampai 2/3 permukaan gigi tertutupi Debris",
        "lebih dari 2/3 permukaan gigi tertutupi Debris"
    ]
    const kalkulusLabel = [
        "Tidak ada kalkulus",
        "Kurang dari 1/3 permukaan gigi tertutupi Supragingival kalkulus pada mahkota gigi",
        "1/3 sampai 2/3 tertutupi Supragingival kalkulus atau ada bintik kalkulus subgingiva",
        "Lebih dari 2/3 tertutupi Supragingival kalkulus atau ada kalkulus yang melingkari subgingiva"
    ]
    const gumsLabel = [
        "Normal",
        "Ada sedikit perubahan warna, bengkak, namun tidak ada pendarahan",
        "Warna kemerahan, bengkak, pendarahan saat diperiksa",
        "Warna merah terang atau merah menyala, luka, pendarahan spontan"
    ]
    const debrisScore = computed(() => {
        if (toothHealthData.value?.ohis.debris == null) return 0
        const scoreList = Object.values(toothHealthData.value?.ohis.debris)
        return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
    })
    const kalkulusScore = computed(() => {
        if (toothHealthData.value?.ohis.kalkulus == null) return 0
        const scoreList = Object.values(toothHealthData.value?.ohis.kalkulus)
        return scoreList.reduce((sum, value) => sum + value, 0) / scoreList.length
    })

    onMounted(async () => {
        const result = await useGetToothHealthById(userStore.school?.id as string, route.params.id as string, route.params.studentId as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            toothHealthData.value = unwrapEither(result)
        }

        const studentResult = await useGetStudentById(route.params.studentId as string, userStore.school?.id as string)
        if (isLeft(studentResult)) {
            uiStore.showToast(unwrapEither(studentResult), ToastType.ERROR)
            router.back()
        } else {
            studentData.value = unwrapEither(studentResult)
        }
    })
</script>