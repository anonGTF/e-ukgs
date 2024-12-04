export default defineNuxtRouteMiddleware(async (to, _) => {
  const user = await getCurrentUser()
  const role = useUserStore().$state.user?.role

  if (!user && !CONFIG.whitelistedPages.some(page => to.path == page)) {
    return navigateTo({
      path: '/',
      query: {
        redirect: to.fullPath,
      },
    })
  }

  if (user && to.path == "/") {
    switch (role) {
      case "teacher":
        return navigateTo("/teacher/home")

      case "admin":
        return navigateTo("/admin/home")
      
      default:
        break
    }
  }

  if (
    (role == "teacher" && !to.path.startsWith("/teacher/")) ||
    (role == "admin" && !to.path.startsWith("/admin/"))
  ) {
    abortNavigation("Halaman tidak bisa diakses")
  }
})