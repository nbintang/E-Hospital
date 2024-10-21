export type Question = {
  id: number
  slug: string
  text: string
  status: "Open" | "Closed" | "In Progress"
  category: string
  user: {
    name: string
    avatar: string
  }
}
