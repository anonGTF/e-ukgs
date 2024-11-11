import type { Either } from "~/models/base/Either";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export const useAddTeacher = async (
    name: string,
    userId: string,
    password: string,
    gender: string
): Promise<Either<string, null>> => {
    const app = getApp()
    const functions = getFunctions(app, "asia-southeast2");
    const addTeacher = httpsCallable(functions, "addTeacher")
    return addTeacher({
        name,
        password,
        gender,
        userId
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}