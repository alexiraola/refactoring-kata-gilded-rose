import { Item, GildedRose } from '../core/gildedRose';

// Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that we can begin selling a new category of items. First an introduction to our system:

//     - All items have a SellIn value which denotes the number of days we have to sell the item
//     - All items have a Quality value which denotes how valuable the item is
//     - At the end of each day our system lowers both values for every item
//
// Pretty simple, right? Well this is where it gets interesting:
//
//     - Once the sell by date has passed, Quality degrades twice as fast
//     - The Quality of an item is never negative
//     - “Aged Brie” actually increases in Quality the older it gets
//     - "Aged Brie" increases in Quality twice as fast once the sell by date has passed.
//     - The Quality of an item is never more than 50
//     - “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
//     - “Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches;
//         - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
//         - Quality drops to 0 after the concert

describe('The Gilded Rose', () => {
  describe('Normal items', () => {
    it('updates quality for a new item', () => {
      const gildedRose = new GildedRose([new Item('new item', 5, 10)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "new item", "quality": 9, "sellIn": 4 });
    });

    it('Once the sell by date has passed, Quality degrades twice as fast', () => {
      const gildedRose = new GildedRose([new Item('new item', 0, 10)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "new item", "quality": 8, "sellIn": -1 });
    });

    it('The quality of an item is never negative', () => {
      const gildedRose = new GildedRose([new Item('new item', 0, 0)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "new item", "quality": 0, "sellIn": -1 });
    });
  });

  describe('Aged Brie items', () => {
    it("increases in Quality the older it gets", () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 5, 0)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Aged Brie", "quality": 1, "sellIn": 4 });
    });

    it("increases in Quality twice as fast once the sell by date has passed", () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Aged Brie", "quality": 2, "sellIn": -1 });
    });

    it("the quality of an item is never more than 50", () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Aged Brie", "quality": 50, "sellIn": 4 });
    });
  });

  describe("Sulfuras items", () => {
    it("being a legendary item, never has to be sold or decreases in Quality", () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Sulfuras, Hand of Ragnaros", "quality": 80, "sellIn": 0 });
    });
  });

  describe("Backstage pass items", () => {
    it("increases in quality the older it gets", () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 0)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Backstage passes to a TAFKAL80ETC concert", "quality": 1, "sellIn": 14 });
    });

    it("quality increases by 2 when there are 10 days or less", () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Backstage passes to a TAFKAL80ETC concert", "quality": 2, "sellIn": 9 });
    });

    it("quality increases by 3 when there are 5 days or less", () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Backstage passes to a TAFKAL80ETC concert", "quality": 3, "sellIn": 4 });
    });

    it("quality drops to 0 after the concert", () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);

      const items = gildedRose.updateQuality();

      expect(items[0]).toEqual({ "name": "Backstage passes to a TAFKAL80ETC concert", "quality": 0, "sellIn": -1 });
    });
  });

  describe("Conjured items", () => {
    it("quality degrades twice as fast as normal items", () => {
      const gildedRose = new GildedRose([
        new Item('Conjured', 5, 10),
        new Item('Conjured', 0, 10)
      ]);

      const items = gildedRose.updateQuality();

      expect(items).toEqual([
        { "name": "Conjured", "quality": 8, "sellIn": 4 },
        { "name": "Conjured", "quality": 6, "sellIn": -1 }
      ]);
    });
  });
});
