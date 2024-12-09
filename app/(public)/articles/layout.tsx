import React from "react";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto min-h-screen p-4 md:p-12 my-8" >
      <div className="space-y-8">
        {children}
      </div>
    </main>
  );
}
