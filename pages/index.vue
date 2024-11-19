<template>
    <div class="h-full w-full flex flex-row">
        <div class="bg-primary items-stretch w-0 lg:w-[60%]"></div>
        <div class="flex-1 flex justify-center items-center bg-background-blue-light">
            <div class="lg:w-96 sm:w-[60%] w-full lg:mx-0 mx-2 px-6 py-12 bg-white rounded-2xl">
                <Text :typography="Typography.H1">Selamat Datang</Text>
                <Spacer height="h-2"/>
                <Text :typography="Typography.Body1">Masukkan ID dan password yang telah diberikan oleh admin pada isian di bawah.</Text>
                <Spacer height="h-10"/>
                <TextField
                    v-model="id"
                    placeholder="Masukkan ID"
                    label="ID Anda"
                    :error-message="idErrorMessage"
                    @enter="login"
                />
                <Spacer height="h-4" />
                <TextField
                    v-model="password"
                    :type="passwordVisible ? 'text' : 'password'"
                    placeholder="Masukkan Password"
                    label="Password Anda"
                    :error-message="passwordErrorMessage"
                    :trailing-icon="passwordVisible ? 'mdi:eye' : 'mdi:eye-off'"
                    @trailing-icon-click="togglePasswordVisibility"
                    @enter="login"
                />
                <Spacer height="h-12" />
                <Button 
                    :loading="isLoading"
                    full-width
                    @click="login"
                >
                    Masuk ke dalam akun
                </Button>
                <Spacer height="h-10" />
                <Text :typography="Typography.Body1" class="text-center">Belum mendapat ID & Password ?</Text>
                <Spacer height="h-1" />
                <Button 
                    :type="ButtonType.Ghost"
                    class="mx-auto flex hover:bg-transparent py-0"
                    underlined
                    @click="openWhatsapp"
                >
                    Hubungi Admin
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ButtonType } from '~/components/attr/ButtonAttr';
    import { Typography } from '~/components/attr/TextAttr'
    import type { UserCredential } from 'firebase/auth';
    import type { User } from '~/models/user/User';
    import type { Student } from '~/models/group/Student';
    import type { Teacher } from '~/models/teacher/Teacher';

    const id = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const idErrorMessage = ref('')
    const passwordErrorMessage = ref('')
    const passwordVisible = ref(false)

    const userStore = useUserStore()

    const login = async () => {
        idErrorMessage.value = ''
        passwordErrorMessage.value = ''  

        // validate
        let isValid = true
        if (id.value.length === 0) {
            idErrorMessage.value = 'ID tidak boleh kosong'
            isValid = false
        }
        if (password.value.length === 0) {
            passwordErrorMessage.value = 'Password tidak boleh kosong'
            isValid = false
        }

        if (!isValid) return

        // logging in
        isLoading.value = true
        const loginResult = await useLoginWithIdAndPassword(id.value, password.value)
        if (isLeft(loginResult)) {
            console.log(unwrapEither(loginResult))
            const error = unwrapEither(loginResult) as string
            idErrorMessage.value = error
            passwordErrorMessage.value = error
            isLoading.value = false
            return
        }
            
        const userCred = unwrapEither(loginResult) as UserCredential
        const userResult = await useGetUserById(userCred.user.uid)
        if (isLeft(userResult)) {
            const error = unwrapEither(userResult) as string
            idErrorMessage.value = error
            passwordErrorMessage.value = error
            isLoading.value = false
            return
        }

        const data = unwrapEither(userResult) as User
        userStore.user = data

        // get detail profile and redirect
        switch (data.role) {
            case "admin":
                navigateTo('/admin/home')
                break
            
            case "guest":
                userStore.guestMode = true
                navigateTo("teacher/home")
                break
        
            case "teacher":
                const teacherResult = await useGetTeacherById(data.id)
                if (isLeft(teacherResult)) {
                    const error = unwrapEither(teacherResult) as string
                    idErrorMessage.value = error
                    passwordErrorMessage.value = error
                    isLoading.value = false
                    return
                }
                const teacher = unwrapEither(teacherResult) as Teacher
                userStore.teacher = teacher
                navigateTo('/teacher/home')
                break
            
            case "student":
                const studentResult = await useGetStudentById(data.id, data.groupdId ?? '')
                if (isLeft(studentResult)) {
                    const error = unwrapEither(studentResult) as string
                    idErrorMessage.value = error
                    passwordErrorMessage.value = error
                    isLoading.value = false
                    return
                }
                const student = unwrapEither(studentResult) as Student
                userStore.student = student
                navigateTo('/student/')
                break
            
            default:
                break
        }
    }

    const openWhatsapp = () => navigateTo(
        CONFIG.adminWhatsappLink, {
            open: {
                target: '_blank'
            }
        }
    )

    const togglePasswordVisibility = () => { passwordVisible.value = !passwordVisible.value }
</script>