<template>
    <div class="m-2 sm:m-8">
        <Breadcrumb :items="breadcrumbs"/>
        <Spacer class="h-6"/>
        <Text :typography="Typography.H1" class="pb-4 border-b border-border-divider">{{ useDateFormat(Date.now(), "dddd, D MMMM YYYY", { locales: "id-ID" }) }}</Text>
        <Spacer class="h-6"/>
        <div class="bg-white border border-border-primary rounded-2xl p-6">
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
            </div>

            <Spacer height="h-6"/>
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
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "teacher"
    })

    const userStore = useUserStore()

    const breadcrumbs = ref<BreadcrumbArgs[]>([
        {
            label: "Beranda",
            route: "/teacher/home"
        }
    ])

    const weekDates = ref<Date[]>([])
    const initWeek = () => {
      const today = new Date()
      const dayOfWeek = today.getDay()
      const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
      const monday = new Date(today)
      monday.setDate(today.getDate() + diffToMonday)

      const week = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        week.push(date)
      }

      weekDates.value.push(...week)
    }
    const isToday = (date: Date) => {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    }

    const activities = computed(() => useGetAllActivitiesByDate(userStore.school?.id ?? "", weekDates.value[0], weekDates.value[weekDates.value.length - 1]))

    const menus = [
        {
            icon: "mdi:school",
            color: "bg-primary",
            iconColor: "text-primary",
            label: "Kelola Sekolah dan Siswa",
            route: "/teacher/school",
            submenu: [
                {
                    label: "Buat siswa baru",
                    route: "/teacher/school/add"
                },
                {
                    label: "Edit profil sekolah",
                    route: "/teacher/school/profile"
                }
            ]
        },
        {
            icon: "mdi:hospital-building",
            color: "bg-primary",
            iconColor: "text-primary",
            label: "Manajemen Kegiatan UKGS",
            route: "/teacher/activity",
            submenu: [
                {
                    label: "Buat kegiatan baru",
                    route: "/teacher/activity/add"
                },
                {
                    label: "Lihat riwayat kegiatan",
                    route: "/teacher/activity"
                }
            ]
        },
        {
            icon: "mdi-file-document-edit",
            color: "bg-success",
            iconColor: "text-success",
            label: "Penilaian Perilaku Siswa",
            route: "/teacher/student-assignment",
            submenu: [
                {
                    label: "Buat kegiatan penilaian perilaku",
                    route: "/teacher/activity/add?type=student-assignment"
                },
                {
                    label: "Lihat status kegiatan aktif",
                    route: "/teacher/student-assignment"
                },
                {
                    label: "Lihat riwayat penilaian perilaku",
                    route: "/teacher/student-assignment"
                }
            ]
        },
        {
            icon: "mdi:account-child",
            color: "bg-success",
            iconColor: "text-success",
            label: "Penilaian Peran Orang Tua",
            route: "/teacher/parent-questionnarie",
            submenu: [
                {
                    label: "Buat kegiatan penilaian peran orang tua",
                    route: "/teacher/activity/add?type=parent-questionnarie"
                },
                {
                    label: "Lihat status kegiatan aktif",
                    route: "/teacher/parent-questionnarie"
                },
                {
                    label: "Lihat riwayat penilaian peran orang tua",
                    route: "/teacher/parent-questionnarie"
                }
            ]
        },
        {
            icon: "mdi:tooth",
            color: "bg-success",
            iconColor: "text-success",
            label: "Pemeriksaan Gigi Siswa",
            route: "/teacher/student-health",
            submenu: [
                {
                    label: "Buat kegiatan pemeriksaan gigi siswa",
                    route: "/teacher/activity/add?type=student-health"
                },
                {
                    label: "Lihat status kegiatan aktif",
                    route: "/teacher/student-health"
                },
                {
                    label: "Lihat riwayat pemeriksaan gigi",
                    route: "/teacher/student-health"
                }
            ]
        },
        {
            icon: "mdi:clipboard-text-search",
            color: "bg-success",
            iconColor: "text-success",
            label: "Evaluasi Kegiatan UKGS",
            route: "/teacher/evaluation",
            submenu: [
                {
                    label: "Buat kegiatan evaluasi",
                    route: "/teacher/activity/add?type=evaluation"
                },
                {
                    label: "Lihat status kegiatan aktif",
                    route: "/teacher/evaluation"
                },
                {
                    label: "Lihat riwayat evaluasi",
                    route: "/teacher/evaluation"
                }
            ]
        },
        {
            icon: "mdi:account-circle",
            color: "bg-primary",
            iconColor: "text-primary",
            label: "Profil Pengguna",
            route: "/teacher/profile",
            submenu: [
                {
                    label: "Lihat detail profil",
                    route: "/teacher/profile"
                },
                {
                    label: "Edit detail profil",
                    route: "/teacher/profile/edit"
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

    onMounted(() => {
        initWeek()
    })
</script>