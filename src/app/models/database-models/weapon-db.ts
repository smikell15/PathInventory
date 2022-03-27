import { MeleeWeaponDbItem } from './melee-weapon-db-item';

export interface WeaponDb{
  name: string;
  date: Date;
  meleeWeapons: MeleeWeaponDbItem[];
  rangeWeapons: any[];
  baseMagicWeapons: any[];
  specialMaterialWeapons: any[];
  magicWeapons: any[];
  critSpecialization: any[];
}
