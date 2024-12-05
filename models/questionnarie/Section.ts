import type { Question } from "./Question"

export type Section = {
    title: string,
    answerType: AnswerType,
    questions: Question[]
}

export enum AnswerType { MULTIPLE_CHOICE, BINARY_OPTION, BINARY_APPRORIATE, RATING }