import type { Section } from "./Section"

export type Questionnarie = {
    id: string,
    title: string,
    type: QuestionnarieType,
    sections: Section[]
}

export type QuestionnarieType = typeof QuestionType[keyof typeof QuestionType]

export const QuestionType = {
    SoalPerilaku: "soal-perilaku",
    PeranGuru: "peran-guru",
    PeranOrangTua: "peran-orang-tua",
    EvaluasiEUkgs: "evaluasi-e-ukgs",
    KualitasManajemenUkgs: "kualitas-manajemen-ukgs"
} as const;