export type Question = {
  id: number
  text: string
  status: "Open" | "Closed" | "In Progress"
  category: string
  user: {
    name: string
    avatar: string
  }
}
