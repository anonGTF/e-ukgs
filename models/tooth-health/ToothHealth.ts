export type ToothHealth = {
    id: string,
    studentId: string,
    schoolId: string,
    ohis: Ohis,
    dmft: Dmft,
    gums: Gums,
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

export type Gums  = {}

export type Referral = {}