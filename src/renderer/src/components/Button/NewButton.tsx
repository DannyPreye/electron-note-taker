import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { LuFile } from 'react-icons/lu'
export const NewNoteButton = ({}: ActionButtonProps) => {
  const createNewNote = useSetAtom(createEmptyNoteAtom)

  const handleClick = async () => {
    await createNewNote()
  }

  return (
    <ActionButton onClick={handleClick}>
      <LuFile size={18} className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
