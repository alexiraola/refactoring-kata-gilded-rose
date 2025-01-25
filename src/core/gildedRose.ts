import { AgedBrieItem, BackstagePassItem, ConjuredItem, StandardItem, SulfurasItem } from "./items";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(item => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        return new SulfurasItem(item).updateQuality();
      } else if (item.name === 'Aged Brie') {
        return new AgedBrieItem(item).updateQuality();
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        return new BackstagePassItem(item).updateQuality();
      } else if (item.name === 'Conjured') {
        return new ConjuredItem(item).updateQuality();
      } else {
        return new StandardItem(item).updateQuality();
      }
    });
  }
}
