<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">{{ useDateFormat(Date.now(), "dddd, D MMMM YYYY", { locales: "id-ID" }) }}</Text>
        <Spacer class="h-6"/>
        <div class="flex flex-row gap-4">
            <div class="flex-1 bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Kegiatan Pemeriksaan Gigi Aktif</Text>
                <Spacer height="h-6"/>
                <DataTable
                    :headers="toothHealthTableHeader"
                    :is-empty="toothHealthDataWithSchool == undefined || toothHealthDataWithSchool.length == 0"
                >
                    <tr v-for="(data, index) in toothHealthDataWithSchool">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text>{{ data.school?.name }}</Text>
                        </td>
                        <td>
                            <Text>{{ getActivityTimeFormatted(data.data) }}</Text>
                        </td>
                        <td>
                            <Button
                                dense
                                :to="`/admin/ukgs/${data.school?.id ?? '-'}/${data.data.id}`"
                            >
                                Buat Rujukan
                            </Button>
                        </td>
                    </tr>
                </DataTable>
            </div>

            <div class="flex-1 bg-white border border-border-primary rounded-2xl p-6">
                <Text :typography="Typography.H2">Permintaan Evaluasi UKGS</Text>
                <Spacer height="h-6"/>
                <DataTable
                    :headers="evalTableHeader"
                    :is-empty="evalDataWithSchool == undefined || evalDataWithSchool.length == 0"
                >
                    <tr v-for="(data, index) in evalDataWithSchool">
                        <th>
                            <Text :typography="Typography.Body2" class="font-semibold text-content-primary">{{ index + 1 }}</Text>
                        </th>
                        <td>
                            <Text>{{ data.school?.name }}</Text>
                        </td>
                        <td>
                            <Text>{{ getActivityTimeFormatted(data.data) }}</Text>
                        </td>
                        <td>
                            <Button
                                dense
                                :to="`/admin/ukgs/${data.school?.id ?? '-'}/${data.data.id}`"
                            >
                                Evaluasi
                            </Button>
                        </td>
                    </tr>
                </DataTable>
            </div>
        </div>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
            <Text :typography="Typography.H2">Akses Cepat</Text>
            <Spacer height="h-6"/>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                 <div v-for="menu in menus" class="rounded-xl text-white p-4 cursor-pointer" :class="menu.color" @click="navigateTo(menu.route)">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                        <Icon :name="menu.icon" :class="menu.iconColor" size="1.5rem"/>
                    </div>
                    <Spacer height="h-4"/>
                    <Text :typography="Typography.Label" color="text-white" class="font-semibold">{{ menu.label }}</Text>
                    <Spacer height="h-4"/>
                    <div v-for="submenu in menu.submenu" class="flex flex-row gap-1 items-end cursor-pointer mb-4" @click="navigateTo(submenu.route)">
                        <Icon name="mdi:arrow-right-bottom"/>
                        <Text color="text-white" class="hover:font-semibold">{{ submenu.label }}</Text>
                    </div>
                 </div>
            </div>

            <!-- <Spacer height="h-6"/>
            <Text :typography="Typography.H2">Kegiatan Minggu Ini</Text>
            <Spacer height="h-6"/>
            <div class="grid grid-cols-7">
                <div v-for="date in weekDates" class="w-full flex flex-col gap-4 items-center justify-center border-b border-border-divider pb-4">
                    <Text 
                        :color="isToday(date) ? 'text-primary' : ''"
                    >
                        {{ useDateFormat(date, "ddd", { locales: "id-ID" }).value.toLocaleUpperCase() }}
                    </Text>
                    <div class="w-10 h-10 flex items-center justify-center" :class="isToday(date) ? 'bg-primary rounded-full' : ''">
                        <Text 
                            :typography="Typography.H3" 
                            :color="isToday(date) ? 'text-white': ''"
                        >
                            {{ useDateFormat(date, "D", { locales: "id-ID" }) }}
                        </Text>
                    </div>
                </div>
                <template v-if="activities.value.length > 0">
                    <template v-for="activity in activities.value">
                        <Spacer height="h-2"/>
                        <WeeklyActivityCard :activity="activity" :week-dates="weekDates"/>
                    </template>
                </template>
                <template v-else>
                    <div class="col-span-7 flex flex-col justify-center items-center py-4 gap-2 border-b border-border-divider">
                        <Icon name="mdi:package-variant" class="text-content-secondary" size="5rem"/>
                        <Text :typography="Typography.Body1" class="text-content-secondary font-medium">Tidak ada kegiatan minggu ini</Text>
                    </div>
                </template>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "admin"
    })

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/admin/home"
        }
    ])

    const toothHealthTableHeader = [
        "",
        "Sekolah",
        "Tanggal Kegiatan",
        ""
    ]

    const toothHealthData = useGetAllGroupedActivitiesByType(ActivityType.TOOTH_HEALTH)
    const toothHealthDataWithSchool = computedAsync(async () => await Promise.all(toothHealthData.value.map(async (data) => {
        const schoolResult = await useGetSchoolById(data.schoolId ?? "-")
        const school = (isRight(schoolResult)) ? unwrapEither(schoolResult) : null

        return { data, school }
    })))

    const evalTableHeader = [
        "",
        "Sekolah",
        "Tanggal Kegiatan",
        ""
    ]

    const evalData = useGetAllGroupedActivitiesByType(ActivityType.EVALUATION)
    const evalDataWithSchool = computedAsync(async () => await Promise.all(evalData.value.map(async (data) => {
        const schoolResult = await useGetSchoolById(data.schoolId ?? "-")
        const school = (isRight(schoolResult)) ? unwrapEither(schoolResult) : null

        return { data, school }
    })))

    const menus = [
        {
            icon: "mdi:chart-box",
            color: "bg-primary",
            iconColor: "text-primary",
            label: "Data Pelaksanaan UKGS",
            route: "/admin/ukgs",
            submenu: [
                {
                    label: "Lihat riwayat kegiatan",
                    route: "/admin/ukgs"
                },
                {
                    label: "Lihat detail kegiatan",
                    route: "/admin/ukgs"
                },
                {
                    label: "Isi evaluasi mutu manajemen UKGS",
                    route: "/admin/ukgs"
                },
                {
                    label: "Buat surat rujukan",
                    route: "/admin/ukgs"
                }
            ]
        },
        {
            icon: "mdi:school",
            color: "bg-success",
            iconColor: "text-success",
            label: "Kelola Sekolah dan Siswa",
            route: "/admin/school",
            submenu: [
                {
                    label: "Buat sekolah baru",
                    route: "/admin/school/add"
                },
                {
                    label: "Lihat list sekolah",
                    route: "/admin/school"
                }
            ]
        },
        {
            icon: "mdi:file-document-edit",
            color: "bg-success",
            iconColor: "text-success",
            label: "Kelola Kuesioner",
            route: "/admin/questionnarie",
            submenu: [
                {
                    label: "Edit kuesioner perilaku siswa",
                    route: "/admin/questionnarie"
                },
                {
                    label: "Edit kuesioner peran orang tua",
                    route: "/admin/questionnarie"
                },
                {
                    label: "Edit kuesioner peran guru",
                    route: "/admin/questionnarie"
                },
                {
                    label: "Edit kuesioner mutu manajemen",
                    route: "/admin/questionnarie"
                }
            ]
        },
        {
            icon: "mdi:book-open-variant",
            color: "bg-success",
            iconColor: "text-success",
            label: "Kelola Bahan Penyuluhan",
            route: "/admin/material",
            submenu: [
                {
                    label: "Upload video baru",
                    route: "/admin/material"
                },
                {
                    label: "Upload ebook baru",
                    route: "/admin/material"
                },
                {
                    label: "Buat artikel baru",
                    route: "/admin/material"
                }
            ]
        },
        {
            icon: "mdi:account-group",
            color: "bg-success",
            iconColor: "text-success",
            label: "Kelola Akun",
            route: "/admin/account",
            submenu: [
                {
                    label: "Buat akun baru",
                    route: "/admin/account/add"
                },
                {
                    label: "Lihat daftar akun",
                    route: "/admin/account"
                }
            ]
        },
        {
            icon: "mdi:account-circle",
            color: "bg-primary",
            iconColor: "text-primary",
            label: "Profil Pengguna",
            route: "/admin/profile",
            submenu: [
                {
                    label: "Lihat detail profil",
                    route: "/admin/profile"
                },
                {
                    label: "Edit detail profil",
                    route: "/admin/profile/edit"
                }
            ]
        },
        {
            icon: "mdi:help",
            color: "bg-primary",
            iconColor: "text-primary",
            label: "Panduan Pengguna",
            route: "/teacher/help"
        }
    ]
</script>