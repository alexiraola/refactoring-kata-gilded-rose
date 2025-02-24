export class SellIn {
  private constructor(private readonly sellInDays: number) { }

  static create(sellin: number) {
    return new SellIn(sellin);
  }

  value() {
    return this.sellInDays;
  }

  hasPassed() {
    return this.sellInDays < 0;
  }

  decrease() {
    return new SellIn(this.sellInDays - 1);
  }
}

export class Quality {
  static maxQuality = 50;
  private constructor(private readonly quality: number) { }

  static create(quality: number) {
    const isSulfuraQuality = quality === 80;
    const isInvalidQuality = quality < 0 || quality > Quality.maxQuality;

    if (!isSulfuraQuality && isInvalidQuality) {
      throw new Error(`Invalid quality ${quality}`);
    }
    return new Quality(quality);
  }

  value() {
    return this.quality;
  }

  increase(by: number = 1) {
    if (this.quality < Quality.maxQuality) {
      return new Quality(this.quality + by);
    }
    return new Quality(this.quality);
  }

  decrease(by: number = 1) {
    if (this.quality > 0) {
      return new Quality(this.quality - by);
    }
    return new Quality(this.quality);
  }
}
