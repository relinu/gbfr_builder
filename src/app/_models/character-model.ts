export type ElementalType = "Fire" | "Water" | "Earth" | "Wind" | "Light" | "Dark";

export interface Character {
    id: string,
    name: string,
    portrait: string,
    element: ElementalType,
    baseHP: number,
    HP: number,
    baseATK: number,
    ATK: number,
    baseStun: number,
    baseCrit: number,
    passives: {
        name: string,
        description: string
    }[],
}