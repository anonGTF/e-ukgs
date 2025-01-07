<template>
    <div class="drawer lg:drawer-open">
        <input v-model="isDrawerOpen" id="teacher-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content bg-background-blue-light">
            <div class="navbar bg-white h-[7vh] z-[100] sticky top-0 border-b border-border-divider">
                <div class="flex-none">
                    <label for="teacher-drawer" class="drawer-button btn btn-square lg:hidden">
                        <Icon name="mdi:menu" size="24px"/>
                    </label>
                </div>
                <div class="flex-1 justify-end"></div>
                <div class="flex-none gap-2">
                    <div class="border-2 border-primary rounded-full w-10 h-10 flex items-center justify-center">
                        <Icon :name="profileIcon" size="1.75rem" class="text-primary"/>
                    </div>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">{{ userStore.user?.name }}</Text>
                    <Button
                        dense
                        @click="logout"
                    >
                        Logout
                        <Icon name="mdi:logout"/>
                    </Button>
                </div>
            </div>
            <div class="h-svh lg:h-auto">
                <slot />
            </div>
        </div>
        <div class="drawer-side border-e border-border-divider z-[100]">
            <label for="teacher-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="hidden lg:block w-full p-6 h-[7vh] border-b border-border-divider">
                <Text :typography="Typography.Label" class="text-center font-bold" color="text-black">Dashboard Guru | E-UKGS</Text>
            </div>
            <ul class="menu bg-white h-svh lg:h-auto w-80 pt-4 gap-4 px-4">
                <li class="menu-title -ms-4">MENU</li>
                <li v-for="menu in teacherMenuItems" :key="menu.label">
                    <NestedMenuItem 
                        v-if="menu.subMenuItems != null" 
                        :menu="menu" 
                        @submenu-click="toggleDrawer"
                    />
                    <MenuItem 
                        v-else 
                        :menu="menu"
                        @click="toggleDrawer"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    const teacherMenuItems: Ref<Array<MenuItemArgs>> = ref([
        {
            label: "Beranda",
            route: "/teacher/home",
            icon: "mdi:view-dashboard-outline",
            selectedIcon: "mdi:view-dashboard"
        },
        {
            label: "Kelola Sekolah dan Siswa",
            route: "/teacher/school",
            icon: "mdi:school-outline" ,
            selectedIcon: "mdi:school" 
        },
        {
            label: "Manajemen Kegiatan UKGS",
            route: "/teacher/activity" ,
            icon: "mdi:hospital-building" 
        },
        {
            label: "Penilaian Perilaku Siswa",
            route: "/teacher/student-assignment",
            icon: "mdi:file-document-edit-outline" ,
            selectedIcon: "mdi-file-document-edit" 
        },
        {
            label: "Penilaian Peran Orang Tua",
            icon: "mdi:account-child" ,
            selectedIcon: "mdi:account-child-circle" ,
            route: "/teacher/parent-questionnarie"
        },
        {
            label: "Pemeriksaan Gigi Siswa",
            route: "/teacher/student-health",
            icon: "mdi:tooth-outline" ,
            selectedIcon: "mdi:tooth" 
        },
        {
            label: "Evaluasi Kegiatan UKGS",
            route: "/teacher/evaluation",
            icon: "mdi:clipboard-text-search-outline" ,
            selectedIcon: "mdi:clipboard-text-search" 
        },
        {
            label: "Panduan Pengguna",
            route: "/teacher/help",
            icon: "mdi:help-circle-outline" ,
            selectedIcon: "mdi:help-circle" 
        }
    ])

    const uiStore = useUiStore()
    const userStore = useUserStore()

    const profileIcon = computed(() => userStore.user?.gender == "Laki-laki" ? "mdi:face-man" : "mdi:face-woman")

    const isDrawerOpen = ref(false)

    const toggleDrawer = () => { isDrawerOpen.value = !isDrawerOpen.value }

    const logout = async () => {
        const result = await useLogout()
        if (isLeft(result)) {
            uiStore.showToast(unwrapEither(result), ToastType.ERROR)
        }
    }
</script>

<style>
.menu :where(li ul):before {
    position: absolute;
    bottom: 0;
    inset-inline-start: 0px;
    top: 0;
    background-color: #D9D9D9;
    width: 2px;
    opacity: 1;
}

.menu :where(li:not(.menu-title) > *:not(ul, details, .menu-title, .btn)), .menu :where(li:not(.menu-title) > details > summary:not(.menu-title)) {
    padding: 0;
}

.menu :where(li ul) {
    position: relative;
    white-space: nowrap;
    margin-inline-start: 0;
    padding-inline-start: 0;
}
</style>