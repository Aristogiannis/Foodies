import { useEffect, useState } from 'react'
import { Item } from '../models/Item.ts'
import '../services/menuService.css'

export const MenuPage = () => {
  const [items, setItems] = useState<Item[]>([])

  //fake data
  useEffect(() => {
    const mockItems: Item[] = [
      new Item(1, 'Margherita Pizza', 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil', 12.99, 'pizza.jpg', 'Main Course'),
      new Item(2, 'Classic Burger', 'Juicy beef patty with lettuce, tomato, cheese, and special sauce', 9.99, 'burger.jpg', 'Main Course'),
      new Item(3, 'Creamy Alfredo Pasta', 'Fettuccine pasta in rich cream sauce with parmesan cheese', 11.99, 'pasta.jpg', 'Main Course'),
      new Item(4, 'Caesar Salad', 'Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing', 8.99, 'salad.jpg', 'Appetizer'),
      new Item(5, 'Chocolate Cake', 'Rich chocolate layer cake with chocolate ganache frosting', 6.99, 'cake.jpg', 'Dessert'),
      new Item(6, 'Iced Latte', 'Smooth espresso with cold milk and ice', 4.99, 'latte.jpg', 'Beverage'),
      new Item(7, 'Icod Latte', 'Smooth espresso with cold milk and ice', 4.99, 'latte.jpg', 'Beverage')
    ]
    mockItems[0].ingredients = ['Fresh mozzarella', 'Tomato sauce', 'Basil', 'Pizza dough']
    mockItems[1].ingredients = ['Beef patty', 'Lettuce', 'Tomato', 'Cheese', 'Bun', 'Special sauce']
    mockItems[2].ingredients = ['Fettuccine pasta', 'Heavy cream', 'Parmesan cheese', 'Butter', 'Garlic']
    mockItems[3].ingredients = ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing']
    mockItems[4].ingredients = ['Chocolate cake', 'Chocolate ganache', 'Cocoa powder', 'Vanilla']
    mockItems[5].ingredients = ['Espresso', 'Cold milk', 'Ice']
    setItems(mockItems)
  }, [])

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
      </div>
      
      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.imageUrl} alt={item.name} />
            <span className="category">{item.category}</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <div className="price">${item.price.toFixed(2)}</div>
            
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="ingredients">
                <h4>Ingredients</h4>
                <ul>
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}