export const useUploadReferral = async (school: School, activityId: string, student: Student, referral: Referral): Promise<Either<string, string>> => {
    try {
        const pdfBlob = await generatePdf(student, school, referral)
        const fileName = `Rujukan-${student.name}-${Date.now()}.pdf`
        const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" })
        return useUploadFile(pdfFile, `${school.id}/${activityId}`)
    } catch (error) {
        return makeLeft(error as string)
    }
}