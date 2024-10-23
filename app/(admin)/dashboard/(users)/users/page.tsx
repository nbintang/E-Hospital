import { ContentLayout } from "@/components/admin/admin-panel/content-layout";
import { DataTableUsers } from "@/components/admin/user";

import { User } from "@/components/admin/user/columns";

const data: User[] = [
  {
    id: 1,
    email: "john@example.com",
    name: "John Doe",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-06-15"),
  },
  {
    id: 2,
    email: "jane@example.com",
    name: "Jane Smith",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    id: 3,
    email: "bob@example.com",
    name: "Bob Johnson",
    createdAt: new Date("2023-03-30"),
    updatedAt: new Date("2023-06-25"),
  },
];

export default function UsersPage() {
  return (
    <ContentLayout title="Users">
      <DataTableUsers data={data} />
    </ContentLayout>
  );
}
