export class Item {
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public price: number,
      public imageUrl: string,
      public category: string,
      public ingredients?: string[]
    ) {}
  }