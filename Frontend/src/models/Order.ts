import { Item } from './Item' 
export class Order {
  orderId: number
  items: Item[]
  totalPrice: number
  status: string
  timestamp: Date
  tip : number
  notes: string
  
    constructor(
        orderId: number,
        items: Item[],
        totalPrice: number,
        status: string,
        timestamp: Date,
        tip: number,
        notes: string
    ) {
        this.orderId = orderId
        this.items = items
        this.totalPrice = totalPrice
        this.status = status
        this.timestamp = timestamp
        this.tip = tip
        this.notes = notes
    }
}