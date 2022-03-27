import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { $enum } from 'ts-enum-util';
import { ItemCategory } from '../enums/item-category';
import { ItemRarity } from '../enums/item-rarity';
import { MeleeWeaponDbItem } from '../models/database-models/melee-weapon-db-item';
import { WeaponDb } from '../models/database-models/weapon-db';

export interface LibraryItem {
  name: string;
  description?: string;
  value: string;
  bulk: string;
  rarity: ItemRarity;
  category: ItemCategory;
  level: string;
}

const ITEM_LIBRARY_DATA: LibraryItem[] = []

@Component({
  selector: 'item-library',
  templateUrl: './item-library.component.html',
  styleUrls: ['./item-library.component.css']
})
export class ItemLibraryComponent implements OnInit{

  private httpClient: HttpClient;

  displayedColumns: string[] = ['name', 'bulk', 'category', 'description', 'rarity', 'value', 'level'];
  dataSource: LibraryItem[] = [];

  categoryKeys = $enum(ItemCategory).getKeys();
  rarityKeys = $enum(ItemRarity).getKeys();

  searchValue: string = '';
  selectedCategories: string[] = [];
  selectedRarities: string[] = [];
  minLevel: string = '';
  maxLevel: string = '';

  constructor(http: HttpClient) {
    this.httpClient = http;
  }


  ngOnInit(): void {
    this.loadDatabaseData();
  }

  convertToLibraryItem(item: MeleeWeaponDbItem) {
    return {
      name: item.name,
      description: item.text,
      value: item.price,
      bulk: item.bulk,
      rarity: ItemRarity.Common,
      category: ItemCategory.Weapons,
      level: '-'
    } as LibraryItem;
  }

  getCategoryDescription(category: number): string {
    return $enum(ItemCategory).getKeyOrDefault(category, '');
  }

  getRarityDescription(rarity: number): string {
    return $enum(ItemRarity).getKeyOrDefault(rarity, '');
  }

  loadDatabaseData() {
    this.httpClient.get<WeaponDb>('assets/itemdb/files/weapons-pf2.json').subscribe(data => {
      console.log(data);
      const weapons = data.meleeWeapons;
      weapons.forEach(item => ITEM_LIBRARY_DATA.push(this.convertToLibraryItem(item)));

      this.dataSource = ITEM_LIBRARY_DATA;
    });
  }

  searchAndFilterList() {
    this.dataSource = ITEM_LIBRARY_DATA.filter(item => item.name.toLowerCase().includes(this.searchValue.toLowerCase())
                                                  && (this.selectedCategories.length === 0 || this.selectedCategories.includes($enum(ItemCategory).getKeyOrDefault(item.category, '')))
                                                  && (this.selectedRarities.length === 0 || this.selectedRarities.includes($enum(ItemRarity).getKeyOrDefault(item.rarity, '')))
                                                  && (!this.minLevel || Number(this.minLevel) <= Number(item.level))
                                                  && (!this.maxLevel || Number(this.maxLevel) >= Number(item.level)));
  }
}
