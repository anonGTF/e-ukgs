import type { Answer } from "./Answer"

export type Question = {
    orderNo: number,
    question: string,
    answerOption: Answer[]
}