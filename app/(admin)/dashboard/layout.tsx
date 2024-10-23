import {
  ContentRouteLayout,
  AdminPanelLayout,
} from "@/components/admin/admin-panel/layout";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminPanelLayout>
      <ContentRouteLayout>{children}</ContentRouteLayout>
    </AdminPanelLayout>
  );
}
