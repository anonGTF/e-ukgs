import writeXlsxFile from "write-excel-file";

export const useGenerateExcelReport = async (
    data: { student: Student; result: Questionnarie | undefined; }[], 
    activity: Activity,
    school: School
) => {
    const getScoreOrDefault = (
        result: Questionnarie | undefined,
        action: (data: Questionnarie) => string
    ): string => result !== undefined ? action(result) : "-"

    const assignmentSchema = [
        {
            column: 'Nama',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => item.student.name,
            width: 30,
        },
        {
            column: 'Hasil Pengetahuan',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(result.sections[0].score ?? 999)}`),
            width: 30,
        },
        {
            column: 'Kategori Pengetahuan',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${getSelectedRule(educationActionScoreRule, result.sections[0].score ?? 999)}`),
            width: 30,
        },
        {
            column: 'Hasil Sikap',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(result.sections[1].score ?? 999)}`),
            width: 30,
        },
        {
            column: 'Kategori Sikap',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${getSelectedRule(attitudeScoreRule, result.sections[1].score ?? 999)}`),
            width: 30,
        },
        {
            column: 'Hasil Tindakan',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(result.sections[2].score ?? 999)}`),
            width: 30,
        },
        {
            column: 'Kategori Tindakan',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${getSelectedRule(educationActionScoreRule, result.sections[2].score ?? 999)}`),
            width: 30,
        },
    ]

    const parentSchema = [
        {
            column: 'Nama Siswa',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => item.student.name,
            width: 30,
        },
        {
            column: 'Nama Orang Tua',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => item.result?.parentData?.name ?? "-",
            width: 30,
        },
        {
            column: 'Relasi',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => item.result?.parentData?.relation ?? "-",
            width: 30,
        },
        {
            column: 'Hasil',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(result.sections[0].score ?? 0)}`),
            width: 30,
        },
        {
            column: 'Kategori',
            type: String,
            value: (item: { student: Student; result: Questionnarie | undefined; }) => getScoreOrDefault(item.result, (result) => `${getSelectedRule(parentScoreRule, result.sections[0].score ?? 0)}`),
            width: 30,
        },
    ]

    const schema = (activity.type == ActivityType.STUDENT_FORM) ? assignmentSchema : parentSchema
    
    await writeXlsxFile(data, {
        schema,
        fileName: `${activity.title} - ${getActivityTimeFormatted(activity)} - ${school.name} - Report.xlsx`,
    });
}