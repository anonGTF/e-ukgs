import { getDownloadURL, getStorage, ref, uploadBytes, type UploadResult } from "firebase/storage";
import type { Either } from "~/models/base/Either";

export const useUploadFile = async (file: File | null | undefined): Promise<Either<string, string>> => {
    if (file == null || file == undefined) {
        return Promise.reject(makeLeft("File tidak terdeteksi"))
    }

    const storage = getStorage()
    const fileRef = ref(storage, file.name)
    return uploadBytes(fileRef, file)
    .then(async (result: UploadResult) => {
        const downloadUrl = await getDownloadURL(result.ref)
        return makeRight(downloadUrl)
    })
    .catch((error) => makeLeft(error))
}