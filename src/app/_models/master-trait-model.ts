export type MasterStyle = 'Insight' | 'Essence' | 'Crux';

export interface MasterTrait {
    id: string,
    charaID: string,
    style: MasterStyle,
    rank: number,
    description: string,
}