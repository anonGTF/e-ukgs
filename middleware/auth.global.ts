export default defineNuxtRouteMiddleware(async (to, from) => {
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
      case "student":
        return navigateTo("/student/home")
      
      case "teacher":
        return navigateTo("/teacher/home")

      case "guest":
        return navigateTo("/teacher/home")

      case "admin":
        return navigateTo("/admin/home")
      
      default:
        break
    }
  }

  if (
    (role == "student" && !to.path.startsWith("/student/")) ||
    (role == "teacher" && !to.path.startsWith("/teacher/")) ||
    (role == "guest" && !to.path.startsWith("/teacher/")) ||
    (role == "admin" && !to.path.startsWith("/admin/"))
  ) {
    return abortNavigation("Halaman tidak bisa diakses")
  }
})