import db from "@/lib/db";

export const findCategories = async () => (
    await db.category.findMany()
)