import writeXlsxFile from "write-excel-file";

export const useGenerateEvalReport = async (
    data: {
        user: User;
        evaluation: Questionnarie | undefined;
        evalTotalScore: number | undefined;
        peranGuru: Questionnarie | undefined;
    }[],
    activity: Activity,
    school: School
) => {
    const getScoreOrDefault = (
        score: number | undefined,
        action: (data: number) => string
    ): string => score !== undefined ? action(score) : "-"

    const getResultOrDefault = (
        result: Questionnarie | undefined,
        action: (data: Questionnarie) => string
    ): string => result !== undefined ? action(result) : "-"

    const schema = [
        {
            column: 'Nama',
            type: String,
            value: (item: {
                user: User;
                evaluation: Questionnarie | undefined;
                evalTotalScore: number | undefined;
                peranGuru: Questionnarie | undefined;
            }) => item.user.name,
            width: 30,
        },
        {
            column: 'Tugas',
            type: String,
            value: (item: {
                user: User;
                evaluation: Questionnarie | undefined;
                evalTotalScore: number | undefined;
                peranGuru: Questionnarie | undefined;
            }) => item.user.role == 'teacher' ? 'Guru' : 'Perawat',
            width: 30,
        },
        {
            column: 'Peran Guru',
            type: String,
            value: (item: {
                user: User;
                evaluation: Questionnarie | undefined;
                evalTotalScore: number | undefined;
                peranGuru: Questionnarie | undefined;
            }) => item.user.role == 'teacher' ? getResultOrDefault(item.peranGuru, (result) => `${roundScore(result.sections[0].score ?? 0)} (${getSelectedRule(teachertScoreRule, result.sections[0].score ?? 0)})`) : 'Tidak tersedia',
            width: 30,
        },
        {
            column: 'Mutu Manajemen',
            type: String,
            value: (item: {
                user: User;
                evaluation: Questionnarie | undefined;
                evalTotalScore: number | undefined;
                peranGuru: Questionnarie | undefined;
            }) => getScoreOrDefault(item.evalTotalScore, (score) => `${roundScore(score)} (${getSelectedRule(evalScoreRule, score)})`),
            width: 30,
        },
    ]
    
    await writeXlsxFile(data, {
        schema,
        fileName: `${activity.title} - ${getActivityTimeFormatted(activity)} - ${school.name} - Report.xlsx`,
    });
}