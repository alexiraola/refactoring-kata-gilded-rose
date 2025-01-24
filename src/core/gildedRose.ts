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
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        this.updateSulfurasQuality(i);
      } else if (this.items[i].name === 'Aged Brie') {
        this.updateAgedBrieQuality(i);
      } else if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackstagePassQuality(i);
      } else {
        this.updateStandardQuality(i);
      }
    }

    return this.items;
  }

  updateStandardQuality(index: number) {
    if (this.items[index].quality > 0) {
      this.items[index].quality = this.items[index].quality - 1;
    }
    this.items[index].sellIn = this.items[index].sellIn - 1;
    if (this.items[index].sellIn < 0 && this.items[index].quality > 0) {
      this.items[index].quality = this.items[index].quality - 1;
    }
  }

  updateSulfurasQuality(index: number) {
    // do nothing.
  }

  updateAgedBrieQuality(index: number) {
    if (this.items[index].quality < 50) {
      this.items[index].quality = this.items[index].quality + 1;
    }
    this.items[index].sellIn = this.items[index].sellIn - 1;
    if (this.items[index].sellIn < 0 && this.items[index].quality < 50) {
      this.items[index].quality = this.items[index].quality + 1;
    }
  }

  updateBackstagePassQuality(index: number) {
    if (this.items[index].quality < 50) {
      this.items[index].quality = this.items[index].quality + 1
      if (this.items[index].sellIn < 11) {
        if (this.items[index].quality < 50) {
          this.items[index].quality = this.items[index].quality + 1
        }
      }
      if (this.items[index].sellIn < 6) {
        if (this.items[index].quality < 50) {
          this.items[index].quality = this.items[index].quality + 1
        }
      }
    }
    this.items[index].sellIn = this.items[index].sellIn - 1;
    if (this.items[index].sellIn < 0) {
      this.items[index].quality = 0;
    }
  }
}
