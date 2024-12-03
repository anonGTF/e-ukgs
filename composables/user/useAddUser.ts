import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export const useAddUser = async (
    role: string,
    name: string,
    gender: string,
    schoolId: string | null,
    userId: string,
    password: string
): Promise<Either<string, null>> => {
    const app = getApp()
    const functions = getFunctions(app, "asia-southeast2");
    const addTeacher = httpsCallable(functions, "addUser")
    return addTeacher({
        role,
        name,
        gender,
        schoolId,
        userId,
        password
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}