export type CompletionData = {
    id: string,
    isDone: boolean,
    blocker: string,
    description: string,
    evidences?: string[],
    createdAt?: Date
}