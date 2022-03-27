import { WeaponGroup } from '../database-enums/weapon-group';
import { BaseDbItem } from './base-db-item';

export interface MeleeWeaponDbItem extends BaseDbItem {
  damage: string;
  group: WeaponGroup;
  hands: number;
  bulk: string;
}
