import writeXlsxFile from "write-excel-file";

export const useGenerateHealthReport = async (
    data: { student: Student; result: ToothHealth | undefined; }[], 
    activity: Activity,
    school: School
) => {
    const getScoreOrDefault = (
        result: ToothHealth | undefined,
        action: (health: ToothHealth) => string
    ): string => result !== undefined ? action(result) : "-"

    const schema = [
        {
            column: 'Nama Siswa',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => item.student.name,
            width: 30,
        },
        {
            column: 'Jenis Kelamin',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => item.student.gender,
            width: 20,
        },
        {
            column: 'Debris Index',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(getDebrisScore(result))}`),
            width: 15,
        },
        {
            column: 'Kalkulus Index',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(getKalkulusScore(result))}`),
            width: 15,
        },
        {
            column: 'OHIS',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(result.ohis.totalScore)}`),
            width: 20,
        },
        {
            column: 'Kategori OHIS',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${getSelectedRule(ohisScoreRule, result.ohis.totalScore)}`),
            width: 20,
        },
        {
            column: 'DMFT',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(result.dmft.totalScore)}`),
            width: 20,
        },
        {
            column: 'Kategori DMFT',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${getSelectedRule(dmftScoreRule, result.dmft.totalScore)}`),
            width: 20,
        },
        {
            column: 'Kondisi Gusi',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${roundScore(result.gums.score.averageScore)}`),
            width: 20,
        },
        {
            column: 'Kategori Kondisi Gusi',
            type: String,
            value: (item: { student: Student; result: ToothHealth | undefined; }) => getScoreOrDefault(item.result, (result) => `${getSelectedRule(gumScoreRule, result.gums.score.averageScore)}`),
            width: 20,
        }
    ]
    
    await writeXlsxFile(data, {
        schema,
        fileName: `${activity.title} - ${getActivityTimeFormatted(activity)} - ${school.name} - Report.xlsx`
    })
}