<template>
    <div class="drawer lg:drawer-open">
        <input v-model="isDrawerOpen" id="teacher-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content bg-background-blue-light">
            <div class="navbar bg-white min-h-[5dvh]">
                <div class="flex-none">
                    <label for="teacher-drawer" class="drawer-button btn btn-square lg:hidden">
                        <Icon name="mdi:menu" size="24px"/>
                    </label>
                </div>
                <div class="flex-1 justify-end">
                    <a class="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div class="flex-none gap-2">
                    <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow">
                        <li @click="logout">
                            <a>
                                <span></span>
                                <span class="px-4 py-2 flex flex-row min-w-full">
                                    <Text :typography="Typography.Body1" class="flex-1">Logout</Text>
                                </span>
                                <Icon name="mdi:logout" class="me-2"/>
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="h-svh lg:h-auto">
                <slot />
            </div>
        </div>
        <div class="drawer-side border-e border-border-divider">
            <label for="teacher-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="p-6 min-h-[5dvh] border-b border-border-divider">
                <p>Dashboard Guru | E-UKGS</p>
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
    import type { MenuItemArgs } from '~/components/attr/MenuItemAttr';
    import { Typography } from '~/components/attr/TextAttr';

    const teacherMenuItems: Ref<Array<MenuItemArgs>> = ref([
        {
            label: "Beranda",
            route: "/teacher/home",
            icon: "mdi:view-dashboard-outline",
            selectedIcon: "mdi:view-dashboard"
        },
        {
            label: "Penilaian Kuesioner Siswa",
            route: "/teacher/student-assignment",
            icon: "mdi:file-document-edit-outline" ,
            selectedIcon: "mdi-file-document-edit" 
        },
        {
            label: "Penilaian Peran Lingkungan",
            icon: "mdi:account-group-outline" ,
            selectedIcon: "mdi:account-group" ,
            subMenuItems: [
                {
                    label: "Kuesioner Guru",
                    route: "/teacher/teacher-questionnaire"
                },
                {
                    label: "Kuesioner Dokter Kecil",
                    route: "/teacher/student-doctor-questionnaire"
                },
                {
                    label: "Kuesioner Orang Tua",
                    route: "/teacher/parent-questionnaire"
                },
            ]
        },
        {
            label: "Penilaian Kesehatan Gigi Siswa",
            route: "/teacher/student-health",
            icon: "mdi:tooth-outline" ,
            selectedIcon: "mdi:tooth" 
        },
        {
            label: "Kegiatan UKGS",
            route: "/teacher/activity" ,
            icon: "mdi:hospital-building" 
        }
    ])

    const isDrawerOpen = ref(false)

    const toggleDrawer = () => { isDrawerOpen.value = !isDrawerOpen.value }

    const logout = async () => {
        const result = await useLogout()
        if (isLeft(result)) {
            alert(unwrapEither(result))
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