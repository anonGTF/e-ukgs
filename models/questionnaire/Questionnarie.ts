import type { Section } from "./Section"

export type Questionnarie = {
    id: string,
    title: string,
    type: string,
    sections: Section[]
}