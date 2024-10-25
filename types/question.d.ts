export type Question = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  userId: string;
  isAnswered: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED';
  textContent: string;
  category: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};