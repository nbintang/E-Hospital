export interface ArticleProps {
    title: string;
    content: string;
    slug: string;
    imageUrl: string;
    status?: ArticleStatus;
    doctorId: string;
    categories: {
        id: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
      }[]
  }