export class Item {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  ingredients: string[] = []

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    category: string
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
    this.category = category
    this.ingredients = []
  }
}