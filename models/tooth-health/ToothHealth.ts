export type ToothHealth = {
    id: string,
    studentId: string,
    ohis: Ohis,
    dmft: Dmft,
    gums: Gums,
    referral?: Referral,
    createdAt?: Date
}

export type Ohis = {
    debris: {
        16: number,
        11: number,
        26: number,
        46: number,
        31: number,
        36: number
    },
    kalkulus: {
        16: number,
        11: number,
        26: number,
        46: number,
        31: number,
        36: number
    },
    totalScore: number
}

export type Dmft = {
    cavity: number,
    filled: number,
    loose: number,
    missing: number,
    totalScore: number
}

export type Gums  = {
    score: number
}

export type Referral = {
    evidences: string[],
    treatment: string[]
}