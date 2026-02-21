import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { AUTO_SAVE_DEBOUNCE_MS } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdown = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSave = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.log('auto-saving with content', selectedNote.title)

      await saveNote(content)
    },
    AUTO_SAVE_DEBOUNCE_MS,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSave.cancel()

    const prevContent = editorRef.current?.getMarkdown()

    if (prevContent !== undefined) {
      await saveNote(prevContent)
    }
  }

  return {
    selectedNote,
    editorRef,
    handleAutoSave,
    handleBlur
  }
}
