import { useEffect, useState } from 'react'
import { Item } from '../models/Item.ts'
import '../services/menuService.css'

export const MenuPage = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8080/api/menu-items?available=true')
        
        if (!response.ok) {
          throw new Error('Failed to fetch menu items')
        }
        
        const data = await response.json()
        
        // Convert backend response to frontend Item model
        const menuItems = data.map((item: any) => new Item(
          item.id,
          item.name,
          item.description,
          item.price,
          item.imageUrl || 'placeholder.jpg',
          item.category,
          item.ingredients || []
        ))
        
        setItems(menuItems)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load menu')
        console.error('Error fetching menu items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-header">
          <h1>Our Menu</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading menu items...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="menu-page">
        <div className="menu-header">
          <h1>Our Menu</h1>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Our Menu</h1>
          <p>Discover our delicious selection of dishes</p>
        </div>
      </div>
      
      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="order-card menu-item">
            {/* <img src={item.imageUrl} alt={item.name} /> */}
            <div className="item-info">
              <span className="category-badge">{item.category}</span>
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <div className="price">€{item.price.toFixed(2)}</div>
              
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="ingredients">
                  <small>Ingredients: {item.ingredients.join(', ')}</small>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}