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
            <div class="px-4 grid grid-cols-[1fr,2fr,2fr,2fr,2fr,2fr,2fr,1fr] gap-x-6 gap-y-10 w-full items-center">
                <Text 
                    v-for="header in gumTableHeaders"
                    :typography="Typography.Body2" 
                    class="font-semibold text-center flex-1 -mx-6 py-4 border-b border-border-divider"
                >{{ header }}</Text>
                <template v-for="(tooth, toothIndex) in toothHealthData.gums.data">
                    <Text :typography="Typography.Body2" class="font-semibold text-content-primary text-center flex-1">{{ toothIndex }}</Text>
                    <template v-for="(sideIndex, index) in gumTableHeaders.slice(1, -1)" :key="index">
                        <Text v-if="toothHealthData.gums.data[toothIndex][sideIndex.toLocaleLowerCase()] != null" class="text-center flex-1">
                            {{ toothHealthData.gums.data[toothIndex][sideIndex.toLocaleLowerCase()] }}
                        </Text>
                        <Text v-else :typography="Typography.Body2" color="text-content-secondary" class="text-center flex-1">Tidak Tersedia</Text>
                    </template>
                    <Text :typography="Typography.Body2" class="text-center flex-1 font-semibold">{{ toothHealthData.gums.score[toothIndex] }}</Text>
                </template>
            </div>
            <Spacer class="h-12"/>
            <div class="w-full bg-primary p-4 rounded-lg">
                <Text :typography="Typography.H2" color="text-white">Hasil Pemeriksaan</Text>
                <Spacer height="h-4"/>
                <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                    <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor OHIS</Text>
                    <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ roundScore(toothHealthData.ohis.totalScore) }}</Text>
                    <ScoreStatusCard :value="toothHealthData.ohis.totalScore" :rules="ohisScoreRule"/>
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
                    <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ roundScore(toothHealthData.dmft.totalScore) }}</Text>
                    <ScoreStatusCard :value="toothHealthData.dmft.totalScore" :rules="dmftScoreRule"/>
                </div>
                <br/>
                <div class="flex flex-row gap-2 items-center pb-2 border-b border-border-divider">
                    <Text :typography="Typography.Body1" color="text-white" class="font-semibold flex-1">Skor Gusi</Text>
                    <Text :typography="Typography.H3" color="text-white" class="font-bold">{{ roundScore(toothHealthData.gums.score.averageScore) }}</Text>
                    <ScoreStatusCard :value="toothHealthData.gums.score.averageScore" :rules="gumScoreRule"/>
                </div>
            </div>

            <Spacer class="h-6"/>
            <template v-if="toothHealthData.referral?.evidences.length ?? 0 > 0">
                <Spacer class="h-6"/>
                <div class="w-full border border-border-divider border-dashed"/>
                <Spacer height="h-8"/>
                <Text :typography="Typography.H2">Foto Kondisi Gigi</Text>
                <Spacer height="h-4"/>
                <DataTable
                    :headers="referralTableHeader"
                >
                    <tr v-for="(data, index) in toothHealthData.referral?.evidences">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <img :src="data" class="w-full h-auto max-w-96 rounded-lg"/>
                        </td>
                        <td>
                            <Text :typography="Typography.Body2">{{ toothHealthData.referral?.treatment[index] ?? "-" }}</Text>
                        </td>
                    </tr>
                </DataTable>
                <Spacer height="h-6"/>
                <div v-if="toothHealthData.referral?.letterLink" class="flex flex-row gap-4">
                    <Button
                        :type="ButtonType.Secondary"
                        class="flex-1"
                        external
                        :to="toothHealthData.referral.letterLink"
                    >
                        <Icon name="mdi:file-pdf-box" size="1.5rem"/>
                        Download Surat Rujukan
                    </Button>
                    <Button
                        class="flex-1"
                        external
                        :to="getWhatsappParentLink(studentData.parentPhoneNumber, toothHealthData.referral.letterLink)"
                    >
                    <Icon name="mdi:send" size="1.5rem" class="text-white"/>
                        Kirim ke Orang Tua
                    </Button>
                </div>
            </template>
            <Button
                v-if="toothHealthData.referral?.letterLink == null"
                full-width
                @click="openModal"
            >
                Buat Surat Rujukan
            </Button>
        </div>
    </div>

    <dialog
        class="modal modal-bottom sm:modal-middle"
        :class="{ 'modal-open': showReferralModal }"
    >
        <div class="rounded-2xl bg-white p-4 w-full lg:w-[50%] min-h-[50%] lg:min-h-[60%] flex flex-col">
            <div class="flex flex-row justify-between items-center mb-2">
                <Text :typography="Typography.Label" class="font-semibold">Buat Surat Rujukan</Text>
                <btn 
                    class="btn btn-square flex justify-center bg-transparent text-content-non-essential"
                    @click="closeModal"
                >
                    <Icon name="mdi:close"/>
                </btn>
            </div>
            <DataTable v-if="tempReferralData" :headers="referralTableHeader">
                <tr v-for="(data, index) in tempReferralData.evidences">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <img :src="data" class="w-full h-auto max-w-96 rounded-lg"/>
                    </td>
                    <td>
                        <TextArea
                            v-model="tempReferralData.treatment[index]"
                            placeholder="Masukkan Perawatan"
                            :rows="7"
                        />
                    </td>
                </tr>
            </DataTable>
            <Spacer height="h-6"/>
            <Button
                :loading="isLoading"
                @click="saveReferral"
            >
                Buat Rujukan
            </Button>
        </div>
    </dialog>
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
            route: `/admin/ukgs/${route.params.schoolId}/${route.params.activityId}/student-health?id=${route.query.id}`
        }
    ])

    const studentData = ref<Student | null>(null)
    const toothHealthData = ref<ToothHealth | null>(null)
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
    const referralTableHeader = ref([
        "",
        "Foto",
        "Penanganan"
    ])
    const showReferralModal = ref(false)
    const tempReferralData = ref<Referral | null>(null)
    const isLoading = ref(false)

    const openModal = () => {
        tempReferralData.value = toothHealthData.value?.referral ?? {
            evidences: [],
            treatment: [],
            letterLink: undefined
        }
        showReferralModal.value = true
    }

    const closeModal = () => {
        showReferralModal.value = false
        tempReferralData.value = null
    }

    const saveReferral = async () => {
        if (toothHealthData.value == null || tempReferralData.value == null || studentData.value == null) return

        isLoading.value = true

        const schoolResult = await useGetSchoolById(route.params.schoolId as string)
        if (isLeft(schoolResult)) {
            uiStore.showToast(unwrapEither(schoolResult), ToastType.ERROR)
            isLoading.value = false
            return
        }

        const activityResult = await useGetActivityById(route.params.schoolId as string, route.params.activityId as string)
        if (isLeft(activityResult)) {
            uiStore.showToast(unwrapEither(activityResult), ToastType.ERROR)
            isLoading.value = false
            return
        }

        const activity = unwrapEither(activityResult)

        const school = unwrapEither(schoolResult)
        const tempToothHealthData = {
            ...toothHealthData.value,
            referral: tempReferralData.value
        } satisfies ToothHealth
        const referralResult = await useUploadReferral(school, activity, studentData.value, tempToothHealthData)
        if (isLeft(referralResult)) {
            uiStore.showToast(unwrapEither(referralResult), ToastType.ERROR)
            isLoading.value = false
            return
        }

        const result = await useSaveToothHealth(route.params.schoolId as string, route.params.activityId as string, {
            ...toothHealthData.value,
            referral: {
                ...tempReferralData.value,
                letterLink: unwrapEither(referralResult)
            }
        })

        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            isLoading.value = false
        } else {
            uiStore.showToast("Surat Rujukan Berhasil Dibuat", ToastType.SUCCESS)
            router.back()
        }
    }
    
    useEventListener("keyup", (event: Event) => {
        if ((event as KeyboardEvent).code == "Escape") {
            closeModal()
        }
    })

    onMounted(async () => {
        const result = await useGetToothHealthById(route.params.schoolId as string, route.params.activityId as string, route.query.id as string)
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
            router.back()
        } else {
            toothHealthData.value = unwrapEither(result)
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