import { ContentLayout } from "@/components/admin/admin-panel/content-layout";
import { DataTableMedicine } from "@/components/admin/product";
import { Medicine } from "@/components/admin/product/column";


export default function MedicinePage() {
  return (
    <ContentLayout title="Medicines">
      <DataTableMedicine data={data} />
    </ContentLayout>
  );
}
    const data: Medicine[] = [
      {
        id: "1",
        name: "Aspirin",
        price: 5.99,
        description: "Pain reliever and fever reducer",
        categoryId: "pain-relievers",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-01"),
      },
      {
        id: "2",
        name: "Amoxicillin",
        price: 12.99,
        description: "Antibiotic used to treat bacterial infections",
        categoryId: "antibiotics",
        createdAt: new Date("2023-02-15"),
        updatedAt: new Date("2023-02-15"),
      },
      {
        id: "3",
        name: "Lisinopril",
        price: 8.99,
        description: "Used to treat high blood pressure",
        categoryId: "cardiovascular",
        createdAt: new Date("2023-03-10"),
        updatedAt: new Date("2023-03-10"),
      },
      // Add more dummy data to test pagination
      ...Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 4}`,
        name: `Medicine ${i + 4}`,
        price: Math.round(Math.random() * 100 + 5),
        description: `Description for Medicine ${i + 4}`,
        categoryId: ["pain-relievers", "antibiotics", "cardiovascular"][Math.floor(Math.random() * 3)],
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      })),
    ]
