import { useEffect, useState } from 'react'
import { Item } from '../models/Item.ts'

export const MenuPage = () => {
  const [items, setItems] = useState<Item[]>([])

//fake data
  useEffect(() => {
    const mockItems: Item[] = [
      new Item(1, 'Pizza', 'Delicious cheese pizza', 9.99, 'pizza.jpg', 'Main Course'),
      new Item(2, 'Burger', 'Juicy beef burger', 7.99, 'burger.jpg', 'Main Course'),
      new Item(3, 'Pasta', 'Creamy Alfredo pasta', 9.99, 'pasta.jpg', 'Main Course'),
    ]
    mockItems[0].ingredients = ['cheese', 'tomato sauce', 'dough']
    mockItems[1].ingredients = ['beef', 'lettuce', 'tomato', 'bun']
    mockItems[2].ingredients = ['pasta', 'cream', 'cheese']
    setItems(mockItems)
  }, [])

  return (
    <div>
      <h1>Menu</h1>
      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.imageUrl} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}