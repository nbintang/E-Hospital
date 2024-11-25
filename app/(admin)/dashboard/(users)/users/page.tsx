import { DataTableUsers } from "@/components/admin/sections/user";
import { findUsers } from "@/repositories/users.repository";

export default async function UsersPage() {
  const users = await findUsers();
  if (!users) return null;
  return <DataTableUsers data={users} />;
}
