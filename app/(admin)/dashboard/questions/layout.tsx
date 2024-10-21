import { ContentLayout } from '@/components/admin/admin-panel/content-layout'
import React from 'react'

export default function QuestionsLayout({children}: {
    children: React.ReactNode
}) {
  return (
    <ContentLayout title="Questions">
        {children}
    </ContentLayout>
  )
}
