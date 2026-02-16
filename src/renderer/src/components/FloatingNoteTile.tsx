import { useNoteList } from '@renderer/hooks/useNoteList'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingNoteTile = ({ className, ...props }: ComponentProps<'div'>) => {
  const { selectedNoteIndex, notes } = useNoteList({})

  if (!notes || selectedNoteIndex === null) return null
  const title =
    selectedNoteIndex !== null && notes[selectedNoteIndex] ? notes[selectedNoteIndex].title : ''
  return (
    <div className={twMerge('flex justify-center ', className)} {...props}>
      <span className="text-gray-400 ">{title}</span>
    </div>
  )
}
