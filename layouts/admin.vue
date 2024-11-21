<template>
    <div class="drawer lg:drawer-open">
        <input v-model="isDrawerOpen" id="admin-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content bg-background-blue-light">
            <div class="navbar bg-white h-[7vh] sticky top-0 border-b border-border-divider">
                <div class="flex-none">
                    <label for="admin-drawer" class="drawer-button btn btn-square lg:hidden">
                        <Icon name="mdi:menu" size="24px"/>
                    </label>
                </div>
                <div class="flex-1 justify-end"></div>
                <div class="flex-none gap-2">
                    <div class="border-2 border-primary rounded-full w-10 h-10 flex items-center justify-center">
                        <Icon name="mdi:account" size="1.75rem" class="text-primary"/>
                    </div>
                    <Text :typography="Typography.Label" class="font-semibold" color="text-black">Admin</Text>
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
        <div class="drawer-side border-e border-border-divider">
            <label for="admin-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="w-full p-6 h-[7vh] border-b border-border-divider">
                <Text :typography="Typography.Label" class="text-center font-bold" color="text-black">Dashboard Admin | E-UKGS</Text>
            </div>
            <ul class="menu bg-white h-svh lg:h-auto w-80 pt-4 gap-4 px-4">
                <li class="menu-title -ms-4">MENU</li>
                <li v-for="menu in adminMenuItems" :key="menu.label">
                    <MenuItem
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
    import { ToastType } from '~/components/attr/ToastAttr';

    const uiStore = useUiStore()

    const adminMenuItems: Ref<Array<MenuItemArgs>> = ref([
        {
            label: "Beranda",
            route: "/admin/home",
            icon: "mdi:view-dashboard-outline",
            selectedIcon: "mdi:view-dashboard"
        },
        {
            label: "Kelola Kelompok Siswa",
            route: "/admin/group",
            icon: "mdi:account-school-outline" ,
            selectedIcon: "mdi:account-school"  
        },
        {
            label: "Kelola Akun Guru",
            route: "/admin/teacher",
            icon: "mdi:account-tie-outline" ,
            selectedIcon: "mdi:account-tie" 
        },
        {
            label: "Kelola Akun Tamu",
            route: "/admin/guest",
            icon: "mdi:doctor" 
        },
        {
            label: "Kelola Kuesioner",
            route: "/admin/questionnarie" ,
            icon: "mdi:file-document-edit-outline" ,
            selectedIcon: "mdi-file-document-edit" 
        },
        {
            label: "Penilaian Monev",
            route: "/admin/monev" ,
            icon: "mdi:chart-box-outline" ,
            selectedIcon: "mdi:chart-box"
        },
        {
            label: "Kelola Bahan Penyuluhan",
            route: "/admin/material" ,
            icon: "mdi:book-open-variant-outline",
            selectedIcon: "mdi:book-open-variant" 
        }
    ])

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