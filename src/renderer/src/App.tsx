import {
  ActionButtonRow,
  Content,
  DraggableTopBar,
  FloatingNoteTile,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2 ">
          <ActionButtonRow
            className="
          flex justify-between"
          />
          <NotePreviewList onSelect={resetScroll} className="mt-6 space-y-1" />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTile className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
