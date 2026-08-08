import { inject, Service } from '@angular/core';
import { Sigil } from '../../_models/sigil-model';
import { WeaponService } from '../weapon-service/weapon-service';

@Service()
export class BuildContext {
    static readonly DEFAULT_CHAR_ID: string = "0";
    static readonly SIGIL_MAX_COUNT: number = 12;
    static readonly SKILL_MAX_COUNT: number = 4;

    private weaponService = inject(WeaponService);

    private _characterId: string;
    private _weaponId: string = "";
    private _sigils: Sigil[] = [];
    private _skills: (string | undefined)[] = [];
    private _masterTraits: Set<string> = new Set();

    constructor() {
        this._characterId = BuildContext.DEFAULT_CHAR_ID;
        this.resetCharacter();
    }

    public get character(): string {
        return this._characterId;
    }

    public set character(id: string) {
        this._characterId = id;
        this.resetCharacter();
    }

    public get weaponId(): string {
        if (this._weaponId === "")
            this.resetWeapon();

        return this._weaponId;
    }

    public getSigil(id: number): Sigil | undefined {
        if (id >= 0 && id < BuildContext.SIGIL_MAX_COUNT)
            return this._sigils[id];

        return undefined;
    }

    public setSigil(id: number, value: Sigil) {
        if (id >= 0 && id < BuildContext.SIGIL_MAX_COUNT)
            this._sigils[id] = value;
    }

    public getSkill(id: number): string | undefined {
        if (id >= 0 && id < BuildContext.SKILL_MAX_COUNT)
            return this._skills[id];

        return undefined;
    }

    public setSkill(id: number, value: string | undefined) {
        if (id >= 0 && id < BuildContext.SKILL_MAX_COUNT)
            this._skills[id] = value;
    }

    public hasMasterTrait(id: string): boolean {
        return this._masterTraits.has(id);
    }

    public toggleMasterTrait(id: string, active: boolean): void {
        if (active)
            this._masterTraits.add(id);
        else
            this._masterTraits.delete(id);
    }

    private resetCharacter() {
        this._sigils = Array<Sigil>(BuildContext.SIGIL_MAX_COUNT);
        this._skills = Array<string | undefined>(BuildContext.SKILL_MAX_COUNT);
        this._masterTraits = new Set();
        this.resetWeapon();
    }

    private resetWeapon() {
        const charWeapons = this.weaponService.getAllFor(this.character);
        this._weaponId = charWeapons.length > 0 ? charWeapons[0].id : '';
    }
}
