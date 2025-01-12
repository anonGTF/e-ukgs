import type { Section } from "./Section"

export type Questionnarie = {
    id: string,
    title: string,
    type: QuestionnarieType,
    sections: Section[],
    parentData: ParentData | null
}

export type ParentData = {
    name: string,
    relation: string
}

export type QuestionnarieType = typeof QuestionType[keyof typeof QuestionType]

export const QuestionType = {
    SoalPerilaku: "soal-perilaku",
    PeranGuru: "peran-guru",
    PeranOrangTua: "peran-orang-tua",
    EvaluasiEUkgs: "evaluasi-e-ukgs",
    KualitasManajemenUkgs: "kualitas-manajemen-ukgs"
} as const;

export const enum FormState { IDENTITY, NEW, EXIST }