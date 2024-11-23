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
    PeranDokterKecil: "peran-dokter-kecil",
    MutuManajemenUkgs: "mutu-manajemen-ukgs",
    LayananKesehatanGigi: "layanan-kesehatan-gigi"
} as const;