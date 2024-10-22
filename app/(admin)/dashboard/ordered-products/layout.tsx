import { ContentLayout } from "@/components/admin/admin-panel/content-layout";

export default function OrderedProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout title="Ordered Products">{children}</ContentLayout>;
}
