import type { Either } from "~/models/base/Either";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export const useAddStudent = async (
    name: string,
    userId: string,
    password: string,
    gender: string,
    groupId: string
): Promise<Either<string, null>> => {
    const app = getApp()
    const functions = getFunctions(app, "asia-southeast2");
    const addStudent = httpsCallable(functions, "addStudent")
    return addStudent({
        name,
        password,
        gender,
        userId,
        groupId
    })
    .then(() => makeRight(null))
    .catch((error) => makeLeft(error.message))
}