import AdminPanelLayout from "@/components/admin/admin-panel/admin-panel-layout";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <AdminPanelLayout>{children}</AdminPanelLayout>
    );
}