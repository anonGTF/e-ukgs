export type CompletionData = {
    id: string,
    isDone: boolean,
    blocker: string,
    description: string,
    documentations?: string[],
    createdAt?: Date
}