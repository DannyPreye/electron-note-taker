import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

export const useMarkdown = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return {
    selectedNote
  }
}
