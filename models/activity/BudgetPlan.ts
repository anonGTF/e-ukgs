export type BudgetPlan = {
    id: string,
    items: Budget[],
    total: number
}

export type Budget = {
    name: string,
    unit: string,
    count: number,
    pricePerUnit: number,
    subtotal: number
}