import { notesAtom, selectedNoteIndexAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'

export const useNoteList = ({ onSelect }: { onSelect?: (index: number) => void }) => {
  const notes = useAtomValue(notesAtom)
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = async (index: number) => {
    setSelectedNoteIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
