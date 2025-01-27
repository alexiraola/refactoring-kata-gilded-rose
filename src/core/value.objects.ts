export class SellIn {
  private constructor(private readonly sellIn: number) { }

  static create(sellin: number) {
    return new SellIn(sellin);
  }

  value() {
    return this.sellIn;
  }

  hasPassed() {
    return this.sellIn < 0;
  }

  decrease() {
    return new SellIn(this.sellIn - 1);
  }
}

export class Quality {
  static MAX_QUALITY = 50;
  private constructor(private readonly quality: number) { }

  static create(quality: number) {
    if (quality !== 80 && (quality < 0 || quality > Quality.MAX_QUALITY)) {
      throw new Error(`Invalid quality ${quality}`);
    }
    return new Quality(quality);
  }

  value() {
    return this.quality;
  }

  increase() {
    if (this.quality < Quality.MAX_QUALITY) {
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
