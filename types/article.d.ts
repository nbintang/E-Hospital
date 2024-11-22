import { Doctor } from "@prisma/client";
import { CategoryProps } from "./categories";

export interface ArticleProps {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  status: ArticleStatus;
  content: string;
  doctorId: string;
  doctor?:{
    id: string;
    user?:{
      profile?:{ fullname: string; } | null | undefined; // Add null to the union type

    }
  };
  createdAt: Date;
  updatedAt: Date;
  categories: CategoryProps[];
}
