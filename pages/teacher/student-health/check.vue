<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Pemeriksaan Kesehatan Gigi</Text>
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
            <Spacer class="h-4"/>
            <div class="flex flex-row gap-4 w-full">
                <TextField
                    v-model:number="cavity"
                    placeholder="Masukkan banyak gigi berlubang"
                    label="Jumlah Gigi Berlubang"
                    :error-message="cavityErrorMessage"
                    class="flex-1"
                />
                <TextField
                    v-model:number="filled"
                    placeholder="Masukkan banyak gigi ditambal"
                    label="Jumlah Gigi Ditambal"
                    :error-message="filledErrorMessage"
                    class="flex-1"
                />
            </div>
            <Spacer class="h-4"/>
            <div class="flex flex-row gap-4 w-full">
                <TextField
                    v-model:number="loose"
                    placeholder="Masukkan banyak gigi goyang karena berlubang"
                    label="Jumlah Gigi Goyang"
                    :error-message="looseErrorMessage"
                    class="flex-1"
                />
                <TextField
                    v-model:number="missing"
                    placeholder="Masukkan banyak gigi hilang karena berlubang"
                    label="Jumlah Gigi Hilang"
                    :error-message="missingErrorMessage"
                    class="flex-1"
                />
            </div>
            <Spacer class="h-6"/>
            <Button 
                full-width
                :loading="isLoading"
                @click="save"
            >
                Simpan
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr';
    import type { CustomDropdownOption } from '~/components/attr/CustomDropdownAttr';
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr';
    import { ToastType } from '~/components/attr/ToastAttr';
    import type { Student } from '~/models/group/Student';
    import type { ToothHealth } from '~/models/tooth-health/ToothHealth';

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
    const groupStore = useGroupStore()
    const uiStore = useUiStore()

    const selectedStudent = ref<Student | null>(null)
    const allStudents = useGetAllStudents(groupStore.group?.id as string)
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

    const cavity = ref(0)
    const filled = ref(0)
    const loose = ref(0)
    const missing = ref(0)
    const cavityErrorMessage = ref("")
    const filledErrorMessage = ref("")
    const looseErrorMessage = ref("")
    const missingErrorMessage = ref("")

    const isLoading = ref(false)

    const save = async () => {}

    onMounted(async () => {
        if (route.query.id != null) {
            const studentResult = await useGetStudentById(route.query.id as string, groupStore.group?.id as string)
            if (isLeft(studentResult)) {
                uiStore.showToast(unwrapEither(studentResult), ToastType.ERROR)
            } else {
                selectedStudent.value = unwrapEither(studentResult)
            }
        }
    })
</script>