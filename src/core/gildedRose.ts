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

interface QualityUpdater {
  updateQuality(): Item;
}

class StandardItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let newItem = this.item;

    if (this.item.quality > 0) {
      newItem.quality = this.item.quality - 1;
    }
    newItem.sellIn = this.item.sellIn - 1;
    if (newItem.sellIn < 0 && newItem.quality > 0) {
      newItem.quality = newItem.quality - 1;
    }
    return newItem;
  }
}

class AgedBrieItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let newItem = this.item;

    if (this.item.quality < 50) {
      newItem.quality = this.item.quality + 1;
    }
    newItem.sellIn = this.item.sellIn - 1;
    if (newItem.sellIn < 0 && newItem.quality < 50) {
      newItem.quality = newItem.quality + 1;
    }
    return newItem;
  }
}

class SulfurasItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    return this.item;
  }
}

class BackstagePassItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let newItem = this.item;

    if (this.item.quality < 50) {
      newItem.quality = this.item.quality + 1;
      if (this.item.sellIn < 11) {
        if (newItem.quality < 50) {
          newItem.quality = newItem.quality + 1;
        }
      }
      if (this.item.sellIn < 6) {
        if (newItem.quality < 50) {
          newItem.quality = newItem.quality + 1;
        }
      }
    }
    newItem.sellIn = this.item.sellIn - 1;
    if (newItem.sellIn < 0) {
      newItem.quality = 0;
    }
    return newItem;
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
      } else {
        return new StandardItem(item).updateQuality();
      }
    });
  }
}
