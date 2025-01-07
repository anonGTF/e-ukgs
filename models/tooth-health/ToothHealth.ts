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
    data: GumDataRecord,
    score: GumScore
}

export type GumData = {
    mesial: number | null,
    bucal: number | null,
    labial: number | null,
    distal: number | null,
    palatal: number | null,
    lingual: number | null
}

export type GumDataRecord = {
    [key: number]: GumData
}

export type GumScore = {
    [key: number]: number
    totalScore: number,
    totalSide: number,
    averageScore: number
}

export type Referral = {
    evidences: string[],
    treatment: string[],
    letterLink?: string
}