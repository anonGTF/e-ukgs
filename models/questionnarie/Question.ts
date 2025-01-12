import type { Answer } from "./Answer"

export type Question = {
    orderNo: number,
    question: string,
    indicator?: string,
    isPositive: boolean,
    answerOption: Answer[],
    selectedAnswer?: Answer
}