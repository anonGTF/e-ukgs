export type BudgetPlan = {
    id: string,
    items: Budget[],
    total: number,
    createdAt?: Date
}

export type Budget = {
    name: string,
    unit: string,
    count: number,
    pricePerUnit: number,
    subtotal: number
}