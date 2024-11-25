import db from "@/lib/db";
import { CategoryProps } from "@/types/categories";

export const findCategories = async () : Promise<CategoryProps[]> => (
    await db.category.findMany()
)

export async function createCategoryIfNotExists(categoryName: string) {
    // Check if the category already exists
    const existingCategory = await db.category.findFirst({
        where: { name: categoryName },
      });
  
    if (existingCategory) {
      return existingCategory; // Return the existing category if found
    }
  
    // Create a new category if it doesn't exist
    const newCategory = await db.category.create({
      data: {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'), // generate slug from category name
      },
    });
  
    return newCategory;
  }