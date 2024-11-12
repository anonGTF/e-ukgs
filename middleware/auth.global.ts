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
    (role == "student" && !to.path.includes("/student/")) ||
    (role == "teacher" && !to.path.includes("/teacher/")) ||
    (role == "guest" && !to.path.includes("/teacher/")) ||
    (role == "admin" && !to.path.includes("/admin/"))
  ) {
    return abortNavigation("Halaman tidak bisa diakses")
  }
})