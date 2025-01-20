export const useUploadReferral = async (school: School, activity: Activity, student: Student, toothHealth: ToothHealth): Promise<Either<string, string>> => {
    try {
        const pdfBlob = await generatePdf(student, school, toothHealth, activity)
        const fileName = `Rujukan-${student.name}-${Date.now()}.pdf`
        const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" })
        return useUploadFile(pdfFile, `${school.id}/${activity.id}`)
    } catch (error) {
        return makeLeft(error as string)
    }
}