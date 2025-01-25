import { Item } from "./gildedRose";
import { Quality, Sellin } from "./value.objects";

export interface QualityUpdater {
  updateQuality(): Item;
}

export class StandardItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    let quality = Quality.create(this.item.quality);
    let sellIn = Sellin.create(this.item.sellIn);

    quality = quality.decrease();
    sellIn = sellIn.decrease();

    if (sellIn.hasPassed()) {
      quality = quality.decrease();
    }
    return new Item(this.item.name, sellIn.value(), quality.value());
  }
}

export class AgedBrieItem implements QualityUpdater {
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

export class SulfurasItem implements QualityUpdater {
  constructor(private item: Item) { }

  updateQuality(): Item {
    return this.item;
  }
}

export class BackstagePassItem implements QualityUpdater {
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

export class ConjuredItem implements QualityUpdater {
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


