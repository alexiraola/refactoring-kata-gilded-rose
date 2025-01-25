import { Item } from "./gildedRose";
import { Quality, SellIn } from "./value.objects";

export interface InventoryItem {
  updateQuality(): Item;
}

export class ItemFactory {
  static create(item: Item): InventoryItem {
    switch (item.name) {
      case "Sulfuras, Hand of Ragnaros":
        return new SulfurasItem(item);
      case "Aged Brie":
        return new AgedBrieItem(item);
      case "Backstage passes to a TAFKAL80ETC concert":
        return new BackstagePassItem(item);
      case "Conjured":
        return new ConjuredItem(item);
      default:
        return new StandardItem(item);
    }
  }
}

export class StandardItem implements InventoryItem {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    const sellIn = SellIn.create(this.item.sellIn).decrease();

    quality = sellIn.hasPassed()
      ? quality.decrease().decrease()
      : quality.decrease();

    return new Item(this.item.name, sellIn.value(), quality.value());
  }
}

export class AgedBrieItem implements InventoryItem {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    let sellIn = SellIn.create(this.item.sellIn);

    quality = quality.increase();
    sellIn = sellIn.decrease();

    if (sellIn.hasPassed()) {
      quality = quality.increase();
    }
    return new Item(this.item.name, sellIn.value(), quality.value());
  }
}

export class SulfurasItem implements InventoryItem {
  constructor(private item: Item) { }

  updateQuality(): Item {
    return this.item;
  }
}

export class BackstagePassItem implements InventoryItem {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    let sellIn = SellIn.create(this.item.sellIn);

    quality = quality.increase();
    if (sellIn.value() < 11) {
      quality = quality.increase();
    }
    if (sellIn.value() < 6) {
      quality = quality.increase();
    }

    sellIn = sellIn.decrease();

    if (sellIn.hasPassed()) {
      quality = Quality.create(0);
    }
    return new Item(this.item.name, sellIn.value(), quality.value());
  }
}

export class ConjuredItem implements InventoryItem {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    let sellIn = SellIn.create(this.item.sellIn);

    quality = quality.decrease().decrease();

    sellIn = sellIn.decrease();

    if (sellIn.hasPassed()) {
      quality = quality.decrease().decrease();
    }

    return new Item(this.item.name, sellIn.value(), quality.value());
  }
}


