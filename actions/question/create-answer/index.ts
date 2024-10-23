"use server";
export async function createAnswer(formData: FormData) {
  const content = formData.get("content") as string;
  console.log(content);
}
