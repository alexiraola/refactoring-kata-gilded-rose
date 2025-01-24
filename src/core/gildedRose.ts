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

class Quality {
  private constructor(private readonly quality: number) { }

  static create(quality: number) {
    if (quality < 0 || quality > 50) {
      throw new Error(`Invalid quality ${quality}`);
    }
    return new Quality(quality);
  }

  value() {
    return this.quality;
  }

  increase() {
    if (this.quality < 50) {
      return new Quality(this.quality + 1);
    }
    return new Quality(this.quality);
  }

  decrease() {
    if (this.quality > 0) {
      return new Quality(this.quality - 1);
    }
    return new Quality(this.quality);
  }
}

interface QualityUpdater {
  updateQuality(): Item;
}

class StandardItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    let sellIn = this.item.sellIn;


    quality = quality.decrease();
    sellIn = sellIn - 1;

    if (sellIn < 0 && quality.value() > 0) {
      quality = quality.decrease();
    }
    return new Item(this.item.name, sellIn, quality.value());
  }
}

class AgedBrieItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    let sellIn = this.item.sellIn;

    quality = quality.increase();
    sellIn = sellIn - 1;
    if (sellIn < 0 && quality.value() < 50) {
      quality = quality.increase();
    }
    return new Item(this.item.name, sellIn, quality.value());
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
    let quality = Quality.create(this.item.quality);
    let sellIn = this.item.sellIn;

    if (quality.value() < 50) {
      quality = quality.increase();
      if (sellIn < 11) {
        quality = quality.increase();
      }
      if (sellIn < 6) {
        quality = quality.increase();
      }
    }
    sellIn = sellIn - 1;
    if (sellIn < 0) {
      quality = Quality.create(0);
    }
    return new Item(this.item.name, sellIn, quality.value());
  }
}

class ConjuredItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    let sellIn = this.item.sellIn;


    quality = quality.decrease().decrease();
    sellIn = sellIn - 1;

    if (sellIn < 0 && quality.value() > 0) {
      quality = quality.decrease().decrease();
    }
    return new Item(this.item.name, sellIn, quality.value());
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
