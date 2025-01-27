import { Item } from "./gildedRose";
import { Quality, SellIn } from "./value.objects";

export interface InventoryItem {
  updateQuality(): Item;
}

export class ItemFactory {
  static create(item: Item): InventoryItem {
    const sellIn = SellIn.create(item.sellIn);
    const quality = Quality.create(item.quality);

    switch (item.name) {
      case "Sulfuras, Hand of Ragnaros":
        return new SulfurasItem(item);
      case "Aged Brie":
        return new AgedBrieItem(item.name, sellIn, quality);
      case "Backstage passes to a TAFKAL80ETC concert":
        return new BackstagePassItem(item.name, sellIn, quality);
      case "Conjured":
        return new ConjuredItem(item.name, sellIn, quality);
      default:
        return new StandardItem(item.name, sellIn, quality);
    }
  }
}

export class StandardItem implements InventoryItem {
  constructor(private name: string, private sellIn: SellIn, private quality: Quality) { }

  updateQuality(): Item {
    const newSellIn = this.sellIn.decrease();

    const newQuality = newSellIn.hasPassed()
      ? this.quality.decrease(2)
      : this.quality.decrease();

    return new Item(this.name, newSellIn.value(), newQuality.value());
  }
}

export class AgedBrieItem implements InventoryItem {
  constructor(private name: string, private sellIn: SellIn, private quality: Quality) { }

  updateQuality(): Item {
    const newSellIn = this.sellIn.decrease();

    const newQuality = newSellIn.hasPassed()
      ? this.quality.increase(2)
      : this.quality.increase();

    return new Item(this.name, newSellIn.value(), newQuality.value());
  }
}

export class SulfurasItem implements InventoryItem {
  constructor(private item: Item) { }

  updateQuality(): Item {
    return this.item;
  }
}

export class BackstagePassItem implements InventoryItem {
  constructor(private name: string, private sellIn: SellIn, private quality: Quality) { }

  updateQuality(): Item {
    const newQuality = this.newQuality();
    const newSellIn = this.sellIn.decrease();

    if (newSellIn.hasPassed()) {
      return new Item(this.name, newSellIn.value(), Quality.create(0).value());
    }
    return new Item(this.name, newSellIn.value(), newQuality.value());
  }

  private newQuality() {
    if (this.sellIn.value() < 6) {
      return this.quality.increase(3)
    }
    if (this.sellIn.value() < 11) {
      return this.quality.increase(2)
    }
    return this.quality.increase();
  }
}

export class ConjuredItem implements InventoryItem {
  constructor(private name: string, private sellIn: SellIn, private quality: Quality) { }

  updateQuality(): Item {
    const newSellIn = this.sellIn.decrease();

    const newQuality = newSellIn.hasPassed()
      ? this.quality.decrease(4)
      : this.quality.decrease(2)

    return new Item(this.name, newSellIn.value(), newQuality.value());
  }
}


