import CreateQuestionForm from "@/components/client/questions/new";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-use-seesion";
import { findCategories } from "@/repositories/categories.repository";
import React from "react";

export default async function CreateQuestionPage() {
  const categories = await findCategories();
  const session = await getAuthenticatedUserSession();
  return <CreateQuestionForm categories={categories} session={session} />;
}
