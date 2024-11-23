export type ToothHealth = {
    id: string,
    studentId: string,
    groupId: string,
    periodId: string,
    ohis: Ohis,
    dmft: Dmft,
    referral?: Referral
}

export type Ohis = {}

export type Dmft = {
    cavity: number,
    filled: number,
    loose: number,
    missing: number,
    totalScore: number
}

export type Referral = {}