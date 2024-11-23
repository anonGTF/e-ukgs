<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">Penilaian Kesehatan Gigi Siswa {{ groupStore.group?.name }}</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <div class="flex flex-row justify-between">
                <TextField
                    v-model="searchQuery"
                    :placeholder="isSmall(activeBreakpoint) ? 'Cari siswa dgn nama' : 'Cari siswa berdasarkan nama'"
                    leading-icon="mdi:magnify"
                    class="me-1 w-52 sm:w-[16.7rem]"
                />
                <Button class="hidden sm:block" to="/teacher/student-health/check">
                    Lakukan Pemeriksaan
                </Button>
                <div 
                    class="drawer-button btn btn-square flex justify-center sm:hidden bg-primary text-white"
                    @click="navigateTo('/teacher/student-health/check')"
                >
                    <Icon name="mdi:doctor" size="24px"/>
                </div>
            </div>
            <Spacer class="h-6"/>
            <Table
                :headers="tableHeader"
                :is-empty="filteredStudentResultData.length == 0"
            >
                <tr v-for="(data, index) in filteredStudentResultData">
                    <th>
                        <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                    </th>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.student.name }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.student.gender }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.result?.ohis ?? "-" }}</Text>
                    </td>
                    <td>
                        <Text :typography="Typography.Body2">{{ data.result?.dmft ?? "-" }}</Text>
                    </td>
                    <td class="flex justify-end">
                        <Button 
                            :type="data.result == undefined ? ButtonType.Primary : ButtonType.Outlined" 
                            dense
                            @click="getAction(data)"
                        >
                            {{ data.result == undefined ? "Periksa" : "Lihat Detail" }}
                        </Button>
                    </td>
                </tr>
            </Table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { BreadcrumbArgs } from '~/components/attr/BreadcrumbAttr';
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr';
    import type { Group } from '~/models/group/Group';
    import type { Student } from '~/models/group/Student';
    import type { ToothHealth } from '~/models/tooth-health/ToothHealth';

    definePageMeta({
        layout: 'teacher'
    })

    type StudentResult = {
        student: Student,
        result: ToothHealth | undefined
    }

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        },
        {
            label: "Kesehatan Gigi Siswa",
            route: "/teacher/student-health"
        }
    ])

    const tableHeader = ref([
        "",
        "Nama Siswa",
        "Jenis Kelamin",
        "Hasil OHIS",
        "Hasil DMFT",
        ""
    ])

    const groupStore = useGroupStore()
    const searchQuery = ref("")
    const activeBreakpoint = ref("")
    const studentData = useGetAllStudents("7aid0cn08014dfm456DM")
    const resultData = useGetAllToothHealthByGroup("7aid0cn08014dfm456DM")
    const studentResultData = computed(() => {
        return studentData.value
            .sort((curr, next) => curr.name.localeCompare(next.name))
            .map((student) => ({
                student,
                result: resultData.value.find((result) => result.studentId == student.id)
            } satisfies StudentResult))
            .sort((curr, next) => curr.result === undefined ? -1 : next.result === undefined ? 1 : 0)
    })
    const filteredStudentResultData = computed(() => studentResultData.value.filter((data) => data.student.name.toLowerCase().includes(searchQuery.value.toLowerCase())))

    const getAction = (data: StudentResult) => {
        const link = data.result == undefined ? `/teacher/student-health/check?id=${data.student.id}` : `/teacher/student-health/${data.student.id}`
        navigateTo(link)
    }

    useEventListener("resize", () => {
        activeBreakpoint.value = getActiveBreakpoint()
    })

    onMounted(() => {
        groupStore.group = {
            id: "7aid0cn08014dfm456DM",
            name: "coba",
            totalStudent: 0
        } as Group
    })
</script>